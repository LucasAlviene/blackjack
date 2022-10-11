import proc from 'child_process';
import { app }from "electron";
import path from 'path';
import fs from 'fs-extra';


const electron = require("electron");

const args = process.argv.slice(2);
const mode = args[0] == "--development" ? "development" : "production";
const isProduction = mode === "production";
//@ts-ignore
process.env.NODE_ENV = mode;

import { Client, Server } from '../config/webpack';
let child;
const runServer = async () => {
    console.log('Starting build...');
    Client.run((err) => {
        console.log(err);
        console.log("Client")
        Server.run(() => {
            fs.copySync(path.resolve(process.cwd(), "public"), path.resolve(process.cwd(), "build"), {
                dereference: true,
                filter: file => file !== path.resolve(process.cwd(), "public", "index.html"),
            });
        });
    });
};

runServer();