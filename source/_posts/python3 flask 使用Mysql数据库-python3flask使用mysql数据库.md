---
title: Flask与MySQL集成：构建Python Web应用数据库
date: 2018-08-25 11:52:27.0
categories:
  - Python开发
  - Web后端
  - 数据库
  - API开发
tags:
  - Flask
  - MySQL
  - SQLAlchemy
  - Python
  - ORM
  - RESTful API
  - 数据库设计
  - Web开发
  - 后端开发
  - 数据模型
keywords:
  - Flask MySQL整合
  - Python Web开发
  - SQLAlchemy ORM
  - 数据库模型设计
  - RESTful API开发
  - Flask-SQLAlchemy
  - 数据库关系映射
  - CRUD操作
  - 一对多关系
  - 多对多关系
  - 数据库迁移
  - Web应用开发
  - Python后端
  - API接口设计
  - 数据库集成
description: |
  本文详细介绍了在Flask框架中集成MySQL数据库的完整实现过程。从项目基础搭建开始，逐步讲解了以下核心内容：

  1. 环境配置与依赖安装：
     - Flask-SQLAlchemy配置
     - PyMySQL数据库驱动
     - 数据库连接配置
  
  2. 数据模型设计与实现：
     - User模型创建与基础字段定义
     - Post模型设计与外键关联
     - Category分类模型
     - 数据库表关系设计
  
  3. 数据库操作实践：
     - 数据库表创建与初始化
     - 数据插入与查询操作
     - 一对多关系实现（User-Post）
     - 多对多关系实现（Post-Category）
  
  4. RESTful API开发：
     - 用户管理接口实现
     - CRUD操作接口设计
     - 错误处理
     - 分页查询实现
  
  5. 项目结构优化：
     - 模块化设计
     - API蓝图使用
     - 代码组织最佳实践

  This article provides a comprehensive guide to integrating MySQL with Flask framework. Starting from basic project setup, it covers the following core aspects:

  1. Environment Setup and Dependencies:
     - Flask-SQLAlchemy configuration
     - PyMySQL database driver
     - Database connection setup
  
  2. Data Model Design and Implementation:
     - User model creation and field definition
     - Post model design with foreign key relationships
     - Category model implementation
     - Database relationship design
  
  3. Database Operations:
     - Database table creation and initialization
     - Data insertion and query operations
     - One-to-many relationship implementation (User-Post)
     - Many-to-many relationship implementation (Post-Category)
  
  4. RESTful API Development:
     - User management endpoints
     - CRUD operations design
     - Error handling
     - Pagination implementation
  
  5. Project Structure Optimization:
     - Modular design
     - API blueprint usage
     - Code organization best practices
---

# python3 flask 使用 Mysql 数据库

1. 创建 flask 基本项目结构

   ```python
   from flask import Flask
   app = Flask(__name__)
   ```

   <!--more-->

2. 安装`flask-sqlalchemy`

   ```commandline
   pip install flask-sqlalchemy
   ```

3. 导入配置

   ```python
   from flask_sqlalchemy import SQLAlchemy

   app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root@localhost/hhh'
   app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True
   app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
   db = SQLAlchemy(app)
   ```

   python3 不再支持 MySQKdb,连接 mysql 数据库需要使用 pymysql

   安装 pymysql

   `pip install pymysql`

4. 定义表模型

   ```python
   class User(db.Model):
       id = db.Column(db.Integer, primary_key=True)
       username = db.Column(db.String(64), unique=True, nullable=True)

       def __init__(self, username):
           self.username = username

       def __repr__(self):
           return '<User {}>'.format(self.username)
   ```

5. 创建表
   在 python shell 中

   ```commandline
    >>> from app import db
    >>> db.create_all()
   ```

6. 添加数据
   在 python shell 中

   ```commandline
    >>> from app import db
    >>> from app import User
    >>> user=User('hou')
    >>> db.session.add(user)
    >>> db.session.commit()
   ```

7. 查询数据库

   ```bash
    >>> User.query.all()
    [<User hou>]
    >>> User.query.filter_by(username='hou').first()
    <User hou>
   ```

8. 一对多或一对一表关联

   - 定义 Post 表模型

     ```python
     from datetime import datetime
     class Post(db.Model):
         id = db.Column(db.Integer, primary_key=True)
         body = db.Column(db.Text)
         timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
         # 添加外键声明
         user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
         def __repr__(self):
             return '<Post {}>'.format(self.body)
     ```

   - User 添加关系

     ```python
     class User(db.Model):
         id = db.Column(db.Integer, primary_key=True)
         username = db.Column(db.String(64), unique=True, nullable=True)
         # 新加的
         # 如果您想要一对一关系，您可以把 uselist=False 传给 relationship() 。
         posts = db.relationship('Post', backref='user', lazy='dynamic')
         def __init__(self, username):
             self.username = username
         def __repr__(self):
             return '<User {}>'.format(self.username)
     ```

   - 执行创建表

   - 添加数据

     ```bash
     >>> from app import *
     >>> user=User.query.filter_by(username='hou').first()
     >>> post1=Post(body='post1post1post1post1post1post1',user=user)
     >>> db.session.add(post1)
     >>> db.session.commit()
     ```

   - 查询数据

     ```bash
     >>> user=User.query.filter_by(username='hou').first()
     >>> user.posts.all()
     [<Post 哈哈哈哈哈>, <Post post1post1post1post1post1post1>]
     >>> user.posts.filter_by(id=4).first()
     <Post post1post1post1post1post1post1>
     ```

9. 多对多表关联

   - 定义 Category 表模型

     ```python
     class Category(db.Model):
         id = db.Column(db.Integer, primary_key=True)
         name = db.Column(db.String(50))
         def __init__(self, name):
             self.name = name
         def __repr__(self):
             return '<Category %r>' % self.name
     ```

   - 定义关联表

     ```python
     categorys = db.Table('categorys',
                          db.Column('id', db.Integer, primary_key=True),
                          db.Column('post_id', db.Integer, db.ForeignKey('post.id')),
                          db.Column('category_id', db.Integer, db.ForeignKey('category.id'))
                          )
     ```

   - Post 中添加关系

     ```python
      categorys = db.relationship('Category', secondary=categorys, backref=db.backref('posts', lazy='dynamic'))
     ```

   - 执行创建表

   - 准备类别数据

     ```bash
     >>> from app import *
     >>> category1=Category(name="前端")
     >>> category2=Category(name="nodejs")
     >>> category3=Category(name="python")
     >>> db.session.add(category1)
     >>> db.session.add(category2)
     >>> db.session.add(category3)
     >>> db.session.commit()
     ```

   - 添加 post

     ```bash
     >>> from app import *
     >>> category1=Category.query.get(1)
     >>> category2=Category.query.get(2)
     >>> category3=Category.query.get(3)
     >>> user=User.query.get(1)
     >>> post1=Post(body='关联的post',user=user,categorys=[category1])
     >>> post2=Post(body='关联的post',user=user,categorys=[category1,category2,category3])
     >>> db.session.add(post1)
     >>> db.session.add(post2)
     >>> db.session.commit()
     ```

10. 修改代码结构使其更好的提供接口

![](http://obr4xf51d.bkt.clouddn.com/18-8-25/83459102.jpg)

11. 提供简单 rest 接口`user`

    ```python
    from flask import jsonify, request
    from app.api import bp

    from app.models import User
    from app import db
    from app.error import bad_request
    ```

    @bp.route('/users', methods=['GET'])
    def get_users():
    limit = min(request.args.get('limit', 10, int), 100)
    offset = (request.args.get('page', 1, int) - 1) \* request.args.get('limit', 10, int)
    return jsonify([user.to_dict() for user in User.query.limit(limit).offset(offset).all()])

    @bp.route('/users/<int:id>', methods=['GET'])
    def get_user(id):
    return jsonify(User.query.get_or_404(id).to_dict())

    @bp.route('/users', methods=['POST'])
    def add_user():
    data = request.get_json() or {}
    if 'username' not in data:
    return bad_request('错误的参数')
    user = User(username=data['username'])
    db.session.add(user)
    db.session.commit()
    return jsonify(user.to_dict())

    @bp.route('/users/<int:id>', methods=['PUT'])
    def update_user(id):
    user = User.query.get_or_404(id)
    data = request.get_json() or {}
    if 'username' not in data:
    return bad_request('错误的参数')
    setattr(user, 'username', data['username'])
    db.session.commit()
    return jsonify(user.to_dict())

    @bp.route('/users/<int:id>', methods=['DELETE'])
    def delete_user(id):
    user = User.query.get_or_404(id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'ok'})

    ```

    ```

12. 源代码地址 https://github.com/houxiaozhao/python3-flask-mysql
