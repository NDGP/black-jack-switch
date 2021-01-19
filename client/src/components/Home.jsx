import axios from "axios";
import { Deck, Hand, swap } from "../helpers/card-logic";
import { useState, useEffect } from "react";

import "./Home.css";

let deck = new Deck(1);
let playerHand = new Hand();
let dealerHand = new Hand();

let image1 = "https://deckofcardsapi.com/static/img/XX.png";
let image2 = "https://deckofcardsapi.com/static/img/XX.png";
let image3 = "https://deckofcardsapi.com/static/img/XX.png";
let image4 = "https://deckofcardsapi.com/static/img/XX.png";

playerHand.add(deck.draw());
playerHand.add(deck.draw());

export default function Home(props) {

  const [state, setState] = useState({
    users: [],
    cards: [],
    dealer: dealerHand
  })

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:3001/api/users',
        { headers: { 'Access-Control-Allow-Origin': '*' } }),
      axios.get('http://localhost:3001/api/cards',
        { headers: { 'Access-Control-Allow-Origin': '*' } })
    ]).then((all) => {
      setState(prev => ({ ...prev, users: all[0].data, cards: all[1].data }))
    });
  }, []);

  // dealerHand = state.dealer
  // dealerHand.add(deck.draw());
  
  // setState({
  //   ...prev,
  //   dealer: dealerHand
  // })

  // const getImage = (hand) => {
  //   if (state.cards.length > 0) {
  //     let foundCard = state.cards.find(i => i.name === hand.cards[0])
  //     // for (const card of playerHand.cards) {
  //     // }
  //     return foundCard.image
  //   }
  // }

  if (state.cards.length > 0) {
    image1 = state.cards.find(card => card.name === playerHand.cards[0]).image
    image2 = state.cards.find(card => card.name === playerHand.cards[1]).image
    // image3 = state.cards.find(card => card.name === state.dealer.cards[0]).image
    // image4 = state.cards.find(card => card.name === state.dealer.cards[1]).image
  }

  return (
    <div class="table">
      <section>
        <h1> Blackjack switch table</h1>
        <h3> Place your bet</h3>
        
          <div id="deck">
            DECK:
          < br />
            {deck.cards}
          </div>
          
          {/* <div class="dealerHand">
            Dealer Hand: {state.dealer.cards}
            <img src={image1} alt="ERROR"></img>
            <img src={image2} alt="ERROR"></img>
          </div> */}
      
        <div class="playerHand">
            Player Hand: {playerHand.cards}
            <img src={image1} alt="ERROR"></img>
            <img src={image2} alt="ERROR"></img>
          </div>
        {/* <div class="test">
        <div>
            THESE ARE THE USERS:
            {JSON.stringify(state.users)}
          </div>
      </div> */}
      </section>
    </div>
  )
}