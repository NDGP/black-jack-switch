import { useState, useEffect } from "react";
import axios from "axios";

import { Deck, Hand } from "../helpers/cardLogic";

export default function useApplicationData() {

  const [state, setState] = useState({
    users: [],
    cards: [],
    hand: [],
    dealer: {},
    currentHand: 0,
    turn: null
  })

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:3001/api/users',
        { headers: { 'Access-Control-Allow-Origin': '*' } }),
      axios.get('http://localhost:3001/api/cards',
        { headers: { 'Access-Control-Allow-Origin': '*' } })
    ]).then((all) => {
      let hand = []
      hand[0] = new Hand();
      hand[1] = new Hand();
      setState(prev => ({ ...prev,
        users: all[0].data,
        cards: all[1].data,
        hand: hand,
      }))
    });
  }, []);

  const updateHand = (hand) => {
    //first calculates the values hand
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

    //checks if splitting should be possible
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
    let activeHand = state.currentHand;

    //checks if hand is >= 21, if so, on to the next hand
    if (hand.value >= 21 && activeHand < state.hand.length - 1) {
      activeHand++;
    }

    setState(prev => ({ ...prev, [hand]: hand, currentHand: activeHand }))
  }

  const addSplitHand = (newHand) => {
    let updateHands = state.hand;
    updateHands.splice(1, 0, newHand)
    setState(prev => ({ ...prev, hand: updateHands }))
  }

  const updateGame = (x) => {
    setState(prev => ({ ...prev, currentHand: x }))
  }

  return { state, updateHand, addSplitHand, updateGame }
}