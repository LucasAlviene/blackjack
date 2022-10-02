import * as net from 'net'
import Hand from './Hand';
import Card from './Card';
import Server from '../Socket/Server';

export const ProtocolRequestCommands = {
    START: "START",
    DRAW: "DRAW",
    STAND: "STAND",
    HANDSHAKE: "HANDSHAKE",
    PLAYERS: "PLAYERS"
}

export const ProtocolResponseCommands = {
    OK: "OK"
}

class Player {

    private _id: number
    private _name?: string;
    private _avatar?: string;
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

    public get avatar() {
        return this._avatar;
    }

    public get hand() {
        return this._hand;
    }

    public get id() {
        return this._id;
    }

    public async command(command: string, body: string[]) {
        const game = Server.current?.game;

        switch (command) {
            case ProtocolRequestCommands.PLAYERS:
                if (game) {
                    let text: string[] = [];
                    for (let player of game.players.values()) {
                        //console.log(" -- ", player, " -- ", player.toString(), " -- ")
                        text.push(player.toString());
                    }
                    console.log(text.join(" "));
                    await game.messageEveryone("PLAYERS", text.join(" "));
                }
                break;
            case ProtocolRequestCommands.DRAW:
                if (game && game.Start && game.currentPlayer == this.id) {
                    game.addCardToPlayer(this);
                    await game.messageEveryone("DRAW", this.id + " " + this._hand.toString() + " " + this.sumHand(false));
                }
                break;

            case ProtocolRequestCommands.STAND:
                if (game && game.Start && game.currentPlayer == this.id) game.nextPlayer();
                break;

            case ProtocolRequestCommands.HANDSHAKE:
                if (game && !game.Start) {
                    this._name = body[0];
                    this._avatar = body[1];
                    await this.send("HANDSHAKE", "ok")
                    await game.messageEveryone("JOIN", this.toString());
                }
                break;
        }
    }

    async send(request: string, message?: string) {
        return new Promise((resolve, reject) => {
            this.socket.write(request + (message ? " " + message : ""), (err) => {
                if (err) reject();
                setTimeout(() => {
                    resolve(void 0);
                }, 100)
            });
        })
    }

    addHand(card: Card) {
        this._hand.push(card);
    }

    sumHand(sumBit: boolean) {
        return this._hand.sumHand(sumBit);
    }

    toString() {
        return this.id + " " + this.name + " " + this.avatar;
    }
}

export default Player;