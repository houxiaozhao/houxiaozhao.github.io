---
title: Node js错误处理最佳实践 
date: 2021-04-07 11:22:18.0
updated: 2022-03-08 11:31:44.181
url: /archives/nodejs错误处理最佳实践
categories: 
tags: 
- nodejs
---

# Node.js错误处理最佳实践

## 使用Promise捕获错误

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
    throw new Error('Error');
  })
  .then((res) => {
    console.log(res);
    return func(res);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    console.log('结束');
  });
```

## 使用async/await捕获错误

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
    throw new Error('Error');
    const valueC = await func(valueB);
    console.log(valueC);
    return valueC
} catch (err) {
    console.log(err);
  } finally {
    console.log('结束');
  }
}
asyncTask()
```