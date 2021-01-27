import React, { useState } from 'react'
import { Button, Form, Row, Col } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Popup.css"
import axios from 'axios';
import useApplicationData from "../hooks/useApplicationData"

export default function Deposit(props) {

  const {
    //    state,
    //   sendBankroll,
    updateBankroll
  } = useApplicationData();

  const [amount, setAmount] = useState("")
  let bankroll = props.bank;
  let newBankroll = parseInt(bankroll) + parseInt(amount)

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put("/api/users/2", {
      bankroll: newBankroll
    }).then(res => {
      props.onClose()
      console.log("Bankroll before update", { bankroll })
      updateBankroll(newBankroll)
      console.log("Bankroll after update", { bankroll })

    })
  }

  console.log("amount", amount)
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Deposit</Form.Label>
          <Form.Control
            value={amount}
            onChange={(e) => { setAmount(e.target.value) }}
            type="deposit funds"
            placeholder="Enter Amount" />
        </Form.Group>
      </Form>
          <Row>
            <Col>
              <Button variant="primary" type="submit">Submit</Button>
            </Col>
            <Col>
              <Button variant="outline-danger" onClick={props.onClose}  >close</Button>
            </Col>
          </Row>
    </div>
  )
}
