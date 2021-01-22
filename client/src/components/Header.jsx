import React, { useState } from "react"
import {Link} from 'react-router-dom'
import Popup from "./Popup"
import Home from "./Home"
import Login from "./Login"
import Deposit from "./Deposit"
import Withdraw from "./Withdraw"
import Registration from "./Registration"
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Header.css";
import "./Popup.css"



export default function Header(props){

  const [selectedMenu, setSelectedMenu] = useState(null)
  
  return (
  <div class="dropdown">
    <button class="dropbtn">Menu</button>
  <div id="myDropdown" class="dropdown-content">
  <button onClick={() => setSelectedMenu("register")}>Resgister</button>
      <Popup open = { selectedMenu === "register" } onClose = { () => setSelectedMenu(null)}>
          <Registration onClose = { () => setSelectedMenu(null)}></Registration>
      </Popup>
    <button onClick={() => setSelectedMenu("deposit")}>Deposit</button>
      <Popup open = { selectedMenu === "deposit" } onClose = { () => setSelectedMenu(null)}>
          <Deposit></Deposit>
      </Popup>
    <button onClick={() => setSelectedMenu("withdraw")}>Withdraw</button>
      <Popup open = { selectedMenu === "withdraw" } onClose = { () => setSelectedMenu(null)}>
          <Withdraw></Withdraw>
      </Popup>
    <button onClick={() => setSelectedMenu("login")}>Login</button>
      <Popup open = { selectedMenu === "login"} onClose = { () => setSelectedMenu(null)}>
          <Login onClose = { () => setSelectedMenu(null)}></Login>
      </Popup>
      <button class="logout">Logout </button>  
      </div>
    </div>
  )
}