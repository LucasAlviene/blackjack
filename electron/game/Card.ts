export type CardColor = "red" | "black";
export type CardNumber = "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "j" | "q" | "k" | "a";
export type CardSuit = "clubs" | "diamonds" | "hearts" | "spades";
class Card {

    public id: number;
    public color: CardColor;
    public number: CardNumber;
    public suit: CardSuit;

    constructor(id: number, color: CardColor, number: CardNumber, suit: CardSuit) {
        this.id = id
        this.color = color;
        this.number = number;
        this.suit = suit;
    }

    public getValue() : number{
        switch(this.number){
            case "j":
            case "q":
            case "k": return 10;
            case "a": return 1;
        }
        return Number(this.number);
    
    }

    public toString() {
        return this.id + "_" + this.color + "_" + this.suit;
    }
}

export default Card;