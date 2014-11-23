var UglifyJsPlugin = require("webpack/lib/optimize/UglifyJsPlugin");

module.exports = {
    target: "web",
    debug: true,
    devtool: "source-map",
    entry: {
        main: "./source/main.jsx"
    },
    output: {
        path: "./build",
        filename: "[name].bundle.js"
    },
    resolve: {
        modulesDirectories: ['bower_components', 'node_modules'],
    },
    module: {
        loaders: [
            { test: /\.css/, loader: "style-loader!css-loader" },
            {
              test: /\.jsx$/,
              loader: "babel",
              exclude: /(node_modules|bower_components)/,
              query: {
                presets: ['react']
              }
            },
            { test: /\.png/, loader: "url-loader?limit=100000&mimetype=image/png" },
            { test: /\.gif/, loader: "url-loader?limit=100000&mimetype=image/gif" },
            { test: /\.jpg/, loader: "file-loader" },

            // Needed for the css-loader when [bootstrap-webpack](https://github.com/bline/bootstrap-webpack)
            // loads bootstrap's css.
            { test: /\.woff/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
            { test: /\.ttf/,  loader: "url-loader?limit=10000&minetype=application/octet-stream" },
            { test: /\.eot/,  loader: "file-loader" },
            { test: /\.svg/,  loader: "url-loader?limit=10000&minetype=image/svg+xml" }
        ]
    },
    plugins: [
        new UglifyJsPlugin()
    ]
};
