const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

// https://www.educative.io/answers/how-to-create-a-react-application-with-webpack

const root = process.cwd();

module.exports = function (mode, definePlugin) {
    const isEnvProduction = mode == "production";
    const isEnvDevelopment = mode == "development";

    return {
        entry: path.resolve(root, 'react', 'src', 'index.tsx'),
        output: {
            clean: true,
            path: path.resolve(root, 'build'),
            filename: 'client/[name].[contenthash:8].js',
            chunkFilename: 'client/[name].[contenthash:8].chunk.js',
        },

        devServer: {
            static: {
                directory: path.join(root, 'public'),
            },
            historyApiFallback: true,
            /*
            historyApiFallback: {
                // Paths with dots should still use the history fallback.
                // See https://github.com/facebook/create-react-app/issues/387.
                disableDotRule: true,
                index: "/",
            },*/
            compress: true,
            port: 9000,
        },
        stats: 'errors-warnings',
        target: ['browserslist'],
        devtool: isEnvProduction ? 'source-map' : 'cheap-module-source-map',
        module: {
            strictExportPresence: true,
            rules: [
                {
                    test: /\.tsx?$/, // .js and .jsx files
                    exclude: /node_modules/, // excluding the node_modules folder
                    loader: require.resolve('babel-loader'),
                    options: {
                        customize: require.resolve(
                            'babel-preset-react-app/webpack-overrides'
                        ),
                        presets: [
                            [
                                require.resolve('babel-preset-react-app'),
                                {
                                    runtime: 'automatic'
                                },
                            ],
                        ],
                        // @remove-on-eject-begin
                        babelrc: false,
                        configFile: false,
                        compact: true
                    }
                },
                {
                    test: /\.(scss|sass)$/,
                    exclude: /\.module\.(scss|sass)$/,
                    use: [
                        // Creates `style` nodes from JS strings
                        require.resolve("style-loader"),
                        // Translates CSS into CommonJS
                        require.resolve("css-loader"),
                        // Compiles Sass to CSS
                        require.resolve("sass-loader"),
                    ],
                }
            ]
        },
        resolve: {
            // Add `.ts` and `.tsx` as a resolvable extension.
            modules: [path.resolve(root, 'react', 'node_modules')],
            extensions: [".ts", ".tsx", ".js",".sass",".scss"]
        },
        // externals: [nodeExternals()],
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
        /*
        resolve: {
            modules: "node_modules",
            extensions: [".jsx", ".ts", ".js"]
        },*/
        plugins: [
            //new BundleAnalyzerPlugin(),
            new HtmlWebpackPlugin({
                template: path.resolve(root, 'public', 'index.html'),
                //inject: true,

                ...(isEnvProduction && {
                    minify: {
                        removeComments: true,
                        collapseWhitespace: true,
                        removeRedundantAttributes: true,
                        useShortDoctype: true,
                        removeEmptyAttributes: true,
                        removeStyleLinkTypeAttributes: true,
                        keepClosingSlash: true,
                        minifyJS: true,
                        minifyCSS: true,
                        minifyURLs: true,
                    }
                })
            }),
            //  new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime-.+[.]js/]),,

            definePlugin
        ],
    }
};