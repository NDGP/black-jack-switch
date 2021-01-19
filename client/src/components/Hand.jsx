import React from "react";
import Card from "./Card";

export default function Hand(props) {
  
  const cardsInHand = props.cards.map(card => {
    let image = props.cardLibrary.find(x => x.name === card).image
    return (
      <Card
        image={image}
      />
    );
  });

  return (
    <div class="hand">
          <div >
            {props.name}: {props.value}
            { cardsInHand }
          </div>
      </div>
  );
}