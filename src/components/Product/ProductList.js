



// import React, { useEffect, useState, useCallback } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import styled from 'styled-components';
// import Cookies from 'js-cookie';

// // ProductList Component
// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isAddingToCart, setIsAddingToCart] = useState({});
//   const [wishlist, setWishlist] = useState([]);
//   const navigate = useNavigate();

//   // Fetching products from the backend API
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get('/api/getallp');
//         setProducts(response.data.products);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   // Memoize fetchWishlist function to prevent unnecessary re-renders
//   const fetchWishlist = useCallback(async () => {
//     const token = Cookies.get("token");
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     try {
//       const response = await axios.get('/api/viewwishlist', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setWishlist(response.data.wishlist.map(item => item.productId));
//     } catch (error) {
//       console.error('Error fetching wishlist:', error);
//     }
//   }, [navigate]);

//   // Fetch the wishlist when the component mounts
//   useEffect(() => {
//     fetchWishlist();
//   }, [fetchWishlist]); // Add fetchWishlist as a dependency

//   // Adding a product to the cart
//   const addToCart = async (productId, quantity) => {
//     const token = Cookies.get("token");
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     // Optimistic UI update: Set the button to "Adding..." while the request is being processed
//     setIsAddingToCart(prev => ({ ...prev, [productId]: true }));

//     try {
//       // Make a POST request to the backend to add the product to the cart
//       const response = await axios.post(
//         '/api/addtocart', // Backend endpoint
//         { productId, quantity }, // Sending the productId and quantity
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // Send the token for authentication
//           },
//         }
//       );


//     } catch (error) {
//       console.error('Error adding to cart:', error);
//       alert('Failed to add product to cart.');
//     } finally {
//       setIsAddingToCart(prev => ({ ...prev, [productId]: false })); // Reset the button state
//     }
//   };

//   // Toggling the wishlist (add/remove)
//   const toggleWishlist = async (productId, isInWishlist) => {
//     const token = Cookies.get("token");
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     try {
//       if (isInWishlist) {
//         await axios.delete('/api/removefromwishlist', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           data: { productId },
//         });
//         setWishlist(prev => prev.filter(id => id !== productId));
//       } else {
//         await axios.post('/api/addtowishlist', { productId }, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setWishlist(prev => [...prev, productId]);
//       }
//     } catch (error) {
//       console.error('Error updating wishlist:', error);
//       alert('Failed to update wishlist.');
//     }
//   };

//   const ProductCard = ({ product, addToCart, isAddingToCart, toggleWishlist, isInWishlist }) => {
//     const handleCardClick = () => {
//       navigate(`/product/${product._id}`, { state: { products } });
//     };
  
//     const handleAddToCart = (e) => {
//       e.stopPropagation();
//       addToCart(product._id, 1); 
//     };
  
//     const handleWishlistToggle = (e) => {
//       e.stopPropagation();
//       toggleWishlist(product._id, isInWishlist);
//     };
  
//     // Function to format currency in INR
//     const formatCurrency = (amount) => {
//       return new Intl.NumberFormat('en-IN', {
//         style: 'currency',
//         currency: 'INR',
//       }).format(amount);
//     };
  
//     return (
//       <>
//         <div
//           key={product._id}
//           className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-4"
//           onClick={handleCardClick}
//           style={styles.productCardWrapper}
//         >
//           <div className="card border-0 rounded" style={styles.productCard}>
//             <div style={styles.imageContainer}>
//               <img
//                 src={product.images[0]}
//                 alt={product.title}
//                 className="card-img-top img-fluid"
//                 style={styles.productImage}
//               />
//               <div
//                 className="wishlist-heart-icon"
//                 style={styles.heartIcon}
//                 onClick={handleWishlistToggle}
//               >
//                 <span style={{ fontSize: '1.5rem', cursor: 'pointer' }}>
//                   {isInWishlist ? '❤️' : '🤍'}
//                 </span>
//               </div>
//             </div>
//             <div className="card-body" style={styles.cardBody}>
//               <h5 className="card-title" style={styles.productTitle}>{product.title}</h5>
//               <p className="card-text text-muted" style={styles.productDescription}>{product.description}</p>
              
//               <p className="text-dark" style={{ fontSize: '14px'  }}>
//                 Price: <span style={{fontSize: '14px',textDecoration: 'line-through',color: '#ff5722'}} >{formatCurrency(product.price)}</span>
//               </p>
  
//               {product.offerPrice && (
//                 <p className="text-dark" style={{ fontSize: '16px'}}>
//                   Offer Price: <span style={styles.productPrice}>{formatCurrency(product.offerPrice)}</span>
//                 </p>
//               )}
              
//               <div className="d-flex justify-content-between">
//                 <button
//                   className="btn btn-warning"
//                   onClick={handleAddToCart}
//                   disabled={isAddingToCart}
//                   style={styles.addToCartButton}
//                 >
//                   {isAddingToCart ? 'Adding...' : 'Add to Cart'}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   };
  

//   return (
//   <>
  
//   <Title className='mb-5'>Products You May Like!</Title>
//     <div className="container-fluid my-4">
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
//           products.map((product) => (
//             <ProductCard
//               key={product._id}
//               product={product}
//               addToCart={addToCart}
//               isAddingToCart={isAddingToCart[product._id] || false}
//               toggleWishlist={toggleWishlist}
//               isInWishlist={wishlist.includes(product._id)}
//             />
//           ))
//         )}
//       </div>
//     </div>
//   </>
//   );
// };
// const Title = styled.h1`
//   font-family: 'Arial', sans-serif;
//   font-size: 32px;
//   font-weight: 700;
//   color: #1b7b16;
//   text-align: center;
//   margin-bottom: 20px;
//   text-transform: uppercase;
//   letter-spacing: 2px;
//   text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
// `;
// const styles = {
//   productCard: {
//     borderRadius: '8px',
//     overflow: 'hidden',
//     position: 'relative',
//     backgroundColor: '#fff',
//     boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', 
//     transition: 'transform 0.2s ease-in-out',
//     marginBottom: '20px',
//   },
//   imageContainer: {
//     position: 'relative',
//     height: '200px',
//   },
//   productImage: {
//     width: '100%',
//     height: '100%',
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
//     marginBottom: '8px',
//   fontSize: '16px',
//   color: '#333',

//   },
//   productDescription: {
//     fontSize: '12px',
//   color: '#666',
//     marginBottom: '8px',
//     marginBottom: '8px',
//     lineHeight: '1.3',
//   },
//   productPrice: {
//     fontSize: '15px',
//     fontWeight: 'bold',
//   },
//   cardBody: {
//     padding: '15px',
//     textAlign:'center',
//   },
//   addToCartButton: {
//     backgroundColor: '#1b7b16',
//     color: '#fff',
//     border: 'none',
//     padding: '5px',
//     width: '100%',
//     borderRadius: '7px',
//     cursor: 'pointer',
//   },
// };

// export default ProductList;










import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

// ProductList Component
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  // Fetching products from the backend API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/getallp');
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Memoize fetchWishlist function to prevent unnecessary re-renders
  const fetchWishlist = useCallback(async () => {
    const token = Cookies.get('token');
    if (!token) {
      navigate('/');
      return;
    }

    try {
      const response = await axios.get('/api/viewwishlist', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWishlist(response.data.wishlist.map((item) => item.productId));
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  }, [navigate]);

  // Fetch the wishlist when the component mounts
  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]); // Add fetchWishlist as a dependency

  // Adding a product to the cart
  const addToCart = async (productId, quantity) => {
    const token = Cookies.get('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Optimistic UI update: Set the button to "Adding..." while the request is being processed
    setIsAddingToCart((prev) => ({ ...prev, [productId]: true }));

    try {
      // Make a POST request to the backend to add the product to the cart
      await axios.post(
        '/api/addtocart', // Backend endpoint
        { productId, quantity }, // Sending the productId and quantity
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token for authentication
          },
        }
      );
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart.');
    } finally {
      setIsAddingToCart((prev) => ({ ...prev, [productId]: false })); // Reset the button state
    }
  };

  // Toggling the wishlist (add/remove)
  const toggleWishlist = async (productId, isInWishlist) => {
    const token = Cookies.get('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      if (isInWishlist) {
        await axios.delete('/api/removefromwishlist', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: { productId },
        });
        setWishlist((prev) => prev.filter((id) => id !== productId));
      } else {
        await axios.post(
          '/api/addtowishlist',
          { productId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setWishlist((prev) => [...prev, productId]);
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
      alert('Failed to update wishlist.');
    }
  };

  const handleAddToBuy = (product) => {
    navigate(`/buynow/${product._id}`, { state: { product } }); // Navigating with product info
  };

  const ProductCard = ({ product, addToCart, isAddingToCart, toggleWishlist, isInWishlist }) => {
    const handleCardClick = () => {
      navigate(`/product/${product._id}`, { state: { products } });
    };

    const handleAddToCart = (e) => {
      e.stopPropagation();
      addToCart(product._id, 1);
    };

    const handleWishlistToggle = (e) => {
      e.stopPropagation();
      toggleWishlist(product._id, isInWishlist);
    };

    // Function to format currency in INR
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
      }).format(amount);
    };

    // Determine if the "Buy Now" button should be disabled
    const isOutOfStock = product.stock === 0;

    return (
      <>
        <div
          key={product._id}
          className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-4"
          onClick={handleCardClick}
          style={styles.productCardWrapper}
        >
          <div className="card border-0 rounded" style={styles.productCard}>
            <div style={styles.imageContainer}>
              <img
                src={product.images[0]}
                alt={product.title}
                className="card-img-top img-fluid"
                style={styles.productImage}
              />
              <div
                className="wishlist-heart-icon"
                style={styles.heartIcon}
                onClick={handleWishlistToggle}
              >
                <span style={{ fontSize: '1.5rem', cursor: 'pointer' }}>
                  {isInWishlist ? '❤️' : '🤍'}
                </span>
              </div>
            </div>
            <div className="card-body" style={styles.cardBody}>
              <h5 className="card-title" style={styles.productTitle}>
                {product.title}
              </h5>


              <p className="text-dark" style={{ fontSize: '14px' }}>
                Price:{' '}
                <span style={{ fontSize: '14px', textDecoration: 'line-through', color: '#ff5722' }}>
                  {formatCurrency(product.price)}
                </span>
              </p>

              {product.offerPrice && (
                <p className="text-dark" style={{ fontSize: '16px' }}>
                  Offer Price: <span style={styles.productPrice}>{formatCurrency(product.offerPrice)}</span>
                </p>
              )}

              {/* Display stock information */}
              <p className="text-muted" style={{ fontSize: '14px' }}>
                {isOutOfStock ? 'Out of Stock' : `Stock: ${product.stock}`}
              </p>

              {/* <div className="d-flex justify-content-between">
                <button
                  className="btn btn-warning"
                  onClick={handleAddToCart}
                  disabled={isAddingToCart || isOutOfStock } // Disable if adding or out of stock
                  style={styles.addToCartButton}
                >
                  {isAddingToCart ? 'Adding...' : 'Add to Cart'}
                </button>
                <button
                  className="btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToBuy(product);
                  }}
                  disabled={isOutOfStock} // Disable if out of stock
                  style={styles.addToBuyButton}
                >
                  Buy Now
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Title className="mb-5">Products You May Like!</Title>
      <div className="container-fluid my-4">
        <div className="row">
          {loading ? (
         <DotLottieReact
         src="https://lottie.host/304b6b43-2a24-45bb-9012-ed8264aa2340/6hUDLfTOmC.lottie"
         loop
         autoplay
       />
          ) : (
            products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                addToCart={addToCart}
                isAddingToCart={isAddingToCart[product._id] || false}
                toggleWishlist={toggleWishlist}
                isInWishlist={wishlist.includes(product._id)}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

const Title = styled.h1`
  font-family: 'Arial', sans-serif;
  font-size: 32px;
  font-weight: 700;
  color: #1b7b16;
  text-align: center;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

const styles = {
  productCard: {
    borderRadius: '8px',
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#fff',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s ease-in-out',
    marginBottom: '20px',
    
  },
  imageContainer: {
    position: 'relative',
    height: '200px',
  },
  productImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    margin:'0 auto',
    display:'flex'
  },
  heartIcon: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    cursor: 'pointer',
    zIndex: '10',
  },
  productTitle: {
    marginBottom: '8px',
    fontSize: '16px',
    color: '#333',
  },
  productDescription: {
    fontSize: '12px',
    color: '#666',
    marginBottom: '8px',
    lineHeight: '1.3',
  },
  productPrice: {
    fontSize: '15px',
    fontWeight: 'bold',
  },
  cardBody: {
    padding: '5px',
    textAlign: 'center',
  },
  // addToCartButton: {
  //   backgroundColor: '#1b7b16',
  //   color: '#fff',
  //   border: 'none',
  //   padding: '8px 16px',
  //   width: '48%',
  //   borderRadius: '5px',
  //   transition: 'background-color 0.3s ease',
  // },
  // addToBuyButton: {
  //   backgroundColor: '#1b7b16',
  //   color: '#fff',
  //   border: 'none',
  //   padding: '8px 16px',
  //   width: '48%',
  //   borderRadius: '5px',
  //   transition: 'background-color 0.3s ease',
  // },
};

export default ProductList;
