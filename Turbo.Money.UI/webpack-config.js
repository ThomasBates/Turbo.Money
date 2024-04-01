const path = require('path');
module.exports = {
    devtool: 'source-map',
    entry: "./main.tsx",
    mode: "development",
    output: {
        //filename: "./app-bundle.js"
        filename: "./main.js",
        //path: ".",
        publicPath: "/",
        //path: "Z:/Sites/money/money/config/html/dist/"
        //filename: "Z:/Sites/money/money/config/html/dist/app-bundle.js"

    },
    resolve: {
        extensions: ['.Webpack.js', '.web.js', '.ts', '.js', '.jsx', '.tsx'],
        alias: {
            'app': path.resolve(process.cwd(), './src/app'),
            'components': path.resolve(process.cwd(), './src/components'),
            'data': path.resolve(process.cwd(), './src/data'),
            'pages': path.resolve(process.cwd(), './src/pages'),
            'services': path.resolve(process.cwd(), './src/services'),
            'setup': path.resolve(process.cwd(), './src/setup'),
            }
    },
    module: {
        rules: [
            {
                test: /\.tsx$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'ts-loader'
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.svg$/,
                use: {
                    loader: 'svg-inline-loader'
                }
            },
        ]
    },
    devServer: {
        historyApiFallback: true,
    },
}