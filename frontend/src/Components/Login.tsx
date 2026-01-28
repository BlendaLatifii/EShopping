import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { LoginRequestDto } from '../Interfaces/User/login-request-dto.ts';
import { AuthService } from '../Services/AuthService.ts';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState<LoginRequestDto>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

 async function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    var user: LoginRequestDto = {
      email: formData.email,
      password: formData.password,
    };
    const response = await AuthService.Login(user);
    console.log(response);
    navigate("/Category")
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
        style={{ width: "100%", maxWidth: "420px" }}
      >
        <h3 className="text-center fw-bold mb-2">Welcome Back</h3>
        <p className="text-center text-muted mb-4">
          Login to continue shopping
        </p>

        <Form onSubmit={submitForm}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Group>

          <Button type="submit" className="w-100 mb-3">
            Login
          </Button>
        </Form>
<div className="text-center mt-1">
  <a
    href="/ForgetPassword"
    className="text-decoration-none small text-muted"
  >
    Forgot your password?
  </a>
</div>

<hr className="my-4" />

<div className="text-center">
  <span className="text-muted">Don’t have an account?</span>{" "}
  <a
    href="/SignUp"
    className="fw-semibold text-primary text-decoration-none"
  >
    Sign up
  </a>
</div>
      </div>
    </div>
  </div>
);
}

export default Login;