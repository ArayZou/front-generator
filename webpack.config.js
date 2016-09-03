var path = require('path');
var glob = require('glob');
var webpack = require('webpack');
var HappyPack = require('happypack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

const debug = process.env.NODE_ENV !== 'production';
const nodeModulesPath = path.join(__dirname, '/node_modules');
//定义本地调试服务器端口
const devPort = 6066;

var entries = getEntry('src/js/page/**/*.js', 'src/js/page/');
var chunks = Object.keys(entries);
//debug模式给入口添加本地调试服务器入口
if(debug){
    for (var i in entries) {
        entries[i].unshift('webpack-dev-server/client?http://localhost:' + devPort, "webpack/hot/dev-server");
    }
}

var config = {
    entry: entries,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'js/[name].js',
        publicPath: "/"
    },
    module: {
        loaders: [ //加载器
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('css')
            }, {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('css!less')
            }, {
                test: /\.js(x)*$/,
                loaders: [ 'happypack/loader' ],
                exclude: /node_modules/ //排除编译node_modules
            },{
                test: /\.html$/,
                // loader: "html?-minimize"    //避免压缩html,https://github.com/webpack/html-loader/issues/50
                loader: "raw-loader"
            }, {
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            }, {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'url-loader?limit=8192&name=img/[name]-[hash].[ext]'
            }
        ]
    },
    postcss: function () {
        //处理css兼容性代码，无须再写-webkit之类的浏览器前缀
        return [
            require('postcss-initial')({
                reset: 'all' // reset only inherited rules
            }),
            require('autoprefixer')({
                browsers: ['> 5%']
            })
        ];
    },
    plugins: [
        // 提供jQuery的全局变量，针对bootstrap之类的组件使用，如不需要可以删除
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        //热替换
        new webpack.HotModuleReplacementPlugin(),
        new CommonsChunkPlugin({
            // CommonsChunkPlugin自动检查entries里的公共组件包括js和less，生成common.js和common.css
            name: "common", // 将公共模块提取，生成名为`common`的chunk
            chunks: chunks,
            minChunks: chunks.length // 提取所有entry共同依赖的模块
        }),
        //单独使用link标签加载css并设置路径，相对于output配置中的publickPath
        new ExtractTextPlugin(
            'css/[name].css'
        ),
        new HappyPack({
            //用happypack做多线程编译
            loaders: [ 'babel?presets[]=es2015' ],
        }),
        new webpack.NoErrorsPlugin(),
        debug ? function() {} : new UglifyJsPlugin({ //压缩代码
            compress: {
                warnings: false
            },
            except: ['$super', '$', 'exports', 'require'] //排除关键字
        })
    ],
    resolve: {
        root: path.resolve('/'),
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js', '.jsx','.less','.css','.png','.jpg','.html'],
        alias:{
            // 设置公共组件的文件位置，方便webpack检索，优化编译时间
            'jquery':path.join(nodeModulesPath,'/jquery/dist/jquery.min.js')
        }
    },
    // cache:true,
    devServer: {
        inline:true,
        contentBase: "./dist",
        port:devPort,
        hot: true,
        noInfo: false
    }
};

// 生成html文件
var pages = Object.keys(getEntry('src/html/**/*.html', 'src/html/'));
pages.forEach(function(pathname) {
    var conf = {
        filename: '' + pathname + '.html', //生成的html存放路径，相对于path
        template: 'src/html/' + pathname + '.html', //html模板路径
        inject: false,    //js插入的位置，true/'head'/'body'/false
    };
    if (pathname in config.entry) {
        conf.favicon = 'src/img/favicon.ico';
        conf.inject = 'body';
        conf.chunks = ['common', pathname];
        conf.hash = true;
    }
    config.plugins.push(new HtmlWebpackPlugin(conf));
});


module.exports = config;

//动态获取入口函数
function getEntry(globPath, pathDir) {
    var files = glob.sync(globPath);
    var entries = {},
        entry, dirname, basename, pathname, extname;

    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        pathname = path.join(dirname, basename);
        pathname = pathDir ? pathname.replace(new RegExp('^' + pathDir), '') : pathname;
        entries[pathname] = ['./' + entry];
    }
    return entries;
}