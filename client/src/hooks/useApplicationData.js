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
    turn: null,
    actions: {
      deal: false,
      hit: false,
      stay: false,
      split: false,
      switch: false,
      double: false
    }
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
      let updateActions = state.actions
      updateActions.deal = true;
      setState(prev => ({ ...prev,
        users: all[0].data,
        cards: all[1].data,
        hand: hand,
        actions: updateActions,
        turn: "bet"
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
      hand.canSplit= false;
    }

    hand.value = value;
    let activeHand = state.currentHand;

    //checks if hand is >= 21, if so, on to the next hand
    if (hand.value >= 21 && activeHand < state.hand.length - 1) {
      activeHand++;
    } else if (hand.value >= 21 && activeHand === state.hand.length - 1) {
      updateGame(0, "dealer")
    }

    setState(prev => ({ ...prev, [hand]: hand, currentHand: activeHand }))
  }

  const addSplitHand = (newHand) => {
    let updateHands = state.hand;
    updateHands.splice(1, 0, newHand)
    setState(prev => ({ ...prev, hand: updateHands }))
  }

  const updateGame = (currentHand, phase) => {
    let updateActions = state.actions
    switch (phase) {
      case "bet":
        updateActions.deal = true;
        break;
      case "deal":
        updateActions.deal = false;
        break;
      case "player":
        updateActions = {
          deal: false,
          hit: true,
          stay: true,
          split: state.hand[currentHand].canSplit,
          switch: true,
          double: true
        }
        break;
      case "dealer":
        updateActions = {
          deal: false,
          hit: false,
          stay: false,
          split: false,
          switch: false,
          double: false
        }
        break;
    }
    setState(prev => ({ ...prev, currentHand: currentHand, actions: updateActions, turn: phase }))
  }

  return { state, updateHand, addSplitHand, updateGame }
}