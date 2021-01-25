import { useState, useEffect } from "react";
import axios from "axios";
import { checkResult } from "./helpers.js"
import { Hand } from "../helpers/cardLogic";

export default function useApplicationData() {

  const [state, setState] = useState({
    user: {},
    cards: [],
    hand: [],
    dealer: {},
    currentHand: -1,
    turn: null,
    currentUser: null,
    winnings: 0,
    actions: {
      deal: false,
      hit: false,
      stay: false,
      split: false,
      switch: false,
      double: false,
      reset: false,
    },
    cash: {
      bankroll: 0,
      bet: 0,
      initBankroll: 0
    }
  })

  useEffect(() => {
    Promise.all([ //unsure what the * does, might be security risk
      // axios.get('/api/users',
      //   { headers: { 'Access-Control-Allow-Origin': '*' } }),
      axios.get('/api/users/user',
        { headers: { 'Access-Control-Allow-Origin': '*' } }),
      axios.get('/api/cards',
        { headers: { 'Access-Control-Allow-Origin': '*' } })
    ]).then((all) => {
      //console.log(all[0].data.email, "EMAIL FROM AXIOS GET")
      let hand = []
      hand[0] = new Hand();
      hand[1] = new Hand();
      let dealer = new Hand();
      let updateActions = state.actions
      updateActions.deal = true;
      setState(prev => ({
        ...prev,
        // users: all[0].data,
        user: all[0].data,
        cash: {
          bankroll: all[0].data.bankroll,
          bet: 0,
          initBankroll: all[0].data.bankroll
        },
        cards: all[1].data,
        hand: hand,
        dealer: dealer,
        actions: updateActions,
        turn: "bet",
      }))
    });
  }, []);


  const updateBankroll = (newBankroll) => {
    let cash = {
      bankroll: newBankroll,
      bet: 0,
      initBankroll: newBankroll
    }
    setState(prev => ({ ...prev, cash: cash }));
  }

  const addBet = (amount) => {
    let bankroll = state.cash.bankroll;
    //if (state.turn === "bet"){
    if (amount * 2 > bankroll) {
      window.alert(`Insufficient funds, you are missing ${(amount * 2 - bankroll)}$`)
    } else {
      bankroll = state.cash.bankroll - (amount * state.hand.length);
      let bet = state.cash.bet + amount;
      let cash = {
        bankroll: bankroll,
        bet: bet,
        initBankroll: state.cash.initBankroll
      }
      let hands = state.hand;
      for (const hand of hands) {
        hand.bet = bet;
      }

      setState(prev => ({ ...prev, cash: cash, hand: hands }));
      //}
    }
  }

  const verifyResults = async (hands) => {
    let hand = hands;
    for (let i = 0; i < hand.length; i++) {
      hand[i].result = checkResult(hand[i], state.dealer);
      updateHand(hand[i]);
    }
    return hand;
  }

  const calculateBankrollChange = async (hands) => {
    let totalWinnings = 0;
    for (const hand of hands) {
      let winnings = 0;
      if (hand.result === 'WIN' || hand.result === 'BLACKJACK') {
        winnings = (hand.bet * 2);
      } else if (hand.result === 'PUSH') {
        winnings = hand.bet;
      } else if (hand.result === 'LOSS' || hand.result === 'BUST') {
        winnings = 0;
      }
      console.log(hand.result + ' for ' + hand.cards + 'winning: ' + winnings)
      totalWinnings += winnings;
    }
    console.log("TOTAL WINNINGS: ", totalWinnings)
    let newBankroll = state.cash.bankroll + totalWinnings
    console.log(`in calculateBankrollChange, final newBankroll: ${newBankroll}`)
    return newBankroll;
  }

  //splitBet
  const updateBet = (amount) => {
    let bankroll = state.cash.bankroll - amount;
    let cash = {
      bankroll: bankroll,
      bet: state.cash.bet,
      initBankroll: state.cash.initBankroll
    }
    setState(prev => ({ ...prev, cash: cash }));
  }

  const clearBet = () => {
    //if (state.turn === "bet") {
    let cash = {
      bankroll: state.cash.initBankroll,
      bet: 0,
      initBankroll: state.cash.initBankroll
    }
    setState(prev => ({ ...prev, cash: cash }));
    resetHands();
  }

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
        updateActions.split = false;
        //will this work for setting state?
        verifyResults(state.hand).then(res => {
          calculateBankrollChange(res).then(res => {
            updateBankroll(res);
            axios.put(`api/users/${state.user.id}`, { bankroll: res })
              .then(res => {
                console.log("This is in the PUT:", res)
              })
          })
        })
        break;
      case "bet":
        updateActions.deal = true;
        updateActions.reset = false;
        updateActions.split = false;
        break;
      case "deal":
        updateActions.deal = false;
        updateActions.reset = false;
        updateActions.split = false;
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
      default:
        updateActions = {
          deal: false,
          hit: false,
          stay: false,
          split: false,
          switch: false,
          double: false
        }
    }
    setState(prev => ({ ...prev, currentHand: currentHand, actions: updateActions, turn: phase }))
  }

  const resetHands = () => {
    let hand = []
    hand[0] = new Hand();
    hand[1] = new Hand();
    let dealer = new Hand();
    setState(prev => ({
      ...prev, hand: hand, dealer: dealer
    }))
  }

  return {
    state, updateHand,
    updateHands, addSplitHand, updateActions, resetHands,
    updateBankroll, addBet, clearBet, updateBet
  }
}