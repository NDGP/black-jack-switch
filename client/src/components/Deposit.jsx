import React, { useState } from 'react'
import { Form } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Popup.css"

export default function Deposit(onClose) {

  const [amount, setAmount] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(amount)
}

  return (
    <div>
   
      <Form onSubmit={handleSubmit, onClose}>
          <Form.Group controlId="formBasicEmail">
          <Form.Label>Deposet</Form.Label>
              <Form.Control 
                  value= { amount } 
                  onChange={ (e) => { setAmount(e.target.value) }} 
                  type="deposit funds" 
                  placeholder="Enter Amount" />

              </Form.Group>
      </Form>
    </div>
  )
}
