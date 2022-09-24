import * as net from 'net'

class Socket {

    private server: net.Server;
    private port = 5000;

    constructor() {
        console.log("Server Socket");
        this.server = net.createServer(this.listener).on('error', (err) => {
            // Handle errors here.
            throw err;
        });
    }

    listener(socket: net.Socket) {
        socket.on("data", (data) => {
            const message = data.toString();
            // Receber mensagem do client
            //socket.write("END ")
            //this.RulesVerify(message)
            console.log("Server -> Client",message)
        })
    }

    listen() {
        this.server.listen(this.port, () => console.log('opened server on', this.server.address()))
    }

}
export default Socket;