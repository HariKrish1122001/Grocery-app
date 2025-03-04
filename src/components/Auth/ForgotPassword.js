import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"; 

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");  // State to manage email input
  const [error, setError] = useState("");  // State to handle error messages
  const [success, setSuccess] = useState("");  // State to handle success message
  const [loading, setLoading] = useState(false);  // State to manage loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true); // Set loading to true when the request is being processed

    try {
      const response = await fetch('/api/forgot-password', {  // Send POST request to backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),  // Send email as part of the request
      });

      const data = await response.json();

      if (response.status === 200) {
        setSuccess("Password reset email sent successfully. Please check your inbox.");
        navigate('/rp');
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Network error occurred");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <Container className="shadow-lg" style={{ maxWidth: "800px", borderRadius: "15px", overflow: "hidden" }}>
        <Row>
          {/* Left Section */}
          <Col
            md={6}
            style={{
              background: "linear-gradient(to right, #8e44ad, #6a4efc)",
              color: "#fff",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "2rem",
            }}
          >
            <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", textAlign: "center" }}>Forgot Your Password?</h1>
            <p style={{ fontSize: "1.1rem", marginTop: "1rem", textAlign: "center" }}>
              Enter your email to reset your password and regain access.
            </p>
          </Col>

          {/* Right Section */}
          <Col md={6} style={{ background: "#fff", padding: "2rem" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: "bold", textAlign: "center", marginBottom: "2rem" }}>
              Reset Password
            </h2>

            {/* Show error message if any */}
            {error && <div style={{ color: "red", textAlign: "center", marginBottom: "1rem" }}>{error}</div>}
            {/* Show success message if email was sent successfully */}
            {success && <div style={{ color: "green", textAlign: "center", marginBottom: "1rem" }}>{success}</div>}

            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="email" className="mb-4">
                <Form.Label style={{ fontWeight: "600", fontSize: "1.1rem" }}>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}  // Update email state
                  style={{ padding: "0.75rem", borderRadius: "10px" }}
                  required
                />
              </Form.Group>

              <Button
                type="submit"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  backgroundColor: "#6a4efc",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                }}
                disabled={loading} // Disable button when loading
              >
                {/* Show a loading spinner if the button is in the loading state */}
                {loading ? (
                  <Spinner animation="border" variant="light" size="sm" />
                ) : (
                  "Submit"
                )}
              </Button>
            </Form>

            <p className="text-center mt-4" style={{ fontSize: "0.9rem", fontWeight: "500" }}>
              Remembered your password?{" "}
              <Link to="/login" style={{ color: "#6a4efc", fontWeight: "bold", textDecoration: "none" }}>
                Go to Login
              </Link>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ForgotPasswordPage;
