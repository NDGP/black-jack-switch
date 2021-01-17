import { Deck, Hand, swap} from "../helpers/card-logic";

const deck = new Deck(1);
const hand1 = new Hand();
const hand2 = new Hand();

hand1.add(deck.draw());
hand1.add(deck.draw());

hand2.add(deck.draw());
hand2.add(deck.draw());

export default function Home(props){
  
  return (
    <section>
      <h1> Blackjack switch table</h1>
      <h3> Place your bet</h3>
      <ul>
        <li>Switch</li>
        <li>Hit</li>
        <li>Stand</li>
        <li>Double down</li>
        <li>Split</li>

      </ul>

      <div>
        DECK:
        < br/>
        {deck.cards}
      </div>

      <div>
        HAND1: {hand1.cards}
      </div>

      <div>
        HAND2: {hand2.cards}
      </div>

      <button onClick={() => hand1.add(deck.draw())}>
        DRAW CARD
      </button>

    </section>

  )
}