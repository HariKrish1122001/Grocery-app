

// import React, { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import axios from 'axios';
// import { Container, Row, Col, Card } from 'react-bootstrap';

// const SubcategoryPage = () => {
//   const { categoryId } = useParams();
//   const [subcategories, setSubcategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchSubcategories = async () => {
//       try {
//         const response = await axios.get(`/api/getsubc/${categoryId}`);
//         if (response?.data?.success) {
//           setSubcategories(response.data.subCategories);
//         } else {
//           throw new Error('No subcategories found');
//         }
//         setLoading(false);
//       } catch (error) {
//         setError(error.message || 'Error fetching subcategories');
//         setLoading(false);
//       }
//     };

//     fetchSubcategories();
//   }, [categoryId]);

//   if (loading) {
//     return <div className="text-center">Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-center text-danger">{error}</div>;
//   }

//   const cardStyle = {
//     borderRadius: '12px',
//     transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//     height: 'auto',
//     display: 'flex',
//     padding: '10px',
//     flexDirection: 'column',
//   };

//   const cardHoverStyle = {
//     transform: 'translateY(-10px)',
//     boxShadow: '0 1px 1px rgba(0, 0, 0, 0.1)',
//   };

//   const cardTitleStyle = {
//     fontSize: '1.25rem',
//     fontWeight: 'bold',
//     color: '#333',
//     height: '30px',
//     textAlign: 'center',
//     marginTop: '10px',
//   };

//   const cardImgStyle = {
//     borderRadius: '12px 12px 0 0',
//     height: '180px',
//     objectFit: 'cover',
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

//   return (
//     <Container fluid style={containerStyle}>
//       <h2 style={headingStyle}>Subcategories</h2>
//       {subcategories.length > 0 ? (
//         <Row className="g-4">
//           {subcategories.map((subcategory) => (
//             <Col key={subcategory._id} xs={12} sm={6} md={4} lg={3}>
//               <Link to={`/subcategoryproduct/${subcategory._id}`} style={{ textDecoration: 'none' }}>
//                 <Card
//                   style={cardStyle}
//                   className="subcategory-card shadow-lg"
//                   onMouseEnter={(e) => (e.currentTarget.style.transform = cardHoverStyle.transform)}
//                   onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
//                 >
//                   <Card.Img
//                     variant="top"
//                     src={subcategory.images[0] || 'https://via.placeholder.com/150'}
//                     alt={subcategory.title}
//                     style={cardImgStyle}
//                   />
//                   <Card.Body>
//                     <Card.Title style={cardTitleStyle}>{subcategory.title}</Card.Title>
//                   </Card.Body>
//                 </Card>
//               </Link>
//             </Col>
//           ))}
//         </Row>
//       ) : (
//         <p>No subcategories found for this category.</p>
//       )}
//     </Container>
//   );
// };

// export default SubcategoryPage;







import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const SubcategoryPage = () => {
  const { categoryId } = useParams();
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get(`/api/getsubc/${categoryId}`);
        if (response?.data?.success) {
          setSubcategories(response.data.subCategories);
        } else {
          throw new Error('No subcategories found');
        }
        setLoading(false);
      } catch (error) {
        setError(error.message || 'Error fetching subcategories');
        setLoading(false);
      }
    };

    fetchSubcategories();
  }, [categoryId]);

  if (loading) {
    return  (
      <DotLottieReact
      src="https://lottie.host/304b6b43-2a24-45bb-9012-ed8264aa2340/6hUDLfTOmC.lottie"
      loop
      autoplay
    />
    );
  }

  if (error) {
    return <div className="text-center text-danger">{error}</div>;
  }

  const cardStyle = {
    borderRadius: '12px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    height: 'auto',
    display: 'flex',
    padding: '10px',
    flexDirection: 'column',
  };

  const cardHoverStyle = {
    transform: 'translateY(-10px)',
    boxShadow: '0 1px 1px rgba(0, 0, 0, 0.1)',
  };

  const cardTitleStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#333',
    height: '30px',
    textAlign: 'center',
    marginTop: '10px',
  };

  const cardImgStyle = {
    borderRadius: '12px 12px 0 0',
    height: '180px',
    objectFit: 'cover',
  };

  const containerStyle = {
    padding: '2rem 1rem',
  };

  const headingStyle = {
    fontSize: '2rem',
    color: '#343a40',
    textAlign: 'center',
    marginBottom: '1.5rem',
  };

  return (
    <Container fluid style={containerStyle}>
      <h2 style={headingStyle}>Subcategories</h2>
      {subcategories.length > 0 ? (
        <Row className="g-4">
          {subcategories.map((subcategory) => (
            <Col key={subcategory._id} xs={12} sm={6} md={4} lg={3}>
              <Link to={`/getproduct/${subcategory._id}`} style={{ textDecoration: 'none' }}>
                <Card
                  style={cardStyle}
                  className="subcategory-card shadow-lg"
                  onMouseEnter={(e) => (e.currentTarget.style.transform = cardHoverStyle.transform)}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  <Card.Img
                    variant="top"
                    src={subcategory.images[0] || 'https://via.placeholder.com/150'}
                    alt={subcategory.title}
                    style={cardImgStyle}
                  />
                  <Card.Body>
                    <Card.Title style={cardTitleStyle}>{subcategory.title}</Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      ) : (
        <p>No subcategories found for this category.</p>
      )}
    </Container>
  );
};

export default SubcategoryPage;
