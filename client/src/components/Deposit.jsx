import React, { useState } from 'react'
import { Button, Form, Row, Col } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./CSS/Popup.css"
import axios from 'axios';
import useApplicationData from "../hooks/useApplicationData"

export default function Deposit(props) {

  const {
    state,
    //   sendBankroll,
    updateBankroll
  } = useApplicationData();

  const [amount, setAmount] = useState("")
  let bankroll = props.bank;
  let newBankroll = parseInt(bankroll) + parseInt(amount)

  const handleSubmit = (e) => {
    console.log("this is the submit")
    e.preventDefault();
    axios.put(`/api/users/${state.user.id}`, {
      bankroll: newBankroll
    }).then(res => {
      updateBankroll(newBankroll)
      props.onClose()
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
          <Row>
            <Col>
              <Button variant="primary" type="submit">Submit</Button>
            </Col>
            <Col>
              <Button variant="outline-danger" onClick={props.onClose}  >close</Button>
            </Col>
          </Row>
      </Form>
    </div>
  )
}
