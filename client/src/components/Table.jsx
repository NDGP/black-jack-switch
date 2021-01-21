import React from "react";
import Hand from "./Hand"

export default function Table(props) {
  const deck = props.deck;
  const dealer = props.dealer;
  const hands = props.hand;

  const activeHand = (index) => {
    return (index === props.currentHand)
  }

  const displayHands = hands.map((x, index) => {
    return (
      <Hand
        name={`Hand${index + 1}`}
        cardLibrary={props.cardLibrary}
        value={hands[index].value}
        cards={hands[index].cards}
        active={activeHand(index)}
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
        { displayHands }
      </div>


    </section>
  );
}