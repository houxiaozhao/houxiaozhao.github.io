---
title: Nodejs中Buffer和Stream互转
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
    stream.on("data", data => buffers.push(data));
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
