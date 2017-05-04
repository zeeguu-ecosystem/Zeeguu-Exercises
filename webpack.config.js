const webpack = require('webpack'),
path = require('path'),
ExtractTestPlugin = require("extract-text-webpack-plugin");

var inProduction = process.env.NODE_ENV === 'production';

module.exports = {
	entry: {
		mainEntry: './static/js/app/main.js',
		testEntry: './static/js/app/test/main2.js',
		setCookieEntry: './static/js/app/test/set_cookie_test.js',
    },
	output: {		
		path: path.join(__dirname, './static/js/dist'),
		filename: '[name].entry.js',
	},
	module: {
	 loaders: [
		 {
			 test: /\.js$/,
			 loader: 'babel-loader',
			 query: {
				 presets: ['es2015']
			 }
		 }
	 ]
	},
	stats: {
		colors: true
	},
	devtool: 'source-map'
};

if(inProduction) {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    );
}