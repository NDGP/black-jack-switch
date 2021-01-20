import React, { useState } from 'react'
import { Button, Form, Col } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Popup.css"
import axios from 'axios';

export default function Registration({props, onClose}) {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")


    const validate = () => {
        let errors = {};

            if (firstName === "") errors.firstName = "Must have first name"
            if (lastName === "") errors.lastName = "Must have last name"
            if (userEmail === "") errors.email = "Must have eamil"
            if (userPassword === "") errors.pasword = "Must have password"
        console.log(errors)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(firstName)
        console.log(lastName)
        console.log(userEmail)
        console.log(userPassword)
        console.log(confirmPassword)

    const errors = validate(e);

    if (Object.keys(errors).length === 0){
        console.log("ready to send user to api")
        //call API here
        axios.post("http://localhost:3001/api/users", {
            first_name: firstName,
            last_name: lastName,
            email: userEmail,
            pasword: userPassword
        }).then(res => {
            console.log(res)
            console.log(res.data)
        })
    } 
        
    }

    return (
        <div>

        <Form onSubmit={handleSubmit, onClose}>
            <Form.Row>
            <Col>
            <Form.Group controlId="formBasicEmail">
                <Form.Control 
                    value= { firstName } 
                    onChange={ (e) => { setFirstName(e.target.value) }} 
                    type="first name" 
                    placeholder="Enter Fist Name" />

            </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId="formBasicEmail">
                <Form.Control 
                    value= { lastName } 
                    onChange={ (e) => { setLastName(e.target.value) }} 
                    type="last name" 
                    placeholder="Enter Last Name" />

            </Form.Group>
            </Col>
            </Form.Row>

            <Form.Group controlId="formBasicEmail">
                <Form.Control 
                    value= { userEmail } 
                    onChange={ (e) => { setUserEmail(e.target.value) }} 
                    type="email" 
                    placeholder="Enter email" />

            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Control 
                    valuse= { userEmail }
                    onChange={ (e) => { setUserPassword(e.target.value) }}  
                    type="password" 
                    placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Control 
                    valuse= { confirmPassword }
                    onChange={ (e) => { setConfirmPassword(e.target.value) }}
                    type="password" 
                    placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
            </Form.Group>
           
          <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
    )
}
