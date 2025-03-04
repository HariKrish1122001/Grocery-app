



// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import styled from 'styled-components';
// import Slider from 'react-slick'; 

// const ProductDetail = () => {
//   const { productId } = useParams();
//   const navigate = useNavigate();

//   const [product, setProduct] = useState(null);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isAddingToCart, setIsAddingToCart] = useState(false);
//   const [wishlist, setWishlist] = useState([]);

//   useEffect(() => {
//     const fetchProductData = async () => {
//       window.scrollTo(0, 0);
//       try {
//         const productResponse = await axios.get(`/api/products/${productId}`);
//         if (productResponse.data.success) {
//           setProduct(productResponse.data.product);
//           checkWishlistStatus(productResponse.data.product._id);
//         } else {
//           console.error('Product not found');
//           navigate('/');
//         }

//         const relatedProductsResponse = await axios.get(`/api/productlist/${productId}`);
//         if (relatedProductsResponse.data.success) {
//           setRelatedProducts(relatedProductsResponse.data.relatedProducts);
//         }

//       } catch (error) {
//         console.error('Error fetching product data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProductData();
//   }, [productId, navigate]);

//   const checkWishlistStatus = async (productId) => {
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
//       const wishlist = response.data.wishlist.map(item => item.productId);
//       setWishlist(wishlist);
//     } catch (error) {
//       console.error('Error fetching wishlist:', error);
//     }
//   };

//   const toggleWishlist = async (productId) => {
//     const token = Cookies.get('token');
//     if (!token) {
//       navigate('/login');
//       return;
//     }

//     try {
//       if (wishlist.includes(productId)) {
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
//     }
//   };

//   const handleAddToCart = async () => {
//     const token = Cookies.get('token');
//     if (!token) {
//       navigate('/login');
//       return;
//     }

//     setIsAddingToCart(true);

//     try {
//       const response = await axios.post(
//         '/api/addtocart',
//         { productId, quantity: 1 },
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
//       setIsAddingToCart(false);
//     }
//   };

//   const handleRelatedProductClick = (relatedProductId) => {
//     window.scrollTo(0, 0);
//     navigate(`/product/${relatedProductId}`);
//   };

//   if (loading) {
//     return  <div
//       style={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '100vh',
//       }}
//     >
//       <div
//         style={{
//           border: '8px solid #f3f3f3', 
//           borderTop: '8px solid #fff', 
//           borderRadius: '50%',
//           width: '50px',  
//           height: '50px',
//           animation: 'spin 1s linear infinite', 
//         }}
//       ></div>
//       <style>
//         {`
//           @keyframes spin {
//             0% { transform: rotate(0deg); }
//             100% { transform: rotate(360deg); }
//           }
//         `} 
//       </style>
//     </div>;
//   }

//   if (!product) {
//     return <LoadingText>Product not found.</LoadingText>;
//   }

//   return (
//  <>
//     <Container>
//      <div className='container'>
//      <ProductSection>
//         <ProductImageContainer style={{boxShadow:' 0 4px 12px rgba(0, 0, 0, 0.1)'}}>
//           {/* Implement the carousel for images */}
//           <Slider 
//   style={{ border: 'none',  }} 
//   dots={true} 
//   infinite={false} 
//   speed={500} 
//   slidesToShow={1} 
//   slidesToScroll={1} 
//   autoplay={true} 
//   autoplaySpeed={3000}  
// >
//   {product.images.map((image, index) => (
//     <div key={index}>
//       <img 
//         src={image} 
//         alt={product.title} 
//         style={{ 
//           width: '100%', 
//           height: '350px',  
//           objectFit: 'cover',
//         }} 
//       />
//     </div>
//   ))}
// </Slider>
//         </ProductImageContainer>
        
//         <ProductDetailsContainer>
//           <ProductTitle className='mt-5'>{product.title}</ProductTitle>
//           <Description>{product.description}</Description>
//           <PriceContainer>
//             <span className="price">Price: <span style={{textDecoration: 'line-through',color: '#ff5722'}}>₹{product.price}</span></span>
//           </PriceContainer>
//           <PriceContainer>
//                 <p className="text-dark" style={{ fontSize: '16px',}}>
//                   Offer Price: ₹{product.offerPrice}
//                 </p>
//           </PriceContainer>
//           <button className='mt-5'
//             onClick={handleAddToCart}
//             disabled={isAddingToCart}
//           >
//             {isAddingToCart ? 'Adding...' : 'Add to Cart'}
//           </button>
//         </ProductDetailsContainer>



//       </ProductSection>
//      </div>
//      </Container>
//       <SimilarProductsSection className=''>
//       <Title className='mt-5'>Related Product</Title>
//         <RelatedProducts className='mt-2 '>
          
//           {relatedProducts.map((relatedProduct) => (
//             <RelatedProductCard key={relatedProduct._id} onClick={() => handleRelatedProductClick(relatedProduct._id)} className='mt-3'>
//               <img src={relatedProduct.images[0]} alt={relatedProduct.title} />
//               <WishlistButton
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   toggleWishlist(relatedProduct._id);
//                 }}
//                 isInWishlist={wishlist.includes(relatedProduct._id)}
//               >
//                 {wishlist.includes(relatedProduct._id) ? '❤️' : '🤍'}
//               </WishlistButton>
//               <CardBody>
//                 <CardTitle className='mt-2 mb-2'>{relatedProduct.title}</CardTitle>
//                 <CardPrice>Price: <span style={{textDecoration: 'line-through',color: '#ff5722'}}>₹{relatedProduct.price}</span></CardPrice>
//                 <CardPrice>Offer Price: ₹{relatedProduct.offerPrice}</CardPrice>
//                 <button
//                   onClick={() => handleAddToCart(relatedProduct._id, 1)}
//                   disabled={isAddingToCart}
//                 >
//                   {isAddingToCart ? 'Adding to Cart...' : 'Add to Cart'}
//                 </button>
//               </CardBody>
//             </RelatedProductCard>
//           ))}
//         </RelatedProducts>
//       </SimilarProductsSection>
//  </>
 
//   );
// };
// const Title = styled.h1`
//   font-family: 'Arial', sans-serif;
//   font-size: 32px;
//   font-weight: 700;
//   color: #1b7b16;
//   text-align: center;
//   text-transform: uppercase;
//   letter-spacing: 2px;
//   text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
// `;
// const Container = styled.div`
//   display: flex;
//   justify-content: space-between;
//   padding: 40px 20px;
//   max-width: 1200px;
//   margin: 0 auto;
//   flex-wrap: wrap;  // This will ensure that the content wraps nicely

//   @media (max-width: 768px) {
//     flex-direction: column;
//     align-items: center;
//     padding: 20px 10px;
//   }
// `;
// const ProductSection = styled.div`
//   display: flex;
//   flex-direction: row;  // Default to row (image and content side by side)
//   justify-content: space-between;
//   margin-bottom: 40px;

//   @media (max-width: 1024px) {
//     flex-direction: column;  // Stack image and content in column for tablet view
//     align-items: center;      // Center-align content
//   }

//   @media (max-width: 508px) {
//     flex-direction: column;  // Stack image and content in column for mobile view
//     align-items: center;      // Center-align content
//   }
// `;


// const ProductImageContainer = styled.div`
//   flex: 1;
//   max-width: 500px;
//   padding-right: 30px;

//   /* Set fixed width and height for the image container */
//   width: 350px;
//   height: 350px;
//   overflow: hidden;
//   position: relative;

//   img {
//     width: 100%;
//     height: 98%;
//     border-radius: 8px;
//     box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//   }
// `;

// const ProductDetailsContainer = styled.div`
//   flex: 1.5;
//   max-width: 600px;

//   h1 {
//     font-size: 2.5rem;
//     font-weight: bold;
//     margin-bottom: 20px;
//   }

//   p {
//     font-size: 1.1rem;
//     line-height: 1.6;
//     color: #555;
//     margin-bottom: 30px;
//   }
// `;

// const PriceContainer = styled.div`
//   margin-bottom: 20px;

//   p {
//     font-size: 1.2rem;
//     font-weight: bold;
//     color: #333;

//     span {
//       text-decoration: line-through;
//       margin-left: 10px;
//       color: #777;
//     }
//   }
// `;
// const ProductTitle = styled.h2`
//   font-size: 2rem;
//   font-weight: bold;
// `;

// const Description = styled.p`
//   font-size: 1rem;
//   color: #555;
//   margin-bottom: 30px;
// `;



// const button = styled.button`
//   width: 100%;
//   padding: 10px;
//   font-size: 1.1rem;
//   background-color: #1b7b16;
//   color: white;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
//   transition: background-color 0.3s ease;

//   &:disabled {
//     background-color: #ddd;
//   }
// `;

// const WishlistButton = styled.button`
//   position: absolute;
//   top: 10px;
//   right: 10px;
//   background-color: transparent;
//   border: none;
//   font-size: 2rem;
//   color: ${props => (props.isInWishlist ? 'red' : 'gray')};
//   cursor: pointer;
//   z-index: 10;

//   &:hover {
//     color: red;
//   }
// `;

// const SimilarProductsSection = styled.div`
//   margin-top: 40px;
// `;

// const RelatedProducts = styled.div`
//   display: grid;
//   grid-template-columns: repeat(4, 1fr);
//   gap: 20px;

//   @media (max-width: 1200px) {
//     grid-template-columns: repeat(3, 1fr);
//   }

//   @media (max-width: 900px) {
//     grid-template-columns: repeat(2, 1fr);
//   }

//   @media (max-width: 600px) {
//     grid-template-columns: 1fr;
//   }
// `;

// const RelatedProductCard = styled.div`
//   position: relative;
//   border-radius: 8px;
//   overflow: hidden;
//   background-color: #fff;
//   box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
//   cursor: pointer;

//   &:hover {
//     transform: scale(1.05);
//   }

//   img {
//     width: 100%;
//     height: 200px;
//     object-fit: cover;
//   }
// `;

// const CardBody = styled.div`
//   padding: 15px;
//   position: relative;
//   text-align:center;
  
// `;

// const CardTitle = styled.h5`
//   font-size: 1rem;
//   font-weight: bold;
//   color: #333;
// `;

// const CardPrice = styled.p`
//   color: #000;
// `;

// const LoadingText = styled.div`
//   text-align: center;
//   font-size: 1.5rem;
//   color: #555;
//   margin-top: 50px;
// `;

// export default ProductDetail;



import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import styled from 'styled-components';
import Slider from 'react-slick';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      window.scrollTo(0, 0);
      try {
        const productResponse = await axios.get(`/api/products/${productId}`);
        if (productResponse.data.success) {
          setProduct(productResponse.data.product);
          checkWishlistStatus(productResponse.data.product._id);
        } else {
          console.error('Product not found');
          navigate('/');
        }

        const relatedProductsResponse = await axios.get(`/api/productlist/${productId}`);
        if (relatedProductsResponse.data.success) {
          setRelatedProducts(relatedProductsResponse.data.relatedProducts);
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [productId, navigate]);

  const checkWishlistStatus = async (productId) => {
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
      const wishlist = response.data.wishlist.map((item) => item.productId);
      setWishlist(wishlist);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  const toggleWishlist = async (productId) => {
    const token = Cookies.get('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      if (wishlist.includes(productId)) {
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
    }
  };

  const handleAddToBuy = (product) => {
    navigate(`/buynow/${product._id}`, { state: { product } });
  };

  const handleAddToCart = async () => {
    const token = Cookies.get('token');
    if (!token) {
      navigate('/login');
      return;
    }

    setIsAddingToCart(true);

    try {
      const response = await axios.post(
        '/api/addtocart',
        { productId, quantity: 1 },
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
      setIsAddingToCart(false);
    }
  };

  const handleRelatedProductClick = (relatedProductId) => {
    window.scrollTo(0, 0);
    navigate(`/product/${relatedProductId}`);
  };

  if (loading) {
    return (
      <DotLottieReact
      src="https://lottie.host/304b6b43-2a24-45bb-9012-ed8264aa2340/6hUDLfTOmC.lottie"
      loop
      autoplay
    />
    );
  }
  const isOutOfStock = product.stock === 0;

  if (!product) {
    <DotLottieReact
    src="https://lottie.host/304b6b43-2a24-45bb-9012-ed8264aa2340/6hUDLfTOmC.lottie"
    loop
    autoplay
  />
  }

  return (
    <>
      <Container>
        <div className="container">
          <ProductSection>
            <ProductImageContainer style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
              <Slider
                style={{ border: 'none' }}
                dots={true}
                infinite={false}
                speed={500}
                slidesToShow={1}
                slidesToScroll={1}
                autoplay={true}
                autoplaySpeed={3000}
              >
                {product.images.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image}
                      alt={product.title}
                      style={{
                        width: '100%',
                        height: '350px',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                ))}
              </Slider>
            </ProductImageContainer>

            <ProductDetailsContainer>
              <ProductTitle className="mt-5">{product.title}</ProductTitle>
              <Description>{product.description}</Description>
              <PriceContainer>
                <span className="price">
                  Price:{' '}
                  <span style={{ textDecoration: 'line-through', color: '#ff5722' }}>
                    ₹{product.price}
                  </span>
                </span>
              </PriceContainer>
              <PriceContainer>
                <p className="text-dark" style={{ fontSize: '16px' }}>
                  Offer Price: ₹{product.offerPrice}
                </p>
              </PriceContainer>
               {/* Display stock information */}
               <p className="text-muted" style={{ fontSize: '14px' }}>
                {isOutOfStock ? 'Out of Stock' : `Stock: ${product.stock}`}
              </p>
              <div className="button-container">
              <button
                className="mt-1 btn"
                onClick={handleAddToCart}
                disabled={isAddingToCart || isOutOfStock}
                style={styles.AddToCartButton}
              >
                {isAddingToCart ? 'Adding...' : 'Add to Cart'}
              </button>
              <button
                className=" mt-1 btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToBuy(product);
                }}
                disabled={isOutOfStock} // Disable if out of stock
                style={styles.addToBuyButton}
              >
              Buy Now
              </button>
              </div>
            </ProductDetailsContainer>
          </ProductSection>
        </div>
      </Container>
      <SimilarProductsSection className="container-fluid mb-4">
        <Title className="mt-3">Related Products</Title>
        <RelatedProducts className="mt-4">
          {relatedProducts.map((relatedProduct) => (
            <RelatedProductCard
              key={relatedProduct._id}
              onClick={() => handleRelatedProductClick(relatedProduct._id)}
              className="mt-3"
            >
              <img src={relatedProduct.images[0]} alt={relatedProduct.title} />
              <WishlistButton
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(relatedProduct._id);
                }}
                isInWishlist={wishlist.includes(relatedProduct._id)}
              >
                {wishlist.includes(relatedProduct._id) ? '❤️' : '🤍'}
              </WishlistButton>
              <CardBody>
                <CardTitle className="mt-2 mb-2">{relatedProduct.title}</CardTitle>
                <CardPrice>
                  Price:{' '}
                  <span style={{ textDecoration: 'line-through', color: '#ff5722' }}>
                    ₹{relatedProduct.price}
                  </span>
                </CardPrice>
                <p className="text-muted" style={{ fontSize: '14px' }}>
                {isOutOfStock ? 'Out of Stock' : `Stock: ${product.stock}`}
              </p>
                <CardPrice>Offer Price: ₹{relatedProduct.offerPrice}</CardPrice>
                {/* <div className="button-container">
                <button
                className="btn"
                  onClick={() => handleAddToCart(relatedProduct._id, 1)}
                  disabled={isAddingToCart || isOutOfStock }
                  style={styles.AddToCartButton}
                >
                  {isAddingToCart ? 'Adding to Cart...' : 'Add to Cart'}
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
              </CardBody>
            </RelatedProductCard>
          ))}
        </RelatedProducts>
      </SimilarProductsSection>
    </>
  );
};

const styles = {
  AddToCartButton: {
    backgroundColor: '#1b7b16',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    width: '45%',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  },
  addToBuyButton: {
    backgroundColor: '#1b7b16',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    width: '45%',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  },
};

const Title = styled.h1`
  font-family: 'Arial', sans-serif;
  font-size: 32px;
  font-weight: 700;
  color: #1b7b16;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding: 20px 10px;
  }
`;

const ProductSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 40px;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: 508px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ProductImageContainer = styled.div`
  flex: 1;
  max-width: 500px;
  padding-right: 30px;
  width: 350px;
  height: 350px;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 98%;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const ProductDetailsContainer = styled.div`
  flex: 1.5;
  max-width: 600px;

  h1 {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 20px;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #555;
    margin-bottom: 30px;
  }

  .button-container {
    display: flex;
    gap: 25px; 
  }
`;


const PriceContainer = styled.div`
  margin-bottom: 20px;

  p {
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;

    span {
      text-decoration: line-through;
      margin-left: 10px;
      color: #777;
    }
  }
`;

const ProductTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #555;
  margin-bottom: 30px;
`;

const WishlistButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  font-size: 1.5rem;
  color: ${(props) => (props.isInWishlist ? 'red' : 'gray')};
  cursor: pointer;
  z-index: 10;

  &:hover {
    color: red;
  }
`;

const SimilarProductsSection = styled.div`
  margin-top: 40px;
`;

const RelatedProducts = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const RelatedProductCard = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;

 .button-container {
    display: flex;
    gap: 20px; 
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
`;

const CardBody = styled.div`
  padding: 15px;
  position: relative;
  text-align: center;
`;

const CardTitle = styled.h5`
  font-size: 1rem;
  font-weight: bold;
  color: #333;
`;

const CardPrice = styled.p`
  color: #000;
`;

const LoadingText = styled.div`
  text-align: center;
  font-size: 1.5rem;
  color: #555;
  margin-top: 50px;
`;



export default ProductDetail;