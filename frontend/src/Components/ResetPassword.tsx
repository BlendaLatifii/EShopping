import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AuthService } from "../Services/AuthService.ts";
import { Button, Form, Alert } from "react-bootstrap";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

 useEffect(() => {
  const tokenFromUrl = searchParams.get("token");
  console.log("Token from URL:", tokenFromUrl);
  if (!tokenFromUrl) {
    setError("Invalid or missing token");
  } else {
    setToken(tokenFromUrl);
  }
}, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await AuthService.ResetPassword({ token, password });
      setMessage("Password has been reset successfully!");
      setTimeout(() => navigate("/"), 3000); // redirect after 3 sec
    }catch (err: any) {
  const backendError = err.response?.data;
  if (backendError?.errors) {
    const messages = Object.values(backendError.errors).flat().join(" ");
    setError(messages);
  } else if (typeof backendError === "string") {
    setError(backendError);
  } else {
    setError("Error resetting password");
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
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>
       <div className="text-end">
        <Button variant="primary" type="submit">
          Reset Password
        </Button>
        </div>
      </Form>
    </div>
    </div>
    </div>
  );
}
