import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Cookies from 'js-cookie'; // Import js-cookie

// Styled components for the UI
const OrderHistoryContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const OrderCard = styled.div`
  border: 1px solid #ddd;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const OrderHeader = styled.h3`
  margin: 0;
  font-size: 1.4rem;
  font-weight: bold;
  color: #333;
`;

const OrderItemContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const OrderItemDetails = styled.div`
  flex: 1;
  margin-left: 10px;
`;

const ItemTitle = styled.h4`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
`;

const ItemText = styled.p`
  margin: 5px 0;
  font-size: 1rem;
  color: #555;
`;

const OverallTotal = styled.p`
  font-weight: bold;
  font-size: 1.2rem;
  color: #007bff;
`;

const NoOrdersMessage = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #777;
`;

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Retrieve the token from cookies using js-cookie
    const token = Cookies.get('token');  // Get token from the 'token' cookie

    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get('/api/orders/history', {
          headers: {
            'Authorization': `Bearer ${token}`, // Include token in the Authorization header
          },
        });
        setOrders(response.data.orders);
        setLoading(false);
      } catch (err) {
        setError('Error fetching order history');
        setLoading(false);
      }
    };

    if (token) {
      fetchOrderHistory();
    } else {
      setError('No token found');
      setLoading(false);
    }
  }, []);

  
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

  return (
    <OrderHistoryContainer>
      <h2 style={{ textAlign: 'center', color: '#333' }}>Order History</h2>
      {orders.length === 0 ? (
        <NoOrdersMessage>No orders found</NoOrdersMessage>
      ) : (
        orders.map((order) => (
          <OrderCard key={order.orderId}>
            <OrderHeader>Order ID: {order.orderId}</OrderHeader>
            <p>Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
            <p>Address: {order.address}</p>
            <p>Phone Number: {order.phoneNo}</p>
            <h4>Order Items</h4>
            {order.items.map((item, index) => (
              <OrderItemContainer key={index}>
                <OrderItemDetails>
                  <ItemTitle>{item.productTitle}</ItemTitle>
                  <ItemText>Offer Price: ₹{item.offerPrice.toFixed(2)}</ItemText>
                  <ItemText>Original Price: ₹{item.originalPrice.toFixed(2)}</ItemText>
                  <ItemText>Quantity: {item.quantity}</ItemText>
                  <ItemText>Total Price: ₹{item.totalPrice.toFixed(2)}</ItemText>
                </OrderItemDetails>
              </OrderItemContainer>
            ))}
            <OverallTotal>Overall Total: ₹{order.overallTotal.toFixed(2)}</OverallTotal>
          </OrderCard>
        ))
      )}
    </OrderHistoryContainer>
  );
};

export default OrderHistory;
