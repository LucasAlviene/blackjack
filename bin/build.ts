const proc = require('child_process');
const electron = require("electron");
const { app } = require("electron");
const path = require('path');
const fs = require("fs-extra");
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
    Client.run((err) => {
        console.log(err);
        console.log("Client")
        Server.run(() => {
            fs.copySync(path.resolve(process.cwd(), "public"), path.resolve(process.cwd(), "build"), {
                dereference: true,
                filter: file => file !== path.resolve(process.cwd(), "public", "index.html"),
            });
            /*
          fs.copyFile(path.resolve(process.cwd(),"public","preload.js"), path.resolve(process.cwd(),"build","server","preload.js"),() => {});
          fs.copyFile(path.resolve(__dirname,"..","public/images/image1.png"), path.resolve(__dirname,"..","build/images/image1.png"),() => {});
          fs.copyFile(path.resolve(__dirname,"..","public/images/image2.png"), path.resolve(__dirname,"..","build/images/image2.png"),() => {});
          fs.copyFile(path.resolve(__dirname,"..","public/images/image3.png"), path.resolve(__dirname,"..","build/images/image3.png"),() => {});
          fs.copyFile(path.resolve(__dirname,"..","public/images/image4.png"), path.resolve(__dirname,"..","build/images/image4.png"),() => {});*/
        });
    });
};

runServer();