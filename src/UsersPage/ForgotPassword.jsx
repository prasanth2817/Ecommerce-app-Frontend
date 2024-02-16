import React, { useState } from 'react'
import AxiosService from '../Common/ApiService'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {toast} from 'react-toastify'
import { Card } from 'react-bootstrap';

function ForgotPassword() {

    let[email,setEmail]=useState(" ")
    const validateEmail=async(e)=>{
      e.preventDefault()
        try {
            let res= await AxiosService.post("/user/forgot-password",{email})
            if(res.status===200){
              toast.success(res.data.message)
            }
        } catch (error) {
          if (error.response.status === 401) {
            // Token expired, display notification to the user
            toast.error("Password reset link has expired. Please initiate the process again.");
          } else {
            toast.error(
              error.response.data.message || "Error Occurred! Please try after some time"
            );
          }
        }
    }
  return <>
  <div className='container card-style-align'>
   <Card className='card-style' border="dark">
        <Card.Header>ForgotPassword</Card.Header>
        <Card.Body>
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control className='textbox' type="email" placeholder="Enter email"  onChange={(e)=>setEmail(e.target.value)} />
      </Form.Group>
      <Button variant="dark" type="submit" onClick={(e)=>validateEmail(e)}>
      submit
    </Button>
        </Card.Body>
      </Card>
   </div>
  </>
}

export default ForgotPassword