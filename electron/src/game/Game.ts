import * as net from 'net'
import Deck from './Deck';
import Socket from "../Socket/Server";
import Player from './Player';
import Card from './Card';

class Game {

    private _players: Map<number, Player>;
    private deck: Deck;
    private id = 0;
    private orderPlayers: number[] = [];
    private _currentPlayer?: number;
    private _start: boolean = false;

    constructor() {
        this._players = new Map<number, Player>();
        this.deck = new Deck;
    }

    public get Start(): boolean {
        return this._start;
    }
    public get currentPlayer() {
        return this._currentPlayer;
    }
    public get players() {
        return this._players;
    }

    async StartGame() {
        this._start = true;
        this.deck.create();
        let players = this._players.values();
        for (let currentPlayer of players) {
            this.addCardToPlayer(currentPlayer);
            this.addCardToPlayer(currentPlayer);
            await currentPlayer.send("START");
        }
        players = this._players.values();
        for (let currentPlayer of players) {
            await this.messageEveryone("HAND", currentPlayer.id + " " + currentPlayer.hand.toString() + " " + currentPlayer.sumHand(false));
        }
        this.nextPlayer();
    }

    addCardToPlayer(player: Player): Card {
        const card = this.deck.pop();
        player.addHand(card);
        return card;
    }

    async nextPlayer() {
        const actual = this.orderPlayers.pop();
        if (actual) {
            this._currentPlayer = actual;
            await this.messageEveryone("STAND", String(actual));
        } else {
            const players = this._players.values();
            this.orderPlayers = [];
            for (let currentPlayer of players) {
                const total = currentPlayer.sumHand(true);
                if (total > 21) {
                    // currentPlayer Perdeu
                    await this.messageEveryone("LOST", String(currentPlayer));
                    this.removePlayer(currentPlayer)
                } else if (total == 21) {
                    await this.messageEveryone("WINNER", String(currentPlayer));
                    // currentPlayer Ganhou
                } else {
                    this.orderPlayers.push(currentPlayer.id);
                }
            }
            console.log("OrderPlayers", this.orderPlayers);
            if (this.orderPlayers.length > 0) this.nextPlayer();
        }
    }

    newPlayer(socket: net.Socket) {
        const id = ++this.id;
        const player = new Player(id, socket);
        this._players.set(id, player);
        return player;
    }

    removePlayer(player: Player) {
        this._players.delete(player.id);
        this.messageEveryone("EXIT", String(player.id));
    }

    async messageEveryone(command: string, message?: string) {
        console.log(command, message);
        const players = this._players.values();
        for (let player of players) {
            await player.send(command, message);
        }
    }
}

const delay = async (ms: number) => setTimeout(() => new Promise((resolve) => resolve(void 0)), ms);

export default Game;