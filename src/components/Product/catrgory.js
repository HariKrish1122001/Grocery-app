


// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { Container, Row, Col, ListGroup, Card } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

// const CategorySection = () => {
//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [hoveredIndex, setHoveredIndex] = useState(null);
//   const subcategoriesRef = useRef(null); // Ref for subcategories section
//   const navigate = useNavigate();

//   // Fetch categories on initial load
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

//   // Fetch subcategories when a category is selected
//   useEffect(() => {
//     if (selectedCategory) {
//       const fetchSubCategories = async () => {
//         try {
//           const response = await axios.get(`/api/getsubc/${selectedCategory._id}`);
//           if (response.data && response.data.subCategories) {
//             setSubCategories(response.data.subCategories);
//           } else {
//             setSubCategories([]);
//           }
//         } catch (error) {
//           setError(error.message || 'Error fetching subcategories');
//         }
//       };

//       fetchSubCategories();
//     }
//   }, [selectedCategory]);

//   // Default subcategory on initial load
//   useEffect(() => {
//     if (categories.length > 0) {
//       setSelectedCategory(categories[0]); // Default to the first category
//     }
//   }, [categories]);

//   // Scroll to the subcategory section
//   const scrollToSubcategories = () => {
//     if (subcategoriesRef.current) {
//       subcategoriesRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   const categoryStyle = (isHovered) => ({
//     display: "flex",
//     alignItems: "center",
//     padding: "10px",
//     cursor: "pointer",
//     borderRadius: "8px",
//     boxShadow: isHovered ? "0 6px 15px rgba(0, 0, 0, 0.15)" : "0 4px 8px rgba(0, 0, 0, 0.1)",
//     transition: "transform 0.3s ease, box-shadow 0.3s ease",
//     transform: isHovered ? "scale(1.05)" : "scale(1)",
//     height: "50px", // Set height for category items
//     marginBottom: "5px", // Spacing between items
//   });

//   const imageStyle = {
//     width: "30px",
//     height: "30px",
//     objectFit: "contain",
//     marginRight: "10px",
//   };

//   const nameStyle = {
//     fontSize: "14px",
//     fontWeight: "bold",
//     color: "#333",
//   };

//   const subcategoryImageStyle = {
//     width: "100%",
//     height: "100%",
//     objectFit: "contain",
//   };

//   const cardStyle = {
//     height: "370px", // Set fixed height for the Card
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "space-between",
//   };

//   const handleSubCategoryClick = (subCategoryId) => {
//     // Navigate to the SubcategoryProductPage
//     navigate(`/getproduct/${subCategoryId}`);
//   };

//   return (
//     <Container fluid className="bg-light py-3">
//       <Row className="g-4">
//         {/* Left Column - Categories */}
//         <Col xs={12} sm={4} md={3} lg={3}>
//           <ListGroup>
//             {categories.map((category, index) => (
//               <ListGroup.Item
//                 key={category._id}
//                 action
//                 style={categoryStyle(hoveredIndex === index)}
//                 onClick={() => {
//                   setSelectedCategory(category); // Set selected category on click
//                   scrollToSubcategories(); // Scroll to subcategories section
//                 }}
//                 onMouseEnter={() => setHoveredIndex(index)}
//                 onMouseLeave={() => setHoveredIndex(null)}
//               >
//                 <img
//                   src={category.images[0]} // Display category image
//                   alt={category.title}
//                   style={imageStyle}
//                   onError={(e) => e.target.src = '/path/to/default-image.jpg'} // Fallback image
//                 />
//                 <div style={nameStyle}>{category.title}</div>
//               </ListGroup.Item>
//             ))}
//           </ListGroup>
//         </Col>

//         {/* Right Column - Subcategories */}
//         <Col xs={12} sm={8} md={9} lg={9} ref={subcategoriesRef}>
//           {selectedCategory ? (
//             <div>
//               <h4>{selectedCategory.title}</h4>
//               <Row className="g-4">
//                 {/* If subcategories are loaded, display them */}
//                 {subCategories.length > 0 ? (
//                   subCategories.map((subCategory, index) => (
//                     <Col key={subCategory._id} xs={12} sm={6} md={4} lg={4}>
//                       <Card className="shadow-sm" style={cardStyle}>
//                         <Card.Img
//                           variant="top"
//                           src={subCategory.images[0]} // Use the first image in the array
//                           alt={subCategory.title}
//                           style={subcategoryImageStyle} // Apply the updated style here
//                           onError={(e) => e.target.src = '/path/to/default-image.jpg'} // Fallback image
//                         />
//                         <Card.Body>
//                           <Card.Title>{subCategory.title}</Card.Title>
//                           <Card.Text>{subCategory.description}</Card.Text>
//                           <button
//                             className="btn btn-primary"
//                             onClick={() => handleSubCategoryClick(subCategory._id)} // Trigger navigation to subcategory product page
//                           >
//                             View Products
//                           </button>
//                         </Card.Body>
//                       </Card>
//                     </Col>
//                   ))
//                 ) : (
//                   <div>No subcategories available.</div>
//                 )}
//               </Row>
//             </div>
//           ) : (
//             <div>Select a category to see subcategories</div>
//           )}
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default CategorySection;








import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Container, Row, Col, ListGroup, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const CategorySection = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const subcategoriesRef = useRef(null); // Ref for subcategories section
  const navigate = useNavigate();
  

  // Fetch categories on initial load
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

  // Fetch subcategories when a category is selected
  useEffect(() => {
    if (selectedCategory) {
      const fetchSubCategories = async () => {
        try {
          const response = await axios.get(`/api/getsubc/${selectedCategory._id}`);
          if (response.data && response.data.subCategories) {
            setSubCategories(response.data.subCategories);
          } else {
            setSubCategories([]);
          }
        } catch (error) {
          setError(error.message || 'Error fetching subcategories');
        }
      };

      fetchSubCategories();
    }
  }, [selectedCategory]);

  // Default subcategory on initial load
  useEffect(() => {
    if (categories.length > 0) {
      setSelectedCategory(categories[0]); // Default to the first category
    }
  }, [categories]);

  // Scroll to the subcategory section
  const scrollToSubcategories = () => {
    if (subcategoriesRef.current) {
      subcategoriesRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  if (error) {
    return <div>{error}</div>;
  }

  const categoryStyle = (isHovered) => ({
    display: "flex",
    alignItems: "center",
    padding: "10px",
    cursor: "pointer",
    borderRadius: "8px",
    boxShadow: isHovered ? "0 6px 15px rgba(0, 0, 0, 0.15)" : "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    transform: isHovered ? "scale(1.05)" : "scale(1)",
    height: "50px", 
    marginBottom: "5px",
  });

  const imageStyle = {
    width: "30px",
    height: "30px",
    objectFit: "contain",
    marginRight: "10px",
  };

  const nameStyle = {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#333",
  };

  const subcategoryImageStyle = {
    width: "100%",
    height: "70%",
    objectFit: "contain",
  };

  const cardStyle = {
    height: "420px", 
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    border:'none',
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between", // Ensure space between content and button
  };

  const cardBodyStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flexGrow: 1,
    textAlign:'center', 
  };

  const buttonStyle = {
    backgroundColor: '#1b7b16',
    color: '#fff',
    border: 'none',
    padding: '10px',
    width: '100%',
    borderRadius: '7px',
    cursor: 'pointer',
  };

  const handleSubCategoryClick = (subCategoryId) => {
    // Navigate to the SubcategoryProductPage
    navigate(`/getproduct/${subCategoryId}`);
  };

  return (
    <Container fluid className="bg-light py-3">
      <Row className="g-4">
        {/* Left Column - Categories */}
        <Col xs={12} sm={4} md={3} lg={3}>
          <ListGroup>
            {categories.map((category, index) => (
              <ListGroup.Item
                key={category._id}
                action
                style={categoryStyle(hoveredIndex === index)}
                onClick={() => {
                  setSelectedCategory(category); // Set selected category on click
                  scrollToSubcategories(); // Scroll to subcategories section
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <img
                  src={category.images[0]} // Display category image
                  alt={category.title}
                  style={imageStyle}
                  onError={(e) => e.target.src = '/path/to/default-image.jpg'} // Fallback image
                />
                <div style={nameStyle}>{category.title}</div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        {/* Right Column - Subcategories */}
        <Col xs={12} sm={8} md={9} lg={9} ref={subcategoriesRef}>
          {selectedCategory ? (
            <div>
              <h4>{selectedCategory.title}</h4>
              <Row className="g-4">
                {/* If subcategories are loaded, display them */}
                {subCategories.length > 0 ? (
                  subCategories.map((subCategory, index) => (
                    <Col key={subCategory._id} xs={12} sm={6} md={4} lg={4}>
                      <Card className="shadow-sm" style={cardStyle}>
                        <Card.Img
                          variant="top"
                          src={subCategory.images[0]} // Use the first image in the array
                          alt={subCategory.title}
                          style={subcategoryImageStyle} // Apply the updated style here
                          onError={(e) => e.target.src = '/path/to/default-image.jpg'} // Fallback image
                          
                        />
                        <Card.Body style={cardBodyStyle}>
                          <Card.Title>{subCategory.title}</Card.Title>
                          <Card.Text>{subCategory.description}</Card.Text>
                          <button
                            className="btn"
                            style={buttonStyle}
                            onClick={() => handleSubCategoryClick(subCategory._id)} // Trigger navigation to subcategory product page
                          >
                            View Products
                          </button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))
                ) : (
                  <div>No subcategories available.</div>
                )}
              </Row>
            </div>
          ) : (
            <div>Select a category to see subcategories</div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CategorySection;
