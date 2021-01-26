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
    winnings: 0,
    bankroll: 0,
    bet: 0,
    initBankroll: 0,
    actions: {
      deal: false,
      hit: false,
      stay: false,
      split: false,
      switch: false,
      double: false,
      reset: false,
    }
  })

  //Get's logged-in User's data, as well as all of our card informations
  useEffect(() => {
    Promise.all([
      axios.get('/api/users/user',
        { headers: { 'Access-Control-Allow-Origin': '*' } }),
      axios.get('/api/cards',
        { headers: { 'Access-Control-Allow-Origin': '*' } })
    ]).then((all) => {
      let hand = []
      hand[0] = new Hand();
      hand[1] = new Hand();
      let dealer = new Hand();
      let updateActions = {}
      updateActions.deal = true;
      setState(prev => ({
        ...prev,
        user: all[0].data,
        bankroll: all[0].data.bankroll,
        initBankroll: all[0].data.bankroll,
        cards: all[1].data,
        hand: hand,
        dealer: dealer,
        actions: updateActions,
        turn: "bet",
      }))
    });
  }, []);


  //////////betting / money handling

  const updateBankroll = (newBankroll) => {
    setState(prev => ({ ...prev, bankroll: newBankroll, initBankroll: newBankroll }));
  }

  const addBet = (amount) => {
    let bankroll = state.bankroll;
    if (amount * 2 > bankroll) {
      window.alert(`Insufficient funds! you are missing $${(amount * 2 - bankroll)}`)
    } else {
      bankroll = state.bankroll - (amount * state.hand.length);
      let bet = state.bet + amount;
      let hands = state.hand;
      for (const hand of hands) {
        hand.bet = bet;
      }
      setState(prev => ({ ...prev, hand: hands, bankroll: bankroll, bet: bet }));
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
    let newBankroll = state.bankroll + totalWinnings
    return newBankroll;
  }

  //called on splits and double-downs
  const updateBet = (amount) => {
    let bankroll = state.bankroll - amount;
    setState(prev => ({ ...prev, bankroll: bankroll }));
  }

  const clearBet = () => {
    let initBankroll = state.initBankroll
    let hand = []
    hand[0] = new Hand();
    hand[1] = new Hand();
    setState(prev => ({ ...prev, bankroll: initBankroll, bet: 0, hand: hand }));
  }

  ////

  const updateHand = (hand) => {
    let value = 0;
    let aces = hand.ace;

    //first calculates this hand's value and aces
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

  const spawnSplitHand = (newHand) => {
    let updateHands = state.hand;
    let currentHand = state.currentHand
    if (currentHand < updateHands.length) {
      updateHands.splice((currentHand + 1), 0, newHand)
    } else {
      updateHands.push(currentHand);
    }
    setState(prev => ({ ...prev, hand: updateHands }))
  }

  //set available actions for the player based on the current turn/phase
  const updateActions = (currentHand, phase) => {
    let updateActions = state.actions
    switch (phase) {
      case "reveal":
        updateActions.reset = true;
        updateActions.split = false;
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


  return {
    state, updateHand,
    spawnSplitHand, updateActions,
    updateBankroll, addBet, clearBet, updateBet
  }
}