import React, { useState } from 'react'
import { Button, Form, Row, Col, Alert } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./CSS/Popup.css"
import axios from "axios";

export default function Login({props, onClose, logIn }) {

    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [show, setShow] = useState(false);


    const handleSubmit = (e) => {
            e.preventDefault();            
            // console.log(userEmail)
            // console.log(userPassword)
        axios.post("/api/users/login", {
                email: userEmail,
                password: userPassword
            }).then(res => {
                console.log(res)
                if (res.data === false){
                    setShow(true)
                } else {
                    logIn()
                    //props.reRender()
                    onClose()
                }

            }).catch(res => {
                console.log(res)
        })
    }

    if(!show){
    return (
        <div>
            <Form onSubmit={ handleSubmit }>
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
    } else {
        return (
            <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Oh snap!</Alert.Heading>
                    <p>
                        "Email or Password Incorect"
                    </p>
        </Alert>
        
        )
    }
}
