import proc from 'child_process';
import { app }from "electron";
import path from 'path';
import fs from 'fs-extra';

const electron = require("electron");


const args = process.argv.slice(2);
const mode = args[0] == "--production" ? "production" : "development";
const isProduction = mode === "production";
//@ts-ignore
process.env.NODE_ENV = mode;

import { clientServer, Server } from '../config/webpack';
let child;
const root = process.cwd();
const runServer = async () => {
    console.log('Starting server...');
    clientServer.start();
    fs.copySync(path.resolve(root, "public"), path.resolve(root, "build"), {
        dereference: true,
        filter: file => file !== path.resolve(root, "public", "index.html"),
    });
    Server.watch({
        aggregateTimeout: 300,
        poll: undefined
    }, (err, stats) => {
        console.log("Running Server....");
        if (err || stats?.hasErrors()) {
            console.log("Error", err, stats?.toString())
            process.exit(0);
            return;
        }
        console.log(stats?.toString())
        if (child) {
            child.kill();
        };
        //@ts-ignore
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