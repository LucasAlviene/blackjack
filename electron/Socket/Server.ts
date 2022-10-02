import * as net from 'net'
import Game from '../game/Game';

class Socket {

    private server: net.Server;
    private port = 5000;
    private _game: Game;
    static socket?: Socket;

    constructor() {
        console.log("Server Socket");
        this._game = new Game();
        this.server = net.createServer((socket) => this.listener(socket)).on('error', (err) => {
            // Handle errors here.
            throw err;
        });
        this.listen();
    }

    static Start() {
        if (Socket.socket) return Socket.socket;
        return Socket.socket = new Socket;
    }

    static get current() {
        return Socket.socket;
    }

    get game(): Game {
        return this._game;
    }

    listener(socket: net.Socket) {
        const player = this.game.newPlayer(socket);
        if (player) {

            socket.on("data", (data) => {
                const message = data.toString();
                const [command, ...body] = message.split(" ");
                if (command == "START") {
                    this.game.StartGame();
                } else {
                    player.command(command, body);
                }
                console.log("Server -> Client", message)
            })
            socket.on("end", () => {
                this.game.removePlayer(player);
            })
        }
    }

    listen() {
        this.server.listen(this.port, () => console.log('opened server on', this.server.address()))
    }

}
export default Socket;