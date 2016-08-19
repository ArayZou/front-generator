front-generator
=============
best FE generator in my mind with webpack,less,babel

## 使用
<pre><code class="cli">//启动本地热替换调试服务器,地址：http://localhost:6066/html/
npm start

//打测试包
npm run build

//打生产包
npm run dist
</code></pre>

## 理想中的前端脚手架应该要具备哪些必要特性？
- 首先现在普遍的框架还不是SPA，所以应该要有自动编译整个目录的入口文件
- 自带本地调试server，可以用热替换
- css方面用less，不用postcss，CSS文件里写嵌套之类的语法在编辑器里会报错，比较麻烦
- css和js都分公共部分和页面独立文件
- css不用内联，生成css文件
- js可以使用es6，可以用require、import来模块化代码
- 可以处理字体及图片
- 对文件的处理分本地调试和线上打包，区别在于是否压缩丑化代码及其他
- 编译速度最优

## 脚手架设计：

├── /dist/

│   ├── /html/

│   ├── /img

│   ├── /less

│   └── /js/

├── /src/

│   ├── /html/

│   ├── /img

│   ├── /less

│   	├── /page

│   	├── /common

│   	└── /components

│   └── /js

│   	├── /page

│   	└── /components

│── .gitignore

│── readme.md

│── package.json

└── webpack.config.js

## todo
<del>1、html修改后需要手动刷新，webpack没有太好的办法处理</del>

### 脚手架不可能完全适合自己，开发者必须要有一定的框架设计能力

## 参考
<a href="http://www.alloyteam.com/2016/01/webpack-use-optimization/" target="_blank">http://www.alloyteam.com/2016/01/webpack-use-optimization/</a>

<a href="https://segmentfault.com/a/1190000004516832" target="_blank">https://segmentfault.com/a/1190000004516832</a>

<a href="https://segmentfault.com/a/1190000003499526#articleHeader11" target="_blank">https://segmentfault.com/a/1190000003499526#articleHeader11</a>

<a href="http://eternalsky.me/ru-he-10-bei-ti-gao-ni-de-webpack-gou-jian-xiao-lu/" target="_blank">http://eternalsky.me/ru-he-10-bei-ti-gao-ni-de-webpack-gou-jian-xiao-lu/</a>

