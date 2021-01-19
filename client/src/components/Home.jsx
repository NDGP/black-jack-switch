import {useState} from "react"
import Popup from "./Popup"
import Header from "./Header"


export default function Home( props){
  const [isOpen, setIsOpen] = useState(false)

  return (

  <div>
    <div>
    <Popup open={isOpen}>Hellllooooooo</Popup>
    </div>
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

    </section>
  </div>

  )
}