import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import  {useNavigate} from 'react-router-dom';
import AxiosService from '../Common/ApiService';
import {toast} from 'react-toastify'
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import Spinner from "react-bootstrap/Spinner";

function Login() {
    let [email,setEmail]=useState("")
    let [password,setPassword]=useState("")
    const [loading, setLoading] = useState(false);
    const { setIsLoggedIn } = useAuth();
    const navigate= useNavigate();

const validateLogin=async(e)=>{
        e.preventDefault()
        setLoading(true)
try {
    const res= await AxiosService.post("/user/login",{email,password})
    if(res.status===200){
        toast.success(res.data.message)
        sessionStorage.setItem("token",res.data.token)
        setIsLoggedIn(true)
        navigate("/")
    }
} catch (error) {
    toast.error(error.response.data.message || "Error Occoured! Please try after some time")
} finally {
  setLoading(false);
}
    }

    if (loading) {
      return (
        <div className='spinner-design'>
          <h4>Validating user credentials!
             Please wait...</h4>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      );
    }

  return<>
  <div className='container login-page'>
  <Card className='card-style' style={{ width: '100%' }}>
        <Card.Header>Login Page</Card.Header>
        <Card.Body>
        <Form >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control className='textbox' type="email" placeholder="Enter email"  onChange={(e)=>setEmail(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control className='textbox' type="password" placeholder="Password"  onChange={(e)=>setPassword(e.target.value)} />
      </Form.Group>
      <div className='newUser-text'>
      <div>NewUser  <Link to="/signUp">Click here</Link></div>&nbsp;
      <div>To reset password <Link to="/forgot-password">Forgot Password</Link></div>
      </div>
      <br />
      <Button variant="dark" type="submit" onClick={(e)=>validateLogin(e)}>
        Login
      </Button>
    </Form>    
        </Card.Body>
      </Card>
      <div>
        <h4>For admin login</h4>
        <h6>Email: admin123@gmail.com</h6>
        <h6>password: admin@123</h6>
        </div>
      </div>
  </>
}

export default Login