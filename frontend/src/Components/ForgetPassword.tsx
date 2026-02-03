import { useState } from "react";
import { AuthService } from "../Services/AuthService.ts";
import { Button, Form, Alert } from "react-bootstrap";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

  try {
  await AuthService.RequestResetPassword(email);
  setMessage("Reset password link sent to your email!");
} catch (err: any) {
  // Merr mesazhet nga objekti i backend
  const backendError = err.response?.data;

  if (backendError?.errors) {
    // Nxjerr të gjitha mesazhet në një array dhe bashko në string
    const messages = Object.values(backendError.errors).flat().join(" ");
    setError(messages);
  } else if (typeof backendError === "string") {
    setError(backendError);
  } else {
    setError("Error sending reset password request");
  }
}
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
        style={{ width: "100%", maxWidth: "450px"}}
      >
      <h2>Forget Password</h2>
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}


     
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Send Reset Link
        </Button>
      </Form>
    </div>
    </div>
  </div>
  );
}
