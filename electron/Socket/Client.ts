import * as net from 'net'
import EventEmitter from 'events';

class Socket extends EventEmitter {

    private client: net.Socket;
    private port = 5000;

    constructor() {
        super();
        console.log("Client Socket");
        this.client = net.createConnection({ port: this.port }, this.listener);
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

    listener() {
        this.on("data", (data) => {
            // Receber mensagem do servidor
            console.log("Client -> Server",data.toString())
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