import { Deck, Hand } from "../helpers/card-logic";
import useApplicationData from "../hooks/useApplicationData"
import Table from "./Table";
import Chips from "./Chips";
import Actions from './Actions';

import "./Home.css";


//should be called when a new game is started
let deck = new Deck(1);
let hand1 = new Hand();
let hand2 = new Hand();
let dealer = new Hand();
let hand1s = [];
let hand2s = [];
let swapped = false;


export default function Home(props) {
  const {
    state,
    updateHand
  } = useApplicationData();


  const deal = () => {
    if (hand1.value === 0 && hand2.value === 0 && dealer.value === 0) {
      swapped = false;

      setTimeout(() => { hit(hand1) }, 500);
      setTimeout(() => { hit(hand1) }, 2000);

      setTimeout(() => { hit(hand2) }, 1000);
      setTimeout(() => { hit(hand2) }, 2500);

      setTimeout(() => { hit(dealer) }, 1500);
      setTimeout(() => { hit(dealer) }, 3000);

    }
  }


  const hit = (hand) => {
    if (hand.value < 21){
      hand.add(deck.draw())
      updateHand(hand);
    }
  }

  const split = (hand) => {
    hand1s.add(hand1.splitHand())
  }

  //switch is not allowed as a function name in js, I will use swap instead
  const swap = (hand1, hand2) => {
    if (swapped === false) {
      swapped = true;
      let temp = hand1.cards[1];
      hand1.cards[1] = hand2.cards[1];
      hand2.cards[1] = temp;
      updateHand(hand1);
      updateHand(hand2);
    }
  }

  return (
    <div class="table">
      <Table
        cardLibrary={state.cards}
        deck={deck}
        hand1={hand1}
        hand2={hand2}
        dealer={dealer}
      />
      <Actions
        hit1={() => hit(hand1)}
        hit2={() => hit(hand2)}
        hitD={() => hit(dealer)}
        deal={() => deal()}
        swap={() => swap(hand1, hand2)}
      />
      <Chips />

    </div>
  )
}