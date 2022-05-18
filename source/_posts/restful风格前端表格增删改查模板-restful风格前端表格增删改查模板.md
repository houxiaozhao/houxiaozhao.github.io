---
title: restful风格前端表格增删改查模板
date: 2020-05-15 11:16:26.0
updated: 2022-03-08 11:32:25.715
url: /archives/restful风格前端表格增删改查模板
categories: 
tags: 
- 前端
- restful
---

# restful风格前端表格增删改查模板

## restful风格前端表格增删改查模板

> 基于 vue d2-admin element-ui配合上篇文章js代码生成器,只需要简单的修改即可实现快速页面开发。

### vue模板

```
<template>
  <d2-container>
    <template slot="header">
      <div class="flex justify-between align-center">
        <div>
          <el-input v-model="search" clearable size="mini" placeholder="输入名称搜索">
            <el-button slot="append" icon="el-icon-search" @click="getData"></el-button>
          </el-input>
        </div>
        <div>
          <el-button style="margin-bottom: 5px" size="mini" @click="getData">刷新</el-button>
          <el-button style="margin-bottom: 5px" size="mini" @click="addDataDialog=true">新增</el-button>
        </div>
      </div>
    </template>
    <div style="margin: 15px 0">
      <el-table :data="data.data" style="width: 100%" size="mini" stripe v-loading="loading" @sort-change="({ column, prop, order })=>{pagination.order = order === 'ascending' ? prop : (order === 'descending' ? '-' + prop : '');getData()}">
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">
            {{new Date(scope.row.createdAt)|date_format}}
          </template>
        </el-table-column>
        <el-table-column label="编辑" width="200">
          <template slot-scope="scope">
            <el-button size="mini" icon="el-icon-edit" @click="()=>{editDataForm=JSON.parse(JSON.stringify(scope.row));editDataDialog=true}">编辑</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeData(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      style="margin: 15px 0"
      background
      layout="->,sizes,prev, pager, next, jumper"
      :page-size="pagination.pageSize"
      :current-page="pagination.currentPage"
      :total="pagination.total"
      @size-change="(e)=>{pagination.pageSize=e;getData()}"
      @current-change="(e)=>{pagination.currentPage=e;getData()}"
    >
    </el-pagination>
    <el-dialog
      title="添加"
      :visible.sync="addDataDialog"
      width="50%">
      <el-form ref="addDataForm" :model="addDataForm" :rules="addRules" label-width="80px" size="mini">
        <el-form-item label="名称" prop="name">
          <el-input v-model="addDataForm.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDataDialog = false">取 消</el-button>
        <el-button type="primary" @click="addData">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="编辑"
      :visible.sync="editDataDialog"
      width="50%">
      <el-form ref="editDataForm" :model="editDataForm" :rules="editRules" label-width="80px" size="mini">
        <el-form-item label="名称" prop="name">
          <el-input v-model="editDataForm.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDataDialog = false">取 消</el-button>
        <el-button type="primary" @click="editData">确 定</el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>

<script>
import { get_sys_user_mp as getData, post_sys_user_mp as createData, put_mp_id as updateData, delete_mp_id as removeData } from '@/api/sys_user'
export default {
  name: 'demo',
  data () {
    return {
      search: '',
      loading: false,
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        order: ''
      },
      data: {
        data: []
      },
      addDataDialog: false,
      addDataForm: {
        name: ''
      },
      editDataDialog: false,
      editDataForm: {
        name: ''
      },
      addRules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }]
      },
      editRules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }]
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.loading = true
      getData({
        currentPage: this.pagination.currentPage,
        pageSize: this.pagination.pageSize,
        search: this.search,
        order: this.pagination.order
      }).then(res => {
        if (res.errno === 0) {
          this.data = res.data
          this.pagination.total = res.data.count
        } else {
          this.$message.warning('获取失败')
        }
        this.loading = false
      }).catch((err) => {
        console.log(err)
        this.loading = false
      })
    },
    removeData (data) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeData({ id: data._id }).then(res => {
          if (res.errno === 0) {
            this.getData()
          } else {
            this.$message.warning('删除失败')
          }
        }).catch(() => {
          this.$message.warning('删除失败')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    addData () {
      this.$refs.addDataForm.validate((valid) => {
        if (valid) {
          createData({
            name: this.addDataForm.name
          }).then(res => {
            if (res.errno === 0) {
              this.getData()
              this.$message.success('添加成功')
              this.addDataDialog = false
            } else {
              this.$message.warning('添加失败')
            }
          }).catch(() => {
            this.$message.warning('添加失败')
          })
        } else {
          this.$message.warning('填写完整')
          return false
        }
      })
    },
    editData () {
      this.$refs.editDataForm.validate((valid) => {
        if (valid) {
          updateData({
            id: this.editDataForm._id,
            name: this.editDataForm.name
          }).then(res => {
            if (res.errno === 0) {
              this.getData()
              this.editDataDialog = false
              this.$message.success('修改成功')
            } else {
              this.$message.warning('修改失败')
            }
          }).catch(() => {
            this.$message.warning('修改失败')
          })
        } else {
          this.$message.warning('填写完整')
          return false
        }
      })
    }
  }
}
</script>
```

### 获取分页数据接口参数格式

- Query:

    ```json
    {  "currentPage":1,  "pageSize":10,  "search":"" ,"order":""}
    ```

- 返回数据

    ```json
    {    "errno": 0,    "errmsg": "",    "data": {        "pageSize": 10,        "currentPage": 1,        "count": 4,        "totalPages": 1,        "data": []    }}
    ```