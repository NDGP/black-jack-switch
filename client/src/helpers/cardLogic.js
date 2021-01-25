class Deck {
    constructor(decks) {
        let cards = []
        const faces = ['A', "J", "Q", "K"]
        const suits = ["H", "S", "C", "D"]

        for (let deckCount = 0; deckCount < decks; deckCount++) {
            for (const suit of suits) {
                for (let i = 1; i < 10; i++) {
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
    constructor(firstCard, preBet) {
        let cards = [];
        if (firstCard) cards.push(firstCard);
        this.cards = cards;
        this.value = 0;
        this.ace = 0;
        this.canSplit = false;
        this.bet = 0;
        if (preBet) this.bet = preBet;
        this.result = 'PUSH'
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
    // clear() {
    //     this.cards = [];
    //     this.value = 0;
    //     this.ace = 0;
    //     this.canSplit = false;
    //     this.bet = 0;
    // }
}

module.exports = { Deck, Hand };