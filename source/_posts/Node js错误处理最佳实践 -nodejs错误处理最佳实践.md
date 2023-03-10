---
title: Node js错误处理最佳实践
copyright_author: houxiaozhao
copyright_author_href: https://github.com/houxiaozhao
copyright_url: https://100042.xyz
copyright_info: 此文章版权归houxiaozhao所有，如有转载，请注明来自原作者
date: 2021-04-07 11:22:18.0
updated: 2022-03-08 11:31:44.181
url: /archives/nodejs错误处理最佳实践
categories:
tags:
  - nodejs
---

# Node.js 错误处理最佳实践

## 使用 Promise 捕获错误

```jsx
let func = function (n) {
  return new Promise((resolve, reject) => {
    resolve(n * n);
  });
};
func(2)
  .then((res) => {
    console.log(res);
    return func(res);
  })
  .then((res) => {
    console.log(res);
    throw new Error("Error");
  })
  .then((res) => {
    console.log(res);
    return func(res);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    console.log("结束");
  });
```

## 使用 async/await 捕获错误

```jsx
let func = function (n) {
  return new Promise((resolve, reject) => {
    resolve(n * n);
  });
};
async function asyncTask() {
  try {
    const valueA = await func(2);
    console.log(valueA);
    const valueB = await func(valueA);
    console.log(valueB);
    throw new Error("Error");
    const valueC = await func(valueB);
    console.log(valueC);
    return valueC;
  } catch (err) {
    console.log(err);
  } finally {
    console.log("结束");
  }
}
asyncTask();
```
