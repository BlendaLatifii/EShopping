import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { AuthService } from '../Services/AuthService.ts';
import { SignInRequestDto } from '../Interfaces/User/Signin-dto.ts';

function SignUp() {
  const [formData, setFormData] = useState<SignInRequestDto>({
    userName:"",
    lastName:"",
    email: "",
    phoneNumber : "",
    password: "",
    confirmPassword : ""
  });

 async function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    var user: SignInRequestDto = {
      userName : formData.userName,
      lastName : formData.lastName,
      email: formData.email,
      phoneNumber : formData.phoneNumber,
      password: formData.password,
      confirmPassword : formData.confirmPassword
    };
    const response = await AuthService.SignIn(user);
  }

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
  <div
    style={{
      minHeight: "100vh",
      backgroundImage: "url('/LoginPhoto.jpg')",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center right",
      backgroundSize: "contain",
      backgroundColor: "rgb(253 253 253)",
    }}
  >
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "rgba(215 186 186 / 85%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="shadow rounded p-4 bg-white"
        style={{ width: "100%", maxWidth: "480px" }}
      >
        <h3 className="text-center fw-bold mb-2">Create an Account</h3>
        <Form onSubmit={submitForm}>
          <Form.Group className="mb-1">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              name="userName"
              placeholder="Enter User Name"
              value={formData.userName}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-1">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              placeholder="Enter Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-1">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="phoneNumber"
              placeholder="Enter Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-1">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-1">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </Form.Group>

          <Button type="submit" className="w-100 mb-3">
            Sign Up
          </Button>
        </Form>
        <div className="text-center mt-2">
          <span className="text-muted">Already have an account? </span>
          <a
            href="/"
            className="fw-semibold text-primary text-decoration-none"
          >
            Login
          </a>
        </div>
      </div>
    </div>
  </div>
);
}

export default SignUp;