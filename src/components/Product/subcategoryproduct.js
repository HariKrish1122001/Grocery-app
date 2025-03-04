// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Container, Row, Col, Card, Button } from 'react-bootstrap';
// import Cookies from 'js-cookie';

// // SubcategoryProductPage Component
// const SubcategoryProductPage = () => {
//   const { subCategoryId } = useParams(); // Get the subCategoryId from URL params
//   const [products, setProducts] = useState([]); // State for products
//   const [loading, setLoading] = useState(true); // Loading state
//   const [isAddingToCart, setIsAddingToCart] = useState({}); // To track the cart addition status for each product
//   const [wishlist, setWishlist] = useState([]); // State to track wishlist products
//   const navigate = useNavigate();

//   // Fetch products
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get(`/api/getproduct/${subCategoryId}`);
//         if (response?.data?.success) {
//           setProducts(response.data.products);
//         } else {
//           throw new Error('No products found');
//         }
//         setLoading(false);
//       } catch (error) {
//         console.error(error);
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [subCategoryId]);

//   // Fetch Wishlist
//   const fetchWishlist = async () => {
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
//   };

//   // Function to format price in INR
//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
//   };

//   // Handle Add to Cart
//   const addToCart = async (productId, quantity) => {
//     const token = Cookies.get("token");
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     setIsAddingToCart((prev) => ({ ...prev, [productId]: true }));

//     try {
//       const response = await axios.post('/api/addtocart', { productId, quantity }, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       // Log response to debug
//       console.log('Add to Cart Response:', response.data);
//     } catch (error) {
//       console.error('Error adding to cart:', error);
//       alert('Failed to add product to cart.');
//     } finally {
//       setIsAddingToCart((prev) => ({ ...prev, [productId]: false }));
//     }
//   };

//   // Toggle Wishlist
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

//   // Effect to load wishlist on component mount
//   useEffect(() => {
//     fetchWishlist();
//   }, []);

//   // Function to handle card click and navigate to product detail page
//   const handleCardClick = (productId) => {
//     navigate(`/product/${productId}`, { state: { products } });
//   };

//   // Card style for hover effects
//   const cardStyle = {
//     borderRadius: '12px',
//     transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//     height: 'auto',
//     display: 'flex',
//     padding: '10px',
//     flexDirection: 'column',
//     position: 'relative',
//   };

//   const cardHoverStyle = {
//     transform: 'translateY(-10px)',
//     boxShadow: '0 1px 1px rgba(0, 0, 0, 0.1)',
//   };

//   const cardImgStyle = {
//     borderRadius: '12px 12px 0 0',
//     height: '180px',
//     objectFit: 'cover',
//   };

//   const cardTitleStyle = {
//     fontSize: '1.25rem',
//     fontWeight: 'bold',
//     color: '#333',
//     height: '30px',
//     textAlign: 'center',
//     marginTop: '10px',
//   };

//   const containerStyle = {
//     padding: '2rem 1rem',
//   };

//   const headingStyle = {
//     fontSize: '2rem',
//     color: '#343a40',
//     textAlign: 'center',
//     marginBottom: '1.5rem',
//   };

//   // Render Loading, Error, and Product Cards
//   if (loading) {
//     return (
//       <div
//         style={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           height: '100vh',
//         }}
//       >
//         <div
//           style={{
//             border: '8px solid #f3f3f3',
//             borderTop: '8px solid #fff',
//             borderRadius: '50%',
//             width: '50px',
//             height: '50px',
//             animation: 'spin 1s linear infinite',
//           }}
//         ></div>
//         <style>
//           {`
//             @keyframes spin {
//               0% { transform: rotate(0deg); }
//               100% { transform: rotate(360deg); }
//             }
//           `}
//         </style>
//       </div>
//     );
//   }

//   return (
//     <Container fluid style={containerStyle}>
//       <h2 style={headingStyle}>Products</h2>
//       {products.length > 0 ? (
//         <Row className="g-4">
//           {products.map((product) => {
//             const isInWishlist = wishlist.includes(product._id);
//             return (
//               <Col xs={12} sm={6} md={4} lg={3} key={product._id}>
//                 <Card
//                   style={cardStyle}
//                   className="product-card shadow-lg"
//                   onMouseEnter={(e) => (e.currentTarget.style.transform = cardHoverStyle.transform)}
//                   onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
//                   onClick={() => handleCardClick(product._id)} // Add onClick to navigate
//                 >
//                   <Card.Img
//                     variant="top"
//                     src={product.images && product.images.length > 0 ? product.images[0] : 'https://via.placeholder.com/150'}
//                     alt={product.title}
//                     style={cardImgStyle}
//                   />
//                   {/* Wishlist Heart Emoji in Top-Right Corner */}
//                   <div
//                     style={{
//                       position: 'absolute',
//                       top: '10px',
//                       right: '10px',
//                       cursor: 'pointer',
//                       fontSize: '1.5rem',
//                       zIndex: 1,
//                     }}
//                     onClick={(e) => {
//                       e.stopPropagation(); // Prevent card click from firing
//                       toggleWishlist(product._id, isInWishlist);
//                     }}
//                   >
//                     {isInWishlist ? '❤️' : '🤍'}
//                   </div>
//                   <Card.Body>
//                     <Card.Title style={cardTitleStyle}>{product.title}</Card.Title>
//                     <p style={{ fontSize: '0.875rem', color: '#777' }}>{product.description}</p>
//                     <div>
//                       {product.offerPrice ? (
//                         <>
//                           <p style={{ fontSize: '1.1rem', color: '#e74c3c' }}>₹{product.offerPrice}</p>
//                           <p style={{ textDecoration: 'line-through', color: '#999', fontSize: '0.9rem' }}>₹{product.price}</p>
//                         </>
//                       ) : (
//                         <p style={{ fontSize: '1.1rem' }}>₹{product.price}</p>
//                       )}
//                     </div>
//                     <div className="d-flex justify-content-between">
//                       <Button
//                         style={{ backgroundColor: '#1b7b16', border: 'none', color: 'white' }}
//                         onClick={() => addToCart(product._id, 1)}
//                         disabled={isAddingToCart[product._id]}
//                       >
//                         {isAddingToCart[product._id] ? 'Adding...' : 'Add to Cart'}
//                       </Button>
//                     </div>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             );
//           })}
//         </Row>
//       ) : (
//         <p>No products found</p>
//       )}
//     </Container>
//   );
// };

// export default SubcategoryProductPage;










import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
import styled from 'styled-components';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

// SubcategoryProductPage Component
const SubcategoryProductPage = () => {
  const { subCategoryId } = useParams(); // Get the subCategoryId from URL params
  const [products, setProducts] = useState([]); // State for products
  const [loading, setLoading] = useState(true); // Loading state
  const [isAddingToCart, setIsAddingToCart] = useState({}); // To track the cart addition status for each product
  const [wishlist, setWishlist] = useState([]); // State to track wishlist products
  const navigate = useNavigate();

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`/api/getproduct/${subCategoryId}`);
        if (response?.data?.success) {
          setProducts(response.data.products);
        } else {
          throw new Error('No products found');
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [subCategoryId]);

  // Fetch Wishlist
  const fetchWishlist = async () => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/login");
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

  // Function to format price in INR
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };

  // Handle Add to Cart
  const addToCart = async (productId, quantity) => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/login");
      return;
    }

    setIsAddingToCart((prev) => ({ ...prev, [productId]: true }));

    try {
      const response = await axios.post('/api/addtocart', { productId, quantity }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Log response to debug
      console.log('Add to Cart Response:', response.data);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart.');
    } finally {
      setIsAddingToCart((prev) => ({ ...prev, [productId]: false }));
    }
  };

  const handleAddToBuy = (product) => {
    navigate(`/buynow/${product._id}`, { state: { product } }); // Navigating with product info
  };

  // Toggle Wishlist
  const toggleWishlist = async (productId, isInWishlist) => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/login");
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

  // Effect to load wishlist on component mount
  useEffect(() => {
    fetchWishlist();
  }, []);

  // Function to handle card click and navigate to product detail page
  const handleCardClick = (productId) => {
    navigate(`/product/${productId}`, { state: { products } });
  };

  // Card style for hover effects
  const cardStyle = {
    borderRadius: '12px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    height: 'auto',
    display: 'flex',
    padding: '10px',
    flexDirection: 'column',
    position: 'relative',
  };

  const cardHoverStyle = {
    transform: 'translateY(-10px)',
    boxShadow: '0 1px 1px rgba(0, 0, 0, 0.1)',
  };

  const cardImgStyle = {
    borderRadius: '12px 12px 0 0',
    height: '180px',
    objectFit: 'cover',
  };

  const cardTitleStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#333',
    height: '30px',
    textAlign: 'center',
    marginTop: '10px',
  };

  const containerStyle = {
    padding: '2rem 1rem',
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

  // Render Loading, Error, and Product Cards
  if (loading) {
    return (
      <DotLottieReact
      src="https://lottie.host/304b6b43-2a24-45bb-9012-ed8264aa2340/6hUDLfTOmC.lottie"
      loop
      autoplay
    />
    );
  }
  const isOutOfStock = products.stock === 0;
  return (
    <Container fluid style={containerStyle}>
      <Title className='mt-2 mb-4'>Products</Title>
      {products.length > 0 ? (
        <Row className="g-4">
          {products.map((product) => {
            const isInWishlist = wishlist.includes(product._id);
            return (
              <Col xs={12} sm={6} md={4} lg={3} key={product._id}>
                <Card
                  style={cardStyle}
                  className="product-card shadow-lg"
                  onMouseEnter={(e) => (e.currentTarget.style.transform = cardHoverStyle.transform)}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                  onClick={() => handleCardClick(product._id)} // Add onClick to navigate
                >
                  <Card.Img
                    variant="top"
                    src={product.images && product.images.length > 0 ? product.images[0] : 'https://via.placeholder.com/150'}
                    alt={product.title}
                    style={cardImgStyle}
                  />
                  {/* Wishlist Heart Emoji in Top-Right Corner */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      cursor: 'pointer',
                      fontSize: '1.5rem',
                      zIndex: 1,
                    }}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card click from firing
                      toggleWishlist(product._id, isInWishlist);
                    }}
                  >
                    {isInWishlist ? '❤️' : '🤍'}
                  </div>
                  <Card.Body>
                    <Card.Title style={cardTitleStyle}>{product.title}</Card.Title>
                    <p style={{ fontSize: '0.875rem', color: '#777' }}>{product.description}</p>
                    <div>
                      {product.offerPrice ? (
                        <>
                          <p style={{ color: '#000', fontSize: '0.9rem',textAlign:'center' }}>Price: <span style={{ textDecoration: 'line-through', color: '#ff5722', fontSize: '0.9rem' }}>₹{product.price}</span></p>
                          <p style={{ fontSize: '1.1rem', color: '#000',textAlign:'center' }}>Offer Price: ₹{product.offerPrice}</p>
                          <p className="text-muted" style={{ fontSize: '14px',textAlign:'center' }}>
                       {isOutOfStock ? 'Out of Stock' : `Stock: ${product.stock}`}
                      </p>
                        </>
                      ) : (
                        <p style={{ fontSize: '1.1rem' }}>Price: ₹{product.price}</p>
                      )}
                    </div>
                    {/* <div className="d-flex justify-content-between">
                      <Button
                        style={{ backgroundColor: '#1b7b16', border: 'none', color: 'white', width: '48%', padding: '10px' }}
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent card click from firing
                          addToCart(product._id, 1);
                        }}
                        disabled={isAddingToCart[product._id]}
                      >
                        {isAddingToCart[product._id] ? 'Adding...' : 'Add to Cart'}
                      </Button>
                      <Button
                        style={{ backgroundColor: '#1b7b16', border: 'none', color: 'white', width: '48%', padding: '10px' }}
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent card click from firing
                          handleAddToBuy(product);
                        }}
                        disabled={isAddingToCart[product._id]}
                      >
                        {isAddingToCart[product._id] ? 'Buying...' : 'Buy Now'}
                      </Button>
                    </div> */}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      ) : (
        <p>No products found</p>
      )}
    </Container>
  );
};

export default SubcategoryProductPage;