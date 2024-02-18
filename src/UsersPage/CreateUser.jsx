import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import AxiosService from '../Common/ApiService';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'

function SignUp() {
    let[firstName,setFirstName]=useState("");
    let[lastName,setLastName]=useState("");
    let[email,setEmail]=useState("");
    let[password,setPassword]=useState("");
    const navigate= useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            const res= await AxiosService.post("/user/register",{firstName,lastName,email,password})
            if(res.status===201){
              navigate("/login")
              toast.success(res.data.message);
            } 
        } catch (error) {
            toast.error(error.res.data.message || "Error Occoured! Please try after some time")
        }
        
    }
    
  return<>
  <div className='container card-style-align'>
  <Card className='card-style' style={{ width: '100%' }}>
        <Card.Header>Sign Up</Card.Header>
        <Card.Body>
        <Form >
      <Form.Group className="mb-3" controlId="formBasicFirstName">
        <Form.Label>FirstName</Form.Label>
        <Form.Control className='textbox' type="text" placeholder="Enter FirstName" onChange={(e)=>setFirstName(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicLastName">
        <Form.Label>LastName</Form.Label>
        <Form.Control className='textbox' type="text" placeholder="Enter LastName"  onChange={(e)=>setLastName(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control className='textbox' type="email" placeholder="Enter email"  onChange={(e)=>setEmail(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control className='textbox' type="password" placeholder="Password"  onChange={(e)=>setPassword(e.target.value)} />
      </Form.Group>
      
      <Button variant="dark" type="submit" onClick={(e)=>handleSubmit(e)}>
        Sign Up
      </Button>
    </Form>    
        </Card.Body>
      </Card>
      </div>
  </>
}

export default SignUp