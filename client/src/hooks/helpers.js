const checkResult = (player, dealer) => {
  let result = "";

  // if player busts
  if (player.value > 21) {
    result = `BUST`;
    // player has 21
  } else if (player.value === 21) {
    result = `WIN`;
    if (dealer.value === (21 || 22)) {
      result = `PUSH`;
      if (player.cards.length === 2) {
        result = `BLACKJACK`
        if (dealer.cards.length === 2 && dealer.value === 21) {
          result = `PUSH`;
        }
      }
    }
    //player < 21
  } else if (player.value < 21) {
    result = 'WIN';
    if (dealer.value === 22 || dealer.value === player.value) {
      result = `PUSH`;
    } else if ((dealer.value > player.value) && (dealer.value < 22)) {
      result = 'LOSS'
    }
  }
  player.result = result;
  return result;
}

const calculateBankrollChange = async (hands, bankroll) => {
  let totalWinnings = 0;
  for (const hand of hands) {
    let winnings = 0;
    if (hand.result === 'WIN' || hand.result === 'BLACKJACK') {
      winnings = (hand.bet * 2);
    } else if (hand.result === 'PUSH') {
      winnings = hand.bet;
    }
    totalWinnings += winnings;
  }
  let newBankroll = bankroll + totalWinnings
  return newBankroll;
}


module.exports = { checkResult, calculateBankrollChange }