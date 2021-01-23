import React, { useState } from "react"
import Popup from "./Popup"
import Login from "./Login"
import Deposit from "./Deposit"
import Withdraw from "./Withdraw"
import Registration from "./Registration"
import Rules from './Rules';
import { Navbar, NavDropdown, Nav, Image} from "react-bootstrap"
import Strategy from './Strategy';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Header.css";
import "./Popup.css"
import "./NewHeader.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "./images/logoTest.png"


export default function Header(props) {

  const [selectedMenu, setSelectedMenu] = useState(null)

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">

      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">

          <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
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
                <Deposit></Deposit>
              </Popup>
            <NavDropdown.Item onClick={() => setSelectedMenu("withdraw")}>Withdraw</NavDropdown.Item>
              <Popup open={selectedMenu === "withdraw"} onClose={() => setSelectedMenu(null)}>
                <Withdraw></Withdraw>
              </Popup>
            <NavDropdown.Item onClick={() => setSelectedMenu("rules")}>Rules</NavDropdown.Item>
              <Popup open={selectedMenu === "rules"} onClose={() => setSelectedMenu(null)}>
                <Rules onClose={() => setSelectedMenu(null)}></Rules>
              </Popup>
              <NavDropdown.Item onClick={() => setSelectedMenu("strategy")}>Strategy</NavDropdown.Item>
              <Popup open={selectedMenu === "strategy"} onClose={() => setSelectedMenu(null)}>
                <Strategy onClose={() => setSelectedMenu(null)}></Strategy>
              </Popup>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
   
  )
}