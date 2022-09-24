const path = require('path');
const nodeExternals = require('webpack-node-externals');
const TerserPlugin = require("terser-webpack-plugin");



module.exports = function (mode,definePlugin) {
    return {
        stats: 'errors-warnings',

        entry: path.resolve(__dirname, 'electron/index.ts'),
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: 'server/[name].js',
            chunkFilename: 'server/[name].[contenthash:8].chunk.js',
        },
        target: "node",
        devtool: mode == "production" ? 'source-map' : 'cheap-module-source-map',
        module: {
            rules: [
                {
                    test: /\.(ts)$/,
                    exclude: /node_modules/,
                    loader: "ts-loader",
                    options: {
                        transpileOnly: true
                    }
                }
            ]
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
            },
            minimize: mode == "production",
            minimizer: [
                // This is only used in production mode
                new TerserPlugin({
                    terserOptions: {
                        parse: {
                            // We want terser to parse ecma 8 code. However, we don't want it
                            // to apply any minification steps that turns valid ecma 5 code
                            // into invalid ecma 5 code. This is why the 'compress' and 'output'
                            // sections only apply transformations that are ecma 5 safe
                            // https://github.com/facebook/create-react-app/pull/4234
                            ecma: 8,
                        },
                        compress: {
                            ecma: 5,
                            warnings: false,
                            // Disabled because of an issue with Uglify breaking seemingly valid code:
                            // https://github.com/facebook/create-react-app/issues/2376
                            // Pending further investigation:
                            // https://github.com/mishoo/UglifyJS2/issues/2011
                            comparisons: false,
                            // Disabled because of an issue with Terser breaking valid code:
                            // https://github.com/facebook/create-react-app/issues/5250
                            // Pending further investigation:
                            // https://github.com/terser-js/terser/issues/120
                            inline: 2,
                        },
                        mangle: {
                            safari10: true,
                        },
                        // Added for profiling in devtools
                        keep_classnames: false,
                        keep_fnames: false,
                        output: {
                            ecma: 5,
                            comments: false,
                            // Turned on because emoji and regex is not minified properly using default
                            // https://github.com/facebook/create-react-app/issues/2488
                            ascii_only: true,
                        },
                    },
                }),
            ],
        },
        resolve: {
            // Add `.ts` and `.tsx` as a resolvable extension.
            modules: ["node_modules"],
            extensions: [".ts"]
        },
        externals: [nodeExternals({allowlist:'clipboardy'})],
        plugins:[
            definePlugin
        ]
        /*
        externals: {
            electron: "commonjs2 electron"
        }*/
    }
};