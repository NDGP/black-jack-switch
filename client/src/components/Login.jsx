import React, { useState } from 'react'
import { Button, Form, Row, Col } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Popup.css"

export default function Login({props, onClose }) {

    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")

    axios.post("http://localhost:3001/api/users", {
        email: userEmail,
        password: userPassword
    }).then(res => {
        
    })

    
    return (
        <div>
            <Form>
                <header>Login</header>
            <Form.Group controlId="formBasicEmail">
                    <Form.Control 
                        value= { userEmail } 
                        onChange={ (e) => { setUserEmail(e.target.value) }} 
                        type="email" 
                        placeholder= "Enter Email"/>

                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Control 
                        valuse= { userPassword }
                        onChange={ (e) => { setUserPassword(e.target.value) }}  
                        type="password" 
                        placeholder= "Enter Password" />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                </Form.Group>

                <Row>
                    <Col>
                    <Button variant="primary" type="submit">
                        Submit
                        </Button>
                    </Col>
                    <Col>
                        <Button variant="outline-danger" onClick = { onClose }  >close</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}
