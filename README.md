# node-mongoose-demo
一个简单的增删改查例子
###### 安装依赖
npm install
###### 运行
node bin/www
###### 演示地址
http://localhost:3000/

##说明
项目主要使用的是node,mongodb,使用mongoose操作mongodb进行增删改查.
写了三个html,分别是列表页(主页),详情页,编辑页.我将html全部放置在public目录下,直接访问就可以查看演示效果了
前端使用的是jquery+bootstrap+layer(弹出层),其实不用这几个框架也可以,因为我只是简单的写了三个html而已
打开html后,会调用相应的后台接口,获取数据,接口使用的是reseful api的风格.
node主要代码,全部在routes-->users.js中.
