// winning condition switch

// if dealer has 21 and player doesn't dealer wins (lose bet)
// if player has 21 and dealer doesn't player wins (win bet)
// if they have both have 21 they push (no change)
// if dealer gets 22 its a push (no change)
// if player busts (22+) dealer wins (lose bet)
// if dealer busts (23+) player wins (win bet)
// if player is closer to 21 without going over (win bet)
// if dealer is closer to 21 without going over (lose bet)

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