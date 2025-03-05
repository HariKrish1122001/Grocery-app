


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import { Link } from 'react-router-dom';
// import { FaArrowRight } from 'react-icons/fa'; 
// import { FaShoppingCart } from 'react-icons/fa'; 
// import { useNavigate } from 'react-router-dom';
// import styled from 'styled-components'; // Import styled-components

// const OrderHistory = () => {
//   const [orders, setOrders] = useState([]); // Store the list of orders
//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState(null); // Error state
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch the orders when the component is mounted
//     const fetchOrders = async () => {
//       try {
//         const token = Cookies.get('token'); // Get token from cookies
//         if (!token) {
//           setError('Token not found. Please log in.');
//           setLoading(false);
//           return;
//         }

//         // Make an API request to fetch the order history
//         const response = await axios.get('/api/orders/history', {
//           headers: {
//             Authorization: `Bearer ${token}`, // Include token in the request header
//           },
//         });

//         setOrders(response.data.orders); // Set the orders state
//         setLoading(false); // Stop loading
//       } catch (err) {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []); // Empty dependency array, runs only once when the component mounts

//   const handleContinueShopping = () => {
//     navigate('/');  
//   };

//   if (loading) {
//     return (
//       <LoadingWrapper>
//         <Spinner />
//       </LoadingWrapper>
//     );
//   }

//   return (
//     <OrderHistoryWrapper>
//       <h1>Order History</h1>

//       {/* If there are no orders, show a message */}
//       {orders.length === 0 ? (
//         <EmptyCartContainer>
//           <p>No orders found.</p>
//           <ContinueShoppingButton onClick={handleContinueShopping}>
//             <FaShoppingCart style={{ marginRight: '8px' }} />
//             Continue Shopping
//           </ContinueShoppingButton>
//         </EmptyCartContainer>
//       ) : (
//         <OrdersContainer>
//           {/* Map over the orders and display them */}
//           {orders.map((order) => (
//             <OrderCard key={order.orderId}>
//               <h4>Order ID: {order.orderId}</h4>

//               {/* Order status with conditional styling */}
//               <OrderStatus status={order.status}>
//                 Status: {order.status}
//               </OrderStatus>

//               {/* Row/Column layout for order items */}
//               <OrderItems>
//                 <div className="row">
//                   {order.items.map((item, index) => (
//                     <div key={index} className="col-4">
//                       <ItemCard>
//                         <img
//                           src={item.productImage}
//                           alt={item.productTitle}
//                           className="item-image"
//                         />
//                       </ItemCard>
//                     </div>
//                   ))}
//                 </div>
//               </OrderItems>

//               {/* Arrow icon with a link to order details */}
//               <Link
//                 to={{
//                   pathname: `/order-details/${order.orderId}`,
//                   state: { orders: orders }, // Pass all orders to the order details page
//                 }}
//               >
//                 <FaArrowRight size={24} color="#ff6f00" />
//               </Link>
//             </OrderCard>
//           ))}
//         </OrdersContainer>
//       )}
//     </OrderHistoryWrapper>
//   );
// };

// // Styled Components
// const OrderHistoryWrapper = styled.div`
//   padding: 20px;
//   text-align: center;
// `;

// const LoadingWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
// `;

// const Spinner = styled.div`
//   border: 8px solid #f3f3f3;
//   border-top: 8px solid #fff;
//   border-radius: 50%;
//   width: 50px;
//   height: 50px;
//   animation: spin 1s linear infinite;

//   @keyframes spin {
//     0% { transform: rotate(0deg); }
//     100% { transform: rotate(360deg); }
//   }
// `;

// const EmptyCartContainer = styled.div`
//   text-align: center;
//   padding: 50px;
// `;

// const ContinueShoppingButton = styled.button`
//   background-color: #ff9800;
//   color: #fff;
//   padding: 10px 20px;
//   border-radius: 5px;
//   border: none;
//   cursor: pointer;
//   margin-top: 20px;
//   display: inline-flex;
//   align-items: center;
// `;

// const OrdersContainer = styled.div`
//   display: flex;
//   margin-top: 20px;
//   flex-wrap: wrap;
//   gap: 20px;
//   justify-content: center;
// `;

// const OrderCard = styled.div`
//   background-color: #fff;
//   border: 1px solid #ddd;
//   border-radius: 8px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   padding: 15px;
//   width: 300px; /* Fixed width for each card */
//   height: 320px; /* Fixed height */
//   overflow: hidden;
//   position: relative;

//   h4 {
//     font-size: 18px;
//     margin-bottom: 10px;
//   }
// `;

// const OrderStatus = styled.p`
//   color: ${({ status }) => (status === 'Cancelled' ? 'red' : 'green')};
//   font-weight: bold;
// `;

// const OrderItems = styled.div`
//   margin: 0;
// `;

// const ItemCard = styled.div`
//   text-align: center;

//   .item-image {
//     width: 100%;
//     height: 120px;
//     object-fit: contain;
//   }
// `;

// const ResponsiveLink = styled(Link)`
//   position: absolute;
//   bottom: 15px;
//   right: 15px;
//   color: #ff6f00;
//   font-size: 20px;
// `;

// // Responsive Styling
// const mediaQueries = `
//   @media (max-width: 768px) {
//     ${OrderCard} {
//       width: 260px; /* Smaller width on medium screens */
//       height: 300px; /* Adjust height */
//     }

//     ${OrdersContainer} {
//       justify-content: center;
//     }

//     ${ContinueShoppingButton} {
//       font-size: 14px;
//       padding: 8px 16px;
//     }
//   }

//   @media (max-width: 576px) {
//     ${OrderCard} {
//       width: 100%; /* Full width for small screens */
//       height: auto;
//     }

//     .col-4 {
//       width: 100%; /* Stack items in a column on small screens */
//     }

//     ${OrdersContainer} {
//       flex-direction: column;
//       align-items: center;
//     }

//     ${ContinueShoppingButton} {
//       width: 100%; /* Full width button */
//     }
//   }
// `;

// export default OrderHistory;















// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import { Link } from 'react-router-dom';
// import { FaArrowRight } from 'react-icons/fa'; 
// import { FaShoppingCart } from 'react-icons/fa'; 
// import { useNavigate } from 'react-router-dom';
// import styled from 'styled-components'; // Import styled-components

// const OrderHistory = () => {
//   const [orders, setOrders] = useState([]); // Store the list of orders
//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState(null); // Error state
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch the orders when the component is mounted
//     const fetchOrders = async () => {
//       try {
//         const token = Cookies.get('token'); // Get token from cookies
//         if (!token) {
//           setError('Token not found. Please log in.');
//           setLoading(false);
//           return;
//         }

//         // Make an API request to fetch the order history
//         const response = await axios.get('/api/orders/history', {
//           headers: {
//             Authorization: `Bearer ${token}`, // Include token in the request header
//           },
//         });

//         setOrders(response.data.orders); // Set the orders state
//         setLoading(false); // Stop loading
//       } catch (err) {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []); // Empty dependency array, runs only once when the component mounts

//   const handleContinueShopping = () => {
//     navigate('/');  
//   };

//   if (loading) {
//     return (
//       <LoadingWrapper>
//         <Spinner />
//       </LoadingWrapper>
//     );
//   }

//   return (
//     <OrderHistoryWrapper>
//       <h1>Order History</h1>

//       {/* If there are no orders, show a message */}
//       {orders.length === 0 ? (
//         <EmptyCartContainer>
//           <p>No orders found.</p>
//           <ContinueShoppingButton onClick={handleContinueShopping}>
//             <FaShoppingCart style={{ marginRight: '8px' }} />
//             Continue Shopping
//           </ContinueShoppingButton>
//         </EmptyCartContainer>
//       ) : (
//         <OrdersContainer>
//           {/* Map over the orders and display them */}
//           {orders.map((order) => (
//             <OrderCard key={order.orderId}>
//               <h4>Order ID: {order.orderId}</h4>

//               {/* Order status with conditional styling */}
//               <OrderStatus status={order.status}>
//                 Status: {order.status}
//               </OrderStatus>

//               {/* Row/Column layout for order items */}
//               <OrderItems>
//                 <div className="row">
//                   {order.items.map((item, index) => (
//                     <div key={index} className="col-4">
//                       <ItemCard>
//                         <img
//                           src={item.productImage}
//                           alt={item.productTitle}
//                           className="item-image"
//                         />
//                       </ItemCard>
//                     </div>
//                   ))}
//                 </div>
//               </OrderItems>

//               {/* Arrow icon with a link to order details */}
//               <Link
//                 to={{
//                   pathname: `/order-details/${order.orderId}`,
//                   state: { orders: orders }, // Pass all orders to the order details page
//                 }}
//               >
//                 <FaArrowRight size={24} color="#ff6f00" />
//               </Link>
//             </OrderCard>
//           ))}
//         </OrdersContainer>
//       )}
//     </OrderHistoryWrapper>
//   );
// };

// // Styled Components
// const OrderHistoryWrapper = styled.div`
//   padding: 20px;
//   text-align: center;
// `;

// const LoadingWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
// `;

// const Spinner = styled.div`
//   border: 8px solid #f3f3f3;
//   border-top: 8px solid #fff;
//   border-radius: 50%;
//   width: 50px;
//   height: 50px;
//   animation: spin 1s linear infinite;

//   @keyframes spin {
//     0% { transform: rotate(0deg); }
//     100% { transform: rotate(360deg); }
//   }
// `;

// const EmptyCartContainer = styled.div`
//   text-align: center;
//   padding: 50px;
// `;

// const ContinueShoppingButton = styled.button`
//   background-color: #ff9800;
//   color: #fff;
//   padding: 10px 20px;
//   border-radius: 5px;
//   border: none;
//   cursor: pointer;
//   margin-top: 20px;
//   display: inline-flex;
//   align-items: center;
// `;

// const OrdersContainer = styled.div`
//   display: flex;
//   margin-top: 20px;
//   flex-wrap: wrap;
//   gap: 20px;
//   justify-content: center;
// `;

// const OrderCard = styled.div`
//   background-color: #fff;
//   border: 1px solid #ddd;
//   border-radius: 8px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   padding: 15px;
//   width: 300px; /* Fixed width for each card */
//   height: 320px; /* Fixed height */
//   overflow: hidden;
//   position: relative;

//   h4 {
//     font-size: 18px;
//     margin-bottom: 10px;
//   }
// `;

// const OrderStatus = styled.p`
//   color: ${({ status }) => (status === 'Cancelled' ? 'red' : 'green')};
//   font-weight: bold;
// `;

// const OrderItems = styled.div`
//   margin: 0;
// `;

// const ItemCard = styled.div`
//   text-align: center;

//   .item-image {
//     width: 100%;
//     height: 120px;
//     object-fit: contain;
//   }
// `;

// const ResponsiveLink = styled(Link)`
//   position: absolute;
//   bottom: 15px;
//   right: 15px;
//   color: #ff6f00;
//   font-size: 20px;
// `;

// // Responsive Styling
// const mediaQueries = `
//   @media (max-width: 768px) {
//     ${OrderCard} {
//       width: 260px; /* Smaller width on medium screens */
//       height: 300px; /* Adjust height */
//     }

//     ${OrdersContainer} {
//       justify-content: center;
//     }

//     ${ContinueShoppingButton} {
//       font-size: 14px;
//       padding: 8px 16px;
//     }
//   }

//   @media (max-width: 576px) {
//     ${OrderCard} {
//       width: 100%; /* Full width for small screens */
//       height: auto;
//     }

//     .col-4 {
//       width: 100%; /* Stack items in a column on small screens */
//     }

//     ${OrdersContainer} {
//       flex-direction: column;
//       align-items: center;
//     }

//     ${ContinueShoppingButton} {
//       width: 100%; /* Full width button */
//     }
//   }
// `;

// export default OrderHistory;




  import React, { useEffect, useState } from 'react';
  import axios from 'axios';
  import Cookies from 'js-cookie';
  import { Link } from 'react-router-dom';
  import { FaArrowRight, FaShoppingCart } from 'react-icons/fa';
  import { useNavigate } from 'react-router-dom';
  import styled from 'styled-components';
  import { DotLottieReact } from '@lottiefiles/dotlottie-react';

  const OrderHistory = () => {
    const [orders, setOrders] = useState([]); // Store the list of orders
    const [loading, setLoading] = useState(true); // Loading state
    // const [error, setError] = useState(null); 
    const navigate = useNavigate();

    useEffect(() => {
      // Fetch the orders when the component is mounted
      const fetchOrders = async () => {
        try {
          const token = Cookies.get('token'); // Get token from cookies
          if (!token) {
            setError('Token not found. Please log in.');
            setLoading(false);
            return;
          }

          // Make an API request to fetch the order history
          const response = await axios.get('/api/orders/history', {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in the request header
            },
          });

          setOrders(response.data.orders); // Set the orders state
          setLoading(false); // Stop loading
        } catch (err) {
          setLoading(false);
        }
      };

      fetchOrders();
    }, []); // Empty dependency array, runs only once when the component mounts

    const handleContinueShopping = () => {
      navigate('/');
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

    return (
      <OrderHistoryWrapper>
        <Header>
          <h1>Order History</h1>
          <ContinueShoppingButton onClick={handleContinueShopping}>
            <FaShoppingCart style={{ marginRight: '8px' }} />
            Continue Shopping
          </ContinueShoppingButton>
        </Header>

        {/* If there are no orders, show a message */}
        {orders.length === 0 ? (
          <EmptyCartContainer>
            <p>No orders found.</p>
          </EmptyCartContainer>
        ) : (
          <OrdersContainer>
            {/* Map over the orders and display them */}
            {orders.map((order) => (
              <OrderCard key={order.orderId}>
                <OrderHeader>
                  <h4>Order ID: {order.orderId}</h4>
                  <OrderStatus status={order.status}>
                    Status: {order.status}
                  </OrderStatus>
                </OrderHeader>

                {/* Row/Column layout for order items */}
                <OrderItems>
                  {order.items.map((item, index) => (
                    <ItemCard key={index}>
                      <img
                        src={item.productImage}
                        alt={item.productTitle}
                        className="item-image"
                      />
                      <p>{item.productTitle}</p>
                    </ItemCard>
                  ))}
                </OrderItems>

                {/* Arrow icon with a link to order details */}
                <ResponsiveLink
                to={{
                pathname: `/order-details/${order.items[0].deliveryId}/${order.orderId}`,
                state: { orders: orders },
                }}
                  >
              <FaArrowRight size={24} color="#ff6f00" />
                      </ResponsiveLink>

                
              </OrderCard>
              
            ))}
          </OrdersContainer>
        )}
      </OrderHistoryWrapper>
    );
  };

  // Styled Components
  const OrderHistoryWrapper = styled.div`
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  `;

  const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    flex-wrap: wrap; /* Allow wrapping on smaller screens */

    h1 {
      font-size: 28px;
      color: #333;
      margin: 0 0 10px 0; /* Add margin for smaller screens */
    }

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
    }
  `;

 

  const EmptyCartContainer = styled.div`
    text-align: center;
    padding: 50px;
    font-size: 18px;
    color: #666;
  `;

  const ContinueShoppingButton = styled.button`
    background-color: #ff6f00;
    color: #fff;
    padding: 12px 24px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    font-size: 16px;
    display: inline-flex;
    align-items: center;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #e65a00;
    }

    @media (max-width: 768px) {
      width: 100%; /* Full width on smaller screens */
      justify-content: center;
    }
  `;

  const OrdersContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;

    @media (max-width: 768px) {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }

    @media (max-width: 480px) {
      grid-template-columns: 1fr; /* Single column on mobile */
    }
  `;

  const OrderCard = styled.div`
    background-color: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 20px;
    position: relative;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }
  `;

  const OrderHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;

    h4 {
      font-size: 18px;
      color: #333;
      margin: 0;
    }

    @media (max-width: 480px) {
      flex-direction: column;
      align-items: flex-start;

      h4 {
        margin-bottom: 10px;
      }
    }
        @media screen and (min-width:1000px) and (max-width:1024px) {


      h4 {
      font-size:16px
      }
    }
  `;

  const OrderStatus = styled.p`
    color: ${({ status }) => (status === 'Cancelled' ? '#ff4444' : '#00c853')};
    font-weight: bold;
    margin: 0;
  `;

  const OrderItems = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 10px;
    margin-top: 15px;

    @media (max-width: 480px) {
      grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    }
  `;

  const ItemCard = styled.div`
    text-align: center;
    padding: 10px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background-color: #f9f9f9;

    .item-image {
      width: 100%;
      height: 80px;
      object-fit: contain;
      margin-bottom: 8px;
    }

    p {
      font-size: 14px;
      color: #555;
      margin: 0;
    }
  `;

  const ResponsiveLink = styled(Link)`
    position: absolute;
    bottom: 20px;
    right: 20px;
    color: #ff6f00;
    font-size: 24px;
    transition: color 0.3s ease;

    &:hover {
      color: #e65a00;
    }
  `;

  export default OrderHistory;