import { Deck, Hand } from "../helpers/card-logic";
import useApplicationData from "../hooks/useApplicationData"
import Table from "./Table";
import Chips from "./Chips";
import Actions from './Actions';

import "./Home.css";


//should be called when a new game is started
let hand = []

let deck = new Deck(1);
hand[0] = new Hand();
hand[1] = new Hand();
hand[2] = new Hand();
hand[3] = new Hand();
let dealer = new Hand();
let swapped = false;
let currentHand = 0;


export default function Home(props) {
  const {
    state,
    updateHand
  } = useApplicationData();


  const deal = () => {
    if (hand[0].value === 0 && hand[2].value === 0 && dealer.value === 0) {
      swapped = false;

      setTimeout(() => { hit(hand[0]) }, 500);
      setTimeout(() => { hit(hand[0]) }, 2000);

      setTimeout(() => { hit(hand[2]) }, 1000);
      setTimeout(() => { hit(hand[2]) }, 2500);

      setTimeout(() => { hit(dealer) }, 1500);
      setTimeout(() => { hit(dealer) }, 3000);

    }
  }

  const hit = (hand) => {
    if (hand.value < 21) {
      hand.add(deck.draw())
      updateHand(hand);
    }
  }

  const stay = () => {
    if (currentHand < hand.length - 1) {
      currentHand++
      if (hand[currentHand].value === 0) {
        currentHand++
      }
    }
  }


  const split = () => {
    hand[currentHand + 1].add(hand[currentHand].splitHand())
    updateHand(hand[currentHand])
    setTimeout(() => { hit(hand[currentHand]) }, 500);
    updateHand(hand[currentHand + 1])
    setTimeout(() => { hit(hand[currentHand + 1]) }, 1000);
  }

  const doubleDown = () => {
    //add code to double current hand's bet here
    hit(hand[currentHand]);
    stay()
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
        hand={hand}
        dealer={dealer}
        currentHand={currentHand}
      />
      <Actions
        hit={() => hit(hand[currentHand])}
        hitD={() => hit(dealer)}
        stay={() => stay()}
        deal={() => deal()}
        swap={() => swap(hand[currentHand], hand[currentHand + 2])}
        split={() => split()}
        double={() => doubleDown()}
      />
      <Chips />

    </div>
  )
}