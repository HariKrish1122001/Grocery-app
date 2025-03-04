

// // import React, { useState, useEffect } from 'react';
// // import styled from 'styled-components';
// // import { useNavigate } from 'react-router-dom';
// // import OwlCarousel from 'react-owl-carousel';

// // // Card Container
// // const CardContainer = styled.div`
// //   display: flex;
// //   flex-wrap: wrap;
// //   gap: 15px;
// //   justify-content: center;
// //   padding: 20px;
// //   max-height: 600px;
// //   overflow-y: auto;
// // `;
// // // Ensure this is defined before using it in the component
// // const OfferContainer = styled.div`
// //   width: 100%;
// //   padding: 40px;
// //   background-color: #FFFDF0; 
// //   background-size: cover; 
// //   background-position: center; 
// // `;

// // // Card Style (Smaller cards)
// // const Card = styled.div`
// //   background: #fff;
// //   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
// //   width: 250px;
// //   padding: 15px;
// //   border-radius: 8px;
// //   transition: transform 0.3s ease, box-shadow 0.3s ease;
// //   cursor: pointer;
  
// //   &:hover {
// //     transform: translateY(-5px);
// //     box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
// //   }
// // `;

// // // Card Image Style
// // const CardImage = styled.img`
// //   width: 100%;
// //   height: 180px;
// //   object-fit: cover;
// //   border-radius: 8px;
// //   margin-bottom: 12px;
// // `;

// // // Card Header Style
// // const CardHeader = styled.h3`
// //   margin-bottom: 8px;
// //   font-size: 16px;
// //   color: #333;
// // `;

// // // Card Description Style
// // const CardDescription = styled.p`
// //   font-size: 12px;
// //   color: #666;
// //   margin-bottom: 8px;
// // `;

// // // Price Style
// // const Price = styled.p`
// //   font-size: 14px;
// //   font-weight: bold;
// //   color: #333;
// // `;

// // // Offer Price Style
// // const OfferPrice = styled.p`
// //   font-size: 12px;
// //   color: #ff5722;
// //   font-weight: bold;
// // `;

// // // Error Message
// // const ErrorMessage = styled.div`
// //   color: red;
// //   font-size: 16px;
// //   text-align: center;
// //   margin-top: 20px;
// // `;

// // // Custom Style for Title
// // const Title = styled.h1`
// //   font-family: 'Arial', sans-serif;
// //   font-size: 32px;
// //   font-weight: 700;
// //   color: #1b7b16;
// //   text-align: center;
// //   margin-bottom: 20px;
// //   text-transform: uppercase;
// //   letter-spacing: 2px;
// //   text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
// // `;

// // const OffersCard = () => {
// //   const [offers, setOffers] = useState([]);
// //   const [error, setError] = useState('');
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const fetchOffers = async () => {
// //       try {
// //         const response = await fetch('/api/offers'); // Replace with actual API endpoint
// //         const data = await response.json();

// //         if (response.ok) {
// //           setOffers(data.offers || []);
// //         } else {
// //           setError(data.message || 'Error fetching offers');
// //         }
// //       } catch (error) {
// //         setError('Failed to fetch offers');
// //       }
// //     };

// //     fetchOffers();
// //   }, []);

// //   if (error) {
// //     return <ErrorMessage>{error}</ErrorMessage>;
// //   }

// //   const handleCardClick = (productId) => {
// //     navigate(`/od/${productId}`, { state: { offers } });
// //   };

// //   // Owl Carousel options
// //   const carouselOptions = {
// //     items: 3,
// //     loop: true,
// //     margin: 10,
// //     nav: true,
// //     responsive: {
// //       0: {
// //         items: 1,
// //       },
// //       600: {
// //         items: 2,
// //       },
// //       1000: {
// //         items: 3,
// //       },
// //     },
// //   };

// //   // Use 'require' for the background image
// //   const offerBgImage = require('./img/offerbg.jpg'); 

// //   return (
// //     <div
// //       style={{
// //         backgroundImage: `url(${offerBgImage})`,  // Using 'require' to dynamically load the image
// //         minHeight: '100vh',
// //         padding: '20px',
// //         backgroundSize: 'cover',
// //         backgroundPosition: 'center',
// //       }}
// //     >
// //       <OfferContainer>
// //         <Title>Offer! Get amazing discounts</Title>
// //         <OwlCarousel className="owl-theme" {...carouselOptions}>
// //           {offers.length === 0 ? (
// //             <ErrorMessage>No offers available</ErrorMessage>
// //           ) : (
// //             offers.map((offer) => (
// //               <Card key={offer._id} onClick={() => handleCardClick(offer._id)}>
// //                 {offer.images && offer.images[0] && (
// //                   <CardImage src={offer.images[0]} alt={offer.title} />
// //                 )}
// //                 <CardHeader>{offer.title}</CardHeader>
// //                 <CardDescription>{offer.description}</CardDescription>
// //                 <Price>Price: ₹{offer.price}</Price>
// //                 <OfferPrice>Offer Price: ₹{offer.offerPrice}</OfferPrice>
// //               </Card>
// //             ))
// //           )}
// //         </OwlCarousel>
// //       </OfferContainer>
// //     </div>
// //   );
// // };

// // export default OffersCard;







// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import { useNavigate } from 'react-router-dom';
// import OwlCarousel from 'react-owl-carousel';
// import './css/homeoffer.css'

// // Card Style (Smaller cards)
// const Card = styled.div`
//   background: #fff;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//   width: 280px;
//   padding: 25px;
//   margin:auto;
//   border-radius: 8px;
//   transition: transform 0.3s ease, box-shadow 0.3s ease;
//   cursor: pointer;
  
//   &:hover {
//     transform: translateY(-5px);
//     box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
//   }
// `;

// // Card Image Style
// const CardImage = styled.img`
//   width: 100%;
//   height: 180px;
//   object-fit: cover;
//   border-radius: 8px;
//   margin-bottom: 12px;
// `;

// // Card Header Style
// const CardHeader = styled.h3`
//   margin-bottom: 8px;
//   font-size: 16px;
//   color: #333;
// `;

// // Card Description Style
// const CardDescription = styled.p`
//   font-size: 12px;
//   color: #666;
//   margin-bottom: 8px;
// `;

// // Price Style
// const Price = styled.p`
//   font-size: 14px;
//   font-weight: bold;
//   color: #333;
// `;

// // Offer Price Style
// const OfferPrice = styled.p`
//   font-size: 12px;
//   color: #ff5722;
//   font-weight: bold;
// `;

// // Error Message
// const ErrorMessage = styled.div`
//   color: red;
//   font-size: 16px;
//   text-align: center;
//   margin-top: 20px;
// `;

// // Custom Style for Title
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

// const OffersCard = () => {
//   const [offers, setOffers] = useState([]);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchOffers = async () => {
//       try {
//         const response = await fetch('/api/offers'); // Replace with actual API endpoint
//         const data = await response.json();

//         if (response.ok) {
//           setOffers(data.offers || []);
//         } else {
//           setError(data.message || 'Error fetching offers');
//         }
//       } catch (error) {
//         setError('Failed to fetch offers');
//       }
//     };

//     fetchOffers();
//   }, []);

//   if (error) {
//     return <ErrorMessage>{error}</ErrorMessage>;
//   }

//   const handleCardClick = (productId) => {
//     navigate(`/offer-details/${productId}`, { state: { offers } });
//   };

//   const carouselOptions = {
//     items: 4,
//     loop: false,
//     margin: 10,
//     dots: false,
//     nav: true,
//     navText: [
//       '<div class="carousel-nav-1 left-nav-1">&lt;</div>', 
//       '<div class="carousel-nav-1 right-nav-1">&gt;</div>',
//     ],
//     responsive: {
//       0: {
//         items: 1,
//       },
//       600: {
//         items: 2,
//       },
//       1000: {
//         items: 3,
//       },
//       1025: {
//         items: 4,
//       },
//       1200: {
//         items: 5,
//       },
//       2560: {
//         items: 9,
//       },
//     },
//   };

//   return (
//     <div className="mt-4">
//       <Title>Offer! Get amazing discounts</Title>

//       {offers.length === 0 ? (
//         <ErrorMessage>No offers available</ErrorMessage>
//       ) : (
//         <OwlCarousel className="owl-theme" {...carouselOptions}>
//           {offers.map((offer) => (
//             <Card key={offer._id} onClick={() => handleCardClick(offer._id)} className='mt-5 mb-5'>
//               {offer.images && offer.images[0] && (
//                 <CardImage src={offer.images[0]} alt={offer.title} />
//               )}
//               <CardHeader>{offer.title}</CardHeader>
//               <CardDescription>{offer.description}</CardDescription>
//               <Price>Price: <span style={{ textDecoration: 'line-through', marginLeft: '10px', color: '#777' }}> ₹{offer.price}</span></Price>
//               <OfferPrice>Offer Price: ₹{offer.offerPrice}</OfferPrice>
//             </Card>
//           ))}
//         </OwlCarousel>
//       )}
//     </div>
//   );
// };

// export default OffersCard;










import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import './css/homeoffer.css';

// Card Style (Smaller cards)
const Card = styled.div`
  background: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 280px;
  padding: 25px;
  margin: auto;
  border-radius: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
`;

// Card Image Style
const CardImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 12px;
`;

// Card Header Style
const CardHeader = styled.h3`
  margin-bottom: 8px;
  font-size: 16px;
  color: #333;
`;

// Card Description Style
const CardDescription = styled.p`
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
`;

// Price Style
const Price = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: #333;
`;

// Offer Price Style
const OfferPrice = styled.p`
  font-size: 18px;
  color: #000;
  font-weight: bold;
`;

// Error Message
const ErrorMessage = styled.div`
  color: red;
  font-size: 16px;
  text-align: center;
  margin-top: 20px;
`;

// Custom Style for Title
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

const OffersCard = () => {
  const [offers, setOffers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch the offers from the API
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch('/api/offers'); // Replace with actual API endpoint
        const data = await response.json();

        if (response.ok) {
          setOffers(data.offers || []); // Assuming response has 'offers' field
        } else {
          setError(data.message || 'Error fetching offers');
        }
      } catch (error) {
        setError('Failed to fetch offers');
      }
    };

    fetchOffers();
  }, []);

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  // Handle product click and pass the offer data to the OfferDetailPage
  const handleCardClick = (offer) => {
    navigate('/offer-details', { state: { offer } });
  };

  const carouselOptions = {
    items: 4,
    loop: false,
    margin: 10,
    dots: false,
    nav: true,
    navText: [
      '<div class="carousel-nav-1 left-nav-1">&lt;</div>',
      '<div class="carousel-nav-1 right-nav-1">&gt;</div>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
      1025: {
        items: 4,
      },
      1200: {
        items: 5,
      },
      2560: {
        items: 9,
      },
    },
  };

  return (
    <div className="mt-4" style={{marginTop:'-200px'}}>
      <Title>TOP DEALS FOR YOU!</Title>

      {offers.length === 0 ? (
        <ErrorMessage>No offers available</ErrorMessage>
      ) : (
        <OwlCarousel className="owl-theme" {...carouselOptions}>
          {offers.map((offer) => (
            <Card key={offer._id} onClick={() => handleCardClick(offer)} className='mt-5 mb-5'>
              {offer.images && offer.images[0] && (
                <CardImage src={offer.images[0]} alt={offer.title} />
              )}
              <CardHeader>{offer.title}</CardHeader>
              <CardDescription>{offer.description}</CardDescription>
              <Price>Price: <span style={{ textDecoration: 'line-through', marginLeft: '10px', color: '#ff5722' }}> ₹{offer.price}</span></Price>
              <OfferPrice>Offer Price: ₹{offer.offerPrice}</OfferPrice>
            </Card>
          ))}
        </OwlCarousel>
      )}
    </div>
  );
};

export default OffersCard;
