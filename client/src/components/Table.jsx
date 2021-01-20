import React from "react";
import Hand from "./Hand"

export default function Table(props) {
  const deck = props.deck;
  const dealer = props.dealer;
  const hands = props.hand;
  const handsInPlay = [];

  for (const hand of hands) {
    if (hand.value > 0) {
      handsInPlay.push(hand)
    }
  }

  const handsInPlay2 = handsInPlay.map((hand, index) => {
    return (
      <Hand
        name={`Hand${index + 1}`}
        cardLibrary={props.cardLibrary}
        value={handsInPlay[index].value}
        cards={handsInPlay[index].cards}
      />
    );
  })

  return (
    <section>
      <h1> Blackjack switch table</h1>
      <h3> Place your bet</h3>

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

      { handsInPlay2}

    </section>
  );
}