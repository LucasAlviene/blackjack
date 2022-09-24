import Webpack, { cli, Configuration } from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from '../webpack.config.js';

const mode = process.env.NODE_ENV;

const raw = {
  isDev: mode == "development",
  NODE_ENV: mode
}

const definePlugin = new Webpack.DefinePlugin({
  'process.env': Object.keys(raw).reduce((env, key) => {
    env[key] = JSON.stringify(raw[key]);
    return env;
  }, {}),
});

export const configClient = {
  mode,
  ...webpackConfig.client(mode,definePlugin),
} as Configuration;

export const configServer = {
  mode,
  ...webpackConfig.server(mode,definePlugin),
} as Configuration;

export const Client = Webpack(configClient);
export const Server = Webpack(configServer);
export const devServerOptions = { ...configClient.devServer, open: false };
export const clientServer = new WebpackDevServer(devServerOptions, Client);