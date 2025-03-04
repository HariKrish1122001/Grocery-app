// import React, { useState, useEffect } from "react";
// import { Button, Alert, Spinner, Card } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
// import { FaUserCircle } from "react-icons/fa"; 

// const ProfilePage = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = Cookies.get("token");

//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     const fetchUserProfile = async () => {
//       try {
//         const response = await fetch("/api/getprofile", {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const data = await response.json();

//         if (response.ok) {
//           setUser(data.user);
//         } else {
//           setError(data.error || "Failed to fetch user profile.");
//         }
//       } catch (error) {
//         setError("Network error occurred. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserProfile();
//   }, [navigate]);

//   const handleLogout = () => {
//     Cookies.remove("token"); // Remove the token from cookies
//     navigate("/"); // Redirect to login page after logout
//   };

//   return (
//     <>
    
//       <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
//         <h2 className="text-center mb-4" style={{ color: "#FF6F00" }}>Profile</h2>
//         {loading ? (
//           <div className="d-flex justify-content-center">
//             <Spinner animation="border" />
//           </div>
//         ) : error ? (
//           <Alert variant="danger">{error}</Alert>
//         ) : (
//           <Card className="border-0 shadow-lg bg-light" style={{ borderRadius: "15px" }}>
//             <Card.Body className="text-center">
//               {/* User Icon */}
//               <FaUserCircle size={100} className="mb-3 text-success" />

//               <div>
//                 <strong>Username:</strong> {user.username}
//               </div>
//               <div>
//                 <strong>Email:</strong> {user.email}
//               </div>
//               <div>
//                 <strong>Phone No:</strong> {user.phoneNo}
//               </div>
//               <div>
//                 <strong>Address:</strong> {user.address}
//               </div>

//               {/* Logout Button */}
//               <Button
//                 variant="warning"
//                 className="mt-4"
//                 onClick={handleLogout} // Trigger logout here
//                 style={{
//                   backgroundColor: "#FF6F00",
//                   borderColor: "#FF6F00",
//                   fontWeight: "bold",
//                 }}
//               >
//                 Log Out
//               </Button>
//             </Card.Body>
//           </Card>
//         )}
//       </div>
//     </>
//   );
// };

// export default ProfilePage;


// import React, { useState, useEffect } from "react";
// import { Button, Alert, Card } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
// import { FaUserCircle } from "react-icons/fa"; 

// const ProfilePage = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = Cookies.get("token");

//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     const fetchUserProfile = async () => {
//       try {
//         const response = await fetch("/api/getprofile", {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const data = await response.json();

//         if (response.ok) {
//           setUser(data.user);
//         } else {
//           setError(data.error || "Failed to fetch user profile.");
//         }
//       } catch (error) {
//         setError("Network error occurred. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserProfile();
//   }, [navigate]);

//   const handleLogout = () => {
//     Cookies.remove("token"); // Remove the token from cookies
//     navigate("/"); // Redirect to login page after logout
//   };

//   const handleOrderHistory = () => {
//     navigate("/order-details"); // Navigate to the order history page
//   };

//   return (
//     <>
//       <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
//         <h2 className="text-center mb-4" style={{ color: "#FF6F00" }}>Profile</h2>
//         {loading ? (
//           <div
//           style={{
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             height: '100vh',
//           }}
//         >
//           <div
//             style={{
//               border: '8px solid #f3f3f3', 
//               borderTop: '8px solid #fff', 
//               borderRadius: '50%',
//               width: '50px',  
//               height: '50px',
//               animation: 'spin 1s linear infinite', 
//             }}
//           ></div>
//           <style>
//             {`
//               @keyframes spin {
//                 0% { transform: rotate(0deg); }
//                 100% { transform: rotate(360deg); }
//               }
//             `}
//           </style>
//         </div>
//         ) : error ? (
//           <Alert variant="danger">{error}</Alert>
//         ) : (
//           <Card className="border-0 shadow-lg bg-light" style={{ borderRadius: "15px" }}>
//             <Card.Body className="text-center">
//               {/* User Icon */}
//               <FaUserCircle size={100} className="mb-3 text-success" />

//               <div>
//                 <strong>Username:</strong> {user.username}
//               </div>
//               <div>
//                 <strong>Email:</strong> {user.email}
//               </div>
//               {user.phoneNo && (
//                 <div>
//                   <strong>Phone No:</strong> {user.phoneNo}
//                 </div>
//               )}
//               {user.address && (
//                 <div>
//                   <strong>Address:</strong> {user.address}
//                 </div>
//               )}

//               <div className="d-flex justify-content-between">
//                 <Button
                 
//                   className="mt-4"
//                   onClick={handleOrderHistory} // Navigate to Order History
//                   style={{
//                     backgroundColor: "#1b7b16",
//                     borderColor: "#1b7b16",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   Order History
//                 </Button>

//                 <Button
//                   variant="success"
//                   className="mt-4"
//                   onClick={handleLogout} // Trigger logout here
//                   style={{
//                     backgroundColor: "#FF6F00",
//                     borderColor: "#FF6F00",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   Log Out
//                 </Button>
//               </div>
//             </Card.Body>
//           </Card>
//         )}
//       </div>
//     </>
//   );
// };

// export default ProfilePage;

















import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import styled from "styled-components";
import { FaUserCircle } from "react-icons/fa";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const ProfilePageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #ff6f00, #ff4081);
  margin-top: -15px;
  margin-bottom:-50px
`;

const ProfileCard = styled.div`
  background: white;
  width: 500px;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const AvatarContainer = styled.div`
  position: relative;
  margin: -70px auto 20px auto;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AvatarIcon = styled(FaUserCircle)`
  color: #ff6f00;
  font-size: 70px;
`;

const UserName = styled.h2`
  font-size: 20px;
  margin: 10px 0;
  color: #333;
`;

const UserInfo = styled.p`
  font-size: 14px;
  color: #666;
  margin: 5px 0;
`;


const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const ActionButton = styled.button`
  width: 48%;
  padding: 10px;
  font-size: 14px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  color: white;
  background-color: ${(props) => props.bgColor || "#ff6f00"};
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;


const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  

  useEffect(() => {
    const token = Cookies.get("token");
  
    // If there's no token, redirect to the login page
    if (!token) {
      navigate("/login");
      return;
    }
  
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("/api/getprofile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const data = await response.json();
  
        if (response.ok) {
          setUser(data.user);
        } else {
       
          setError(data.error || "Failed to fetch user profile.");
          Cookies.remove("token"); 
          navigate("/login");
        }
      } catch (error) {
        setError("Network error occurred. Please try again.");
        Cookies.remove("token"); 
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserProfile();
  }, [navigate]);
  
  
  
  
  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/"); // Redirect to login page after logout
  };

  const handleOrderHistory = () => {
    navigate("/order-details"); // Navigate to the order history page
  };

  return (
    <ProfilePageContainer>
      {loading ? (
          <DotLottieReact
          src="https://lottie.host/304b6b43-2a24-45bb-9012-ed8264aa2340/6hUDLfTOmC.lottie"
          loop
          autoplay
        />
      ) : error ? (
        <ProfileCard>
          <p style={{ color: "red" }}>{error}</p>
        </ProfileCard>
      ) : (
        <ProfileCard>
          <AvatarContainer>
            <AvatarIcon />
          </AvatarContainer>
          <UserName>{user.username}</UserName>
          <UserInfo>{user.email}</UserInfo>
          {user.phoneNo && <UserInfo>{user.phoneNo}</UserInfo>}
          {user.address && <UserInfo>{user.address}</UserInfo>}

          <ButtonContainer>
            <ActionButton bgColor="#1b7b16" onClick={handleOrderHistory}>
              Order History
            </ActionButton>
            <ActionButton bgColor="#ff6f00" onClick={handleLogout}>
              Log Out
            </ActionButton>
          </ButtonContainer>
        </ProfileCard>
      )}
    </ProfilePageContainer>
  );
};

export default ProfilePage;
