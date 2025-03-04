// import React, { useState, useEffect } from "react";
// import { Container, Row, Col, Form, Button } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons from react-icons

// const ResetPasswordPage = () => {
//   const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility
//   const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // State for confirm password visibility
//   const [otp, setOtp] = useState(""); // State to store OTP
//   const [newPassword, setNewPassword] = useState(""); // State to store new password
//   const [confirmNewPassword, setConfirmNewPassword] = useState(""); // State to store confirm new password
//   const [errorMessage, setErrorMessage] = useState(""); // State to store error message
//   const [successMessage, setSuccessMessage] = useState(""); // State to store success message
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Clear localStorage when the user navigates to the reset password page
//     localStorage.clear(); // This will clear all stored data in localStorage
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent the default form submission behavior

//     // Check if the new password and confirm password match
//     if (newPassword !== confirmNewPassword) {
//       setErrorMessage("Passwords do not match");
//       return;
//     }

//     // Create the request body
//     const requestBody = {
//       otp,
//       newPassword,
//       confirmNewPassword,
//     };

//     try {
//       // Make the fetch API request to the backend
//       const response = await fetch("/api/reset-password", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json", // Set the content type to JSON
//         },
//         body: JSON.stringify(requestBody), // Send the request body as JSON
//       });

//       const data = await response.json();

//       // Handle the response
//       if (response.ok) {
//         setSuccessMessage("Password reset successfully.");
//         setTimeout(() => {
//           navigate("/login"); // Navigate to login page after successful password reset
//         }, 2000);
//       } else {
//         setErrorMessage(data.message || "An error occurred. Please try again.");
//       }
//     } catch (error) {
//       setErrorMessage("An error occurred. Please try again.");
//     }
//   };

//   // Toggle password visibility
//   const togglePasswordVisibility = () => {
//     setPasswordVisible((prevState) => !prevState);
//   };

//   // Toggle confirm password visibility
//   const toggleConfirmPasswordVisibility = () => {
//     setConfirmPasswordVisible((prevState) => !prevState);
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         minHeight: "100vh",
//         fontFamily: "'Poppins', sans-serif",
//       }}
//     >
//       <Container className="shadow-lg" style={{ maxWidth: "800px", borderRadius: "15px", overflow: "hidden" }}>
//         <Row>
//           {/* Left Section */}
//           <Col
//             md={6}
//             style={{
//               background: "linear-gradient(to right, #8e44ad, #6a4efc)",
//               color: "#fff",
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               justifyContent: "center",
//               padding: "2rem",
//             }}
//           >
//             <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", textAlign: "center" }}>Reset Your Password</h1>
//             <p style={{ fontSize: "1.1rem", marginTop: "1rem", textAlign: "center" }}>
//               Enter a new password to secure your account.
//             </p>
//           </Col>

//           {/* Right Section */}
//           <Col md={6} style={{ background: "#fff", padding: "2rem" }}>
//             <h2 style={{ fontSize: "2rem", fontWeight: "bold", textAlign: "center", marginBottom: "2rem" }}>
//               Reset Password
//             </h2>
//             <Form onSubmit={handleSubmit}>
//               {/* OTP Field */}
//               <Form.Group controlId="otp" className="mb-4">
//                 <Form.Label style={{ fontWeight: "600", fontSize: "1.1rem" }}>OTP</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter OTP"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                   style={{ padding: "0.75rem", borderRadius: "10px" }}
//                   required
//                 />
//               </Form.Group>

//               {/* New Password Field */}
//               <Form.Group controlId="newPassword" className="mb-4">
//                 <Form.Label style={{ fontWeight: "600", fontSize: "1.1rem" }}>New Password</Form.Label>
//                 <div className="position-relative">
//                   <Form.Control
//                     type={passwordVisible ? "text" : "password"} // Toggle the input type based on password visibility
//                     placeholder="Enter new password"
//                     value={newPassword}
//                     onChange={(e) => setNewPassword(e.target.value)}
//                     style={{ padding: "0.75rem", borderRadius: "10px" }}
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={togglePasswordVisibility}
//                     style={{
//                       position: "absolute",
//                       right: "10px",
//                       top: "50%",
//                       transform: "translateY(-50%)",
//                       background: "none",
//                       border: "none",
//                       color: "#6a4efc",
//                       fontSize: "1.5rem",
//                     }}
//                   >
//                     {passwordVisible ? <FaEyeSlash /> : <FaEye />} {/* Toggle icon based on visibility */}
//                   </button>
//                 </div>
//               </Form.Group>

//               {/* Confirm Password Field */}
//               <Form.Group controlId="confirmPassword" className="mb-4">
//                 <Form.Label style={{ fontWeight: "600", fontSize: "1.1rem" }}>Confirm Password</Form.Label>
//                 <div className="position-relative">
//                   <Form.Control
//                     type={confirmPasswordVisible ? "text" : "password"} // Toggle the input type based on confirm password visibility
//                     placeholder="Confirm your password"
//                     value={confirmNewPassword}
//                     onChange={(e) => setConfirmNewPassword(e.target.value)}
//                     style={{ padding: "0.75rem", borderRadius: "10px" }}
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={toggleConfirmPasswordVisibility}
//                     style={{
//                       position: "absolute",
//                       right: "10px",
//                       top: "50%",
//                       transform: "translateY(-50%)",
//                       background: "none",
//                       border: "none",
//                       color: "#6a4efc",
//                       fontSize: "1.5rem",
//                     }}
//                   >
//                     {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />} {/* Toggle icon based on visibility */}
//                   </button>
//                 </div>
//               </Form.Group>

//               {/* Error or Success Message */}
//               {errorMessage && (
//                 <div style={{ color: "red", textAlign: "center", marginBottom: "1rem" }}>
//                   <strong>{errorMessage}</strong>
//                 </div>
//               )}
//               {successMessage && (
//                 <div style={{ color: "green", textAlign: "center", marginBottom: "1rem" }}>
//                   <strong>{successMessage}</strong>
//                 </div>
//               )}

//               <Button
//                 type="submit"
//                 style={{
//                   width: "100%",
//                   padding: "0.75rem",
//                   backgroundColor: "#6a4efc",
//                   border: "none",
//                   borderRadius: "10px",
//                   fontSize: "1.2rem",
//                   fontWeight: "bold",
//                 }}
//               >
//                 Submit
//               </Button>
//             </Form>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default ResetPasswordPage;








import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons from react-icons

const ResetPasswordPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // State for confirm password visibility
  const [otp, setOtp] = useState(""); // State to store OTP
  const [newPassword, setNewPassword] = useState(""); // State to store new password
  const [confirmNewPassword, setConfirmNewPassword] = useState(""); // State to store confirm new password
  const [errorMessage, setErrorMessage] = useState(""); // State to store error message
  const [successMessage, setSuccessMessage] = useState(""); // State to store success message
  const navigate = useNavigate();

  useEffect(() => {
    // Clear localStorage when the user navigates to the reset password page
    localStorage.clear(); // This will clear all stored data in localStorage
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Check if the new password and confirm password match
    if (newPassword !== confirmNewPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    // Create the request body
    const requestBody = {
      otp,
      newPassword,
      confirmNewPassword,
    };

    try {
      // Make the fetch API request to the backend
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
        body: JSON.stringify(requestBody), // Send the request body as JSON
      });

      const data = await response.json();

      // Handle the response
      if (response.ok) {
        setSuccessMessage("Password reset successfully. A confirmation email has been sent.");
        setTimeout(() => {
          navigate("/login"); // Navigate to login page after successful password reset
        }, 2000);
      } else {
        setErrorMessage(data.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  // Toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible((prevState) => !prevState);
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
            <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", textAlign: "center" }}>Reset Your Password</h1>
            <p style={{ fontSize: "1.1rem", marginTop: "1rem", textAlign: "center" }}>
              Enter a new password to secure your account.
            </p>
          </Col>

          {/* Right Section */}
          <Col md={6} style={{ background: "#fff", padding: "2rem" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: "bold", textAlign: "center", marginBottom: "2rem" }}>
              Reset Password
            </h2>
            <Form onSubmit={handleSubmit}>
              {/* OTP Field */}
              <Form.Group controlId="otp" className="mb-4">
                <Form.Label style={{ fontWeight: "600", fontSize: "1.1rem" }}>OTP</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  style={{ padding: "0.75rem", borderRadius: "10px" }}
                  required
                />
              </Form.Group>

              {/* New Password Field */}
              <Form.Group controlId="newPassword" className="mb-4">
                <Form.Label style={{ fontWeight: "600", fontSize: "1.1rem" }}>New Password</Form.Label>
                <div className="position-relative">
                  <Form.Control
                    type={passwordVisible ? "text" : "password"} // Toggle the input type based on password visibility
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    style={{ padding: "0.75rem", borderRadius: "10px" }}
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      color: "#6a4efc",
                      fontSize: "1.5rem",
                    }}
                  >
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />} {/* Toggle icon based on visibility */}
                  </button>
                </div>
              </Form.Group>

              {/* Confirm Password Field */}
              <Form.Group controlId="confirmPassword" className="mb-4">
                <Form.Label style={{ fontWeight: "600", fontSize: "1.1rem" }}>Confirm Password</Form.Label>
                <div className="position-relative">
                  <Form.Control
                    type={confirmPasswordVisible ? "text" : "password"} // Toggle the input type based on confirm password visibility
                    placeholder="Confirm your password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    style={{ padding: "0.75rem", borderRadius: "10px" }}
                    required
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      color: "#6a4efc",
                      fontSize: "1.5rem",
                    }}
                  >
                    {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />} {/* Toggle icon based on visibility */}
                  </button>
                </div>
              </Form.Group>

              {/* Error or Success Message */}
              {errorMessage && (
                <div style={{ color: "red", textAlign: "center", marginBottom: "1rem" }}>
                  <strong>{errorMessage}</strong>
                </div>
              )}
              {successMessage && (
                <div style={{ color: "green", textAlign: "center", marginBottom: "1rem" }}>
                  <strong>{successMessage}</strong>
                </div>
              )}

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
              >
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ResetPasswordPage;
