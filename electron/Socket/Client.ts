import * as net from 'net'
import EventEmitter from 'events';
import Electron from '../Electron';

class Socket extends EventEmitter {

    private client: net.Socket;
    private port = 5000;
    static socket?: Socket;

    constructor(ip: string) {
        super();
        console.log("Client Socket");
        this.client = net.createConnection({ host: ip, port: this.port }, this.listener);
        /* () => {
            // 'connect' listener.
            console.log('connected to server!');
            //   this.client.write('world!\r\n');
        });
        /*
        this.client.on('data', (data) => {
            console.log(data.toString());
            this.client.end();
        });
        this.client.on('end', () => {
            console.log('disconnected from server');
        });*/
    }

    static Start(ip: string) {
        if (Socket.socket) return Socket.socket;
        return Socket.socket = new Socket(ip);
    }

    static get current() {
        return Socket.socket;
    }

    listener() {
        this.on("data", (data) => {
            const message = data.toString();
            const [command, ...body] = message.split(" ");
            // Receber mensagem do servidor
            Electron.current.webContents.send("eventServer", { command, body });
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