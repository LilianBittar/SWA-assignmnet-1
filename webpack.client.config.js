const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: "./client/index.js",
    mode: "production",
    output: {
        filename: "static/client.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/",
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(?:js|mjs|cjs)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ["@babel/preset-env", { targets: "defaults" }],
                        ],
                    },
                },
            },
        ],
    },
    plugins: [
        new NodePolyfillPlugin(),
        new HtmlWebpackPlugin({
            template: "./static/index.html",
            filename: path.resolve(__dirname, "dist/static/index.html"),
        }),
        new CopyPlugin({
            patterns: [{ from: "static/styles.css", to: "static" }],
        }),
    ],
    resolve: {
        fallback: {
            fs: false,
            tls: false,
            net: false,
            path: false,
            zlib: false,
            http: false,
            https: false,
            stream: false,
            crypto: false,
        },
    },
};
