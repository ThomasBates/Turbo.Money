module.exports = {
    devtool: 'source-map',
    entry: "./main.tsx",
    mode: "development",
    output: {
        //filename: "./app-bundle.js"
        path: "Z:/Sites/money/money/config/html/dist/"
        //filename: "Z:/Sites/money/money/config/html/dist/app-bundle.js"
    },
    resolve: {
        extensions: ['.Webpack.js', '.web.js', '.ts', '.js', '.jsx', '.tsx']
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
    }
}