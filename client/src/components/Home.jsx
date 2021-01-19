import { Deck, Hand, swap } from "../helpers/card-logic";
import useApplicationData from "../hooks/useApplicationData";

import Table from "./Table"

import "./Home.css";

let deck = new Deck(1);
let player = new Hand();
let dealer = new Hand();

// let image1 = "https://deckofcardsapi.com/static/img/XX.png";

let test = 0;

export default function Home(props) {
  const {
    state,
    updateHand
  } = useApplicationData();
        
  if (state.cards.length > 0) {
    if (test === 0) {
      test = 1;
      player.add(deck.draw());
      player.add(deck.draw());
      dealer.add(deck.draw());
      dealer.add(deck.draw());
      updateHand(dealer);
      updateHand(player);
    }
  } 

  return (
    <div class="table">
      <Table
        cardLibrary={state.cards}
        deck={deck}
        player={player}
        dealer={dealer}
      />
    </div>
  )
}