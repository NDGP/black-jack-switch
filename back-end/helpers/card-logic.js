const pool = require('../app')

class Deck {
    constructor(decks) {
        let cards = []
        const faces = ['A', "J", "Q", "K"]
        const suits = ["H", "S", "C", "D"]

        for (let deckCount = 0; deckCount < decks; deckCount++) {
            for (const suit of suits) {
                for (let i = 2; i < 11; i++) {
                    cards.push(`${i}${suit}`)
                }
                for (const face of faces) {
                    cards.push(`${face}${suit}`)
                }
            }
        }
        this.cards = cards;
        this.resetCards = [...cards];
        this.shuffle();
    }
    shuffle() {
        console.log('shuffling deck...')
        for (let i = this.cards.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * i);
            let temp = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = temp;
        }
        console.log('deck shuffled!')
    }
    draw() {
        return this.cards.pop()
    }
    reset() {
        this.cards = this.resetCards;
        this.shuffle();
    }
}

class Hand {
    constructor(firstCard) {
        let cards = [];
        if (firstCard) cards.push(firstCard);
        this.cards = cards;
    }
    add(card) {
        this.cards.push(card);
    }
    discard() {
        this.cards = [];
    }
    splitHand() {
        return this.cards.pop();
    }
}


//switch is not allowed as a function name in js, I will use swap instead
const swap = (hand1, hand2)=> {
    let temp = hand1.cards[1];
    hand1.cards[1] = hand2.cards[1];
    hand2.cards[1] = temp;
}

let test = pool.query('Select * from users;')

console.log(test)