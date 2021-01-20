import React from "react";
import Card from "./Card";

import './Hand.css'

export default function Hand(props) {
  
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
    <span class="hand">
          <span >
            {props.name}: {props.value}
            { cardsInHand }
          </span>
      </span>
  );
}