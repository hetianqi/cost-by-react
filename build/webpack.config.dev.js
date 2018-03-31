/**
 * webpack 公共配置
 */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
 
module.exports = {
	entry: {
		app: path.join(__dirname, '../src/app.jsx'),
		vendor: ['react', 'react-dom', 'react-router']
	},
	output: {
		path: path.join(__dirname, '../dist'),
		filename: '[name].js'
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				use: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.(css|less)$/,
				use: ['style-loader', 'post-loader', 'less-loader'],
				exclude: /node_modules/
			},
			{
				test: /\.(png|gif|jpg|jpeg|bmp)$/i,
				use : {
					loader : 'url-loader',
					options : {
						limit : '8192'
					}
				}
			},
			{
				test: /\.(woff|woff2|svg|ttf|eot)($|\?)/i,
				use: {
					loader: 'url-loader',
					options: {
						limit: '8192'
					}
				}
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({ 
			'process.env': {
				NODE_ENV: JSON.stringify('development') // 环境定义
			}
		}),
		new HtmlWebpackPlugin({
			filename: path.join(__dirname, '../dist/index.html'),
			template: path.join(__dirname, '../src/index.html')
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: Infinity
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest'
		})
	],
	devServer: {
		contentBase: path.join(__dirname, '../dist'),
		port: 8000,
		hot: true,
		compress: true
	}
};