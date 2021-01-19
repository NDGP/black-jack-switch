const { Deck, Hand, swap } = require("./card-logic");

const deck = new Deck(1);
const hand1 = new Hand();
const hand2 = new Hand();

hand1.add(deck.draw());
hand1.add(deck.draw());
hand1.add(deck.draw());
hand1.add(deck.draw());

hand2.add(deck.draw());
hand2.add(deck.draw());
console.log("dealer cards:", hand2.cards)
const getHandValue = (cards) => {
  let handValue = 0;
  for (const card of cards) {
    let value = card.split("").slice(0, card.length - 1).join("");
    switch (value) {
      case 'J':
        value = 10;
        break;
      case 'Q':
        value = 10;
        break;
      case 'K':
        value = 10;
        break;
      case 'A':
        value = 11;
        break;
      default:
        value = Number(value);
    }
    handValue += value;
  }
  console.log("HAND VALUE:", handValue)
  return handValue;
}

// console.log(getHandValue(hand2.cards));
//getHandValue(hand2.cards);


// winning condition switch
let wins = 0;
let losses = 0;
let draws = 0;
let blackjacks = 0;

const winningConditions = (playerValue, dealerValue, cards) => {
  let result = ""
  let message = "";

  // if player busts (22+) dealer wins (lose bet)
  if (playerValue > 21) {
    result = "loss";
    message = `You bust with ${playerValue}. You lose!`;
    losses++;
  }
  // if dealer busts (23+) player wins (win bet)
  else if (playerValue <= 21 && dealerValue > 22) {
    result = "win";
    message = `Dealer busted with ${dealerValue}. You win with ${playerValue}!;`
    wins++;
  }
  // if dealer gets 22 its a push (no change)
  else if (dealerValue === 22 && playerValue < 22) {
    result = "push";
    message = "Push, dealer has 22."
    draws++;
  }
  // Dealer and Player have same value its a push (no change)
  else if (playerValue === dealerValue && playerValue < 22) {
    result = "push";
    message = `Push you both have ${playerValue}`;
    draws++;
  }
  // if player has blackjack and dealer doesn't player wins (win bet)
  else if (playerValue === 21 && dealerValue < 21 && cards === 2) {
    result = "win";
    message = `You win with blackjack!`
    wins++;
    blackjacks++;
  }
  // if dealer has 21 and player doesn't dealer wins (lose bet)
  else if (dealerValue === 21 && playerValue < 21) {
    result = "loss";
    message = `You lose, dealer has ${dealerValue} and you have ${playerValue}.`
    losses++;
  }
  // if player is closer to 21 without going over (win bet)
  else if ((21 - playerValue) < (21 - dealerValue) && dealerValue <= 20 && playerValue <= 20) {
    result = "win"
    message = `You win with ${playerValue} and the dealer has ${dealerValue}.`
    wins++;
  }
  // if dealer is closer to 21 without going over (lose bet)
  else if ((21 - dealerValue) < (21 - playerValue) && dealerValue <= 20 && playerValue <= 20) {
    result = "loss";
    message = `You lose with ${playerValue} and the dealer has ${dealerValue}.`
    losses++;
  }
  return message
}

const betManagement = (result) => {
  switch (result) {
    case "win":
      console.log("you won your bet back");
      break;
    case "loss":
      console.log("you lost your bet");
      break;
    case "push":
      console.log("you broke even");
        break;
  }

}
// player bust
// console.log(winningConditions(22, 15))
// // dealer bust
// console.log(winningConditions(20, 23))
// // dealer 22 = push
// console.log(winningConditions(20, 22))
// // same value 
// console.log(winningConditions(17, 17))
// // both 21 
// console.log(winningConditions(21, 21))
// // player wins with 21
// console.log(winningConditions(21, 20, 2))
// // dealer wins with 21
// console.log(winningConditions(20, 21))
// // player wins with < 21 
// console.log(winningConditions(20, 17))
// // dealer wins with < 21 
// console.log(winningConditions(12, 17))

// testing with card logic 
console.log(winningConditions(getHandValue(hand1.cards), getHandValue(hand2.cards)));

// stats
console.log(`${wins} wins`)
console.log(`${losses} losses`)
console.log(`${draws} draws`)
console.log(`${blackjacks} blackjacks`)

let totalHands = wins + losses + draws
// win percentage
let winPercentage = wins / totalHands
console.log(`Win percentage: ${winPercentage.toFixed(2) * 100}%`)
// blackjack percentage
let bjPercentage = blackjacks / totalHands
console.log(`Blackjack percentage: ${bjPercentage.toFixed(2) * 100}%`)








// blackjack quirks
// if player gets BJ (before switching) he wins, can't push on 22
// if dealer's one visible car is A, J, Q, K or 10 he has to peak to check if he has blackjack.
// ^ if he has blackjack its over right away. If player also has BJ it's a push.



// Pre dealing

// Betting
// each hand is a seperate entity
// user can alter bet before cards are dealt
// chip count gets affected based on winning condition

// Dealing
// gives 4 face up cards to player in sets of 2. 1 face up and 1 face down to dealer...via api 
// alternating hand 1, hand 2, dealer, repeat.

// count/value display
// example player: 8,6 (14) Dealer: ?, 10 (10)


// Switch 
// choice to switch
// Switch the top two of cards of each hand if button is clicked.

// Hit
// adds card to players hand
// increase count by card value
// can only hit if under 21
// if over 21 = bust


// Stay
// Don't take any cards
// keep count/value
// if 21, automatic stay

// Split 
// if numbers are the same you can split into 2 seperate hands, if you have enough funds.
// doubles your bet
// each seperate hand gets a card
// play each hand seperately 
// you can hit on a split
// you can stay on a split
// you can double on a split, if you have enough funds.
// you can split a split. Stretch
// 

// Double Down (usually done when player has 10, 11 or when the dealer has a 6 or 5)
// Doubles your bet
// you get dealt one card
// you cant make any moves after
// automatic stay after the double down

// update bankroll 
// add winning
// subtract losings

// option to re-bet
// if no, reset the process

// Dealer quirks
// dealer has to stay on  => hard 17
// dealer has to hit on < hard 17
// dealer has to hit on soft 17 (A + 6) (A+16)
// only one card visible

// add toggle for the rules
// 