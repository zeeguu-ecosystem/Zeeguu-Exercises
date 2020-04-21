const webpack = require('webpack'),
path = require('path'),
ExtractTestPlugin = require("extract-text-webpack-plugin");

var inProduction = process.env.NODE_ENV === 'production';

module.exports = {
	entry: {
		appEntry: './javascript/app/app.js',
		setCookieEntry: './javascript/app/debug/set_cookie_test.js',
    },
	output: {		
		path: path.join(__dirname, './python/zeeguu_exercises/static/js/dist'),
		filename: '[name].entry.js',
	},
	module: {
	 rules: [
		 {
			 test: /\.js$/,
			 loader: 'babel-loader',
		 }
	 ]
	},
	stats: {
		colors: true
	},
	devtool: 'source-map'
};

if(inProduction) {
//
}
