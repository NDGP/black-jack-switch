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
  let wins = 0;
  let losses = 0;
  let draws = 0;
  let blackjacks = 0;


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
  let totalHands = props.totalWins + props.totalLosses + props.totalDraws
  const winPercentage = () => {
    if (totalHands > 0) {
      return (props.totalWins / totalHands).toFixed(2) * 100
    } else {
      return "0"
    }
  }
  const blackjackPercentage = () => {
    if (totalHands > 0) {
      return (props.totalBlackjacks / totalHands).toFixed(2) * 100
    } else {
      return "0"
    }
  };
  props.recordStats(wins, losses, draws, blackjacks);

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