


// // import React, { useState, useEffect } from 'react';
// // import { NavLink, useNavigate } from "react-router-dom";
// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import { faSearch, faSignInAlt, faUser, faHeart, faShoppingCart, faStore } from '@fortawesome/free-solid-svg-icons';
// // import Cookies from "js-cookie";  // Assuming you use cookies for session management.
// // import axios from 'axios';  // Make API requests using axios
// // import './assets/css/Navbar.css';

// // const Navbar = () => {
// //   const [searchTerm, setSearchTerm] = useState("");  
// //   const [isMenuOpen, setIsMenuOpen] = useState(false);  
// //   const [isLoggedIn, setIsLoggedIn] = useState(false);  
// //   const [itemsCount, setItemsCount] = useState(0);  // Total count of unique items
// //   const [animatedCount, setAnimatedCount] = useState(0);  // Animated cart count
// //   const [loading, setLoading] = useState(true);  // Loading state for fetching data
// //   const navigate = useNavigate(); 

// //   // Function to check if the user is logged in and update cart count if logged in
// //   const fetchCartItemCount = async () => {
// //     const token = Cookies.get("token");  // Get token from cookies to check if user is logged in
// //     if (token) {
// //       try {
// //         setLoading(true); 
// //         const response = await axios.get('/api/viewcart', {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         });

// //         const cartItems = response.data.cart.items;
// //         const uniqueItems = cartItems.length; 
// //         setItemsCount(uniqueItems);  
// //         setLoading(false); 

// //         animateCartCount(uniqueItems);

// //       } catch (error) {
// //         console.error('Error fetching cart data:', error);
// //         setLoading(false);  
// //       }
// //     }
// //   };

// //   const animateCartCount = (targetCount) => {
// //     let currentCount = animatedCount;
// //     clearInterval(window.cartCountInterval);

// //     window.cartCountInterval = setInterval(() => {
// //       if (currentCount < targetCount) {
// //         currentCount += 1; 
// //         setAnimatedCount(currentCount);
// //       } else {
// //         clearInterval(window.cartCountInterval); 
// //       }
// //     }, 0); 
// //   };

// //   useEffect(() => {

// //     const token = Cookies.get("token");  
// //     setIsLoggedIn(!!token);

// //     if (token) {
// //       fetchCartItemCount();
// //     } else {
// //       setItemsCount(0); 
// //       setAnimatedCount(0);
// //       setLoading(false);  
// //     }
// //   }, []); 

// //   const handleCartUpdate = () => {
// //     fetchCartItemCount(); 
// //   };

// //   const handleSearchChange = (e) => {
// //     setSearchTerm(e.target.value);
// //   };

// //   const handleSearch = () => {
// //     if (searchTerm.trim()) {
// //       navigate(`/search?query=${searchTerm}`);
// //       setSearchTerm("");  
// //     }
// //   };

// //   const handleKeyPress = (e) => {
// //     if (e.key === 'Enter') {
// //       handleSearch();
// //     }
// //   };

// //   const toggleMenu = () => {
// //     setIsMenuOpen(!isMenuOpen);
// //   };

// //   return (
// //     <div style={{ height: '90px' }} > 
// //       <nav className="navbar navbar-expand-lg fixed-top" style={{ backgroundColor: "#1b7b16", padding: "1rem" }}>
// //         <NavLink className="navbar-brand" to="/" style={{ fontWeight: "bold", fontSize: "1.5rem", color: "white" }}>
// //           Grocery-Shop
// //         </NavLink>

// //         <button className="navbar-toggler" type="button" onClick={toggleMenu} aria-controls="navbarNav" aria-expanded={isMenuOpen} aria-label="Toggle navigation">
// //           <span className="navbar-toggler-icon"></span>
// //         </button>

// //         <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
// //           <ul className="navbar-nav m-auto my-2 text-center">
// //             {/* Search Bar */}
// //             <li className="nav-item">
// //               <div style={{ position: "relative", marginRight: "20px" }}>
// //                 <input
// //                   type="text"
// //                   placeholder="Search products..."
// //                   value={searchTerm}
// //                   onChange={handleSearchChange}
// //                   className="search-input"
// //                   style={{
// //                     paddingLeft: "40px", width: "250px", borderRadius: "25px",
// //                     border: "1px solid #ddd", outline: "none", padding: "0.5rem 2.1rem", fontSize: "1rem"
// //                   }}
// //                   onKeyDown={handleKeyPress}
// //                 />
// //                 <FontAwesomeIcon
// //                   icon={faSearch}
// //                   style={{
// //                     position: "absolute", top: "50%", left: "10px", transform: "translateY(-50%)",
// //                     color: "#1b7b16", fontSize: "1.2rem"
// //                   }}
// //                   onClick={handleSearch}
// //                 />
// //               </div>
// //             </li>

// //             <li className="nav-item">
// //               <NavLink className="nav-link" to="/" style={{ color: "#fff" }}>Home</NavLink>
// //             </li>
// //             <li className="nav-item">
// //               <NavLink className="nav-link" to="/Category" style={{ color: "white" }}>
// //                 <FontAwesomeIcon icon={faStore} className="mr-1" /> Categories
// //               </NavLink>
// //             </li>
// //           </ul>

// //           <div className="buttons text-center">
// //             {isLoggedIn ? (
// //               // Show user-related buttons when logged in
// //               <>
// //                 <NavLink to="/profile" className="btn btn-outline-light m-2">
// //                   <FontAwesomeIcon icon={faUser} className="mr-1" />
// //                 </NavLink>

// //                 <NavLink to="/wishlist" className="btn btn-outline-light m-2">
// //                   <FontAwesomeIcon icon={faHeart} className="mr-1" /> 
// //                 </NavLink>

// //                 <NavLink to="/cart" className="btn btn-outline-light m-2" onClick={handleCartUpdate}>
// //                   <FontAwesomeIcon icon={faShoppingCart} className="mr-1" /> 
// //                   {/* Show loading message or the animated count */}
// //                   {loading ? <span>.</span> : `(${animatedCount})`}
// //                 </NavLink>
// //               </>
// //             ) : (
// //               // Show login button when not logged in
// //               <NavLink to="/login" className="btn btn-outline-light m-2">
// //                 <FontAwesomeIcon icon={faSignInAlt} className="mr-1" /> Login
// //               </NavLink>
// //             )}
// //           </div>
// //         </div>
// //       </nav>
// //     </div>
// //   );
// // };

// // export default Navbar;





// import React, { useState, useEffect } from 'react';
// import { NavLink, useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch, faSignInAlt, faUser, faHeart, faShoppingCart, faStore, faBell } from '@fortawesome/free-solid-svg-icons';
// import Cookies from "js-cookie";  
// import axios from 'axios';  
// import './assets/css/Navbar.css';

// const Navbar = () => {
//   const [searchTerm, setSearchTerm] = useState("");  
//   const [isMenuOpen, setIsMenuOpen] = useState(false);  
//   const [isLoggedIn, setIsLoggedIn] = useState(false);  
//   const [itemsCount, setItemsCount] = useState(0);  
//   const [animatedCount, setAnimatedCount] = useState(0);  
//   const [loading, setLoading] = useState(true);  
//   const navigate = useNavigate(); 

//   const fetchCartItemCount = async () => {
//     const token = Cookies.get("token");  
//     if (token) {
//       try {
//         setLoading(true); 
//         const response = await axios.get('/api/viewcart', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const cartItems = response.data.cart.items;
//         const uniqueItems = cartItems.length;
//         setItemsCount(uniqueItems);  
//         setLoading(false);  
//         animateCartCount(uniqueItems);
//       } catch (error) {
//         console.error('Error fetching cart data:', error);
//         setLoading(false);  
//       }
//     }
//   };

//   const animateCartCount = (targetCount) => {
//     let currentCount = animatedCount;
//     clearInterval(window.cartCountInterval);
//     window.cartCountInterval = setInterval(() => {
//       if (currentCount < targetCount) {
//         currentCount += 1; 
//         setAnimatedCount(currentCount);
//       } else {
//         clearInterval(window.cartCountInterval); 
//       }
//     }, 0); 
//   };

//   useEffect(() => {
//     const token = Cookies.get("token");  
//     setIsLoggedIn(!!token);
//     if (token) {
//       fetchCartItemCount();
//     } else {
//       setItemsCount(0); 
//       setAnimatedCount(0);
//       setLoading(false);  
//     }
//     window.scrollTo(0, 0);  // Ensure the page scrolls to top on mount
//   }, []); 

//   const handleCartUpdate = () => {
//     fetchCartItemCount(); 
//   };

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleSearch = () => {
//     if (searchTerm.trim()) {
//       navigate(`/search?query=${searchTerm}`);
//       setSearchTerm("");  
//       setIsMenuOpen(false);  // Close the hamburger menu after search
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSearch();
//     }
//   };

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const handleNotificationClick = (e) => {
//     e.preventDefault();  // Prevent page reload
//     navigate("/notifications");
//     setIsMenuOpen(false);  // Close menu after clicking on the notification
//   };

//   const handleLinkClick = () => {
//     setIsMenuOpen(false);  // Close menu after clicking a link
//     window.scrollTo(0, 0);  // Prevent scrolling to top behavior
//   };

//   return (
//     <div style={{ height: '90px' }}> 
//       <nav className="navbar navbar-expand-lg fixed-top" style={{ backgroundColor: "#1b7b16", padding: "1rem" }}>
//         <NavLink className="navbar-brand" to="/" style={{ fontWeight: "bold", fontSize: "1.5rem", color: "white" }}>
//           Grocery-Shop
//         </NavLink>

//         <button className="navbar-toggler" type="button" onClick={toggleMenu} aria-controls="navbarNav" aria-expanded={isMenuOpen} aria-label="Toggle navigation">
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
//           <ul className="navbar-nav m-auto my-2 text-center">
//             {/* Search Bar */}
//             <li className="nav-item">
//               <div style={{ position: "relative", marginRight: "20px" }}>
//                 <input
//                   type="text"
//                   placeholder="Search products..."
//                   value={searchTerm}
//                   onChange={handleSearchChange}
//                   className="search-input"
//                   style={{
//                     paddingLeft: "40px", width: "250px", borderRadius: "25px",
//                     border: "1px solid #ddd", outline: "none", padding: "0.5rem 2.1rem", fontSize: "1rem"
//                   }}
//                   onKeyDown={handleKeyPress}
//                 />
//                 <FontAwesomeIcon
//                   icon={faSearch}
//                   style={{
//                     position: "absolute", top: "50%", left: "10px", transform: "translateY(-50%)",
//                     color: "#1b7b16", fontSize: "1.2rem"
//                   }}
//                   onClick={handleSearch}
//                 />
//               </div>
//             </li>

//             <li className="nav-item">
//               <NavLink to="/" className="nav-link" style={{ color: "#fff" }} onClick={handleLinkClick}>Home</NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink to="/Category" className="nav-link" style={{ color: "white" }} onClick={handleLinkClick}>
//                 <FontAwesomeIcon icon={faStore} className="mr-1" /> Categories
//               </NavLink>
//             </li>
//           </ul>

//           <div className="buttons text-center">
//             {isLoggedIn ? (
//               <>
//                 <NavLink to="/profile" className="btn btn-outline-light m-2" onClick={handleLinkClick}>
//                   <FontAwesomeIcon icon={faUser} className="mr-1" />
//                 </NavLink>

//                 <NavLink to="/wishlist" className="btn btn-outline-light m-2" onClick={handleLinkClick}>
//                   <FontAwesomeIcon icon={faHeart} className="mr-1" />
//                 </NavLink>

//                 <NavLink to="/cart" className="btn btn-outline-light m-2" onClick={() => { handleCartUpdate(); handleLinkClick(); }}>
//                   <FontAwesomeIcon icon={faShoppingCart} className="mr-1" />
//                   {loading ? <span>.</span> : `(${animatedCount})`}
//                 </NavLink>

//                 {/* Notification Button (Responsive) */}
//                 <button className="btn btn-outline-light m-2" onClick={handleNotificationClick}>
//                   <FontAwesomeIcon icon={faBell} className="mr-1" />
//                 </button>
//               </>
//             ) : (
//               <NavLink to="/login" className="btn btn-outline-light m-2" onClick={handleLinkClick}>
//                 <FontAwesomeIcon icon={faSignInAlt} className="mr-1" /> Login
//               </NavLink>
//             )}
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Navbar;



import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSignInAlt, faUser, faHeart, faShoppingCart, faStore, faBell } from '@fortawesome/free-solid-svg-icons';
import Cookies from "js-cookie";  
import axios from 'axios';  
import './assets/css/Navbar.css';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");  
  const [isMenuOpen, setIsMenuOpen] = useState(false);  
  const [isLoggedIn, setIsLoggedIn] = useState(false);  
  // const [itemsCount, setItemsCount] = useState(0);  
  const [animatedCount, setAnimatedCount] = useState(0);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null); // To store any error from fetching profile
  const navigate = useNavigate(); 

  const fetchCartItemCount = async () => {
    const token = Cookies.get("token");  
    if (token) {
      try {
        setLoading(true); 
        const response = await axios.get('/api/viewcart', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const cartItems = response.data.cart.items;
        const uniqueItems = cartItems.length;
        setItemsCount(uniqueItems);  
        setLoading(false);  
        animateCartCount(uniqueItems);
      } catch (error) {
        console.error('Error fetching cart data:', error);
        setLoading(false);  
      }
    }
  };

  const animateCartCount = (targetCount) => {
    let currentCount = animatedCount;
    clearInterval(window.cartCountInterval);
    window.cartCountInterval = setInterval(() => {
      if (currentCount < targetCount) {
        currentCount += 1; 
        setAnimatedCount(currentCount);
      } else {
        clearInterval(window.cartCountInterval); 
      }
    }, 0); 
  };

  const fetchUserProfile = async () => {
    const token = Cookies.get("token");
    if (!token) {
      setIsLoggedIn(false);
      return;
    }
  
    try {
      const response = await fetch("/api/getprofile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setIsLoggedIn(true); // If profile fetch is successful, user is logged in
      } else {
        setError(data.error || "Failed to fetch user profile.");
        Cookies.remove("token"); // Remove invalid token
        setIsLoggedIn(false);
      }
    } catch (error) {
      setError("Network error occurred. Please try again.");
      Cookies.remove("token"); // Remove invalid token in case of network error
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");  
    if (token) {
      fetchUserProfile();
      fetchCartItemCount(); // Fetch cart item count only if logged in
    } else {
      setIsLoggedIn(false); 
      setItemsCount(0); 
      setAnimatedCount(0);
      setLoading(false);  
    }
    window.scrollTo(0, 0);  // Ensure the page scrolls to top on mount
  }, []); 

  const handleCartUpdate = () => {
    fetchCartItemCount(); 
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?query=${searchTerm}`);
      setSearchTerm("");  
      setIsMenuOpen(false);  // Close the hamburger menu after search
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNotificationClick = (e) => {
    e.preventDefault();  // Prevent page reload
    navigate("/notifications");
    setIsMenuOpen(false);  // Close menu after clicking on the notification
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);  // Close menu after clicking a link
    window.scrollTo(0, 0);  // Prevent scrolling to top behavior
  };

  return (
    <div style={{ height: '90px' }}> 
      <nav className="navbar navbar-expand-lg fixed-top" style={{ backgroundColor: "#1b7b16", padding: "1rem" }}>
        <NavLink className="navbar-brand" to="/" style={{ fontWeight: "bold", fontSize: "1.5rem", color: "white" }}>
          Grocery-Shop
        </NavLink>

        <button className="navbar-toggler" type="button" onClick={toggleMenu} aria-controls="navbarNav" aria-expanded={isMenuOpen} aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav m-auto my-2 text-center">
            {/* Search Bar */}
            <li className="nav-item">
              <div style={{ position: "relative", marginRight: "20px" }}>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="search-input"
                  style={{
                    paddingLeft: "40px", width: "250px", borderRadius: "25px",
                    border: "1px solid #ddd", outline: "none", padding: "0.5rem 2.1rem", fontSize: "1rem"
                  }}
                  onKeyDown={handleKeyPress}
                />
                <FontAwesomeIcon
                  icon={faSearch}
                  style={{
                    position: "absolute", top: "50%", left: "10px", transform: "translateY(-50%)",
                    color: "#1b7b16", fontSize: "1.2rem"
                  }}
                  onClick={handleSearch}
                />
              </div>
            </li>

            <li className="nav-item">
              <NavLink to="/" className="nav-link" style={{ color: "#fff" }} onClick={handleLinkClick}>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/Category" className="nav-link" style={{ color: "white" }} onClick={handleLinkClick}>
                <FontAwesomeIcon icon={faStore} className="mr-1" /> Categories
              </NavLink>
            </li>
          </ul>

          <div className="buttons text-center">
            {isLoggedIn ? (
              <>
                <NavLink to="/profile" className="btn btn-outline-light m-2" onClick={handleLinkClick}>
                  <FontAwesomeIcon icon={faUser} className="mr-1" />
                </NavLink>

                <NavLink to="/wishlist" className="btn btn-outline-light m-2" onClick={handleLinkClick}>
                  <FontAwesomeIcon icon={faHeart} className="mr-1" />
                </NavLink>

                <NavLink to="/cart" className="btn btn-outline-light m-2" onClick={() => { handleCartUpdate(); handleLinkClick(); }}>
                  <FontAwesomeIcon icon={faShoppingCart} className="mr-1" />
                  {loading ? <span>.</span> : `(${animatedCount})`}
                </NavLink>

                {/* Notification Button (Responsive) */}
                <button className="btn btn-outline-light m-2" onClick={handleNotificationClick}>
                  <FontAwesomeIcon icon={faBell} className="mr-1" />
                </button>
              </>
            ) : (
              <NavLink to="/login" className="btn btn-outline-light m-2" onClick={handleLinkClick}>
                <FontAwesomeIcon icon={faSignInAlt} className="mr-1" /> Login
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
