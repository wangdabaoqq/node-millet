项目介绍

很早的之前的一个项目,在学校的时候写的最初只是静态的几个页面,通过dom操作,等的一些东西。后来偶然之间学到了node,就寻思把放置的仿照的小米重新再做一做。


说下我用到的前后技术,前台是jquery+bootstrap+index.js+swig.台是Node.js + express + MongoDB。交互是ajax

本地部署，步骤如下:

1.首先是下载mongodb的数据库,这些我都不说了,就是安装什么之类的。

2.安装依赖  npm install

3.启动项目 开启本地mongodb 找到mongodb bin目录cd 输入命令mongod --dbpath=你下载的这个项目的db目录 --port=27016端口(这里的端口我用的是27016端口,你可以配置别的,这个看你的我也不多说)

4.运行项目  node app.js

5.在浏览器上输出localhost:8080端口,如果你的本地8080端口被占用可以在app.js里面进行修改。


个人能力有限,水平有限。见笑了。那我就告辞了。
对了这个项目我还在不断的去更新中,后续的我也会即时跟进的。拜了个拜您！
最后放下图片前台与后台的
![](https://github.com/wangdabaoqq/node-millet/blob/master/screenshots/Q.png)

![](https://github.com/wangdabaoqq/node-millet/blob/master/screenshots/a.png)
