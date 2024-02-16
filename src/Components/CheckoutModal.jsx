import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

function MyVerticallyCenteredModal(props) {
    const navigate = useNavigate(); 
    
    const handleContinueShopping = () => {
        navigate('/');
      };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        Order Placed Successfully
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Thank You for Shopping in EagleCart</h4>
        <p>
        Your order was taken and delivered within 7-8 working days
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='success' onClick={handleContinueShopping}>Continue Shopping</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default  MyVerticallyCenteredModal