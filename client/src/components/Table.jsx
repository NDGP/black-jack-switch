import React from "react";
import Hand from "./Hand"

import './Table.css'

export default function Table(props) {
  const deck = props.deck;
  const dealer = props.dealer;
  const hands = props.hand;

  const activeHand = (index) => {
    return (index === props.currentHand)
  }

  const dealerCount = dealer.cards.length

  
  let wins = 0;
  let losses = 0;
  let draws = 0;
  let blackjacks = 0;
  let bet = props.bet;
  
  let betResults = 0;

  const calculateBet = (result) => {
    if (result = ('WIN' || 'BLACKJACK')) {
      //add initial bet and winnings to betResults
    } else if (result = ('LOSS' || "BUST")) {
      //subtract
    } else {
      //add initial bet back to betResults
    }
  }

  const displayHands = hands.map((x, index) => {
    let result = "";
    if (hands[index].value > 21) {
      result = `BUST`;
    }
    if (hands[index].value <= 21 && dealer.value > 22) {
      result = `WIN`
    }
    if ((dealer.value === 22 && hands[index].value < 22 && (hands[index].value === 21 && hands[index].cards.length !== 2)) || (hands[index].value === dealer.value && hands[index].value < 22)) {
      result = "push";
      result = "PUSH"
    }
    if (hands[index].value === 21 && dealer.value !== 21 && dealer.value !== 22 && hands[index].cards.length === 2) {
      result = `BLACKJACK`
    }    
    if (hands[index].value === 21 && dealer.value !== 21 && dealer.value !== 22 && hands[index].cards.length !== 2 ) {
      result = `WIN`
    }
    if (dealer.value === 21 && hands[index].value < 21 ) {
      result = `LOSS`
    }
    if ((21 - hands[index].value) < (21 - dealer.value) && dealer.value <= 20 && hands[index].value <= 20) {
      result = `WIN`
    }
    if ((21 - dealer.value) < (21 - hands[index].value) && dealer.value <= 20 && hands[index].value <= 20) {
      result = `LOSS`
    }

    //change bankroll state depending on results
    
    return (
      <Hand
        name={`Hand${index + 1}`}
        cardLibrary={props.cardLibrary}
        value={hands[index].value}
        cards={hands[index].cards}
        active={activeHand(index)}
        result={result}
        dealerCount={dealerCount}
        bet={bet}
      />
    );
  })

  let totalHands = props.totalWins + props.totalLosses + props.totalDraws

  const winPercentage = () => {
    if (totalHands > 0) {
      return (props.totalWins / totalHands).toFixed(2) * 100
    } else {
      return "0"
    }
  }
  const blackjackPercentage = () => {
    if (totalHands > 0) {
      return (props.totalBlackjacks / totalHands).toFixed(2) * 100
    } else {
      return "0"
    }
  };

  props.recordStats(wins, losses, draws, blackjacks);

  return (
    <section>
      <h1> Blackjack Switch! </h1>
      <div id="deck">
        DECK:
          < br />
        {deck.cards.length}
      </div>

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