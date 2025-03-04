
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Container } from "react-bootstrap";
// import { useNavigate } from "react-router-dom"; 
// import OwlCarousel from 'react-owl-carousel';
// import "./css/homecategory.css";

// const CategorySection = () => {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [hoveredIndex, setHoveredIndex] = useState(null);
//   const navigate = useNavigate(); 

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get('api/getallc'); 
//         if (response.data && response.data.categories) {
//           setCategories(response.data.categories); 
//         } else {
//           throw new Error('Categories not found');
//         }
//         setLoading(false);
//       } catch (error) {
//         setError(error.message || 'Error fetching categories');
//         setLoading(false);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const carouselOptions = {
//     items: 4,
//     loop: true,
//     margin: 10,
//     dots: false,
//     nav: true,
//     navText: [
//       '<div class="carousel-nav left-nav">&lt;</div>', 
//       '<div class="carousel-nav right-nav">&gt;</div>',
//     ],
//     responsive: {
//       0: {
//         items: 2,
//       },
//       600: {
//         items: 3,
//       },
//       1000: {
//         items: 4,
//       },
//       1025: {
//         items: 5,
//       },
//       1200: {
//         items: 6,
//       },
//       2560: {
//         items: 10,
//       },
//     },
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

//   if (error) {
//     return <div>{error}</div>;
//   }

//   const cardStyle = (isHovered) => ({
//     textAlign: "center",
//     padding: "20px",
//     cursor: "pointer",
//     borderRadius: "12px",
//     transition: "transform 0.3s ease, box-shadow 0.3s ease",
//     backgroundColor: "#fff", 
//     border: "1px solid #ddd", 
//     height:"170px",
//   });

//   const imageStyle = {
//     width: "80px", // Increased size for better display
//     height: "80px",
//     objectFit: "contain",
//     marginBottom: "15px", // Add more space between image and text
//   };

//   const nameStyle = {
//     fontSize: "16px", // Slightly larger font size
//     fontWeight: "bold",
//     color: "#333",
//   };

//   const handleCategoryClick = (categoryId) => {
//     navigate(`/getsubc/${categoryId}`);
//   };

//   return (
//     <Container fluid className="bg-light py-3">
//       {categories.length > 0 && (
//         <OwlCarousel className="owl-theme" {...carouselOptions}>
//           {categories.map((category, index) => (
//             <div
//               key={category._id}
//               style={cardStyle(hoveredIndex === index)}
//               onMouseEnter={() => setHoveredIndex(index)}
//               onMouseLeave={() => setHoveredIndex(null)}
//               onClick={() => handleCategoryClick(category._id)}
//             >
//               <img
//                 src={category.images[0]} 
//                 alt={category.title}
//                 style={imageStyle}
//                 onError={(e) => e.target.src = '/path/to/default-image.jpg'}  // Fallback image
//               />
//               <div style={nameStyle}>{category.title}</div>
//             </div>
//           ))}
//         </OwlCarousel>
//       )}
//     </Container>
//   );
// };

// export default CategorySection;











import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; 
import OwlCarousel from 'react-owl-carousel';
import "./css/homecategory.css";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const CategorySection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('api/getallc'); 
        if (response.data && response.data.categories) {
          setCategories(response.data.categories); 
        } else {
          throw new Error('Categories not found');
        }
        setLoading(false);
      } catch (error) {
        setError(error.message || 'Error fetching categories');
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const carouselOptions = {
    items: 4,
    loop: false,
    margin: 10,
    dots: false,
    nav: true,
    navText: [
      '<div class="carousel-nav left-nav">&lt;</div>', 
      '<div class="carousel-nav right-nav">&gt;</div>',
    ],
    responsive: {
      0: {
        items: 2,
      },
      600: {
        items: 5,
      },
      1000: {
        items: 6,
      },
      1025: {
        items: 5,
      },
      1200: {
        items: 8,
      },
      2560: {
        items: 12,
      },
    },
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

  if (error) {
    return <div>{error}</div>;
  }

  const cardStyle = {
    textAlign: "center",
    padding: "20px",
    cursor: "pointer",
    borderRadius: "12px",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    backgroundColor: "#fff", 
    border: "1px solid #ddd", 
    height:"105px",
  
  };

  const imageStyle = {
    width: "50px",
    height: "50px",
    objectFit: "contain",
    marginBottom: "15px", 
    display:'block',
    margin:'0 auto',
  };

  const nameStyle = {
    fontSize: "11px", // Slightly larger font size
    fontWeight: "bold",
    color: "#333",
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/getsubc/${categoryId}`);
  };

  return (
    <Container fluid className="bg-light py-3">
      {categories.length > 0 && (
        <OwlCarousel className="owl-theme" {...carouselOptions}>
          {categories.map((category, index) => (
            <div
              key={category._id}
              style={cardStyle}
             
              onClick={() => handleCategoryClick(category._id)}
            >
              <img
                src={category.images[0]} 
                alt={category.title}
                style={imageStyle}
                onError={(e) => e.target.src = '/path/to/default-image.jpg'} 
                 className="img-fluid"
              />
              <div style={nameStyle}>{category.title}</div>
            </div>
          ))}
        </OwlCarousel>
      )}
    </Container>
  );
};

export default CategorySection;
