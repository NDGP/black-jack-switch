import React from "react";
import Hand from "./Hand"

import './CSS/Table.css'

import { checkResult } from "../hooks/helpers.js"

export default function Table(props) {
  // const deck = props.deck;
  const dealer = props.dealer;
  const hands = props.hand;

  const activeHandHighlight = (index) => {
    return (index === props.currentHand)
  }

  const dealerCount = dealer.cards.length


  const displayHands = hands.map((hand, index) => {

      if (hand.cards.length > 1) hand.result = checkResult(hands[index], dealer)

      return (
        <Hand
          name={`Hand${index + 1}`}
          cardLibrary={props.cardLibrary}
          value={hands[index].value}
          cards={hands[index].cards}
          active={activeHandHighlight(index)}
          result={hand.result}
          dealerCount={dealerCount}
          bet={hands[index].bet}
        />
      );
    })



// const winPercentage = () => {
//   if (totalHands > 0) {
//     return (props.totalWins / totalHands).toFixed(2) * 100
//   } else {
//     return "0"
//   }
// }
// const blackjackPercentage = () => {
//   if (totalHands > 0) {
//     return (props.totalBlackjacks / totalHands).toFixed(2) * 100
//   } else {
//     return "0"
//   }
// };

//props.recordStats(wins, losses, draws, blackjacks);

return (
  <section>
    <h1>
      <span id="bj"> Blackjack </span>
      <span id="switch"> Switch! </span>
    </h1>
    {/* <p>Wins: {props.totalWins}</p>
      <p>Win percentage: {winPercentage()}%</p>
      <p>Blackjacks: {props.totalBlackjacks}</p>
      <p>Blackjack percentage: {blackjackPercentage()}%</p> */}

    {/* <div id="deck">
      DECK:
          < br />
      {deck.cards.length}
    </div> */}

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