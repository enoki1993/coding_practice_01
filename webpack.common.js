const path = require('path');
const ASSET_PATH = process.env.ASSET_PATH || './';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = ({outputFile, assetFile}) => ({
	entry: './src/ts/index.tsx',
	output: {
		filename: `${outputFile}.js`,
		chunkFilename: `${outputFile}.js`,
		assetModuleFilename: `img/${assetFile}[ext]`,
		path: path.resolve(__dirname, 'public'),
		publicPath: ASSET_PATH
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							url: true,
							importLoaders: 2
						}
					},
					"postcss-loader",
					'sass-loader'
				]
			},
			{
				test: /\.(jpe?g|gif|png|svg|woff2?|ttf|eot)$/,
				type: 'asset',
				parser: {
					dataUrlCondition: {
						maxSize: 100 * 1024,
					}
				}
			},
			{
				test: /\.html$/,
				use: ['html-loader']
			}
		]
	},
	plugins: [
		new webpack.ProgressPlugin(),
		new MiniCssExtractPlugin({
			filename: `${outputFile}.css`
		}),
		new HtmlWebpackPlugin({
				template: './src/index.html',
				inject: 'body'
			})
	],
	optimization: {
		splitChunks: {
			chunks: 'all',
			minSize: 0,
			cacheGroups: {
				defaultVendors: {
					name: 'vendors',
					test: /node_modules/,
					priority: -10
				},
				utils: {
					name: 'utils',
					test: /src[\\/]js[\\/]utils/,
					chunks: 'async'
				},
				default: false
			}
		}
	},
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename]
    }
  },
	resolve: {
		alias: {
			'@scss': path.resolve(__dirname, 'src/scss'),
			'@imgs': path.resolve(__dirname, 'src/img')
		},
		extensions: ['.js', 'ts', 'tsx', '.scss'],
		modules: [path.resolve(__dirname, 'src'), 'node_modules']
	},
	target: ["web", "es5"]
});
