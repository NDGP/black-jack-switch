import { Deck, Hand, swap } from "../helpers/card-logic";
import Table from "./Table"
import useApplicationData from "../hooks/useApplicationData"

import five from "./images/chip5.png"
import twentyFive from "./images/chip25.png"
import oneHundred from "./images/chip100.png"
import fiveHundred from "./images/chip500.png"

import "./Home.css";
let deck = new Deck(1);
let player = new Hand();
let dealer = new Hand();

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
            <div class="Actions">
        <button type="button" class="Switch" /*onclick={swap()}*/ >Switch</button>
        <button type="button" class="Hit" /*onclick={playerHand.add(deck.draw())} */ >Hit</button>
        <button type="button" class="Stay">Stay</button>
        <button type="button" class="Double">Double Down</button>
        <button type="button" class="Split">Split</button>
      </div>

      <div class="Chips">
        <input type="image" src={five} alt="Wrong path" />
        <input type="image" src={twentyFive} alt="Wrong path" />
        <input type="image" src={oneHundred} alt="Wrong path" />
        <input type="image" src={fiveHundred} alt="Wrong path" />
      </div>
    </div>
  )
}