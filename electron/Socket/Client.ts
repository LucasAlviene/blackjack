import * as net from 'net'
import EventEmitter from 'events';
import Electron from '../Electron';

class Socket extends EventEmitter {

    private client: net.Socket;
    private port = 5000;
    static socket?: Socket;

    constructor(ip: string, port: number) {
        super();
        Electron.current.webContents.send("eventServer", JSON.stringify({ host: ip, port }));
        this.client = net.createConnection(this.port, ip, () => this.listener());
        this.client.on("error", (err) => {
            Electron.current.webContents.send("eventServer", JSON.stringify(err));
        })
    }

    static Start(ip: string, port: number) {
        if (Socket.socket) return Socket.socket;
        return Socket.socket = new Socket(ip, port);
    }

    static get current() {
        return Socket.socket;
    }

    listener() {
        Electron.current.webContents.send("eventServer", "Conectado");
        this.on("data", (data) => {
            const message = data.toString();
            const [command, ...body] = message.split(" ");
            if (command == "EXIT") {
                this.end();
            } else {
                // Receber mensagem do servidor
                Electron.current.webContents.send("eventServer", { command, body });
            }
        })
    }

    emit(eventName: string, ...args: any[]): boolean {
        return this.client.write(eventName);
    }

    on(eventName: string, listener: (...args: any[]) => void): this {
        this.client.on(eventName, listener);
        return this;
    }

    end() {
        this.client.end();
    }
}
export default Socket;