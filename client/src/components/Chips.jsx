import five from "./images/chip5.png"
import twentyFive from "./images/chip25.png"
import oneHundred from "./images/chip100.png"
import fiveHundred from "./images/chip500.png"

export default function Chips(props) {
  return (
    <div class="Chips">
      <input type="image" src={five} alt="Wrong path" />
      <input type="image" src={twentyFive} alt="Wrong path" />
      <input type="image" src={oneHundred} alt="Wrong path" />
      <input type="image" src={fiveHundred} alt="Wrong path" />
    </div>
  )
}