import five from "./images/chip5.png"
import twentyFive from "./images/chip25.png"
import oneHundred from "./images/chip100.png"
import fiveHundred from "./images/chip500.png"
import clear from "./images/delete.png"

import { useState } from 'react';

export default function Chips(props) {

  const [bet, setBet] = useState(0);

  return (
    <div class="betting">
    <div class="Chips">
      <h2> Current bet: {bet} </h2>
      <input type="image" onClick={() => setBet(bet + 5)} src={five} alt="Wrong path" />
      <input type="image" onClick={() => setBet(bet + 25)} src={twentyFive} alt="Wrong path" />
      <input type="image" onClick={() => setBet(bet + 100)} src={oneHundred} alt="Wrong path" />
      <input type="image" onClick={() => setBet(bet + 500)} src={fiveHundred} alt="Wrong path" />
      <input type="image" onClick={() => setBet(bet * 0)} src={clear} alt="Wrong path" />
      </div>
    </div>
  )
}