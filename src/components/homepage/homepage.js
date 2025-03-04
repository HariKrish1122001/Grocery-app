// import React from "react";
// import Slider from "react-slick";
// import "./homepage.css";

// // Update to use images from the assets folder inside src
// import Carousel1 from './img/carousel-1.jpg';
// import Carousel2 from './img/carousel-2.jpg';

// const Carousel = () => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     arrows: true,
//   };

//   const carouselData = [
//     {
//       img: Carousel1,

//     },
//     {
//       img: Carousel2,

//     }
//   ];

//   return (
//     <div className="carousel-container">
//       <Slider {...settings}>
//         {carouselData.map((item, index) => (
//           <div key={index} className="carousel-slide">
//             <img src={item.img} alt={item.title || "Carousel Image"} className="carousel-image img-fluid" />
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// };

// export default Carousel;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick'; 
import "./css/homepage.css";

const Banner = () => {
    const [banner, setBanner] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch the banner image from the server
        axios.get('/api/Banner')
            .then(response => {
                setBanner(response.data.banner);
            })
            .catch(err => {
                setError(err.response ? err.response.data.error : 'Error fetching banner image');
            });
    }, []);

    if (error) {
        return <div className="error">{error}</div>;
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
    };

    return (
        <div className="banner-container-fluid" style={{marginTop:'-30px'}}>
            {banner ? (
                banner.images && banner.images.length > 0 ? (
                    <Slider {...settings}>
                        {banner.images.map((image, index) => (
                            <div key={index}>
                                <img 
                                    // style={{  width: '100%', height: '400px' }}
                                    src={image}
                                    alt={`Banner ${index + 1}`}
                                    className="banner-image img-fluid"
                                    onError={() => setError('Failed to load banner image')}
                                />
                            </div>
                        ))}
                    </Slider>
                ) : (
                    <p style={{textAlign:'center'}}>No banner images available</p>
                )
            ) : (
                <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100vh',
                }}
              >
                <div
                  style={{
                    border: '8px solid #f3f3f3', 
                    borderTop: '8px solid #fff', 
                    borderRadius: '50%',
                    width: '50px',  
                    height: '50px',
                    animation: 'spin 1s linear infinite', 
                  }}
                ></div>
                <style>
                  {`
                    @keyframes spin {
                      0% { transform: rotate(0deg); }
                      100% { transform: rotate(360deg); }
                    }
                  `}
                </style>
              </div>
            )}
        </div>
    );
};

export default Banner;
