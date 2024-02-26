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
    },
    devServer: {
        historyApiFallback: true,
    },
    //plugins: [
    //    new webpack.DefinePlugin({
    //        'process.env.REACT_APP_SERVER_URL': JSON.stringify(process.env.REACT_APP_SERVER_URL),
    //    }),
    //    //new Dotenv(),
    //]
}