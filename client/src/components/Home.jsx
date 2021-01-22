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
    updateHands,
    resetHands,
    addSplitHand,
    updateActions
  } = useApplicationData();

  let hand = state.hand;
  let currentHand = state.currentHand;
  let actions = state.actions;
  
  //if (state.dealer) dealer = state.dealer;
  if (hand[currentHand]) actions.split = hand[currentHand].canSplit;

  const deal = () => {
    actions.deal = false;
    updateActions(-1, "deal")

    setTimeout(() => { hit(hand[0]) }, 350);
    setTimeout(() => { hit(hand[0]) }, 1400);

    setTimeout(() => { hit(hand[1]) }, 700);
    setTimeout(() => { hit(hand[1]) }, 1750);

    setTimeout(() => { hit(dealer) }, 1050);
    setTimeout(() => { updateActions(0, "player") }, 1755);
  }

  //testcode
  const fakehit = (hand) => {
    hand.add("AS")
    updateHand(hand);
  }
  const fakehit2 = (hand) => {
    hand.add("KH")
    updateHand(hand);
  }

  const hit = (hand) => {
    hand.add(deck.draw())
    updateHand(hand);
    actions.switch = false;
  }

  const checkBlackjack = () => {    
    if (hand[currentHand]) {
      if (hand[currentHand].value >= 21 && state.turn === "player") {
        stay()
      }
    }
  }

  const stay = () => {
    if (currentHand < hand.length - 1) {
      updateHand(hand[currentHand]);
      currentHand++
      updateActions(currentHand, "player");
    } else if (currentHand === hand.length - 1) {
      updateActions(currentHand, "dealer");
    }
  }

  //DEALER
  //dealer code
  if (state.turn === "dealer") {
    if (dealer.value < 17 || (dealer.ace > 0 && dealer.value === 17)) {
      hit(dealer)
    } else {
      updateActions(-1, "reveal");
    }
  }

  const split = () => {
    if (hand[currentHand].canSplit === true) {
      hand[currentHand].canSplit = false;
      let newHand = new Hand(hand[currentHand].splitHand())
      addSplitHand(newHand);
      updateHand(hand[currentHand]);
      updateHand(hand[currentHand + 1]);
      setTimeout(() => { hit(hand[currentHand]) }, 500);
      setTimeout(() => { hit(hand[currentHand + 1]) }, 1000);
      //**Might have to add updateActions here! */
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

  checkBlackjack();

  const clearTable = () => {
      resetHands()
      dealer = new Hand();
      updateActions(-1, "bet");
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
        reset={() => clearTable()}
        actions={actions}
      />
      <Chips />

    </div>
  )
}