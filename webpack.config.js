const path = require("path");
const NodemonPlugin = require("nodemon-webpack-plugin");

const SRC_DIR = "./src/";

const include = [
    path.resolve(__dirname, SRC_DIR),
];

module.exports = {
    entry: "./src/index.ts",
    target: "node", // support native modules
    devtool: "inline-source-map",
    output: {
        filename: "server.js",
        path: path.resolve(__dirname, "dist"),
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        extensionAlias: {
            ".js": [".js", ".ts"],
            ".cjs": [".cjs", ".cts"],
            ".mjs": [".mjs", ".mts"]
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                include,
            },
        ],
    },
    plugins: [new NodemonPlugin()],
    experiments: {
        topLevelAwait: true
    }
};
