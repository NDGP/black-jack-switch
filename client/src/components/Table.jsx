import React from "react";
import Hand from "./Hand"

export default function Table(props) {
  const deck = props.deck;
  const dealer = props.dealer;

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

          <Hand
            name="Hand1"
            cardLibrary={props.cardLibrary}
            value={props.hand1.value}
            cards={props.hand1.cards}
          />
          
          <Hand
            name="Hand2"
            cardLibrary={props.cardLibrary}
            value={props.hand2.value}
            cards={props.hand2.cards}
          />

      </section>
  );
}