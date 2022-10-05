
export default function getCardImage(suit: CardSuit, number: CardNumber, hidden: boolean = false): string {
  const dirname = `${process.env.NODE_ENV == "development" ? '' : window.__dirname}/images/cards/`
  const color = suit === 'clubs' || suit === `spades` ? 'black' : 'red'
  return dirname+(hidden ? `${color}-hidden` : `${suit}-${number.toUpperCase()}`)+".png";
}