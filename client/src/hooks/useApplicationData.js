import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    users: [],
    cards: [],
    hand: [],
    dealer: {}
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

  const updateHand = (hand) => {
    let value = 0;
    let aces = hand.ace;
    for (const card of hand.cards) {
      let cardInfo = state.cards.find(info => info.name === card);

      value += cardInfo.value;
      if (cardInfo.ace === true) aces++;
    }

    for (let i = aces; i > 0; i--) {
      if (value > 21){
        value -= 10;
      }
    }

    //check if split should be possible
    if (hand.cards.length === 2) {
      let card1value = state.cards.find(x => x.name === hand.cards[0]).value;
      let card2value = state.cards.find(x => x.name === hand.cards[1]).value;
      if (card1value === card2value) {
        hand.canSplit = true;
      }
    } else {
      hand.canSplit = false;
    }

    hand.value = value;
    setState(prev => ({ ...prev, [hand]: hand }))
  }


  return { state, updateHand }
}