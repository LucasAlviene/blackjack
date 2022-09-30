import * as net from 'net'
import Hand from './Hand';
import Card from './Card';

export const ProtocolRequestCommands = {
    START: "START",
    SHUFFLE: "SHUFFLE",
    DRAW: "DRAW",
    STAND: "STAND",
    HANDSHAKE: "HANDSHAKE"
}

export const ProtocolResponseCommands = {
    OK: "OK"
}

class Player {

    private _id: number
    private _name?: string;
    private socket: net.Socket;
    private _hand: Hand;

    constructor(id: number, socket: net.Socket) {
        this._id = id;
        this.socket = socket;
        this._hand = new Hand();
    }

    public get name() {
        return this._name;
    }

    public get hand() {
        return this._hand;
    }

    public get id() {
        return this._id;
    }

    public command(command: string, body: string) {
        console.log(command, body)

        switch (command) {
            case ProtocolRequestCommands.START:
                break;

            case ProtocolRequestCommands.SHUFFLE:
                break;

            case ProtocolRequestCommands.DRAW:
                break;

            case ProtocolRequestCommands.STAND:
                break;

            case ProtocolRequestCommands.HANDSHAKE:
                this._name = body;
                this.send(ProtocolRequestCommands.HANDSHAKE, ProtocolResponseCommands.OK)
                break;
        }
    }

    async send(request: string, message?: string) {
        return new Promise((resolve, reject) => {
            this.socket.write(request + (message ? " " + message : ""), (err) => {
                if (err) reject();
                resolve(void 0);
            });
        })
    }

    addHand(card: Card) {
        this._hand.push(card);
    }

    sumHand() {
        return this._hand.sumHand();
    }
}

export default Player;