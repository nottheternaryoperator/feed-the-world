import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import Modal from 'react-modal';


const LoginForm = ({ onLoginSuccess }) => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);

    if (form.checkValidity()) {
      // Simulating login functionality
      if (userFormData.email === 'example@example.com' && userFormData.password === 'password') {
        // Successful login
        console.log('Login successful!');
        setShowAlert(false);
        setModalIsOpen(false);
        // You can implement your logic here, such as redirecting the user to another page or setting a logged-in state
      } else {
        // Failed login
        console.log('Login failed!');
        setShowAlert(true);
      }
    }
  };

  return (
    <>
      <Button onClick={() => setModalIsOpen(true)}>Login</Button>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
          <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
            Invalid email or password!
          </Alert>
          <Form.Group className='mb-3'>
            <Form.Label htmlFor='email'>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Your email'
              name='email'
              onChange={handleInputChange}
              value={userFormData.email}
              required
            />
            <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label htmlFor='password'>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Your password'
              name='password'
              onChange={handleInputChange}
              value={userFormData.password}
              required
            />
            <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
          </Form.Group>
          <Button type='submit' variant='success'>
            Submit
          </Button>
        </Form>
        <Button onClick={() => setModalIsOpen(false)}>Close</Button>
      </Modal>
    </>
  );
};

export default LoginForm;
