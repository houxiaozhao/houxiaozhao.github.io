---
title: 创建循环日期的node库date-recur及使用方法
copyright_author: houxiaozhao
copyright_author_href: https://github.com/houxiaozhao
copyright_url: https://cdtools.click
copyright_info: 此文章版权归houxiaozhao所有，如有转载，请注明来自原作者
date: 2022-02-14 17:07:47.801
updated: 2022-03-04 19:14:54.389
url: /archives/创建循环日期的node库date-recur及使用方法
categories:
tags:
  - vue
  - nodejs
---

> 因为在业务中周期性的任务，用到的该 node 库，记录一下备忘。
> 业务需求是创建周期性的任务。比如每天，每隔几天，每周的周几，每月的几号，每年几月几号，以这些描述生成一系列的日期。

# 效果

## 按天循环

![image-902ef3af9f8b417ba567573f5e587a32](https://cdn.jsdelivr.net/gh/houxiaozhao/imageLibrary@master/uPic/2022/05/20/xbk20M.png)

## 按周循环

![image.png](https://cdn.jsdelivr.net/gh/houxiaozhao/imageLibrary@master/uPic/2022/05/20/1LA6HN.png)

## 按月循环

![image.png](https://cdn.jsdelivr.net/gh/houxiaozhao/imageLibrary@master/uPic/2022/05/20/MMHBMR.png)

## 按年循环

![image.png](https://cdn.jsdelivr.net/gh/houxiaozhao/imageLibrary@master/uPic/2022/05/20/iUorMi.png)

# 介绍 date-recur

创建一个循环日期并查询它以查看它是否落在特定日期。
使用方法详见[npm date-recur](https://www.npmjs.com/package/date-recur)

## 这里举几个例子

```javascript
const r = recur(start, end); //限定开始和结束日期
// r.setDailyInterval(1); // 每天
// r.setDailyInterval(2); //每两天
// r.setDaysOfWeek(1)//每周一
// r.setDaysOfWeek([1, 2]); //每周一周二
// r.setWeeklyInterval(2).setDaysOfWeek(1); //每隔一周周一
// r.setWeeklyInterval(3).setDaysOfWeek([1, 3]); //每三周周一周三
// r.setDaysOfMonth(1); //每月一号
// r.setMonthlyInterval(2).setDaysOfMonth([1, 3, 4]); //每两个月的一号
// r.setYearlyInterval(2).setDaysOfMonth([3, 19]).setMonthsOfYear([11]); //每两年的11月的3号和19号
```

上面的只是创建了一个 recur 对象，还需要使用 matches 方法判断一个日期是否落入该 recur 对象设定的日期内。
接下来从 start 到 end 的时间遍历一遍，挨个判断是否落入该 recur 对象中。

### args 含义 [1, [], []]

- 第一个元素代表每隔多久，一天，两天，一个月，一周
- 第二个元素
  - 每天:为空
  - 每周：周几
  - 每月：几号
  - 每年：几月
- 第三个元素只有是每年时有代表：几号 ，和第二个元素结合就是几月几号

```javascript
export function generateRecurDate(start: string, end: string, measure: "day" | "week" | "month" | "year", ...args: any[]) {
  const r = recur(start, end);
  switch (measure) {
    case "day":
      r.setDailyInterval(args[0]);
      break;
    case "week":
      r.setWeeklyInterval(args[0]).setDaysOfWeek(args[1]);
      break;
    case "month":
      r.setMonthlyInterval(args[0]).setDaysOfMonth(args[1]);
      break;
    case "year":
      r.setYearlyInterval(args[0]).setDaysOfMonth(args[1]).setMonthsOfYear(args[2]);
      break;
    default:
      break;
  }
  const dates: string[] = [];
  match(moment(new Date(start)));
  function match(time) {
    if (r.matches(time.toDate())) {
      dates.push(time.format("YYYY-MM-DD"));
    }
    if (time.isBetween(moment(new Date(start)), moment(new Date(end)), "day", "[]")) {
      match(time.add(1, "day"));
    }
  }
  return dates;
}
```

前端实现

```vue
<el-form ref="form" :model="cycleTimeForm" label-width="120px">
          <el-form-item label="执行时间：">
            <el-time-select
                v-model="cycleTimeForm.time"
                :picker-options="{
                  start: '07:00',
                  step: '00:15',
                  end: '18:00'
                }"
                placeholder="选择时间">
            </el-time-select>
          </el-form-item>
          <el-form-item label="起止日期：">
            <el-date-picker
                v-model="cycleTimeForm.date"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="重复设置：">
            <div class="flex justify-start items-center">
              <div v-if="cycleTimeForm.measure === 'day'">
                每
                <el-input-number
                    v-model="cycleTimeForm.args[0]"
                    controls-position="right"
                    style="width: 80px"
                    :min="1"
                    :max="365"
                ></el-input-number>
              </div>
              <div v-if="cycleTimeForm.measure === 'week'">
                每
                <el-input-number
                    v-model="cycleTimeForm.args[0]"
                    controls-position="right"
                    style="width: 80px"
                    :min="1"
                    :max="52"
                ></el-input-number>
              </div>
              <div v-if="cycleTimeForm.measure === 'month'">
                每
                <el-input-number
                    v-model="cycleTimeForm.args[0]"
                    controls-position="right"
                    style="width: 80px"
                    :min="1"
                    :max="12"
                ></el-input-number>
              </div>
              <div v-if="cycleTimeForm.measure === 'year'">
                每
                <el-input-number
                    v-model="cycleTimeForm.args[0]"
                    controls-position="right"
                    style="width: 80px"
                    :min="1"
                    :max="365"
                ></el-input-number>
              </div>
              <el-select
                  v-model="cycleTimeForm.measure"
                  @change="cycleTimeForm.args = [1, [], []]"
                  style="margin-right: 10px"
                  placeholder="请选择"
              >
                <el-option label="天" value="day"></el-option>
                <el-option label="周" value="week"></el-option>
                <el-option label="月" value="month"></el-option>
                <el-option label="年" value="year"></el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item>
            <el-select v-if="cycleTimeForm.measure === 'week'" v-model="cycleTimeForm.args[1]" multiple
                       placeholder="请选择">
              <el-option label="周一" :value="1"></el-option>
              <el-option label="周二" :value="2"></el-option>
              <el-option label="周三" :value="3"></el-option>
              <el-option label="周四" :value="4"></el-option>
              <el-option label="周五" :value="5"></el-option>
              <el-option label="周六" :value="6"></el-option>
              <el-option label="周七" :value="0"></el-option>
            </el-select>
            <el-select v-model="cycleTimeForm.args[1]"
                       v-if="cycleTimeForm.measure === 'month'" multiple
                       placeholder="请选择">
              <el-option v-for="i in 31" :key="i" :label="`${i}号`" :value="i"></el-option>
            </el-select>


            <el-select v-model="cycleTimeForm.args[1]"
                       v-if="cycleTimeForm.measure === 'year'" multiple
                       placeholder="请选择">
              <el-option v-for="i in 12" :key="i" :label="`${i}月`" :value="i"></el-option>
            </el-select>
            <el-select v-model="cycleTimeForm.args[2]"
                       v-if="cycleTimeForm.measure === 'year'" multiple
                       placeholder="请选择">
              <el-option v-for="i in 31" :key="i" :label="`${i}号`" :value="i"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
```

```
cycleTimeForm: {
        time: '',
        date: '',
        measure: 'day',
        args: [1, [], []],
      }
```
