
// /* global Razorpay */

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';
// import { FaShoppingCart } from 'react-icons/fa';

// const Checkout = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [showConfirmationModal, setShowConfirmationModal] = useState(false); // For confirmation modal
//   const [showSuccessModal, setShowSuccessModal] = useState(false); // For success modal
//   const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null); // Track selected payment method
//   const navigate = useNavigate();
//   const [quote, setQuote] = useState({});
//   const [user, setUser] = useState(null);

//   const handlePaymentMethodSelection = (paymentMethod) => {
//     setSelectedPaymentMethod(paymentMethod); // Set the selected payment method
//     setShowConfirmationModal(true); // Open confirmation modal
//   };

//   const handleConfirmOrder = async () => {
//     setShowConfirmationModal(false); // Close confirmation modal
//     setLoading(true);
//     setErrorMessage('');
//     setSuccessMessage('');

//     const token = Cookies.get('token');
//     if (!token) {
//       setLoading(false);
//       navigate('/login');
//       return;
//     }

//     try {
//       // Post the payment method to get payment details
//       const response = await axios.post('/api/checkout', { paymentMethod: selectedPaymentMethod, type: 'cartNow' }, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.status === 200) {
//         const paymentDetails = response.data.paymentDetails;

//         if (selectedPaymentMethod === 'online') {
//           if (typeof window.Razorpay === 'undefined') {
//             setErrorMessage('Razorpay is not available.');
//             return;
//           }

//           const options = {
//             key: paymentDetails.key_id,
//             amount: quote.totalAmount ,
//             currency: 'INR',
//             order_id: paymentDetails.razorpayOrderId,
//             handler: async (paymentResponse) => {
//               try {
//                 const confirmResponse = await axios.post('/api/orders/confirm-payment', {
//                   razorpayOrderId: paymentDetails.razorpayOrderId,
//                   razorpayPaymentId: paymentResponse.razorpay_payment_id,
//                   razorpaySignature: paymentResponse.razorpay_signature,
//                 }, {
//                   headers: { Authorization: `Bearer ${token}` },
//                 });

//                 if (confirmResponse.status === 200) {
//                   setShowSuccessModal(true); // Show success modal
//                 } else {
//                   setErrorMessage('Payment verification failed.');
//                 }
//               } catch (error) {
//                 setErrorMessage('Payment verification failed.');
//               }
//             },
//             prefill: {
//               name: user?.name || 'John Doe',
//               email: user?.email || 'john.doe@example.com',
//               contact: user?.contact || '1234567890',
//             },
//           };

//           const rzp1 = new window.Razorpay(options);
//           rzp1.open();
//         } else if (selectedPaymentMethod === 'cod') {
//           setShowSuccessModal(true); // Show success modal for COD
//         }
//       }
//     } catch (error) {
//       setErrorMessage(error.response?.data?.message || 'An error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCloseSuccessModal = () => {
//     setShowSuccessModal(false); // Close success modal
//     navigate('/order-details'); // Redirect to order history
//   };

//   const handleCloseConfirmationModal = () => {
//     setShowConfirmationModal(false); // Close confirmation modal
//   };

//   useEffect(() => {
//     const fetchCart = async () => {
//       const token = Cookies.get('token');
//       if (!token) {
//         navigate('/login');
//         return;
//       }

//       try {
//         const response = await axios.get('/api/viewcart', {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (response.data.cart.items.length === 0) {
//           setError('Your cart is empty.');
//         } else {
//           setCartItems(response.data.cart.items);
//           setQuote(response.data.cart.quote);
//         }
//       } catch (error) {
//         console.error('Error fetching cart:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCart();
//   }, [navigate]);

//   useEffect(() => {
//     const loadRazorpayScript = () => {
//       const script = document.createElement('script');
//       script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//       script.async = true;
//       script.onerror = () => {
//         setErrorMessage('Failed to load Razorpay script.');
//       };
//       document.body.appendChild(script);
//     };
//     loadRazorpayScript();
//   }, []);

//   useEffect(() => {
//     const fetchUser = async () => {
//       const token = Cookies.get('token');
//       if (!token) {
//         navigate('/login');
//         return;
//       }

//       try {
//         const response = await axios.get('/api/user', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUser(response.data);
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchUser();
//   }, [navigate]);

//   if (loading) {
//     return (
//       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//         <div style={{ border: '8px solid #f3f3f3', borderTop: '8px solid #4CAF50', borderRadius: '50%', width: '50px', height: '50px', animation: 'spin 1s linear infinite' }}></div>
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
//     <div className="container mt-4">
//       <h5 className="viewcart-h5" style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>
//         C A R T ...<span style={{ color: '#1b7b16' }}> P A Y M E N T</span>
//       </h5>

//       {error && <div className="alert alert-danger">{error}</div>}

//       {/* Order Summary and Checkout Section */}
//       {cartItems.length > 0 ? (
//         <div>
//           <div className="mt-4 d-flex justify-content-between mb-4" style={flexContainerStyle}>
//             {/* Order Summary */}
//             <div style={orderSummaryStyle}>
//               <h3 style={orderSummaryTitleStyle}>Order Summary</h3>
//               <div style={summaryTextStyle} className="mt-5">
//                 <strong>Total Quantity:</strong> {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
//               </div>
//               <div style={summaryTextStyle}>
//                 <strong>Items:</strong> {cartItems.length}
//               </div>

//               <div style={summaryTotalStyle} className="mt-2">
//                 <strong>Total Amount: ₹{quote.totalAmount}</strong>
//                 <p><strong>Savings:</strong> ₹{quote.savings}</p>
//               </div>
//             </div>

//             {/* Checkout Section */}
//             <div style={checkoutSectionStyle}>
//               <h3 style={orderSummaryTitleStyle} className='mt-3'>Choose Payment Mode</h3>
//               {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

//               <div className="payment-method mt-5">
//                 <button
//                   type="button"
//                   onClick={() => handlePaymentMethodSelection('online')}
//                   style={paymentButtonStyle}
//                   className='mt-3'
//                 >
//                   Online Payment
//                 </button>
//                 <button
//                   type="button"
//                   className='mt-2'
//                   onClick={() => handlePaymentMethodSelection('cod')}
//                   style={paymentButtonStyle}
//                 >
//                   Cash on Delivery
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div style={emptyCartContainer}>
//           <p>Your Cart is empty.</p>
//           <button
//             onClick={() => navigate('/')}
//             style={continueShoppingButtonStyle}
//             className="d-flex align-items-center"
//           >
//             <FaShoppingCart style={{ marginRight: '8px' }} />
//             Continue Shopping
//           </button>
//         </div>
//       )}

//       {/* Confirmation Modal */}
//       {showConfirmationModal && (
//         <div style={modalOverlayStyle}>
//           <div style={modalContentStyle}>
//             <h2>Confirm Order</h2>
//             <p>Are you sure you want to place the order with {selectedPaymentMethod === 'online' ? 'Online Payment' : 'Cash on Delivery'}?</p>
//             <div>
//               <button onClick={handleConfirmOrder} style={confirmButtonStyle}>Confirm</button>
//               <button onClick={handleCloseConfirmationModal} style={cancelButtonStyle}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Success Modal */}
//       {showSuccessModal && (
//         <div style={modalOverlayStyle}>
//           <div style={modalContentStyle}>
//             <h2>Order Placed Successfully!</h2>
//             <p>Your order has been placed successfully.</p>
//             <button onClick={handleCloseSuccessModal} style={closeButtonStyle}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // Styles
// const modalOverlayStyle = {
//   position: 'fixed',
//   top: 0,
//   left: 0,
//   width: '100%',
//   height: '100%',
//   backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   animation: 'fadeIn 0.5s ease-out',
//   opacity: 1,
// };

// const modalContentStyle = {
//   backgroundColor: 'white',
//   padding: '40px 20px',
//   borderRadius: '10px',
//   textAlign: 'center',
//   width: '90%',
//   maxWidth: '500px',
//   animation: 'modalSlideIn 0.5s ease-out',
// };

// const confirmButtonStyle = {
//   backgroundColor: '#4CAF50',
//   color: '#fff',
//   padding: '10px 20px',
//   borderRadius: '5px',
//   border: 'none',
//   cursor: 'pointer',
//   marginRight: '10px',
// };

// const cancelButtonStyle = {
//   backgroundColor: '#f44336',
//   color: '#fff',
//   padding: '10px 20px',
//   borderRadius: '5px',
//   border: 'none',
//   cursor: 'pointer',
// };

// const closeButtonStyle = {
//   backgroundColor: '#4CAF50',
//   color: '#fff',
//   padding: '10px 20px',
//   borderRadius: '5px',
//   border: 'none',
//   cursor: 'pointer',
// };

// const emptyCartContainer = {
//   textAlign: 'center',
//   padding: '50px',
// };

// const flexContainerStyle = {
//   display: 'flex',
//   justifyContent: 'space-between',
//   marginTop: '20px',
//   flexWrap: 'wrap',
//   gap: '20px',
// };

// const orderSummaryStyle = {
//   flex: 1,
//   padding: '20px',
//   backgroundColor: '#fff',
//   borderRadius: '10px',
//   border: '1px solid #ddd',
//   minWidth: '300px',
// };

// const checkoutSectionStyle = {
//   flex: 1,
//   padding: '20px',
//   backgroundColor: '#f9f9f9',
//   borderRadius: '10px',
//   minWidth: '300px',
// };

// const orderSummaryTitleStyle = {
//   fontSize: '1.5rem',
//   fontWeight: 'bold',
// };

// const summaryTextStyle = {
//   marginBottom: '10px',
// };

// const summaryTotalStyle = {
//   marginTop: '20px',
//   fontSize: '1.2rem',
//   fontWeight: 'bold',
// };

// const paymentButtonStyle = {
//   backgroundColor: '#4CAF50',
//   color: '#fff',
//   padding: '10px 20px',
//   borderRadius: '5px',
//   border: 'none',
//   cursor: 'pointer',
//   width: '100%',
// };

// const continueShoppingButtonStyle = {
//   backgroundColor: '#4CAF50',
//   color: '#fff',
//   padding: '10px 20px',
//   borderRadius: '5px',
//   border: 'none',
//   cursor: 'pointer',
//   textAlign: 'center',
//   marginTop: '20px',
// };
  
// export default Checkout;














/* global Razorpay */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FaShoppingCart } from 'react-icons/fa';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false); // For confirmation modal
  const [showSuccessModal, setShowSuccessModal] = useState(false); // For success modal
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null); // Track selected payment method
  const navigate = useNavigate();
  const [quote, setQuote] = useState({});
  const [user, setUser] = useState(null);
  const { deliveryId } = useParams();  // Getting the deliveryId from URL params

  const handlePaymentMethodSelection = (paymentMethod) => {
    setSelectedPaymentMethod(paymentMethod); // Set the selected payment method
    setShowConfirmationModal(true); // Open confirmation modal
  };

  const handleConfirmOrder = async () => {
    setShowConfirmationModal(false); // Close confirmation modal
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
  
    const token = Cookies.get('token');
    if (!token) {
      setLoading(false);
      navigate('/login');
      return;
    }
  
    const deliveryIdFromCart = cartItems.length > 0 ? cartItems[0].deliveryId : 'default-delivery-id'; 
  
    try {
      console.log("Sending data to API:", {
        paymentMethod: selectedPaymentMethod,
        type: 'cartNow',
        deliveryId: deliveryId || deliveryIdFromCart, 
      });
  
      const response = await axios.post('/api/checkout', { 
        paymentMethod: selectedPaymentMethod, 
        type: 'cartNow',  
        deliveryId: deliveryId || deliveryIdFromCart, 
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      console.log("API Response:", response.data);
  
      if (response.status === 200) {
        const paymentDetails = response.data.paymentDetails;
  
        if (selectedPaymentMethod === 'online') {
          if (typeof window.Razorpay === 'undefined') {
            setErrorMessage('Razorpay is not available.');
            return;
          }
  
          const options = {
            key: paymentDetails.key_id,
            amount: quote.totalAmount,
            currency: 'INR',
            order_id: paymentDetails.razorpayOrderId,
            handler: async (paymentResponse) => {
              try {
                const confirmResponse = await axios.post('/api/orders/confirm-payment', {
                  razorpayOrderId: paymentDetails.razorpayOrderId,
                  razorpayPaymentId: paymentResponse.razorpay_payment_id,
                  razorpaySignature: paymentResponse.razorpay_signature,
                }, {
                  headers: { Authorization: `Bearer ${token}` },
                });
  
                if (confirmResponse.status === 200) {
                  setShowSuccessModal(true); // Show success modal
                } else {
                  setErrorMessage('Payment verification failed.');
                }
              } catch (error) {
                setErrorMessage('Payment verification failed.');
              }
            },
            prefill: {
              name: user?.name || 'John Doe',
              email: user?.email || 'john.doe@example.com',
              contact: user?.contact || '1234567890',
            },
            // Handle Razorpay window close without completing payment
            modal: {
              ondismiss: async () => {
                try {
                 
                  await axios.post('/api/orders/confirm-payment', {
                    razorpayOrderId: paymentDetails.razorpayOrderId,
                    razorpayPaymentId: null, // No payment id
                    razorpaySignature: null, // No signature
                  }, {
                    headers: { Authorization: `Bearer ${token}` },
                  });
                  setErrorMessage('Payment was not completed.');
                } catch (error) {
                  setErrorMessage('order is failed.');
                }
              }
            }
          };
  
          const rzp1 = new window.Razorpay(options);
          rzp1.open();
        } else if (selectedPaymentMethod === 'cod') {
          setShowSuccessModal(true); // Show success modal for COD
        }
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };
  

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false); // Close success modal
    navigate('/order-details'); // Redirect to order history
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false); // Close confirmation modal
  };

  useEffect(() => {
    const fetchCart = async () => {
      const token = Cookies.get('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('/api/viewcart', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.cart.items.length === 0) {
          setError('Your cart is empty.');
        } else {
          setCartItems(response.data.cart.items);
          setQuote(response.data.cart.quote);
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [navigate]);

  useEffect(() => {
    const loadRazorpayScript = () => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onerror = () => {
        setErrorMessage('Failed to load Razorpay script.');
      };
      document.body.appendChild(script);
    };
    loadRazorpayScript();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('/api/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, [navigate]);

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
    <div className="container mt-4">
      <h5 className="viewcart-h5" style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>
        C A R T ...<span style={{ color: '#1b7b16' }}> P A Y M E N T</span>
      </h5>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Order Summary and Checkout Section */}
      {cartItems.length > 0 ? (
        <div>
          <div className="mt-4 d-flex justify-content-between mb-4" style={flexContainerStyle}>
            {/* Order Summary */}
            <div style={orderSummaryStyle}>
              <h3 style={orderSummaryTitleStyle}>Order Summary</h3>
              <div style={summaryTextStyle} className="mt-5">
                <strong>Total Quantity:</strong> {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
              </div>
              <div style={summaryTextStyle}>
                <strong>Items:</strong> {cartItems.length}
              </div>

              <div style={summaryTotalStyle} className="mt-2">
                <strong>Total Amount: ₹{quote.totalAmount}</strong>
                <p><strong>Savings:</strong> ₹{quote.savings}</p>
              </div>
            </div>

            {/* Checkout Section */}
            <div style={checkoutSectionStyle}>
              <h3 style={orderSummaryTitleStyle} className='mt-3'>Choose Payment Mode</h3>
              {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

              <div className="payment-method mt-5">
                <button
                  type="button"
                  onClick={() => handlePaymentMethodSelection('online')}
                  style={paymentButtonStyle}
                  className='mt-3'
                >
                  Online Payment
                </button>
                <button
                  type="button"
                  className='mt-2'
                  onClick={() => handlePaymentMethodSelection('cod')}
                  style={paymentButtonStyle}
                >
                  Cash on Delivery
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={emptyCartContainer}>
          <p>Your Cart is empty.</p>
          <button
            onClick={() => navigate('/')}
            style={continueShoppingButtonStyle}
            className="d-flex align-items-center"
          >
            <FaShoppingCart style={{ marginRight: '8px' }} />
            Continue Shopping
          </button>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <h2>Confirm Order</h2>
            <p>Are you sure you want to place the order with {selectedPaymentMethod === 'online' ? 'Online Payment' : 'Cash on Delivery'}?</p>
            <div>
              <button onClick={handleConfirmOrder} style={confirmButtonStyle}>Confirm</button>
              <button onClick={handleCloseConfirmationModal} style={cancelButtonStyle}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <h2>Order Placed Successfully!</h2>
            <DotLottieReact
      src="https://lottie.host/f9a70bff-2aaa-47a5-9af4-56b12cfd582a/wp9zU5fA0m.lottie"
      loop
      autoplay
      style={{height:'100px'}}
    />
            <button onClick={handleCloseSuccessModal} style={closeButtonStyle}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles
const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  animation: 'fadeIn 0.5s ease-out',
  opacity: 1,
};

const modalContentStyle = {
  backgroundColor: 'white',
  padding: '40px 20px',
  borderRadius: '10px',
  textAlign: 'center',
  width: '90%',
  maxWidth: '500px',
  animation: 'modalSlideIn 0.5s ease-out',
};

const confirmButtonStyle = {
  backgroundColor: '#4CAF50',
  color: '#fff',
  padding: '10px 20px',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',
  marginRight: '10px',
};

const cancelButtonStyle = {
  backgroundColor: '#f44336',
  color: '#fff',
  padding: '10px 20px',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',
};

const closeButtonStyle = {
  backgroundColor: '#4CAF50',
  color: '#fff',
  padding: '10px 20px',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',
};

const emptyCartContainer = {
  textAlign: 'center',
  padding: '50px',
};

const flexContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '20px',
  flexWrap: 'wrap',
  gap: '20px',
};

const orderSummaryStyle = {
  flex: 1,
  padding: '20px',
  backgroundColor: '#fff',
  borderRadius: '10px',
  border: '1px solid #ddd',
  minWidth: '300px',
};

const checkoutSectionStyle = {
  flex: 1,
  padding: '20px',
  backgroundColor: '#f9f9f9',
  borderRadius: '10px',
  minWidth: '300px',
};

const orderSummaryTitleStyle = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
};

const summaryTextStyle = {
  marginBottom: '10px',
};

const summaryTotalStyle = {
  marginTop: '20px',
  fontSize: '1.2rem',
  fontWeight: 'bold',
};

const paymentButtonStyle = {
  backgroundColor: '#4CAF50',
  color: '#fff',
  padding: '10px 20px',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',
  width: '100%',
};

const continueShoppingButtonStyle = {
  backgroundColor: '#4CAF50',
  color: '#fff',
  padding: '10px 20px',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',
  textAlign: 'center',
  marginTop: '20px',
};
  
export default Checkout;
