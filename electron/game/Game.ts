import * as net from 'net'
import Deck from './Deck';
import Socket from "../Socket/Server";
import Player from './Player';

class Game {

    private _players: Map<number, Player>;
    private deck: Deck;
    private id = 0;
    private orderPlayers: number[] = [];
    private _currentPlayer?: number;

    constructor() {
        this._players = new Map<number, Player>();
        this.deck = new Deck;
    }

    public get Start(): boolean {
        return this.orderPlayers.length > 0;
    }
    public get currentPlayer() {
        return this._currentPlayer;
    }
    public get players() {
        return this._players;
    }

    async StartGame() {
        this.deck.create();
        const players = this._players.values();
        for (let currentPlayer of players) {
            this.addCardToPlayer(currentPlayer);
            this.addCardToPlayer(currentPlayer);
            await currentPlayer.send("START");
            //await this.messageEveryone("PLAYER", currentPlayer.toString());
            await this.messageEveryone("HAND", currentPlayer.id + " " + currentPlayer.hand.toString()+" "+currentPlayer.sumHand(true));
        }
        this.nextPlayer();
    }

    async addCardToPlayer(player: Player) {
        player.addHand(this.deck.pop());
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
        const players = this._players.values();
        for (let player of players) {
            await player.send(command, message);
        }
    }
}

const delay = async (ms: number) => setTimeout(() => new Promise((resolve) => resolve(void 0)), ms);

export default Game;