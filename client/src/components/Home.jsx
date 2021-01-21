import { Deck, Hand } from "../helpers/cardLogic";
import useApplicationData from "../hooks/useApplicationData"

import Table from "./Table";
import Chips from "./Chips";
import Actions from './Actions';

import "./Home.css";


let deck = new Deck(1);
let dealer = new Hand();


export default function Home(props) {
  const {
    state,
    updateHand,
    addSplitHand,
    updateGame
  } = useApplicationData();

  let hand = state.hand;
  let currentHand = state.currentHand;
  let actions = state.actions
  if (hand[currentHand]) actions.split = hand[currentHand].canSplit;

  const deal = () => {
      actions.deal = false;
      updateGame(currentHand, "deal")

      setTimeout(() => { hit(hand[0]) }, 400);
      setTimeout(() => { hit(hand[0]) }, 1600);

      setTimeout(() => { hit(hand[1]) }, 800);
      setTimeout(() => { hit(hand[1]) }, 2000);

      setTimeout(() => { hit(dealer) }, 1200);

      setTimeout(() => { updateGame(currentHand, "player") }, 2460);
  }

  const hit = (hand) => {
      hand.add(deck.draw())
      updateHand(hand);
      updateGame(currentHand, "player")
  }

  const stay = () => {
    if (currentHand < hand.length - 1) {
      currentHand++
      updateHand(hand[currentHand]);
      updateGame(currentHand, "player");
    } else if (currentHand === hand.length -1) {
      updateGame(currentHand, "dealer");
    }
  }

  //dealer code
  if (state.turn === "dealer") {
    if (dealer.value < 17) {
      hit(dealer)
    }
  }

  const split = () => {
    if (hand[currentHand].canSplit === true) {
      hand[currentHand].canSplit = false;
      let newHand = new Hand(hand[currentHand].splitHand())
      addSplitHand(newHand);
      updateHand(hand[currentHand])
      setTimeout(() => { hit(hand[currentHand]) }, 500);
      updateHand(hand[currentHand + 1])
      setTimeout(() => { hit(hand[currentHand + 1]) }, 1000);
      //**Might have to add updateGame here! */
    }
  }

  const doubleDown = () => {
    //add code to double current hand's bet here
    hit(hand[currentHand]);
    stay()
  }

  //switch is not allowed as a function name in js, use swap instead
  const swap = (hand1, hand2) => {
    if (actions.switch) {
      // actions.switch = false;
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
        stay={() => stay()}
        deal={() => deal()}
        swap={() => swap(hand[0], hand[1])}
        split={() => split()}
        double={() => doubleDown()}
        actions={actions}
      />
      <Chips />

    </div>
  )
}