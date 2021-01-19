import React from 'react'
import { Button, Form } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Popup.css"

export default function Withdraw() {
  return (
    <div>
        <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                This is Withdraww
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
           
          </Form>
          <Button variant="primary" type="submit">
              Submit
            </Button>
    </div>
  )
}
