# node-mongoose-demo
一个简单的增删改查例子
###### 安装依赖
npm install
###### 运行
node bin/www
###### 演示地址
http://localhost:3000/

## 项目说明
项目主要使用的是node,mongodb,使用mongoose操作mongodb进行增删改查.
写了三个html,分别是列表页(主页),详情页,编辑页.我将html全部放置在public目录下,直接访问就可以查看演示效果了
前端使用的是jquery+bootstrap+layer(弹出层),其实不用这几个框架也可以,因为我只是简单的写了三个html而已
打开html后,会调用相应的后台接口,获取数据,接口使用的是reseful api的风格.
node主要代码,全部在routes-->users.js中.

## 说明
第一天入职,因为之前是写JAVA,虽然自学过node,也写过一点node的项目,但是没有用过mongodb,所以领导就让我写个用node对mongodb进行增删改查的小项目,于是,就产生了这个东西.一开始,只是先写后台接口的,然后用postman调试接口,可以正常返回数据就可以了.后面看到接口写完了,离下班还有段时间,就顺便写了个页面.然后,又把原来的异步回调嵌套改为了promise的形式

## 目前已知尚未解决的缺陷
1. 我本地,启动的时候,会提示
(node:16504) DeprecationWarning: `open()` is deprecated in mongoose >= 4.11.0, use `openUri()` instead, or set the `useMongoClient` option if using `connect()` or `createConnection()`
2. 前端没有做校验,校验全部由后端来做了,其实这也没什么问题(年龄那里,我是故意设置0到120,后端判断,只能选择18到99😉),我说的没做校验是指,比如,后端返回用户名已存在,前端应该将用户名的输入框样式改变,给予用户明显的提示
