const proc = require('child_process');
const electron = require("electron");
const { app } = require("electron");
const path = require('path');

const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config.js');
const args = process.argv.slice(2);
const mode = args[0] == "--production" ? "production" : "development";
const isProduction = mode === "production";
process.env.NODE_ENV = mode;
console.log(args);

const configClient = {
  mode,
  watch: !isProduction,
  ...webpackConfig.client(mode)
}
const configServer = {
  mode,
  watch: !isProduction,
  ...webpackConfig.server(mode)
}
const compiler = Webpack(configClient);
const devServerOptions = { ...configClient.devServer, open: false };
const client = new WebpackDevServer(devServerOptions, compiler);
let child;
const runServer = async () => {
  console.log('Starting server...');
  await client.start();
  /*
  Webpack(configServer, (err, stats) => {
    if (err || stats?.hasErrors()) {
      console.log(err)
      return;
      // [Handle errors here](#error-handling)
    }
    console.log(stats.toString())
    if (child) {
      child.kill();
    };
    child = proc.spawn(electron, ["."], { stdio: 'inherit', windowsHide: false });
    child.on('close', function (code, signal) {
      if (code !== null) process.exit(code);

    });

  });*/
};

const handleTerminationSignal = function (signal) {
  process.on(signal, function signalHandler() {
    if (!child.killed) {
      child.kill(signal);
    }
  });
};

handleTerminationSignal('SIGINT');
handleTerminationSignal('SIGTERM');

if(isProduction){
  const client = Webpack(configClient);
  client.run();
  Webpack(configServer).run();
}else{
  runServer();
}