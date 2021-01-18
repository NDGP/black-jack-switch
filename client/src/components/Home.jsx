import axios from "axios";
import { Deck, Hand, swap} from "../helpers/card-logic";
import { useState, useEffect } from "react";

const deck = new Deck(1);
const hand1 = new Hand();
const hand2 = new Hand();

hand1.add(deck.draw());
hand1.add(deck.draw());

hand2.add(deck.draw());
hand2.add(deck.draw());

export default function Home(props){
  
  const [state, setState] = useState({
    users: []
  })

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:3001/api/users',
      {headers: {'Access-Control-Allow-Origin':'*'}})
    ]).then((all) => {
      setState(prev => ({...prev, users: all[0].data}))
    });
  }, []);


      console.log("Users.data??", state.users)
  return (
    <section>
      <h1> Blackjack switch table</h1>
      <h3> Place your bet</h3>
      <ul>
        <li>Switch</li>
        <li>Hit</li>
        <li>Stand</li>
        <li>Double down</li>
        <li>Split</li>

      </ul>

      <div>
        DECK:
        < br/>
        {deck.cards}
      </div>

      <div>
        HAND1: {hand1.cards}
      </div>

      <div>
        HAND2: {hand2.cards}
      </div>

      <button onClick={() => hand1.add(deck.draw())}>
        DRAW CARD
      </button>

      <div>
        THESE ARE THE USERS:
        {JSON.stringify(state.users)}
      </div>

    </section>

  )
}