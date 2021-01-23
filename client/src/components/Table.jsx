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
  let message = "";

  const displayHands = hands.map((x, index) => {

    if (hands[index].value > 21) {
      result = "loss"
      message = `BUST`;
    }
    if (hands[index].value <= 21 && dealer.value > 22) {
      result = "win";
      message = `WIN`
    }
    if ((dealer.value === 22 && hands[index].value < 21) || (hands[index].value === dealer.value && hands[index].value < 22)) {
      result = "push";
      message = "PUSH"
    }
    if (hands[index].value === 21 && dealer.value !== 21 && dealer.value !== 22 && hands[index].cards.length === 2) {
      result = "win";
      message = `BLACKJACK`
    }    
    if (hands[index].value === 21 && dealer.value !== 21 && dealer.value !== 22 && hands[index].cards.length !== 2 ) {
      result = "win";
      message = `WIN`
    }
    if (dealer.value === 21 && hands[index].value < 21 ) {
      result = "loss";
      message = `LOSS`
    }
    if ((21 - hands[index].value) < (21 - dealer.value) && dealer.value <= 20 && hands[index].value <= 20) {
      result = "win"
      message = `WIN`
    }
    if ((21 - dealer.value) < (21 - hands[index].value) && dealer.value <= 20 && hands[index].value <= 20) {
      result = "loss";
      message = `LOSS`
    }
    

    return (
      <Hand
        name={`Hand${index + 1}`}
        cardLibrary={props.cardLibrary}
        value={hands[index].value}
        cards={hands[index].cards}
        active={activeHand(index)}
        result={result}
        message={message}
        dealerCount={dealerCount}
      />
    );
  })

  return (
    <section>
      <h1> Blackjack Switch! </h1>
      <div id="deck">
        DECK:
          < br />
        {deck.cards.length}
      </div>

      <div id="dealer">
      <Hand
        name="Dealer"
        cardLibrary={props.cardLibrary}
        value={dealer.value}
        cards={dealer.cards}
      />        
      </div>

      <div id="player" >
        {displayHands}
      </div>


    </section>
  );
}