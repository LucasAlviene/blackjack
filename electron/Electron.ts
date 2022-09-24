import { app, BrowserWindow, ipcMain, dialog, shell, Tray, Menu } from 'electron';
import { IpcMainEvent } from 'electron/main';
import { autoUpdater } from 'electron-updater';
import path from 'path';
const isDev = process.env.NODE_ENV === "development";

type NamesPath =  'home' | 'appData' | 'userData' | 'cache' | 'temp' | 'exe' | 'module' | 'desktop' | 'documents' | 'downloads' | 'music' | 'pictures' | 'videos' | 'recent' | 'logs' | 'crashDumps';
class Electron {

    private static _current: BrowserWindow;

    createWindow() {
        // Create the browser window.
        const window = new BrowserWindow({
            width: 1200,
            height: 800,
            minHeight: 600,
            minWidth: 800,
            useContentSize: true,
            resizable: true,
            webPreferences: {
                //enableRemoteModule: true,
                nodeIntegration: true,
                nodeIntegrationInWorker: true,
                contextIsolation: false,
                preload: path.join(__dirname, 'preload.js'),
            },
            icon: path.join(__dirname, 'favicon.ico'),
        }); //'http://localhost:3000'
        window.removeMenu();

        window.loadURL(
            isDev
                ? 'http://localhost:9000'
                : `file://${path.join(__dirname, '..', 'index.html')}`
        );
        //window.loadFile('public/dev.html');
        //if (isDev
        if (isDev) {
            const devtools = new BrowserWindow()
            window.webContents.setDevToolsWebContents(devtools.webContents)
            window.webContents.openDevTools({ mode: 'detach' });
            window.on("close", function () {
                devtools.close();
            })
        }
        window.webContents.send("app_version", { version: app.getVersion() });
        Electron._current = window;

        window.once('ready-to-show', () => {
            autoUpdater.checkForUpdatesAndNotify();
        });

        autoUpdater.on('update-available', () => {
            window.webContents.send('update_available');
        });
        autoUpdater.on('update-downloaded', () => {
            window.webContents.send('update_downloaded');
        });
        
    }

    on(name: any, listener: Function) {
        app.on(name, listener);
    }

    onEvent(name: string, listener: (event: IpcMainEvent, ...args: any[]) => void) {
        ipcMain.on(name, listener);
    }

    connection(classObj: (app: Electron) => void) {
        classObj(this);
    }

    quit(): void {
        app.quit();
    }

    getPath(name: NamesPath): string {
        return app.getPath(name);
    }

    public static get current(): BrowserWindow {
        return this._current;
    }
}
export default Electron;