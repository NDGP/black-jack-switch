import React from "react";
import Card from "./Card";

import './CSS/Hand.css'

export default function Hand(props) {
  let hand = "hand";
  let check = "check"
  let handValue = "handValue"

  if (props.dealerCount <= 1) {
    check = check + "-hide"
  }

  if (props.active) {
    hand = hand + "-active"
  };

  const cardsInHand = props.cards.map(card => {
    let image = props.cardLibrary.find(x => x.name === card).image
    return (
      <span class="one-card">
        <Card
          image={image}
        />
      </span>
    );
  });

  const displayBet = () => {
    if (props.name !== "Dealer") {
      return (`Bet: $${props.bet}`)
    }
  }

if (props.value === 0){
  handValue = handValue + "-hidden"
}

  return (
    <div class={hand}>
      <div class={check}>
        <h2>
          {props.result}
        </h2>
      </div>
      <div class="cards">
        {cardsInHand}
      </div>
      <h3 class ={handValue}>
        <strong> {props.value} </strong>
      </h3>
      <h3 class="display">
        {displayBet()}
      </h3>
    </div>
  );
}
