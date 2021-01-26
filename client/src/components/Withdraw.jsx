import React, { useState } from 'react'
import {  Form, Row, Col, Button } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Popup.css"

export default function Withdraw({ onClose }) {

  const [value, setValue] = useState("")

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

            <Row>
                <Col>
                <Button variant="primary" type="submit">
                    Submit
                    </Button>
                </Col>
                <Col>
                    <Button variant="outline-danger" onClick = { onClose } >close</Button>
                </Col>
            </Row>
        </Form>
    </div>
  )
}
