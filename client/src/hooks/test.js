const updateHands = (hands) => {
  let activeHand = state.currentHand;
  for (const hand of hands) {
    //first calculates the values hand
    let value = 0;
    let aces = hand.ace;

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
    }
  }


  //checks if hand is >= 21, if so, on to the next hand
  // if (hand.value >= 21 && activeHand < state.hand.length - 1) {
  //   activeHand++;
  // } else if (hand.value >= 21 && activeHand === state.hand.length - 1) {
  //   updateGame(0, "dealer")
  // }

  setState(prev => ({ ...prev, [hand]: hand, currentHand: activeHand }))
}