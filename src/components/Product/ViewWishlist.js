// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // For navigation
// import Cookies from 'js-cookie'; 
// import { FaShoppingCart } from 'react-icons/fa'; 

// // Wishlist Item Component
// const WishlistItem = ({ product, toggleWishlist, addToCart, isAddingToCart, onClick }) => {

//   const handleToggleWishlist = (e) => {
//     e.stopPropagation(); // Prevent click event from propagating to the parent (card)
//     toggleWishlist(product.productId, product.isInWishlist);
//   };

//   const handleAddToCart = (e, productId) => {
//     e.stopPropagation(); // Prevent click event from propagating to the parent (card)
//     addToCart(productId, 1); // Add 1 quantity of the product
//   };

//   // Function to format currency in INR
//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//     }).format(amount);
//   };

//   return (
//     <div key={product.productId} className="col-md-3 col-sm-6 mb-4" style={styles.productCardWrapper} onClick={onClick}>
//       <div className="card shadow-md border-0 rounded" style={styles.productCard}>
//         <div style={styles.imageContainer}>
//           <img
//             src={product.image}
//             alt={product.title}
//             className="card-img-top img-fluid"
//             style={styles.productImage}
//           />
//           {/* Heart emoji */}
//           <div
//             className="wishlist-heart-icon"
//             style={styles.heartIcon}
//             onClick={handleToggleWishlist}
//           >
//             <span
//               style={{
//                 fontSize: '1.5rem',
//                 cursor: 'pointer',
//               }}
//             >
//               {product.isInWishlist ? '❤️' : '🤍'}
//             </span>
//           </div>
//         </div>
//         <div className="card-body" style={styles.cardBody}>
//           <h5 className="card-title" style={styles.productTitle}>{product.title}</h5>
//           <p className="card-text text-muted" style={styles.productDescription}>{product.description}</p>
//           <p className="text-danger display-6" style={styles.productPrice}>{formatCurrency(product.price)}</p>
//           {/* Add to Cart Button */}
//           <button
//             className="btn btn-warning"
//             onClick={(e) => handleAddToCart(e, product.productId)} // Pass event to prevent propagation
//             style={styles.addToCartButton}
//             disabled={isAddingToCart[product.productId]}
//           >
//             {isAddingToCart[product.productId] ? 'Adding to Cart...' : 'Add to Cart'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const WishlistPage = () => {
//   const [wishlist, setWishlist] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isAddingToCart, setIsAddingToCart] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchWishlist = async () => {
//       const token = Cookies.get("token");
//       if (!token) {
//         navigate("/login"); // Redirect to login if no token is found
//         return;
//       }

//       try {
//         const response = await axios.get('/api/viewwishlist', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setWishlist(response.data.wishlist.map(item => ({
//           ...item,
//           isInWishlist: true // Add isInWishlist flag to mark if product is in the wishlist
//         })));
//       } catch (error) {
//         console.error('Error fetching wishlist:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWishlist();
//   }, [navigate]);

//   const handleContinueShopping = () => {
//     navigate('/');  
//   };

//   const toggleWishlist = async (productId, isInWishlist) => {
//     const token = Cookies.get("token");
//     if (!token) {
//       navigate("/login"); // Redirect if user is not logged in
//       return;
//     }

//     try {
//       let response;
//       if (isInWishlist) {
//         // Remove product from wishlist
//         response = await axios.delete('/api/removefromwishlist', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           data: { productId },
//         });
//         // Update wishlist state after removal
//         if (response.status === 200) {
//           setWishlist((prev) => prev.filter((item) => item.productId !== productId));
//         }
//       } else {
//         // Add product to wishlist
//         response = await axios.post('/api/addtowishlist', { productId }, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         // Update wishlist state after addition
//         if (response.status === 200) {
//           setWishlist((prev) => [
//             ...prev,
//             { ...response.data.product, isInWishlist: true }, // Assuming response contains the added product
//           ]);
//         }
//       }
//     } catch (error) {
//       console.error('Error updating wishlist:', error.response ? error.response.data : error.message);
//       alert('Failed to update wishlist.');
//     }
//   };

//   const addToCart = async (productId, quantity) => {
//     const token = Cookies.get("token");
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     // Set the specific product's loading state to true
//     setIsAddingToCart((prevState) => ({
//       ...prevState,
//       [productId]: true,
//     }));

//     try {
//       // Send a request to the backend to add the product to the cart
//       const response = await axios.post(
//         '/api/addtocart', // Backend endpoint
//         { productId, quantity }, // Payload with productId and quantity
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // Send the token for authentication
//           },
//         }
//       );
//     } catch (error) {
//       console.error('Error adding product to cart:', error);
//       alert('Failed to add product to cart.');
//     } finally {
//       // Reset the loading state once the process is complete
//       setIsAddingToCart((prevState) => ({
//         ...prevState,
//         [productId]: false,
//       }));
//     }
//   };

//   // This is where we handle the product card click
//   const handleCardClick = (productId) => {
//     // Navigate to the product detail page based on productId
//     navigate(`/product/${productId}`);
//   };

//   return (
//     <div className="container my-4">
//       <h2 style={{ textAlign: 'center' }}>YOUR WISHLIST</h2>
//       <div className="row">
//         {loading ? (
//           <div
//             style={{
//               display: 'flex',
//               justifyContent: 'center',
//               alignItems: 'center',
//               height: '100vh',
//             }}
//           >
//             <div
//               style={{
//                 border: '8px solid #f3f3f3',
//                 borderTop: '8px solid #fff',
//                 borderRadius: '50%',
//                 width: '50px',
//                 height: '50px',
//                 animation: 'spin 1s linear infinite',
//               }}
//             ></div>
//             <style>
//               {`
//                 @keyframes spin {
//                   0% { transform: rotate(0deg); }
//                   100% { transform: rotate(360deg); }
//                 }
//               `}
//             </style>
//           </div>
//         ) : (
//           wishlist.length === 0 ? (
//             <div style={emptyCartContainer}>
//               <p>Your wishlist is empty.</p>
//               <button 
//                 onClick={handleContinueShopping} 
//                 style={continueShoppingButtonStyle} 
//                 className="d-flex align-items-center"
//               >
//                 <FaShoppingCart style={{ marginRight: '8px' }} />
//                 Continue Shopping
//               </button>
//             </div>
//           ) : (
//             wishlist.map((item) => (
//               <WishlistItem 
//                 key={item.productId}
//                 product={item}
//                 toggleWishlist={toggleWishlist}
//                 addToCart={addToCart}
//                 isAddingToCart={isAddingToCart} 
//                 onClick={() => handleCardClick(item.productId)}  // Pass the handleCardClick function here
//               />
//             ))
//           )
//         )}
//       </div>
//     </div>
//   );
// };

// const emptyCartContainer = {
//   textAlign: 'center',
//   padding: '50px',
// };

// const continueShoppingButtonStyle = {
//   backgroundColor: '#ff9800',
//   color: '#fff',
//   padding: '10px 20px',
//   borderRadius: '5px',
//   border: 'none',
//   cursor: 'pointer',
//   marginTop: '20px',
//   display: 'inline-flex',
//   alignItems: 'center',
// };

// const styles = {
//   productCardWrapper: {
//     cursor: 'pointer',
//   },
//   productCard: {
//     borderRadius: '12px',
//     overflow: 'hidden',
//     position: 'relative',
//     backgroundColor: '#fff',
//     boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
//   },
//   imageContainer: {
//     position: 'relative',
//   },
//   productImage: {
//     width: '100%',
//     height: '250px',
//     objectFit: 'cover',
//   },
//   heartIcon: {
//     position: 'absolute',
//     top: '10px',
//     right: '10px',
//     cursor: 'pointer',
//     zIndex: '10',
//   },
//   productTitle: {
//     fontSize: '1.2rem',
//     fontWeight: 'bold',
//     color: '#333',
//     margin: '10px 0',
//   },
//   productDescription: {
//     fontSize: '0.875rem',
//     color: '#666',
//     marginBottom: '10px',
//     lineHeight: '1.5',
//   },
//   productPrice: {
//     fontSize: '1.2rem',
//     fontWeight: 'bold',
//     color: '#e50914',
//     marginBottom: '15px',
//   },
//   cardBody: {
//     padding: '20px',
//   },
//   addToCartButton: {
//     backgroundColor: '#1b7b16', 
//     color: '#fff',
//     border: 'none',
//     padding: '10px 20px',
//     borderRadius: '5px',
//     transition: 'background-color 0.3s ease',
//   },
// };

// export default WishlistPage;






import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For navigation
import Cookies from 'js-cookie'; 
import { FaShoppingCart } from 'react-icons/fa'; 
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

// Wishlist Item Component
const WishlistItem = ({ product, toggleWishlist, addToCart, isAddingToCart, onClick }) => {

 const navigate = useNavigate();

  const handleToggleWishlist = (e) => {
    e.stopPropagation(); // Prevent click event from propagating to the parent (card)
    toggleWishlist(product.productId, product.isInWishlist);
  };

  const handleAddToCart = (e, productId) => {
    e.stopPropagation(); // Prevent click event from propagating to the parent (card)
    addToCart(productId, 1); // Add 1 quantity of the product
  };

  // Function to format currency in INR
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };
  const handleAddToBuy = (product) => {
    navigate(`/buynow/${product._id}`, { state: { product } }); // Navigating with product info
  };
  const isOutOfStock = product.stock === 0;
  return (
 
    <div key={product.productId} className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-4 " style={styles.productCardWrapper} onClick={onClick}>
  <div className="card shadow-md border-0 rounded" style={styles.productCard}>
    <div style={styles.imageContainer}>
      <img
        src={product.image}
        alt={product.title}
        className="card-img-top img-fluid"
        style={styles.productImage}
      />
      <div
        className="wishlist-heart-icon"
        style={styles.heartIcon}
        onClick={handleToggleWishlist}
      >
        <span
          style={{
            fontSize: '1.5rem',
            cursor: 'pointer',
          }}
        >
          {product.isInWishlist ? '❤️' : '🤍'}
        </span>
      </div>
    </div>
    <div className="card-body mt-2 mb-2" style={styles.cardBody}>
      <h5 className="card-title" style={styles.productTitle}>{product.title}</h5>
      <p className="card-text text-muted" style={styles.productDescription}>{product.description}</p>
   
      <p className="text-muted" style={{ fontSize: '14px' }}>
            {isOutOfStock ? 'Out of Stock' : `Stock: ${product.stock}`}
          </p>
      <p className=" display-6" style={styles.productPrice}>Price: <span style={{textDecoration: 'line-through',color: '#ff5722'}}>{formatCurrency(product.price)}</span></p>
      <p className=" display-6" style={styles.productPrice}>Offer Price: {formatCurrency(product.offerPrice)}</p>
     
      <div style={styles.buttonContainer}>
      <button
       
        onClick={(e) => handleAddToCart(e, product.productId)} 
        style={styles.addToCartButton}
        disabled={isAddingToCart[product.productId] || isOutOfStock}
      >
        {isAddingToCart[product.productId] ? 'Adding...' : 'Add Cart'}
      </button>
      <button
            style={styles.addToBuyButton}
            disabled={isOutOfStock}
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click from firing
            handleAddToBuy(product);
          }}
          
         >
        Buy Now
     </button>
    </div>
    </div>
  </div>
</div>

  );
};

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlist = async () => {
      const token = Cookies.get("token");
      if (!token) {
        navigate("/login"); // Redirect to login if no token is found
        return;
      }

      try {
        const response = await axios.get('/api/viewwishlist', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setWishlist(response.data.wishlist.map(item => ({
          ...item,
          isInWishlist: true // Add isInWishlist flag to mark if product is in the wishlist
        })));
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [navigate]);

  const handleContinueShopping = () => {
    navigate('/');  
  };

  const toggleWishlist = async (productId, isInWishlist) => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/login"); // Redirect if user is not logged in
      return;
    }

    try {
      let response;
      if (isInWishlist) {
        // Remove product from wishlist
        response = await axios.delete('/api/removefromwishlist', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: { productId },
        });
        // Update wishlist state after removal
        if (response.status === 200) {
          setWishlist((prev) => prev.filter((item) => item.productId !== productId));
        }
      } else {
        // Add product to wishlist
        response = await axios.post('/api/addtowishlist', { productId }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Update wishlist state after addition
        if (response.status === 200) {
          setWishlist((prev) => [
            ...prev,
            { ...response.data.product, isInWishlist: true }, // Assuming response contains the added product
          ]);
        }
      }
    } catch (error) {
      console.error('Error updating wishlist:', error.response ? error.response.data : error.message);
      alert('Failed to update wishlist.');
    }
  };

  const addToCart = async (productId, quantity) => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Set the specific product's loading state to true
    setIsAddingToCart((prevState) => ({
      ...prevState,
      [productId]: true,
    }));

    try {
      // Send a request to the backend to add the product to the cart
      const response = await axios.post(
        '/api/addtocart', // Backend endpoint
        { productId, quantity }, // Payload with productId and quantity
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token for authentication
          },
        }
      );
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Failed to add product to cart.');
    } finally {
      // Reset the loading state once the process is complete
      setIsAddingToCart((prevState) => ({
        ...prevState,
        [productId]: false,
      }));
    }
  };

  // This is where we handle the product card click
  const handleCardClick = (productId) => {
    // Navigate to the product detail page based on productId
    navigate(`/product/${productId}`);
  };

  return (
    <div className="container-fluid my-4">
      <h2 style={{ textAlign: 'center ' }}>YOUR WISHLIST</h2>
      <div className="row">
        {loading ? (
           <DotLottieReact
           src="https://lottie.host/304b6b43-2a24-45bb-9012-ed8264aa2340/6hUDLfTOmC.lottie"
           loop
           autoplay
         />
        ) : (
          wishlist.length === 0 ? (
            <div style={emptyCartContainer}>
              <p>Your wishlist is empty.</p>
              <button 
                onClick={handleContinueShopping} 
                style={continueShoppingButtonStyle} 
                className="d-flex align-items-center"
              >
                <FaShoppingCart style={{ marginRight: '8px' }} />
                Continue Shopping
              </button>
            </div>
          ) : (
            wishlist.map((item) => (
              <WishlistItem  
                key={item.productId}
                product={item}
                toggleWishlist={toggleWishlist}
                addToCart={addToCart}
                isAddingToCart={isAddingToCart} 
                onClick={() => handleCardClick(item.productId)}  // Pass the handleCardClick function here
              />
            ))
          )
        )}
      </div>
    </div>
  );
};

const emptyCartContainer = {
  textAlign: 'center',
  padding: '50px',
};

const continueShoppingButtonStyle = {
  backgroundColor: '#ff9800',
  color: '#fff',
  padding: '10px 20px',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',
  marginTop: '20px',
  display: 'inline-flex',
  alignItems: 'center',
};

const styles = {
  productCardWrapper: {
    cursor: 'pointer',
  },
  productCard: {
    borderRadius: '12px',
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#fff',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    marginTop:'30px',
  },
  imageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '250px',
    objectFit: 'cover',
  },
  heartIcon: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    cursor: 'pointer',
    zIndex: '10',
  },
  productTitle: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#333',
    margin: '10px 0',
  },
  productDescription: {
    fontSize: '0.875rem',
    color: '#666',
    marginBottom: '10px',
    lineHeight: '1.5',
  },
  
  productPrice: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '15px',
  },
  cardBody: {
    padding: '20px',
    textAlign:'center',
  },
  addToCartButton: {
    backgroundColor: '#1b7b16',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    width:'48%',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  },
  addToBuyButton:{
    backgroundColor: '#1b7b16',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    width:'48%',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  },
  buttonContainer:{
      display: 'flex',
      gap: '10px',
  },
};

export default WishlistPage;
