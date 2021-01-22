import { useState, useEffect } from "react";
import axios from "axios";

import { Deck, Hand } from "../helpers/cardLogic";

export default function useApplicationData() {

  const [state, setState] = useState({
    users: [],
    cards: [],
    hand: [],
    dealer: {},
    currentHand: -1,
    turn: null,
    actions: {
      deal: false,
      hit: false,
      stay: false,
      split: false,
      switch: false,
      double: false,
      reset: true,
    }
  })

  useEffect(() => {
    Promise.all([ //unsure what the * does, might be security risk
      axios.get('http://localhost:3001/api/users',
        { headers: { 'Access-Control-Allow-Origin': '*' } }),
      axios.get('http://localhost:3001/api/cards',
        { headers: { 'Access-Control-Allow-Origin': '*' } })
    ]).then((all) => {
      let hand = []
      hand[0] = new Hand();
      hand[1] = new Hand();
      let dealer = new Hand();
      let updateActions = state.actions
      updateActions.deal = true;
      setState(prev => ({
        ...prev,
        users: all[0].data,
        cards: all[1].data,
        hand: hand,
        dealer: dealer,
        actions: updateActions,
        turn: "bet"
      }))
    });
  }, []);

  const updateHand = (hand) => {
    //first calculates the values hand
    let value = 0;
    let aces = hand.ace;
    //let currentHand = state.currentHand;

    for (const card of hand.cards) {
      let cardInfo = state.cards.find(info => info.name === card);

      value += cardInfo.value;
      if (cardInfo.ace === true) aces++;
    }
    for (let i = aces; i > 0; i--) {
      if (value > 21) {
        value -= 10;
      }
    }

    //checks if splitting should be possible
    if (state.turn !== "dealer") {
      if (hand.cards.length === 2) {
        let card1value = state.cards.find(x => x.name === hand.cards[0]).value;
        let card2value = state.cards.find(x => x.name === hand.cards[1]).value;
        if (card1value === card2value) {
          hand.canSplit = true;
        }
      } else {
        hand.canSplit = false;
      }      
    }

    hand.value = value;

    setState(prev => ({ ...prev, [hand]: hand }));
  }

  const updateHands = (hands) => {
    let activeHand = state.currentHand;
    for (const hand of hands) {
      //first calculates the values hand
      let value = 0;
      let aces = hand.ace;
      let currentHand = state.currentHand;

      for (const card of hand.cards) {
        let cardInfo = state.cards.find(info => info.name === card);

        value += cardInfo.value;
        if (cardInfo.ace === true) aces++;
      }
      for (let i = aces; i > 0; i--) {
        if (value > 21) {
          value -= 10;
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
        //checks if hand is >= 21, if so, on to the next hand
        if (state.turn === "player") {
          if (hand.value >= 21 && currentHand < state.hand.length - 1) {
            currentHand = currentHand + 1;
          } else if (hand.value >= 21 && currentHand === state.hand.length - 1) {
            updateActions(0, "dealer");
          }
        }
      }
    }
    setState(prev => ({ ...prev, hand: hands, currentHand: activeHand }))
  }

  const addSplitHand = (newHand) => {
    let updateHands = state.hand;
    let currentHand = state.currentHand
    if (currentHand < updateHands.length) {
      updateHands.splice((currentHand + 1), 0, newHand)
    } else {
      updateHands.push(currentHand);
    }

    setState(prev => ({ ...prev, hand: updateHands }))
  }

  const updateActions = (currentHand, phase) => {
    let updateActions = state.actions
    switch (phase) {
      case "reveal":
        updateActions.reset = true;
        break;
      case "bet":
        updateActions.deal = true;
        break;
      case "deal":
        updateActions.deal = false;
        updateActions.reset = false;
        break;
      case "player":
        let swapStatus = (currentHand === 0 && state.hand[1].cards.length === 2 && state.hand.length === 2)
        updateActions = {
          deal: false,
          hit: true,
          stay: true,
          split: state.hand[currentHand].canSplit,
          switch: swapStatus,
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

  const resetHands = () => {
      let hand = []
      hand[0] = new Hand();
      hand[1] = new Hand();
      let dealer = new Hand();
      setState(prev => ({
        ...prev, hand: hand, currentHand: 0, dealer: dealer
      }))
  }

  return { state, updateHand, updateHands, addSplitHand, updateActions, resetHands }
}