import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import useLogout from '../Hooks/useLogout';
import { useState,useEffect } from 'react';

function Header() {

    let userData = JSON.parse(sessionStorage.getItem('userData'))
    let [role,setRole] = useState("")
    let logout = useLogout()

    useEffect(()=>{
        if(!userData)
        {
            logout()
        }
        else
        {
            setRole(userData.role)
        }
    },[])
  return (
    <Navbar bg="light" data-bs-theme="light">
    <Container>
      <Navbar.Brand href="#home">Navbar</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#features">Features</Nav.Link>
        <Nav.Link href="#pricing">Pricing</Nav.Link>
      </Nav>
      <Nav>
        <InputGroup>
      <Form inline>
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Search"
              className=" mr-sm-2"
            />
          </Col>
          <Col xs="auto">
            <Button type="submit"><span><i className="fa-solid fa-magnifying-glass"></i></span></Button>
          </Col>
        </Row>
      </Form>
      </InputGroup>
      </Nav>
      <Nav>
            <Nav.Item><h4>{`Register`}</h4></Nav.Item>
            &nbsp;
            <Nav.Item onClick={logout}><Button variant='danger'>Logout</Button></Nav.Item>
          </Nav>
    </Container>
  </Navbar>
  )
}

export default Header