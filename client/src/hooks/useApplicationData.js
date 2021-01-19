import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() { 

  const [state, setState] = useState({
    users: [],
    cards: [],
    player: {},
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
    if (state.cards.length > 0) {
      for (const card of hand.cards) {
        let cardInfo = state.cards.find(info => info.name === card);
        console.log("INFO: " + cardInfo + "for" + card)
				if (cardInfo.ace === true && hand.ace === false) hand.ace = true;
				hand.value += cardInfo.value;
      }
      setState(prev => ({...prev, [hand]: hand}))
    }    
  }


  return { state, updateHand }
}