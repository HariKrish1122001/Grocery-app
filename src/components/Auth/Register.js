// import React, { useState } from "react";
// import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap"; // Import Spinner for loading indicator
// import { Link, useNavigate } from "react-router-dom";
// import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importing the eye icons

// const RegisterPage = () => {
//   const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility
//   const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // State for confirm password visibility
//   const [formData, setFormData] = useState({
//     email: '',
//     username: '',
//     password: '',
//     confirmPassword: '',
//     phoneNo: '',
//     address: ''
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false); // State to manage loading indicator
//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { email, username, password, confirmPassword, phoneNo, address } = formData;

//     // Basic form validation
//     if (!email || !username || !password || !phoneNo || !confirmPassword || !address) {
//       setError('All fields are required');
//       return;
//     }

//     if (password !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     try {
//       setLoading(true); // Set loading to true when the form is being submitted
//       console.log('Submitting data:', { email, username, password, phoneNo, address });

//       const response = await fetch('/api/register/user', {  // No domain/port, proxy will handle it
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, username, password, phoneNo, address }),
//       });

//       console.log('Response received:', response);

//       const data = await response.json();

//       if (response.status === 201) {
//         // Registration successful, navigate to login page
//         navigate('/login');
//       } else {
//         // Handle error response
//         setError(data.error || 'An error occurred');
//       }
//     } catch (err) {
//       console.error('Error occurred:', err);  // Log full error
//       setError('Network error occurred');
//     } finally {
//       setLoading(false); // Set loading back to false when the request is complete
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setPasswordVisible(prevState => !prevState);
//   };

//   const toggleConfirmPasswordVisibility = () => {
//     setConfirmPasswordVisible(prevState => !prevState);
//   };

//   return (
//     <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", fontFamily: "'Poppins', sans-serif" }}>
//       <Container className="shadow-lg" style={{ maxWidth: "900px", borderRadius: "15px", overflow: "hidden" }}>
//         <Row>
//           <Col md={6} style={{ background: "linear-gradient(to right, #8e44ad, #6a4efc)", color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
//             <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", textAlign: "center" }}>Create Your Account</h1>
//             <p style={{ fontSize: "1.1rem", marginTop: "1rem", textAlign: "center" }}>Sign up to get started and join our platform.</p>
//           </Col>

//           <Col md={6} style={{ background: "#fff", padding: "2rem" }}>
//             <h2 style={{ fontSize: "2rem", fontWeight: "bold", textAlign: "center", marginBottom: "2rem" }}>Register</h2>

//             {error && <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

//             <Form onSubmit={handleSubmit}>
//               {/* Email Input */}
//               <Form.Group controlId="email" className="mb-3">
//                 <Form.Label style={{ fontWeight: "600", fontSize: "1.1rem" }}>Email Address</Form.Label>
//                 <Form.Control
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   placeholder="Enter your email"
//                   style={{ padding: "0.75rem", borderRadius: "10px" }}
//                   required
//                 />
//               </Form.Group>

//               {/* Username Input */}
//               <Form.Group controlId="username" className="mb-3">
//                 <Form.Label style={{ fontWeight: "600", fontSize: "1.1rem" }}>Username</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="username"
//                   value={formData.username}
//                   onChange={handleInputChange}
//                   placeholder="Enter your username"
//                   style={{ padding: "0.75rem", borderRadius: "10px" }}
//                   required
//                 />
//               </Form.Group>

//               {/* Phone Number Input */}
//               <Form.Group controlId="phone" className="mb-3">
//                 <Form.Label style={{ fontWeight: "600", fontSize: "1.1rem" }}>Phone Number</Form.Label>
//                 <Form.Control
//                   type="tel"
//                   name="phoneNo"
//                   value={formData.phoneNo}
//                   onChange={handleInputChange}
//                   placeholder="Enter your phone number"
//                   style={{ padding: "0.75rem", borderRadius: "10px" }}
//                   required
//                 />
//               </Form.Group>

//               {/* Address Input */}
//               <Form.Group controlId="address" className="mb-3">
//                 <Form.Label style={{ fontWeight: "600", fontSize: "1.1rem" }}>Address</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="address"
//                   value={formData.address}
//                   onChange={handleInputChange}
//                   placeholder="Enter your address"
//                   style={{ padding: "0.75rem", borderRadius: "10px" }}
//                   required
//                 />
//               </Form.Group>

//               {/* Password Input */}
//               <Form.Group controlId="password" className="mb-3">
//                 <Form.Label style={{ fontWeight: "600", fontSize: "1.1rem" }}>Password</Form.Label>
//                 <div className="position-relative">
//                   <Form.Control
//                     type={passwordVisible ? "text" : "password"} // Show password if passwordVisible is true
//                     name="password"
//                     value={formData.password}
//                     onChange={handleInputChange}
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
//                     {passwordVisible ? <FaEyeSlash /> : <FaEye />} {/* Eye icon for visibility toggle */}
//                   </button>
//                 </div>
//               </Form.Group>

//               {/* Confirm Password Input */}
//               <Form.Group controlId="confirmPassword" className="mb-4">
//                 <Form.Label style={{ fontWeight: "600", fontSize: "1.1rem" }}>Confirm Password</Form.Label>
//                 <div className="position-relative">
//                   <Form.Control
//                     type={confirmPasswordVisible ? "text" : "password"} // Show confirm password if confirmPasswordVisible is true
//                     name="confirmPassword"
//                     value={formData.confirmPassword}
//                     onChange={handleInputChange}
//                     placeholder="Confirm your password"
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
//                     {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />} {/* Eye icon for visibility toggle */}
//                   </button>
//                 </div>
//               </Form.Group>

//               {/* Submit Button */}
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
//                 disabled={loading} // Disable the button while loading
//               >
//                 {loading ? (
//                   <Spinner animation="border" size="sm" style={{ marginRight: '10px' }} />
//                 ) : (
//                   'Submit'
//                 )}
//               </Button>
//             </Form>

//             <p className="text-center mt-4" style={{ fontSize: "0.9rem", fontWeight: "500" }}>
//               Already have an account?{" "}
//               <Link to="/login" style={{ color: "#6a4efc", fontWeight: "bold", textDecoration: "none" }}>
//                 Go to Login
//               </Link>
//             </p>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default RegisterPage;














import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap"; // Import Spinner for loading indicator
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importing the eye icons

const RegisterPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // State for confirm password visibility
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    phoneNo: '',
    address: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // State to manage loading indicator
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, username, password, confirmPassword, phoneNo, address } = formData;

    // Basic form validation
    if (!email || !username || !password || !phoneNo || !confirmPassword || !address) {
      setError('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true); // Set loading to true when the form is being submitted
      console.log('Submitting data:', { email, username, password, phoneNo, address });

      const response = await fetch('/api/register', {  // No domain/port, proxy will handle it
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password, phoneNo, address }),
      });

      console.log('Response received:', response);

      const data = await response.json();

      if (response.status === 201) {
        // Registration successful, navigate to login page
        alert('Registration successful! Please check your email for confirmation.');
        navigate('/login');
      } else {
        // Handle error response
        setError(data.error || 'An error occurred');
      }
    } catch (err) {
      console.error('Error occurred:', err);  // Log full error
      setError('Network error occurred');
    } finally {
      setLoading(false); // Set loading back to false when the request is complete
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(prevState => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(prevState => !prevState);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", fontFamily: "'Poppins', sans-serif" }}>
      <Container className="shadow-lg" style={{ maxWidth: "900px", borderRadius: "15px", overflow: "hidden" }}>
        <Row>
          <Col md={6} style={{ background: "linear-gradient(to right, #8e44ad, #6a4efc)", color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
            <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", textAlign: "center" }}>Create Your Account</h1>
            <p style={{ fontSize: "1.1rem", marginTop: "1rem", textAlign: "center" }}>Sign up to get started and join our platform.</p>
          </Col>

          <Col md={6} style={{ background: "#fff", padding: "2rem" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: "bold", textAlign: "center", marginBottom: "2rem" }}>Register</h2>

            {error && <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

            <Form onSubmit={handleSubmit}>
              {/* Email Input */}
              <Form.Group controlId="email" className="mb-3">
                <Form.Label style={{ fontWeight: "600", fontSize: "1.1rem" }}>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  style={{ padding: "0.75rem", borderRadius: "10px" }}
                  required
                />
              </Form.Group>

              {/* Username Input */}
              <Form.Group controlId="username" className="mb-3">
                <Form.Label style={{ fontWeight: "600", fontSize: "1.1rem" }}>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Enter your username"
                  style={{ padding: "0.75rem", borderRadius: "10px" }}
                  required
                />
              </Form.Group>

              {/* Phone Number Input */}
              <Form.Group controlId="phone" className="mb-3">
                <Form.Label style={{ fontWeight: "600", fontSize: "1.1rem" }}>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  style={{ padding: "0.75rem", borderRadius: "10px" }}
                  required
                />
              </Form.Group>

              {/* Address Input */}
              <Form.Group controlId="address" className="mb-3">
                <Form.Label style={{ fontWeight: "600", fontSize: "1.1rem" }}>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your address"
                  style={{ padding: "0.75rem", borderRadius: "10px" }}
                  required
                />
              </Form.Group>

              {/* Password Input */}
              <Form.Group controlId="password" className="mb-3">
                <Form.Label style={{ fontWeight: "600", fontSize: "1.1rem" }}>Password</Form.Label>
                <div className="position-relative">
                  <Form.Control
                    type={passwordVisible ? "text" : "password"} // Show password if passwordVisible is true
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
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
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />} {/* Eye icon for visibility toggle */}
                  </button>
                </div>
              </Form.Group>

              {/* Confirm Password Input */}
              <Form.Group controlId="confirmPassword" className="mb-4">
                <Form.Label style={{ fontWeight: "600", fontSize: "1.1rem" }}>Confirm Password</Form.Label>
                <div className="position-relative">
                  <Form.Control
                    type={confirmPasswordVisible ? "text" : "password"} // Show confirm password if confirmPasswordVisible is true
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
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
                    {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />} {/* Eye icon for visibility toggle */}
                  </button>
                </div>
              </Form.Group>

              {/* Submit Button */}
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
                disabled={loading} // Disable the button while loading
              >
                {loading ? (
                  <Spinner animation="border" size="sm" style={{ marginRight: '10px' }} />
                ) : (
                  'Submit'
                )}
              </Button>
            </Form>

            <p className="text-center mt-4" style={{ fontSize: "0.9rem", fontWeight: "500" }}>
              Already have an account?{" "}
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

export default RegisterPage;
