


// // import React, { useState, useEffect } from 'react';
// // import { useLocation, useNavigate } from 'react-router-dom';
// // import axios from 'axios';
// // import Cookies from 'js-cookie';

// // const ProductCard = ({ product, addToCart, isAddingToCart, toggleWishlist, isInWishlist }) => {
// //   const navigate = useNavigate();

// //   const handleCardClick = () => {
// //     navigate(`/product/${product._id}`);
// //   };

// //   const handleAddToCart = (e) => {
// //     e.stopPropagation();
// //     addToCart(product._id, 1); // Add 1 item of the selected product to cart
// //   };

// //   const handleWishlistToggle = (e) => {
// //     e.stopPropagation();
// //     toggleWishlist(product._id, isInWishlist); // Toggle the product in the wishlist
// //   };

// //   return (
// //     <div
// //       key={product._id}
// //       className="col-md-3 col-sm-12 mb-3"
// //       onClick={handleCardClick}
// //       style={styles.productCardWrapper}
// //     >
// //       <div className="card shadow-lg border-0 rounded" style={styles.productCard}>
// //         <div style={styles.imageContainer}>
// //           <img
// //             src={product.images[0]}
// //             alt={product.title}
// //             className="card-img-top img-fluid"
// //             style={styles.productImage}
// //           />
// //           <div
// //             className="wishlist-heart-icon"
// //             style={styles.heartIcon}
// //             onClick={handleWishlistToggle}
// //           >
// //             <span style={{ fontSize: '1.3rem', cursor: 'pointer' }}>
// //               {isInWishlist ? '❤️' : '🤍'}
// //             </span>
// //           </div>
// //         </div>
// //         <div className="card-body" style={styles.cardBody}>
// //           <h5 className="card-title" style={styles.productTitle}>{product.title}</h5>
// //           <p className="card-text text-muted" style={styles.productDescription}>{product.description}</p>
// //           <p className="text-danger" style={styles.productPrice}>
// //             ₹{product.price}
// //           </p>
// //           <div className="d-flex justify-content-between">
// //             <button
// //               className="btn btn-warning"
// //               onClick={handleAddToCart}
// //               disabled={isAddingToCart}
// //               style={styles.addToCartButton}
// //             >
// //               {isAddingToCart ? 'Adding...' : 'Add to Cart'}
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // const SearchPage = () => {
// //   const [products, setProducts] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [isAddingToCart, setIsAddingToCart] = useState({});
// //   const [wishlist, setWishlist] = useState([]);
// //   const [noResults, setNoResults] = useState(false); // State to handle no results message
// //   const navigate = useNavigate();

// //   const location = useLocation();
// //   const searchParams = new URLSearchParams(location.search);
// //   const query = searchParams.get('query');

// //   useEffect(() => {
// //     if (query) {
// //       fetchProducts(query);  // Fetch products based on the query
// //       fetchWishlist();  // Fetch the wishlist for the user
// //     } else {
// //       fetchAllProducts(); // Fetch all products if no query is provided
// //     }
// //   }, [query]);

// //   const fetchProducts = async (searchTerm) => {
// //     setLoading(true);
// //     try {
// //       const response = await axios.get('/api/search', {
// //         params: { title: searchTerm },
// //       });
// //       console.log('Search Response:', response.data); // Log search results

// //       if (response.data.products && response.data.products.length === 0) {
// //         // If no products found in the search, fetch all products
// //         setNoResults(true);
// //         fetchAllProducts();
// //       } else {
// //         setNoResults(false); // Reset if products are found
// //         setProducts(response.data.products); // Set the search results
// //       }
// //     } catch (error) {
// //       console.error('Error fetching products:', error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const fetchAllProducts = async () => {
// //     setLoading(true);
// //     try {
// //       const response = await axios.get('/api/getallp');
// //       console.log('All Products Response:', response.data); // Log the all products response

// //       if (response.data.products && response.data.products.length > 0) {
// //         setProducts(response.data.products);
// //         setNoResults(false); // Reset no results flag if products are found
// //       } else {
// //         setProducts([]);
// //         setNoResults(true); // Handle empty product list
// //       }
// //     } catch (error) {
// //       console.error("Error fetching all products:", error);
// //       setNoResults(true); // Show no results if API fails
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const fetchWishlist = async () => {
// //     const token = Cookies.get('token');
// //     if (!token) {
// //       navigate('/login');
// //       return;
// //     }

// //     try {
// //       const response = await axios.get('/api/viewwishlist', {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       });
// //       setWishlist(response.data.wishlist.map(item => item.productId));
// //     } catch (error) {
// //       console.error('Error fetching wishlist:', error);
// //     }
// //   };

// //   const addToCart = async (productId, quantity) => {
// //     const token = Cookies.get('token');
// //     if (!token) {
// //       navigate('/login');
// //       return;
// //     }

// //     setIsAddingToCart((prev) => ({ ...prev, [productId]: true }));

// //     try {
// //       const response = await axios.post(
// //         '/api/addtocart',
// //         { productId, quantity },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );

// //       if (!response.data.success) {
// //         console.error('Failed to add product to cart:', response.data.message);
// //       }
// //     } catch (error) {
// //       console.error('Error adding to cart:', error);
// //     } finally {
// //       setIsAddingToCart((prev) => ({ ...prev, [productId]: false }));
// //     }
// //   };

// //   const toggleWishlist = async (productId, isInWishlist) => {
// //     const token = Cookies.get('token');
// //     if (!token) {
// //       navigate('/login');
// //       return;
// //     }

// //     try {
// //       if (isInWishlist) {
// //         await axios.delete('/api/removefromwishlist', {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //           data: { productId },
// //         });
// //         setWishlist((prev) => prev.filter(id => id !== productId));
// //       } else {
// //         await axios.post('/api/addtowishlist', { productId }, {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         });
// //         setWishlist((prev) => [...prev, productId]);
// //       }
// //     } catch (error) {
// //       console.error('Error updating wishlist:', error);
// //       alert('Failed to update wishlist.');
// //     }
// //   };

// //   return (
// //     <div className="container-fluid my-4">
// //       <div className="row">
// //         {loading ? (
// //           <div
// //             style={{
// //               display: 'flex',
// //               justifyContent: 'center',
// //               alignItems: 'center',
// //               height: '100vh',
// //             }}
// //           >
// //             <div
// //               style={{
// //                 border: '8px solid #f3f3f3',
// //                 borderTop: '8px solid #fff',
// //                 borderRadius: '50%',
// //                 width: '50px',
// //                 height: '50px',
// //                 animation: 'spin 1s linear infinite',
// //               }}
// //             ></div>
// //             <style>
// //               {`
// //                 @keyframes spin {
// //                   0% { transform: rotate(0deg); }
// //                   100% { transform: rotate(360deg); }
// //                 }
// //               `}
// //             </style>
// //           </div>
// //         ) : noResults ? (
// //           <div style={{ textAlign: 'center', width: '100%' }}>
// //             <h4>No products available.</h4>
// //           </div>
// //         ) : (
// //           products.map((product) => (
// //             <ProductCard
// //               key={product._id}
// //               product={product}
// //               addToCart={addToCart}
// //               isAddingToCart={isAddingToCart[product._id] || false}
// //               toggleWishlist={toggleWishlist}
// //               isInWishlist={wishlist.includes(product._id)}
// //             />
// //           ))
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // const styles = {
// //   productCardWrapper: {
// //     cursor: 'pointer',
// //   },
// //   productCard: {
// //     borderRadius: '10px',
// //     overflow: 'hidden',
// //     position: 'relative',
// //     backgroundColor: '#fff',
// //     boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
// //     transition: 'transform 0.2s ease-in-out',
// //     maxWidth: '220px',
// //     margin: '0 auto',
// //   },
// //   imageContainer: {
// //     position: 'relative',
// //   },
// //   productImage: {
// //     width: '100%',
// //     height: '200px',
// //     objectFit: 'cover',
// //   },
// //   heartIcon: {
// //     position: 'absolute',
// //     top: '8px',
// //     right: '8px',
// //     cursor: 'pointer',
// //     zIndex: '10',
// //   },
// //   productTitle: {
// //     fontSize: '1.1rem',
// //     fontWeight: 'bold',
// //     color: '#333',
// //     margin: '8px 0',
// //   },
// //   productDescription: {
// //     fontSize: '0.8rem',
// //     color: '#666',
// //     marginBottom: '8px',
// //     lineHeight: '1.4',
// //   },
// //   productPrice: {
// //     fontSize: '1rem',
// //     fontWeight: 'bold',
// //     color: '#e50914',
// //     marginBottom: '10px',
// //   },
// //   cardBody: {
// //     padding: '15px',
// //   },
// //   addToCartButton: {
// //     backgroundColor: '#1b7b16',
// //     color: '#fff',
// //     border: 'none',
// //     padding: '8px 16px',
// //     borderRadius: '5px',
// //     transition: 'background-color 0.3s ease',
// //   },
// // };

// // export default SearchPage;













// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Cookies from 'js-cookie';

// const ProductCard = ({ product, addToCart, isAddingToCart, toggleWishlist, isInWishlist }) => {
//   const navigate = useNavigate();

//   const handleCardClick = () => {
//     navigate(`/product/${product._id}`);
//   };

//   const handleAddToCart = (e) => {
//     e.stopPropagation();
//     addToCart(product._id, 1); // Add 1 item of the selected product to cart
//   };

//   const handleWishlistToggle = (e) => {
//     e.stopPropagation();
//     toggleWishlist(product._id, isInWishlist); // Toggle the product in the wishlist
//   };

//   return (
//     <div
//       key={product._id}
//       className="col-md-3 col-sm-12 mb-3"
//       onClick={handleCardClick}
//       style={styles.productCardWrapper}
//     >
//       <div className="card shadow-lg border-0 rounded" style={styles.productCard}>
//         <div style={styles.imageContainer}>
//           <img
//             src={product.images[0]}
//             alt={product.title}
//             className="card-img-top img-fluid"
//             style={styles.productImage}
//           />
//           <div
//             className="wishlist-heart-icon"
//             style={styles.heartIcon}
//             onClick={handleWishlistToggle}
//           >
//             <span style={{ fontSize: '1.3rem', cursor: 'pointer' }}>
//               {isInWishlist ? '❤️' : '🤍'}
//             </span>
//           </div>
//         </div>
//         <div className="card-body" style={styles.cardBody}>
//           <h5 className="card-title" style={styles.productTitle}>{product.title}</h5>
//           <p className="card-text text-muted" style={styles.productDescription}>{product.description}</p>
//           <p className="text-danger" >
//           Price:<span style={{fontSize: '14px',textDecoration: 'line-through',color: '#ff5722'}} >₹{product.price}</span>
//           </p>
    

//           <p  style={{ fontSize: '16px0',color:'#000'}}>
//                   Offer Price: <span style={styles.productPrice}>₹{product.offerPrice}</span>
//                 </p>
//           <div className="d-flex justify-content-between">
//             <button
//               className="btn btn-warning"
//               onClick={handleAddToCart}
//               disabled={isAddingToCart}
//               style={styles.addToCartButton}
//             >
//               {isAddingToCart ? 'Adding...' : 'Add to Cart'}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const SearchPage = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [isAddingToCart, setIsAddingToCart] = useState({});
//   const [wishlist, setWishlist] = useState([]);
//   const [noResults, setNoResults] = useState(false); // State to handle no results message
//   const navigate = useNavigate();

//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const query = searchParams.get('query');

//   useEffect(() => {
//     if (query) {
//       fetchProducts(query);  // Fetch products based on the query
//       fetchWishlist();  // Fetch the wishlist for the user
//     } else {
//       fetchAllProducts(); // Fetch all products if no query is provided
//     }
//   }, [query]);

//   const fetchProducts = async (searchTerm) => {
//     setLoading(true);
//     try {
//       const response = await axios.get('/api/search', {
//         params: { title: searchTerm },
//       });


//       if (response.data.products && response.data.products.length === 0) {
//         // If no products found in the search, fetch all products
//         setNoResults(true);
//         fetchAllProducts();
//       } else {
//         setNoResults(false); // Reset if products are found
//         setProducts(response.data.products); // Set the search results
//       }
//     } catch (error) {
      
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchAllProducts = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get('/api/getallp');


//       if (response.data.products && response.data.products.length > 0) {
//         setProducts(response.data.products);
//         setNoResults(false); // Reset no results flag if products are found
//       } else {
//         setProducts([]);
//         setNoResults(true); // Handle empty product list
//       }
//     } catch (error) {
      
//       setNoResults(true); // Show no results if API fails
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchWishlist = async () => {
//     const token = Cookies.get('token');
//     if (!token) {
//       navigate('/login');
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
//   };

//   const addToCart = async (productId, quantity) => {
//     const token = Cookies.get('token');
//     if (!token) {
//       navigate('/login');
//       return;
//     }

//     setIsAddingToCart((prev) => ({ ...prev, [productId]: true }));

//     try {
//       const response = await axios.post(
//         '/api/addtocart',
//         { productId, quantity },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (!response.data.success) {
//         console.error('Failed to add product to cart:', response.data.message);
//       }
//     } catch (error) {
//       console.error('Error adding to cart:', error);
//     } finally {
//       setIsAddingToCart((prev) => ({ ...prev, [productId]: false }));
//     }
//   };

//   const toggleWishlist = async (productId, isInWishlist) => {
//     const token = Cookies.get('token');
//     if (!token) {
//       navigate('/login');
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
//         setWishlist((prev) => prev.filter(id => id !== productId));
//       } else {
//         await axios.post('/api/addtowishlist', { productId }, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setWishlist((prev) => [...prev, productId]);
//       }
//     } catch (error) {
//       console.error('Error updating wishlist:', error);
//       alert('Failed to update wishlist.');
//     }
//   };

//   return (
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
//         ) : noResults ? (
//           <div style={{ textAlign: 'center', width: '100%' }}>
//             <h4>No products available.</h4>
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
//   );
// };

// const styles = {
//   productCardWrapper: {
//     cursor: 'pointer',
//   },
//   productCard: {
//       borderRadius: '8px',
//     overflow: 'hidden',
//     position: 'relative',
//     backgroundColor: '#fff',
//     boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', 
//     transition: 'transform 0.2s ease-in-out',
//     marginBottom: '20px',
//   },
//   imageContainer: {
//     position: 'relative',
//   },
//   productImage: {
//     width: '100%',
//     height: '200px',
//     objectFit: 'cover',
//   },
//   heartIcon: {
//     position: 'absolute',
//     top: '8px',
//     right: '8px',
//     cursor: 'pointer',
//     zIndex: '10',
//   },
//   productTitle: {
//     fontSize: '1.1rem',
//     fontWeight: 'bold',
//     color: '#333',
//     margin: '8px 0',
//   },
//   productDescription: {
//     fontSize: '0.8rem',
//     color: '#666',
//     marginBottom: '8px',
//     lineHeight: '1.4',
//   },
//   productPrice: {
//     fontSize: '1rem',
//     fontWeight: 'bold',
//     marginBottom: '10px',
//     color:'#000',
//   },
//   cardBody: {
//     padding: '15px',
//   },
//   addToCartButton: {
//     backgroundColor: '#1b7b16',
//     color: '#fff',
//     border: 'none',
//     padding: '8px 16px',
//     borderRadius: '5px',
//     transition: 'background-color 0.3s ease',
//   },
// };

// export default SearchPage;










import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const ProductCard = ({ product, addToCart, isAddingToCart, toggleWishlist, isInWishlist }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${product._id}`); // Fixed the issue here
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product._id, 1); // Add 1 item of the selected product to cart
  };

 const handleAddToBuy = (e) => {
  e.stopPropagation();
  navigate(`/buynow/${product._id}`, { state: { product } }); // Navigating with product info
};

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    toggleWishlist(product._id, isInWishlist); // Toggle the product in the wishlist
  };
  const isOutOfStock = product.stock === 0;

  return (
    <div
      key={product._id}
      className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-3"
      onClick={handleCardClick}
      style={styles.productCardWrapper}
    >
      <div className="card shadow-lg border-0 rounded" style={styles.productCard}>
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
            <span style={{ fontSize: '1.3rem', cursor: 'pointer' }}>
              {isInWishlist ? '❤️' : '🤍'}
            </span>
          </div>
        </div>
        <div className="card-body" style={styles.cardBody}>
          <h5 className="card-title text-center" style={styles.productTitle}>{product.title}</h5>
          <p className="card-text text-muted text-center" style={styles.productDescription}>{product.description}</p>
          <p className="text-danger text-center" >
            Price: <span style={{ fontSize: '14px', textDecoration: 'line-through', color: '#ff5722' }}>₹{product.price}</span>
          </p>
          <p style={{ fontSize: '16px', color: '#000',textAlign:'center' }}>
            Offer Price: <span style={styles.productPrice}>₹{product.offerPrice}</span>
          </p>
          <p className="text-muted text-center" style={{ fontSize: '14px' }}>
                {isOutOfStock ? 'Out of Stock' : `Stock: ${product.stock}`}
              </p>
          {/* <div className="d-flex justify-content-between">
            <button
              className="btn"
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              style={styles.addToCartButton}
            >
              {isAddingToCart ? 'Adding...' : 'Add to Cart'}
            </button>
            <button
              className="btn"
              onClick={handleAddToBuy}
              disabled={isAddingToCart}
              style={styles.addToBuyButton}
            >
              {isAddingToCart ? 'Buying...' : 'Buy Now'}
            </button>
          </div> */}
        </div>
      </div>
    </div>

    
  );
};

const SearchPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (query) {
      fetchProducts(query);
      fetchWishlist();
    } else {
      fetchAllProducts();
    }
  }, [query]);

  const fetchProducts = async (searchTerm) => {
    setLoading(true);
    try {
      const response = await axios.get('/api/search', {
        params: { title: searchTerm },
      });

      if (response.data.products && response.data.products.length === 0) {
        setNoResults(true);
        fetchAllProducts();
        setMessage("No Products Available You Might Like This!");
      } else {
        setNoResults(false);
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/getallp');
      if (response.data.products && response.data.products.length > 0) {
        setProducts(response.data.products);
        setNoResults(false);
      } else {
        setProducts([]);
        setNoResults(true);
      }
    } catch (error) {
      setNoResults(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchWishlist = async () => {
    const token = Cookies.get('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await axios.get('/api/viewwishlist', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWishlist(response.data.wishlist.map(item => item.productId));
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  const addToCart = async (productId, quantity) => {
    const token = Cookies.get('token');
    if (!token) {
      navigate('/login');
      return;
    }

    setIsAddingToCart((prev) => ({ ...prev, [productId]: true }));

    try {
      const response = await axios.post(
        '/api/addtocart',
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.data.success) {
        console.error('Failed to add product to cart:', response.data.message);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAddingToCart((prev) => ({ ...prev, [productId]: false }));
    }
  };

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
        setWishlist((prev) => prev.filter(id => id !== productId));
      } else {
        await axios.post('/api/addtowishlist', { productId }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setWishlist((prev) => [...prev, productId]);
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
      alert('Failed to update wishlist.');
    }
  };

  return (
    <div className="container-fluid my-4">
      <div className="row">
        {loading ? (
          <DotLottieReact
          src="https://lottie.host/304b6b43-2a24-45bb-9012-ed8264aa2340/6hUDLfTOmC.lottie"
          loop
          autoplay
        />
        ) : (
       <>
          {message && <h2 style={{textAlign:'center',color:'#1b7b16'}} className='mb-4 mt-1'>{message}</h2>}
          {products.map((product) => (
       
            <ProductCard
              key={product._id}
              product={product}
              addToCart={addToCart}
              isAddingToCart={isAddingToCart[product._id] || false}
              toggleWishlist={toggleWishlist}
              isInWishlist={wishlist.includes(product._id)}
            />
          ))}
       </>
        )}
      </div>
    </div>
  );
};

const styles = {
  productCardWrapper: {
    cursor: 'pointer',
  },
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
  },
  productImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  },
  heartIcon: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    cursor: 'pointer',
    zIndex: '10',
  },
  productTitle: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#333',
    margin: '8px 0',
  },
  productDescription: {
    fontSize: '0.8rem',
    color: '#666',
    marginBottom: '8px',
    lineHeight: '1.4',
    height: '20px',
  },
  productPrice: {
    fontSize: '1rem',
    fontWeight: 'bold',
    marginBottom: '10px',
    color:'#000',
  },
  cardBody: {
    padding: '15px',
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
};

export default SearchPage;
