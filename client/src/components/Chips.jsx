import five from "./images/chip5.png"
import twentyFive from "./images/chip25.png"
import oneHundred from "./images/chip100.png"
import fiveHundred from "./images/chip500.png"
import clear from "./images/delete.png"

import './Chips.css'
export default function Chips(props) {

let totalBet = 0;
let bankroll = props.bankroll;
let tokens = "tokens";

for (const hand of props.hand) {
  totalBet += hand.bet;
}
if (props.turn !== "bet"){
tokens = tokens +"-hidden"
}

  return (
    <div class="betting">
    <div class="Chips">
      <h2> Total bet: {totalBet} </h2>
      <span class={tokens}>
      <input type="image"  class="token" onClick={props.addBet5} src={five} alt="Wrong path" height="72" length="72"/>
      <input type="image" class="token" onClick={props.addBet25} src={twentyFive} alt="Wrong path"  height="72" length="72"/>
      <input type="image" class="token" onClick={props.addBet100} src={oneHundred} alt="Wrong path" height="72" length="72" />
      <input type="image" class="token" onClick={props.addBet500} src={fiveHundred} alt="Wrong path" height="72" length="72" />
      <input type="image" class="token" onClick={props.clearBet} src={clear} alt="Wrong path" />
      </span>
      </div>
      <section class="bankroll">
        <h3> {bankroll}$ </h3>
      </section>
    </div>
  )
}