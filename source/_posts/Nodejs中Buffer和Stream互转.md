---
title: Nodejs中Buffer和Stream互转
copyright_author: houxiaozhao
copyright_author_href: https://github.com/houxiaozhao
copyright_url: https://demontaste.com
copyright_info: 此文章版权归houxiaozhao所有，如有转载，请注明来自原作者
date: 2023-02-02 16:16:20
tags:
  - Nodejs
---

### Stream to Buffer

```javascript
function streamToBuffer(stream) {
  return new Promise((resolve, reject) => {
    let buffers = [];
    stream.on("error", reject);
    stream.on("data", (data) => buffers.push(data));
    stream.on("end", () => resolve(Buffer.concat(buffers)));
  });
}
```

### Buffer to Stream

```javascript
let Duplex = require("stream").Duplex;
function bufferToStream(buffer) {
  let stream = new Duplex();
  stream.push(buffer);
  stream.push(null);
  return stream;
}
```
