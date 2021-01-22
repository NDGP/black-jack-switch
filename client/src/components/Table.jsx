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
      message = `You bust with ${hands[index].value}. You lose!`;
    }
    if (hands[index].value <= 21 && dealer.value > 22) {
      result = "win";
      message = `Dealer busted with ${dealer.value}. You win with ${hands[index].value}!`
    }
    if (dealer.value === 22 && hands[index].value < 22) {
      result = "push";
      message = "Push, dealer has 22."
    }
    if (hands[index].value === dealer.value && hands[index].value < 22) {
      result = "push";
      message = `Push you both have ${dealer.value}`;
    }
    if (hands[index].value === 21 && dealer.value !== 21 && dealer.value !== 22 && hands[index].cards.length === 2) {
      result = "win";
      message = `You win with blackjack!`
    }    
    if (hands[index].value === 21 && dealer.value !== 21 && dealer.value !== 22 && hands[index].cards.length !== 2 ) {
      result = "win";
      message = `You win, you have ${hands[index].value} and dealer has ${dealer.value}.`
    }
    if (dealer.value === 21 && hands[index].value < 21 ) {
      result = "lose";
      message = `You lose, dealer has ${dealer.value} and you have ${hands[index].value}.`
    }
    if ((21 - hands[index].value) < (21 - dealer.value) && dealer.value <= 20 && hands[index].value <= 20) {
      result = "win"
      message = `You win with ${hands[index].value} and the dealer has ${dealer.value}.`
    }
    if ((21 - dealer.value) < (21 - hands[index].value) && dealer.value <= 20 && hands[index].value <= 20) {
      result = "loss";
      message = `You lose with ${hands[index].value} and the dealer has ${dealer.value}.`
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
      <div class="result">
      </div>
      <div id="deck">
        DECK:
          < br />
        {deck.cards.length}
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