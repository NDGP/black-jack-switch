import React from "react";
import Hand from "./Hand"

export default function Table(props) {
  const deck = props.deck;
  const dealer = props.dealer;
  const player = props.player;

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
            name="Player"
            cardLibrary={props.cardLibrary}
            value={player.value}
            cards={player.cards}
          />

      </section>
  );
}