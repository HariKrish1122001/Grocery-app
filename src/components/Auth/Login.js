// import React, { useState } from "react";
// import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import Cookies from 'js-cookie'; 
// import { requestPermissionAndGetFCMToken } from '../../firebase/firebase'; 

// const LoginPage = () => {
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       setError("Please fill in both email and password.");
//       return;
//     }

//     setLoading(true);
//     try {
//       // Step 1: Request FCM token
//       const fcmToken = await requestPermissionAndGetFCMToken();
      
//       // Step 2: If no FCM token, show an error and stop
//       if (!fcmToken) {
//         setError("Unable to get push notification token. Please try again.");
//         setLoading(false);
//         return;
//       }

//       // Step 3: Send login request with email, password, and FCM token
//       const response = await fetch("/api/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password, fcmToken }),
//       });

//       const data = await response.json();

//       // Step 4: Handle response
//       if (response.ok) {
//         Cookies.set("token", data.token, { expires: 1 });
//         navigate("/otppage", { state: { email, token: data.token } });
//       } else {
//         setError(data.message || "Login failed. Try again.");
//       }
//     } catch (error) {
//       setError("Network error occurred. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setPasswordVisible((prevState) => !prevState);
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
//       <Container className="shadow-lg" style={{ maxWidth: "900px", borderRadius: "15px", overflow: "hidden" }}>
//         <Row>
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
//             <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", textAlign: "center" }}>Welcome Back!</h1>
//             <p style={{ fontSize: "1.1rem", marginTop: "1rem", textAlign: "center" }}>
//               Log in to your account and stay connected with us.
//             </p>
//           </Col>

//           <Col md={6} style={{ background: "#fff", padding: "2rem" }}>
//             <h2 style={{ fontSize: "2rem", fontWeight: "bold", textAlign: "center", marginBottom: "2rem" }}>
//               Login
//             </h2>

//             {error && <div style={{ color: "red", textAlign: "center", marginBottom: "1rem" }}>{error}</div>}

//             <Form onSubmit={handleLoginSubmit}>
//               <Form.Group controlId="email" className="mb-4">
//                 <Form.Label style={{ fontWeight: "600", fontSize: "1.1rem" }}>Email Address</Form.Label>
//                 <Form.Control
//                   type="email"
//                   placeholder="Enter your email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   style={{ padding: "0.75rem", borderRadius: "10px" }}
//                   required
//                 />
//               </Form.Group>

//               <Form.Group controlId="password" className="mb-4">
//                 <Form.Label style={{ fontWeight: "600", fontSize: "1.1rem" }}>Password</Form.Label>
//                 <div className="position-relative">
//                   <Form.Control
//                     type={passwordVisible ? "text" : "password"}
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     placeholder="Enter your password"
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
//                     {passwordVisible ? <FaEyeSlash /> : <FaEye />}
//                   </button>
//                 </div>
//               </Form.Group>

//               <Link to="/fp" style={{ color: "#6a4efc", fontWeight: "bold", textDecoration: "none" }}>
//                 Forgot Password
//               </Link>

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
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <Spinner animation="border" size="sm" style={{ marginRight: "0.5rem" }} />
//                 ) : null}
//                 Login
//               </Button>
//             </Form>

//             <p className="text-center mt-4" style={{ fontSize: "0.9rem", fontWeight: "500" }}>
//               New User?{" "}
//               <Link to="/register" style={{ color: "#6a4efc", fontWeight: "bold", textDecoration: "none" }}>
//                 Sign Up
//               </Link>
//             </p>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default LoginPage;












import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Cookies from 'js-cookie'; 
import { requestPermissionAndGetFCMToken } from '../../firebase/firebase'; 

const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    setLoading(true);
    try {
      // Step 1: Request FCM token
      const fcmToken = await requestPermissionAndGetFCMToken();
      
      // Step 2: If no FCM token, show an error and stop
      if (!fcmToken) {
        setError("Unable to get push notification token. Please try again.");
        setLoading(false);
        return;
      }

      // Step 3: Send login request with email, password, and FCM token
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, fcmToken }),
      });

      const data = await response.json();

      // Step 4: Handle response
      if (response.ok) {
        // Cookies.set("token", data.token);
        navigate("/otppage", { state: { email, token: data.token } });
      } else {
        setError(data.message || "Login failed. Try again.");
      }
    } catch (error) {
      setError("Network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
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
      <Container className="shadow-lg" style={{ maxWidth: "900px", borderRadius: "15px", overflow: "hidden" }}>
        <Row>
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
            <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", textAlign: "center" }}>Welcome Back!</h1>
            <p style={{ fontSize: "1.1rem", marginTop: "1rem", textAlign: "center" }}>
              Log in to your account and stay connected with us.
            </p>
          </Col>

          <Col md={6} style={{ background: "#fff", padding: "2rem" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: "bold", textAlign: "center", marginBottom: "2rem" }}>
              Login
            </h2>

            {error && <div style={{ color: "red", textAlign: "center", marginBottom: "1rem" }}>{error}</div>}

            <Form onSubmit={handleLoginSubmit}>
              <Form.Group controlId="email" className="mb-4">
                <Form.Label style={{ fontWeight: "600", fontSize: "1.1rem" }}>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ padding: "0.75rem", borderRadius: "10px" }}
                  required
                />
              </Form.Group>

              <Form.Group controlId="password" className="mb-4">
                <Form.Label style={{ fontWeight: "600", fontSize: "1.1rem" }}>Password</Form.Label>
                <div className="position-relative">
                  <Form.Control
                    type={passwordVisible ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
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
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </Form.Group>

              <Link to="/fp" style={{ color: "#6a4efc", fontWeight: "bold", textDecoration: "none" }}>
                Forgot Password
              </Link>

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
                disabled={loading}
              >
                {loading ? (
                  <Spinner animation="border" size="sm" style={{ marginRight: "0.5rem" }} />
                ) : null}
                Login
              </Button>
            </Form>

            <p className="text-center mt-4" style={{ fontSize: "0.9rem", fontWeight: "500" }}>
              New User?{" "}
              <Link to="/register" style={{ color: "#6a4efc", fontWeight: "bold", textDecoration: "none" }}>
                Sign Up
              </Link>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;












