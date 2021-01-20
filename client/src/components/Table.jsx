import React from "react";
import Hand from "./Hand"

export default function Table(props) {
  const deck = props.deck;
  const dealer = props.dealer;
  const hands = props.hand;
  const activeHands = [];

  for (const hand of hands) {
    if (hand.value > 0) {
      activeHands.push(hand)
    }
  }

  const handsInPlay = activeHands.map((x, index) => {
    return (
      <Hand
        name={`Hand${index + 1}`}
        cardLibrary={props.cardLibrary}
        value={activeHands[index].value}
        cards={activeHands[index].cards}
      />
    );
  })

  return (
    <section>
      <h1> Blackjack Switch! </h1>
      <h3> Place your bet </h3>

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
        { handsInPlay }
      </div>


    </section>
  );
}