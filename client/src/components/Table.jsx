import React from "react";
import Hand from "./Hand"

import './Table.css'

export default function Table(props) {
  const deck = props.deck;
  const dealer = props.dealer;
  const hands = props.hand;

  const activeHand = (index) => {
    return (index === props.currentHand)
  }
  
 const dealerCount = dealer.cards.length

  let result = 'result'

  const displayHands = hands.map((x, index) => {

    if (hands[index].value > 21) {
      result = "loss"
    }
    if (hands[index].value <= 21 && dealer.value > 22) {
      result = "win";
    }
    if (dealer.value === 22 && hands[index].value < 22) {
      result = "push";
    }
    if (hands[index].value === dealer.value && hands[index].value < 22) {
      result = "push";
    }
    if (hands[index].value === 21 && dealer.value !== 21 && dealer.value !== 22) {
      result = "win";
    }
    if (dealer.value === 21 && hands[index].value < 21) {
      result = "loss";
    }
    if ((21 - hands[index].value) < (21 - dealer.value) && dealer.value <= 20 && hands[index].value <= 20) {
      result = "win"
    }
    if ((21 - dealer.value) < (21 - hands[index].value) && dealer.value <= 20 && hands[index].value <= 20) {
      result = "loss";
    }
    

    return (
      <Hand
        name={`Hand${index + 1}`}
        cardLibrary={props.cardLibrary}
        value={hands[index].value}
        cards={hands[index].cards}
        active={activeHand(index)}
        result={result}
        dealerCount={dealerCount}
      />
    );
  })

  return (
    <section>
      <h1> Blackjack Switch! </h1>
      <div class="result">
      </div>
      <div id="deck">
        DECK:
          < br />
        {deck.cards}
      </div>

      < br />

      <Hand
        name="Dealer"
        cardLibrary={props.cardLibrary}
        value={dealer.value}
        cards={dealer.cards}
      />

      <div id="player" >
        {displayHands}
      </div>


    </section>
  );
}