# 开发文档
TODO：

系统功能
1. 用户登录注册，
  1. 通过jwt加密登录，提高安全性
  2. 实现用户鉴权，level分为admin，developer，user
admin有所有功能，包括管理用户，漏洞统计，提交漏洞，查询复现漏洞等
developer比admin缺少管理用户权限
    user相比developer缺少提交漏洞权限
初次注册默认为user用户，需要向admin申请提高用户权限
2. 漏洞统计
  1. 通过对于数据集中文件的读取进行图表展示
3. 提交漏洞
  1. 通过数据双向绑定提交表单，提交表单后异步结合python文件生成dockerfile
4. 管理用户
  1. admin用户可以管理其他用户， 将其他用户的level设置为developer或user
5. 漏洞查询
  1. 通过检索数据集中的数据，展示漏洞信息
6. 漏洞复现
  1. 通过webssh技术，通过websocket通过后端连接前端和远程linux服务器。
  2. 连接服务器的同时，执行预命令，通过docker compose并run后进入docker环境。
  3. 在docker环境中通过执行build.sh和poc.sh进行复现漏洞。

## 前端技术栈(客户端实现)
vue3，element-plus，webssh，webpack,echarts
基于vue3框架，实现守卫路由等路由操作
设置请求拦截器，将后端生成的token包含在请求头里
通过element-plus组件库快速实现组件化开发
通过echarts对于CVE漏洞进行统计展示
通过xterms实现webssh，通过websocket建立前后端的长连接
通过webpack打包，nginx反向代理，部署到服务器。

## 后端技术栈（服务端实现）
基于express框架，nodejs，mysql，websocket，jwt，
通过数据库池连接，实现数据库连接持久化。
登录成功时设置jwt（json-web-token），后端生成token之后随着登录成功信息返回码返回前端
通过后端controller层，实现对数据库的调用。
通过后端业务层，实现对数据的逻辑处理。
建立websocket长连接，实现与前端全双工通信，为webssh提供服务
通过pm2动态守护后端进程

