import five from "./images/chip5.png"
import twentyFive from "./images/chip25.png"
import oneHundred from "./images/chip100.png"
import fiveHundred from "./images/chip500.png"
import clear from "./images/delete.png"

import { useState } from 'react';


export default function Chips(props) {
let bet = props.bet;
let bankroll = props.bankroll

  return (
    <div class="betting">
    <div class="Chips">
      <h2> Current bet: {bet} </h2>
      <input type="image" onClick={props.addBet5} src={five} alt="Wrong path" />
      <input type="image" onClick={props.addBet25} src={twentyFive} alt="Wrong path" />
      <input type="image" onClick={props.addBet100} src={oneHundred} alt="Wrong path" />
      <input type="image" onClick={props.addBet500} src={fiveHundred} alt="Wrong path" />
      <input type="image" onClick={props.clearBet} src={clear} alt="Wrong path" />
      </div>
        <section class="bankroll">
        <h3> {bankroll}$ </h3>
      </section>
    </div>
  )
}