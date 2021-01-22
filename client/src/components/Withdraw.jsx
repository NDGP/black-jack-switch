import React, { useState } from 'react'
import { Button, Form } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Popup.css"

export default function Withdraw(onClose) {

  const [value, setValuet] = useState("")


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(value)
}

  return (

    <div>
        <Form onSubmit={handleSubmit, onClose}>
            <Form.Group controlId="formBasicRange">
              <Form.Label>withdraw</Form.Label>
              <Form.Control type="range" />
            </Form.Group>
        </Form>
    </div>
  )
}
