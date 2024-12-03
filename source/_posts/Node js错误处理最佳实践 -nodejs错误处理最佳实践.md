---
title: Node.js 错误处理实用指南：Promise与Async/Await最佳实践
date: 2021-04-07 11:22:18.0
categories:
  - 后端开发
  - Node.js
  - 错误处理
tags:
  - Node.js
  - JavaScript
  - Promise
  - Async/Await
  - 错误处理
  - 异步编程
  - 异常处理
  - 代码质量
  - 服务端开发
  - 性能优化
keywords:
  - nodejs错误处理
  - promise错误处理
  - async await异常
  - javascript异步编程
  - 服务端异常处理
  - try catch使用
  - 错误处理模式
  - 异步错误处理
  - nodejs开发
  - promise链式调用
  - 异步函数处理
  - 错误捕获技巧
  - 代码健壮性
  - 服务稳定性
  - 性能优化
description: |
  本文深入探讨Node.js环境下的错误处理策略和最佳实践，重点关注Promise和Async/Await两种主流异步编程模式下的错误处理方案。文章详细阐述了以下核心内容：

  Promise错误处理技术：
  1. Promise链式调用中的错误传播机制
  2. .then()方法中的错误处理策略
  3. .catch()方法的正确使用方式
  4. .finally()在错误处理中的作用
  5. Promise错误处理的常见陷阱和解决方案
  6. 在复杂业务逻辑中的Promise错误处理模式
  7. Promise.all()和Promise.race()中的错误处理

  Async/Await错误处理方案：
  1. try/catch块的使用技巧
  2. 异步函数中的错误传播原理
  3. 嵌套异步操作的错误处理策略
  4. finally块在资源清理中的应用
  5. 异步函数组合时的错误处理模式
  6. 避免常见的Async/Await错误处理陷阱
  7. 在实际项目中的最佳实践示例

  This article provides a comprehensive exploration of error handling strategies and best practices in Node.js, focusing on error management in Promise-based and Async/Await asynchronous programming patterns. The article covers the following key aspects:

  Promise Error Handling Techniques:
  1. Error propagation mechanisms in Promise chains
  2. Error handling strategies in .then() methods
  3. Proper implementation of .catch() methods
  4. The role of .finally() in error handling
  5. Common pitfalls and solutions in Promise error handling
  6. Error handling patterns in complex business logic
  7. Error management in Promise.all() and Promise.race()

  Async/Await Error Handling Solutions:
  1. Advanced try/catch block usage
  2. Error propagation principles in async functions
  3. Error handling strategies for nested async operations
  4. Resource cleanup with finally blocks
  5. Error handling patterns in async function composition
  6. Avoiding common Async/Await error handling pitfalls
  7. Real-world implementation examples and best practices

  The article includes practical code examples demonstrating each concept, common error scenarios and their solutions, and optimization techniques for robust error handling in production environments.
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
  .then(res => {
    console.log(res);
    return func(res);
  })
  .then(res => {
    console.log(res);
    throw new Error("Error");
  })
  .then(res => {
    console.log(res);
    return func(res);
  })
  .catch(err => {
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
