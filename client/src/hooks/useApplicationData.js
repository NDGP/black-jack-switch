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

    hand.value = value;
    setState(prev => ({ ...prev, [hand]: hand }))
  }


  return { state, updateHand }
}