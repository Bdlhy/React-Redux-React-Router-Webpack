/*

webpack.config.js 基础webpack配置
date:2016.12.14

*/

var webpack = require('webpack');
// 自动引入静态资源到相应 html 页面 
var HtmlwebpackPlugin = require('html-webpack-plugin');
// CSS自动添加浏览器内核前缀
var precss = require('precss');
var autoprefixer = require('autoprefixer');

//辅助函数
var utils = require('./utils');
var fullPath = utils.fullPath;
var pickFiles = utils.pickFiles;

//项目根路径
var ROOT_PATH = fullPath('../');
//项目源码路径
var SRC_PATH = fullPath('../src');
//产出路径
//var DIST_PATH = ROOT_PATH + '/dist';
var DIST_PATH = fullPath('../dist');
// 使用缓存
//var CACHE_PATH = ROOT_PATH + '/cache';
var CACHE_PATH = fullPath('../cache');

//是否是开发环境
var __DEV__ = process.env.NODE_ENV !== 'production';

// conf
var alias = pickFiles({
	id: /(conf\/[^\/]+)/,
	pattern: SRC_PATH + '/conf/*.js'
});

//components
alias = Object.assign(alias, pickFiles({
	id: /(components\/[^\/]+)/,
	pattern: SRC_PATH + '/components/*/index.js'
}));

//reducers
alias = Object.assign(alias, pickFiles({
	id: /(reducers\/[^\/]+)/,
	pattern: SRC_PATH + '/js/reducers/*'
}));

//actions
alias = Object.assign(alias, pickFiles({
  id: /(actions\/[^\/]+).js/,
  pattern: SRC_PATH + '/js/actions/*'
}));

var config = {
	context: SRC_PATH,
	entry: {
		app: ['./pages/app.js']
	},
	output: {
		path: DIST_PATH,
		filename: 'js/bundle.js'
	},
	module: {},
	resolve: {
		alias: alias
	},
	plugins: [
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || 'development')
		})
	]
};

//编译的loaders
config.module.loaders = [];
//编译ES6
var babelQuery = {
	presets: ['es2015', 'react', 'stage-2'],
	cacheDirectory: CACHE_PATH
};
config.module.loaders.push({
	test: /\.js$/,
	exclude: /node_modules/,
	include: SRC_PATH,
	//loaders: ['babel?presets[]=react,presets[]=es2015,cacheDirectory=' + CACHE_PATH]
	loader: 'babel',
	query: babelQuery
});
// 编译 sass
config.module.loaders.push({
  test: /\.(scss|css)$/,
  loaders: ['style', 'css', 'sass', 'postcss']
});
//引入资源
config.plugins.push(
	new HtmlwebpackPlugin({
		filename: 'index.html',
		chunks: ['app', 'lib'],
		template: SRC_PATH + '/pages/app.html'
	})
);
//css前缀自动添加
config.postcss = function() {
  return [precss, autoprefixer];
};

//打包合并js css
config.entry.lib = [
  'react', 'react-dom', 'react-router',
  'redux', 'react-redux', 'redux-thunk'
];
config.output.filename = 'js/[name].js';
config.plugins.push(
    new webpack.optimize.CommonsChunkPlugin('lib', 'js/lib.js')
);


module.exports = config;	