const proc = require('child_process');
const electron = require("electron");
const { app } = require("electron");
const path = require('path');
import fs from 'fs';

const args = process.argv.slice(2);
const mode = args[0] == "--production" ? "production" : "development";
const isProduction = mode === "production";
//@ts-ignore
process.env.NODE_ENV = mode;

import { clientServer, Server } from './webpack';
let child;
const runServer = async () => {
    console.log('Starting server...');
    clientServer.start();
    fs.copyFile(path.resolve(__dirname,"..","public/preload.js"), path.resolve(__dirname,"..","build/server/preload.js"),() => {});
    // Gambiarra temporaria
    fs.copyFile(path.resolve(__dirname,"..","public/images/image1.png"), path.resolve(__dirname,"..","build/images/image1.png"),() => {});
    fs.copyFile(path.resolve(__dirname,"..","public/images/image2.png"), path.resolve(__dirname,"..","build/images/image2.png"),() => {});
    fs.copyFile(path.resolve(__dirname,"..","public/images/image3.png"), path.resolve(__dirname,"..","build/images/image3.png"),() => {});
    fs.copyFile(path.resolve(__dirname,"..","public/images/image4.png"), path.resolve(__dirname,"..","build/images/image4.png"),() => {});
    Server.watch({
        aggregateTimeout: 300,
        poll: undefined
    }, (err, stats) => {
        console.log("Running Server....");
        if (err || stats?.hasErrors()) {
            console.log(err)
            return;
        }
        console.log(stats?.toString())
        if (child) {
            child.kill();
        };
        child = proc.spawn(electron, ["."], { stdio: 'inherit', windowsHide: false });
        child.on('close', function (code, signal) {
            if (code !== null) process.exit(code);

        });
    });
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
runServer();