import { Deck, Hand, swap } from "../helpers/card-logic";
import useApplicationData from "../hooks/useApplicationData";

import Table from "./Table"

import "./Home.css";

let deck = new Deck(1);
let player = new Hand();
let dealer = new Hand();

let image1 = "https://deckofcardsapi.com/static/img/XX.png";
let image2 = "https://deckofcardsapi.com/static/img/XX.png";
let image3 = "https://deckofcardsapi.com/static/img/XX.png";
let image4 = "https://deckofcardsapi.com/static/img/XX.png";

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

  if (state.cards.length > 0) {
    image1 = state.cards.find(card => card.name === player.cards[0]).image
    image2 = state.cards.find(card => card.name === player.cards[1]).image
    image3 = state.cards.find(card => card.name === dealer.cards[0]).image
    image4 = state.cards.find(card => card.name === dealer.cards[1]).image
  }

  return (
    <div class="table">
      <Table
        deck={deck}
        player={player}
        dealer={dealer}
        image1={image1}
        image2={image2}
        image3={image3}
        image4={image4}
      />
    </div>
  )
}