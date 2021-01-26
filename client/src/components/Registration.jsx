import React, { useState } from 'react'
import { Button, Form, Col, Alert, Row } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Popup.css"
import axios from 'axios';
 
export default function Registration({props, onClose, logIn}) {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [show, setShow] = useState(false);
    const [errText, setErrText] = useState('')


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(firstName)
        console.log(lastName)
        console.log(userEmail)
        console.log(userPassword)
        console.log(confirmPassword)

    // const errors = validate(e);
   
    axios.post("/api/users", {
            first_name: firstName,
            last_name: lastName,
            email: userEmail,
            password: userPassword,
            confirmPassword: confirmPassword
        }).then(res => {
            if (res.data){
                console.log(res.data)
                let errText = [];

                for (let key in res.data.errors){
                    let err = res.data.errors[key]
                        errText.push(err.msg)
                    }
                if (errText.length === 0){
                    logIn()
                    onClose()
                }else{
                errText[errText.length] += '.';
                setErrText(errText.join('. '))
                setShow(true)
                }
                
            }
        }).catch(res => {
            console.log(res)
        })
    }
    

    if(!show){
    return (
        <div>

            <Form onSubmit={ handleSubmit }>
                <Form.Row>
                <Col>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control 
                        value= { firstName } 
                        onChange={ (e) => { setFirstName(e.target.value) }} 
                        type="first name" 
                        placeholder="Enter First Name" />

                </Form.Group>
                </Col>
                <Col>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control 
                        value= { lastName } 
                        onChange={ (e) => { setLastName(e.target.value) }} 
                        type="last name" 
                        placeholder="Enter last name"   />

                </Form.Group>
                </Col>
                </Form.Row>

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

                <Form.Group controlId="formBasicPassword">
                <Form.Control 
                        valuse= { confirmPassword }
                        onChange={ (e) => { setConfirmPassword(e.target.value) }}
                        type="password" 
                        placeholder="Confirm Password" />
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
                    <Button variant="outline-danger" onClick = { onClose } >close</Button>
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
                        {errText}
                    </p>
          </Alert>
          
        )
    }
}
