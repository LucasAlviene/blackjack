const proc = require('child_process');
const electron = require("electron");
const { app } = require("electron");
const path = require('path');
import fs from 'fs-extra';

const args = process.argv.slice(2);
const mode = args[0] == "--production" ? "production" : "development";
const isProduction = mode === "production";
//@ts-ignore
process.env.NODE_ENV = mode;

import { clientServer, Server } from '../config/webpack';
let child;
const runServer = async () => {
    console.log('Starting server...');
    clientServer.start();
    fs.copySync(path.resolve(process.cwd(), "public"), path.resolve(process.cwd(), "build"), {
        dereference: true,
        filter: file => file !== path.resolve(process.cwd(), "public", "index.html"),
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