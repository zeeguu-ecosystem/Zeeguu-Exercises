const webpack = require('webpack'),
path = require('path'),
ExtractTestPlugin = require("extract-text-webpack-plugin");

var inProduction = process.env.NODE_ENV === 'production';

module.exports = {
	entry: {
		mainEntry: './src/static/js/app/main.js',
		testEntry: './src/static/js/app/debug/main2.js',
		setCookieEntry: './src/static/js/app/debug/set_cookie_test.js',
    },
	output: {		
		path: path.join(__dirname, './src/static/js/dist'),
		filename: '[name].entry.js',
	},
	module: {
	 loaders: [
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
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    );
}