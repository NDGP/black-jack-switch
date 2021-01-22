import React from "react";
import Card from "./Card";

import './Hand.css'

export default function Hand(props) {
  let hand = "hand";
  let check = "check"

if (props.dealerCount <= 1){
  check = check +"-hide"
}

  if (props.active) {
    hand = hand + "-active"
  };


  const cardsInHand = props.cards.map(card => {
    let image = props.cardLibrary.find(x => x.name === card).image
    return (
      <span class="card">
        <Card
          image={image}
        />
      </span>
    );
  });

  return (
    <div class={hand}>
      <h3>
        {props.name}: {props.value}
      </h3>

      <div class="cards">
        {cardsInHand}
      </div>
      <div class={check}>
      <h2>
        {props.message}
      </h2>
      </div>
    </div>
  );
}