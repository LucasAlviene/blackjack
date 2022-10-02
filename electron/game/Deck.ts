import Card from "./Card";

const numbers: CardNumber[] = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "j", "q", "k", "a"];
const suits: CardSuit[] = ["clubs", "diamonds", "hearts", "spades"];
class Deck {

    private cards: Card[] = [];

    public create() {
        let cardId = 0;
        suits.map((suit) => {
            numbers.forEach((number) => {
                const color = suit == "clubs" || suit == "spades" ? "black" : "red";
                this.cards.push(new Card(cardId++, color, number, suit))
            });
        });
        this.shuffle()
    }

    public shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    public pop(): Card {
        return this.cards.pop() as Card;
    }
}


export default Deck;