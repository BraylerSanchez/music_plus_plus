var webpack = require("webpack")

module.exports = [ {
    entry: {
        main: [
            './client/boot.ts'
        ],
        vendor: [
            "core-js",
            "reflect-metadata", // order is important here
            "rxjs",
            "zone.js",
            '@angular/core',
            '@angular/common',
            "@angular/compiler",
            "@angular/core",
            "@angular/http",
            "@angular/platform-browser",
            "@angular/platform-browser-dynamic",
            "@angular/router"
        ]
    },
    output: {
        path: __dirname,
        filename: "./public/dist/[name].bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: ''
            },
            // css
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity
        })
    ]
}/*,

module.exports = {
    entry: "./server/app.js",
    output: {
        path: __dirname,
        filename: "./public/dist/server.js"
    },
    target: "node",
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: ''
            },
            { test: /\.json$/, loader: "json" }
        ]
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.js']
    },
    node: {
        console: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
}*/];