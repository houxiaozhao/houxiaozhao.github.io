---
title: Flask 图片处理：构建高性能实时缩略图服务
date: 2022-01-20 10:34:59.094
categories:
  - Python开发
  - Web服务
  - 图像处理
tags:
  - Python
  - 图片处理
  - Pillow
  - Flask
  - Docker
  - Gunicorn
  - 性能优化
  - Web开发
keywords:
  - Flask图片服务
  - 实时缩略图
  - Python图像处理
  - Pillow库应用
  - Web图片优化
  - Docker部署
  - Gunicorn配置
  - 图片服务器
  - 内存优化
  - 高性能Web
  - 图片缓存
  - RESTful API
  - 图像缩放
  - 服务端开发
  - 容器化部署
description: |
  本文详细介绍了如何使用 Flask 和 Pillow 库构建一个高性能的实时图片缩略图服务。这个服务能够根据 URL 参数动态生成不同尺寸的图片缩略图，并且完全在内存中处理，避免中间文件的产生。文章涵盖了完整的实现细节，包括 Flask 路由配置、正则表达式路径匹配、图片处理逻辑、内存优化处理等核心功能。同时提供了两种实现方案：纯内存处理模式和带本地缓存的模式，以适应不同的应用场景。文章还包含了完整的部署方案，使用 Gunicorn 作为 WSGI 服务器，并提供了 Docker 容器化部署的配置，确保服务的高性能和可扩展性。通过详细的代码示例和配置文件，读者可以快速搭建一个生产级别的图片处理服务。

  This article demonstrates how to build a high-performance real-time thumbnail service using Flask and the Pillow library. The service dynamically generates thumbnails of different sizes based on URL parameters, processing images entirely in memory to avoid intermediate file generation. The article covers comprehensive implementation details, including Flask route configuration, regex path matching, image processing logic, and memory optimization techniques. It presents two implementation approaches: a pure memory processing mode and a mode with local caching, suitable for different application scenarios. The article also includes a complete deployment solution using Gunicorn as the WSGI server and provides Docker containerization configuration to ensure high performance and scalability. Through detailed code examples and configuration files, readers can quickly set up a production-grade image processing service. The implementation focuses on performance optimization, memory efficiency, and scalability, making it suitable for both small and large-scale applications.
---

> 因为网页上图片太大，现在要生成缩略图返回。使用 python 的 Pillow 库处理图片缩略图并返回。

以下是 flask 程序，调用方法 GET /images/\<path>?resize=\<width>\*\<height>

### 实现功能：

- 根据参数返回不同大小的缩略图，目前只支持 jpg 图片处理
- 使用的正则匹配路由，支持在 images 下的多级路径
- 不产生中间图片，全部在内存中处理。

注意：内部调用的是 thumbnail 方法。返回的图片并不是严格安装 resize 的参数进行返回。图片不会有拉伸效果。具体查看 Pillow 文档。

#### app.py

```python
from io import BytesIO
from PIL import Image
from flask import Flask, request, send_file
from werkzeug.routing import BaseConverter


class PathConverter(BaseConverter):
    regex = r'.+(\.(jpg|jpeg))'
    weight = 200


def serve_pil_image(pil_img):
    img_io = BytesIO()
    pil_img.save(img_io, 'JPEG')
    img_io.seek(0)
    return send_file(img_io, mimetype='image/jpeg')


app = Flask(__name__)
app.url_map.converters['path'] = PathConverter


@app.route('/images<path:file_path>')
def thumbnail(file_path):
    print(file_path)
    resize = request.args.get("resize")
    if resize:
        w_h = resize.split('*')
        im = Image.open('images' + file_path)
        im.thumbnail((int(w_h[0]), int(w_h[1])))
        return serve_pil_image(im)
    return send_file('images' + file_path, mimetype='image/jpeg')


if __name__ == '__main__':
    app.run()

```

![image-729f7471edcb4b7e8a52cf8e9eac56be](https://cdn.jsdelivr.net/gh/houxiaozhao/imageLibrary@master/uPic/2022/05/20/1MU1GY.png)其他

#### requirements.txt

```
gunicorn
gevent
flask
Pillow
Werkzeug
```

#### gunicorn.conf.py

```
workers = 10  # 定义同时开启的处理请求的进程数量，根据网站流量适当调整
worker_class = "gevent"  # 采用gevent库，支持异步处理请求，提高吞吐量
bind = "0.0.0.0:7676"

```

#### Dockerfile

```
FROM python:3.6
WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple

COPY . .
EXPOSE 7676
CMD ["gunicorn", "app:app", "-c", "./gunicorn.conf.py"]
```

运行时把图片的文件目录映射到/usr/src/app/images

### 更新

如果需要把缩略图存在本地使用一下代码

```python
import os
from PIL import Image
from flask import Flask, request, send_file
from werkzeug.routing import BaseConverter


class PathConverter(BaseConverter):
    regex = r'.+(\.(jpg|jpeg))'
    weight = 200


app = Flask(__name__)
app.url_map.converters['path'] = PathConverter


@app.route('/images<path:file_path>')
def thumbnail(file_path):
    print(file_path)
    resize = request.args.get("resize")
    if resize:
        resize_filepath = 'images' + (
            '.'.join([file_path.split('.')[0] + '_resize_' + resize, file_path.split('.')[1]]))
        if os.path.exists(resize_filepath):
            return send_file(resize_filepath)
        w_h = resize.split('*')
        im = Image.open('images' + file_path)
        im.thumbnail((int(w_h[0]), int(w_h[1])))
        im.save(resize_filepath, 'JPEG')
        return send_file(resize_filepath)
    return send_file('images' + file_path, mimetype='image/jpeg')


if __name__ == '__main__':
    app.run()

```
