import React, { useState } from 'react'
import { Button, Form, Row, Col } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Popup.css"
import axios from 'axios';

export default function Withdraw( props ) {

  const [amount, setAmount] = useState("")
  let bankroll = props.bank;
  let newBankroll = parseInt(bankroll) - parseInt(amount)

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put("/api/users/2", {
     bankroll: newBankroll
    }).then(res => {
      console.log("Bankroll updated", {bankroll} )

      props.onClose()
    })
  }

  console.log("amount", amount)
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Withdraw</Form.Label>
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
              <Button variant="outline-danger" onClick = { props.onClose }  >close</Button>
            </Col>
          </Row>
    </div>
  )
}
