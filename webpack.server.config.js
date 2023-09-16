const path = require("path");

module.exports = {
    target: "node",
    entry: "./serverIndex.js",
    output: {
        filename: "server.js",
        path: path.resolve(__dirname, "dist"),
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
    node: {
        __dirname: false,
    },
};
