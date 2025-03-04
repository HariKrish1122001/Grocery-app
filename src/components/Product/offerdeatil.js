








// import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import styled from 'styled-components';

// const OfferDetailPage = () => {
//   const location = useLocation();
//   const offer = location.state?.offer;
//   const [loading, setLoading] = useState(false); // State to track loading status

//   if (!offer) {
//     return <div>Offer not found!</div>;
//   }

//   const handleAddToCart = async () => {
//     const token = Cookies.get('token'); // Extract token from cookies

//     if (!token) {
//       alert('Please login to add products to cart!');
//       return;
//     }

//     setLoading(true); // Start loading

//     try {
//       const response = await axios.post(
//         '/api/addtocart',
//         {
//           productId: offer.product,
//           quantity: 1,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//     } catch (error) {
//       console.error('Error adding to cart:');
//       alert('Failed to add product to cart.');
//     } finally {
//       setLoading(false); // End loading
//     }
//   };

//   return (
//     <Container>
//       {/* Left Section: Product Image */}
//       <ProductImageContainer>
//         <img src={offer.images[0]} alt={offer.title} />
//       </ProductImageContainer>

//       {/* Right Section: Offer Details */}
//       <ProductDetailsContainer>
//         <h1>{offer.title}</h1>
//         <p>{offer.description}</p>

//         <PriceContainer>
//           <p>
//             <strong >Price:</strong> <span style={{color:'#ff5722',textDecoration:'line'}}>₹{offer.price}</span>
//           </p>

//           {/* Offer Price Section */}
//           {offer.offerPrice && (
//             <div>
//               <p>
//                 <strong>Offer Price:</strong> ₹{offer.offerPrice}
//               </p>
//               <p style={{color:'green'}}>Save: ₹{offer.price - offer.offerPrice}</p>
//             </div>
//           )}
//         </PriceContainer>

//         {/* Add to Cart Button */}
//         <AddToCartButton onClick={handleAddToCart} disabled={loading}>
//           {loading ? 'Adding to Cart...' : 'Add to Cart'}
//         </AddToCartButton>
//       </ProductDetailsContainer>
//     </Container>
//   );
// };

// // Styled components
// const Container = styled.div`
//   display: flex;
//   justify-content: space-between;
//   padding: 40px 20px;
//   max-width: 1200px;
//   margin: 0 auto;
//   flex-wrap: wrap;  // This will ensure that the content wraps nicely
//  @media screen and (min-width:0px) and (max-width: 320px) {
//     flex-direction: column;
//     align-items: center;
//     padding: 20px 0;
//   }
//   @media screen and (min-width:321px) and (max-width: 768px) {
//     flex-direction: column;
//     align-items: center;
//     padding: 20px 10px;
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

// const AddToCartButton = styled.button`
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

// export default OfferDetailPage;



















import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Added useNavigate
import axios from 'axios';
import Cookies from 'js-cookie';
import styled from 'styled-components';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const OfferDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Added navigate hook
  const offer = location.state?.offer;
  const [loading, setLoading] = useState(false); // State to track loading status
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  if (!offer) {
    return <div>Offer not found!</div>;
  }

  const handleAddToBuy = (product) => {
    navigate(`/buynow/${product._id}`, { state: { product } });
  };

  const handleAddToCart = async () => {
    const token = Cookies.get('token'); // Extract token from cookies

    if (!token) {
      alert('Please login to add products to cart!');
      return;
    }

    setIsAddingToCart(true); // Start loading

    try {
      const response = await axios.post(
        '/api/addtocart',
        {
          productId: offer.product,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart.');
    } finally {
      setIsAddingToCart(false);
    }
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
  
  const isOutOfStock = offer.stock === 0;

  return (
    <Container>
      {/* Left Section: Product Image */}
      <ProductImageContainer>
        <img src={offer.images[0]} alt={offer.title} />
      </ProductImageContainer>

      {/* Right Section: Offer Details */}
      <ProductDetailsContainer>
        <h1>{offer.title}</h1>
        <p>{offer.description}</p>

        <PriceContainer>
          <p>
            <strong>Price:</strong>{' '}
            <span style={{ color: '#ff5722', textDecoration: 'line-through' }}>
              ₹{offer.price}
            </span>
          </p>

          {/* Offer Price Section */}
          {offer.offerPrice && (
            <div>
              <p>
                <strong>Offer Price:</strong> ₹{offer.offerPrice}
              </p>
              <p style={{ color: 'green' }}>
                Save: ₹{offer.price - offer.offerPrice}
              </p>
            </div>
          )}
        </PriceContainer>
        <div className="button-container">
        {/* Add to Cart Button */}
        <AddToCartButton onClick={handleAddToCart}   disabled={isAddingToCart || isOutOfStock}>
          {isAddingToCart ? 'Adding...' : 'Add to Cart'}
        </AddToCartButton>

        {/* Buy Now Button */}
        <BuyNowButton
          onClick={() => handleAddToBuy(offer)} 
          disabled={isOutOfStock} 
        >
          Buy Now
        </BuyNowButton>
        </div>
      </ProductDetailsContainer>
    </Container>
  );
};

// Styled components
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
  flex-wrap: wrap; // This will ensure that the content wraps nicely

  @media screen and (min-width: 0px) and (max-width: 320px) {
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
  }
  @media screen and (min-width: 321px) and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding: 20px 10px;
  }
`;

const ProductImageContainer = styled.div`
  flex: 1;
  max-width: 500px;
  padding-right: 30px;

  /* Set fixed width and height for the image container */
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

const AddToCartButton = styled.button`
  width: 45%;
  padding: 8px 16px;
 
  background-color: #1b7b16;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:disabled {
    background-color: #ddd;
  }
`;

const BuyNowButton = styled.button`
  width: 45%;
   padding: 8px 16px;
 
  background-color: #1b7b16;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
 
  transition: background-color 0.3s ease;

  &:disabled {
    background-color: #ddd;
  }
`;

export default OfferDetailPage;
