---
title: 简单的flask程序，实时返回图片缩略图
date: 2022-01-20 10:34:59.094
updated: 2022-03-04 19:15:34.595
url: /archives/简单的flask程序实时返回图片缩略图
categories: 
tags: 
- python
- 图片处理
- pillow
- flask
---

> 因为网页上图片太大，现在要生成缩略图返回。使用python的Pillow库处理图片缩略图并返回。

以下是flask程序，调用方法GET /images/\<path>?resize=\<width>*\<height>
### 实现功能：
- 根据参数返回不同大小的缩略图，目前只支持jpg图片处理
- 使用的正则匹配路由，支持在images下的多级路径
- 不产生中间图片，全部在内存中处理。

注意：内部调用的是thumbnail方法。返回的图片并不是严格安装resize的参数进行返回。图片不会有拉伸效果。具体查看Pillow文档。
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
![image-729f7471edcb4b7e8a52cf8e9eac56be](https://houxiaozhao-blog.oss-cn-beijing.aliyuncs.com/uPic/1MU1GY.png)其他

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