import Card from './Card'

class Hand {

  private _cards: Card[] = [];

  constructor() {
    //this.cards = [card1, card2]
  }

  public pop(id: number): Card | null {
    let requestedCard: Card | null = null;
    let newCards: Card[] = []
    this._cards.forEach(card => {
      if (card.id === id) {
        requestedCard = card
        return
      }
      newCards.push(card)
    });
    this._cards = newCards
    return requestedCard
  }

  public sumHand(){
    let cardsSum = 0;

    this._cards.forEach(card => {
        cardsSum += card.getValue(); 
    });

    return cardsSum;
  }

  public push(card: Card) {
    this._cards.push(card)
  }

  public get cards() {
    return this._cards;
  }

  public toString(){
    return this._cards.map((card) => card.toString()).join("|");
  }
}

export default Hand