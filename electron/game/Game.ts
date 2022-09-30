import * as net from 'net'
import Deck from './Deck';
import Socket from "../Socket/Server";
import Player from './Player';

class Game {

    private players: Map<number, Player>;
    private deck: Deck;
    private id = 0;

    constructor() {
        this.players = new Map<number, Player>();
        this.deck = new Deck;
    }

    StartGame() {
        this.deck.create();
        this.players.forEach((currentPlayer) => {
            currentPlayer.addHand(this.deck.pop());
            currentPlayer.addHand(this.deck.pop());
            currentPlayer.send("START", currentPlayer.hand.toString())
            // Avisa todos os jogadores da mão do Player
            this.messageEveryone("HAND", currentPlayer.id + " " + currentPlayer.hand.toString());
            /*this.messageEveryone((player2) => {
                if (currentPlayer.id == player2.id) return;
                player2.send("HAND " + currentPlayer.id + " " + currentPlayer.hand.toString())
            })*/
        })
    }

    newPlayer(socket: net.Socket) {
        const id = ++this.id;
        const player = new Player(id, socket);
        this.players.set(id, player);
        return player;
    }

    removePlayer(player: Player) {
        this.players.delete(player.id);
        this.messageEveryone("EXIT", String(player.id));
    }

    messageEveryone(command: string, message?: string) {
        setTimeout(() => {
            this.players.forEach((player) => {
                player.send(command, message);
            })
        },500)
    }
}

const delay = async (ms: number) => setTimeout(() => new Promise((resolve) => resolve(void 0)), ms);

export default Game;