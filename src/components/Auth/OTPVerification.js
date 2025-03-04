import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie"; 

const OTPVerificationPage = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = location.state || {}; 

  const handleOTPSubmit = async (e) => {
    e.preventDefault();

    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }

    setLoading(true);
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp, token }),
      });
      const data = await response.json();

      if (response.ok) {
        Cookies.set("token", data.token, { expires: 7, secure: true, sameSite: "Strict" }); // Store the token
        navigate("/");
      } else {
        setError(data.error || "OTP verification failed.");
      }
    } catch (error) {
      setError("Network error occurred. Please try again.");
    } finally {
      setLoading(false);
      setIsSubmitting(false);
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
            <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", textAlign: "center" }}>Verify Your OTP</h1>
            <p style={{ fontSize: "1.1rem", marginTop: "1rem", textAlign: "center" }}>
              Enter the 6-digit OTP sent to your email or phone.
            </p>
          </Col>

          {/* Right Section */}
          <Col md={6} style={{ background: "#fff", padding: "2rem" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: "bold", textAlign: "center", marginBottom: "2rem" }}>
              OTP Verification
            </h2>

            {/* Display error message */}
            {error && <div style={{ color: "red", textAlign: "center" }}>{error}</div>}

            <Form onSubmit={handleOTPSubmit}>
              <Form.Group controlId="otp" className="mb-4">
                <Form.Label style={{ fontWeight: "600", fontSize: "1.1rem" }}>Enter OTP</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  maxLength="6"
                  style={{
                    padding: "0.75rem",
                    borderRadius: "10px",
                    textAlign: "center",
                    letterSpacing: "0.5rem",
                  }}
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
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
                disabled={isSubmitting} // Disable button while submitting
              >
                {isSubmitting ? (
                  <Spinner animation="border" size="sm" style={{ marginRight: "10px" }} />
                ) : (
                  "Submit"
                )}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default OTPVerificationPage;
