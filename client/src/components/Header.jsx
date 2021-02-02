import React, { useEffect, useState } from "react"
import Popup from "./Popup"
import Login from "./Login"
import Deposit from "./Deposit"
import Withdraw from "./Withdraw"
import Registration from "./Registration"
import Leaderboard from "./Leaderboard"
import Rules from './Rules';
import Strategy from './Strategy';
import { Navbar, NavDropdown, Nav, Button } from "react-bootstrap"
import axios from 'axios';
import useApplicationData from "../hooks/useApplicationData"

import 'bootstrap/dist/css/bootstrap.min.css';
import "./CSS/Header.css";
import "./CSS/Popup.css"
import "./CSS/NewHeader.css"
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Header(props, send) {

  const [selectedMenu, setSelectedMenu] = useState(null)
  const [isLogedIn, setIsLogedIn] = useState(false)

  const { state,
    sendBankroll
  } = useApplicationData();
  // let loginCheck = () =>{
  //   setIsLogedIn(true);
  // }

  useEffect(() => {
    axios.get("/api/users/user").then(res => {
        //console.log(res)
        if (res.data === "no session found"){
          console.log("no session")
        } else {
          //logedIn = true
          setIsLogedIn(true)
        }
    })

  }, [])

  const signOut = () => {
    axios.post("api/users/logout").then(res => {
      console.log(res)
      setIsLogedIn(false);
      //logedIn = false
    })
  }

  if (isLogedIn === false) {


    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">

            <NavDropdown title="Menu" id="collasible-nav-dropdown">
              <NavDropdown.Item onClick={() => setSelectedMenu("register")}>Register</NavDropdown.Item>
              <Popup open={selectedMenu === "register"} onClose={() => setSelectedMenu(null)}>
                <Registration 
                logIn={() => setIsLogedIn(true)}
                onClose={() => setSelectedMenu(null)}></Registration>
              </Popup>
              <NavDropdown.Item onClick={() => setSelectedMenu("login")}>Login</NavDropdown.Item>
              <Popup open={selectedMenu === "login"} onClose={() => setSelectedMenu(null)}>
                <Login
                  logIn={() => setIsLogedIn(true)}
                  onClose={() => setSelectedMenu(null)}></Login>
              </Popup>
              <NavDropdown.Item onClick={() => setSelectedMenu("deposit")}>Deposit</NavDropdown.Item>
              <Popup open={selectedMenu === "deposit"} onClose={() => setSelectedMenu(null)}>
                <Deposit
                  onClose={() => setSelectedMenu(null)}></Deposit>
              </Popup>
              <NavDropdown.Item onClick={() => setSelectedMenu("withdraw")}>Withdraw</NavDropdown.Item>
              <Popup open={selectedMenu === "withdraw"} onClose={() => setSelectedMenu(null)}>
                <Withdraw onClose={() => setSelectedMenu(null)}> </Withdraw>
              </Popup>
              <NavDropdown.Item onClick={() => setSelectedMenu("rules")}>Rules</NavDropdown.Item>
              <Popup open={selectedMenu === "rules"} onClose={() => setSelectedMenu(null)}>
                <Rules onClose={() => setSelectedMenu(null)}></Rules>
              </Popup>
              <NavDropdown.Item onClick={() => setSelectedMenu("strategy")}>Strategy</NavDropdown.Item>
              <Popup open={selectedMenu === "strategy"} onClose={() => setSelectedMenu(null)}>
                <Strategy onClose={() => setSelectedMenu(null)}></Strategy>
              </Popup>
              <NavDropdown.Item onClick={() => setSelectedMenu("leaderboard")}>Leaderboard</NavDropdown.Item>
              <Popup open={selectedMenu === "leaderboard"} onClose={() => setSelectedMenu(null)}>
                <Leaderboard onClose={() => setSelectedMenu(null)}></Leaderboard>
              </Popup>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
   
  )
  }else{
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">

            <NavDropdown title="Menu" id="collasible-nav-dropdown">
              <NavDropdown.Item onClick={() => setSelectedMenu("register")}>Register</NavDropdown.Item>
              <Popup open={selectedMenu === "register"} onClose={() => setSelectedMenu(null)}>
                <Registration onClose={() => setSelectedMenu(null)}></Registration>
              </Popup>
              <NavDropdown.Item onClick={() => setSelectedMenu("login")}>Login</NavDropdown.Item>
              <Popup open={selectedMenu === "login"} onClose={() => setSelectedMenu(null)}>
                <Login onClose={() => setSelectedMenu(null)}></Login>
              </Popup>
              <NavDropdown.Item onClick={() => setSelectedMenu("deposit")}>Deposit</NavDropdown.Item>
              <Popup open={selectedMenu === "deposit"} onClose={() => setSelectedMenu(null)}>
                <Deposit
                  // update={() => updateBankroll}
                  bank={sendBankroll()}
                  onClose={() => setSelectedMenu(null)}>
                </Deposit>
              </Popup>
              <NavDropdown.Item onClick={() => setSelectedMenu("withdraw")}>Withdraw</NavDropdown.Item>
              <Popup open={selectedMenu === "withdraw"} onClose={() => setSelectedMenu(null)}>
                <Withdraw
                  // update={() => updateBankroll}
                  bank={sendBankroll()}
                  onClose={() => setSelectedMenu(null)} >
                  </Withdraw>
              </Popup>
              <NavDropdown.Item onClick={() => setSelectedMenu("rules")}>Rules</NavDropdown.Item>
              <Popup open={selectedMenu === "rules"} onClose={() => setSelectedMenu(null)}>
                <Rules onClose={() => setSelectedMenu(null)}></Rules>
              </Popup>
              <NavDropdown.Item onClick={() => setSelectedMenu("strategy")}>Strategy</NavDropdown.Item>
              <Popup open={selectedMenu === "strategy"} onClose={() => setSelectedMenu(null)}>
                <Strategy onClose={() => setSelectedMenu(null)}></Strategy>
              </Popup>
              <NavDropdown.Item onClick={() => setSelectedMenu("leaderboard")}>Leaderboard</NavDropdown.Item>
              <Popup open={selectedMenu === "leaderboard"} onClose={() => setSelectedMenu(null)}>
                <Leaderboard onClose={() => setSelectedMenu(null)}></Leaderboard>
              </Popup>
            </NavDropdown>
          </Nav>
          <Nav class="info">
            <strong> Signed in as: {state.user.first_name} </strong>
          </Nav>
          <Nav>
            <Button onClick={signOut}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}