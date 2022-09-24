const proc = require('child_process');
const electron = require("electron");
const { app } = require("electron");
const path = require('path');
import fs from 'fs';
import { server } from '../webpack.config';

const args = process.argv.slice(2);
const mode = args[0] == "--development" ? "development" : "production";
const isProduction = mode === "production";
//@ts-ignore
process.env.NODE_ENV = mode;

import { Client, Server } from './webpack';
let child;
const runServer = async () => {
    console.log('Starting build...');
    Client.run(() => {
        console.log("Client")
        fs.copyFile(path.resolve(process.cwd(),"public","favicon.ico"), path.resolve(process.cwd(),"build","favicon.ico"),() => {});
        fs.copyFile(path.resolve(process.cwd(),"public","agitaoferta.ico"), path.resolve(process.cwd(),"build","agitaoferta.ico"),() => {});
        Server.run(() => {
            console.log("Server")
            fs.copyFile(path.resolve(process.cwd(),"public","preload.js"), path.resolve(process.cwd(),"build","server","preload.js"),() => {});
        });
    });
};

runServer();