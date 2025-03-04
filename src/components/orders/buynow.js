





// /* global Razorpay */

// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Cookies from 'js-cookie';

// const Buynow = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const product = location.state?.product;
//   const [loading, setLoading] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [quantity, setQuantity] = useState(1);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     if (product) {
//       setTotalAmount(product.offerPrice * quantity); // Update total price based on quantity
//     }
//   }, [product, quantity]);

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
//         // console.error('Error fetching user data:', error);
//       }
//     };

//     fetchUser();
//   }, [navigate]);

//   const handlePaymentMethodChange = (e) => {
//     setPaymentMethod(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     if (!paymentMethod) {
//       setErrorMessage('Please select a payment method');
//       setLoading(false);
//       return;
//     }

//     const token = Cookies.get('token');
//     if (!token) {
//       setLoading(false);
//       navigate('/login');
//       return;
//     }

//     try {
//       const response = await axios.post(`/api/checkout/${product._id}`, { paymentMethod }, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.status === 200) {
//         const paymentDetails = response.data.paymentDetails; // Assuming response contains paymentDetails

//         if (paymentMethod === 'online') {
//           if (typeof window.Razorpay === 'undefined') {
//             setErrorMessage('Razorpay is not available.');
//             return;
//           }

//           const options = {
//             key: paymentDetails.key_id,
//             amount: totalAmount * 100, // Razorpay expects the amount in paise
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
//                   setSuccessMessage('Order placed successfully!');
//                   // Redirect to a success page or order history
//                   navigate('/order-history');
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
//         } else {
//           setSuccessMessage('Order placed successfully! (Cash on Delivery)');
//           // You can redirect or do other actions for COD
//         }
//       }
//     } catch (error) {
//       setErrorMessage('An error occurred. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div style={{ textAlign: 'center', paddingTop: '50px' }}>
//         <div className="spinner-border text-primary" role="status"></div>
//         <p>Processing...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container mt-4">
//       <h3>Checkout</h3>

//       <div className="order-summary">
//         <div className="product-details">
//           <h4>{product?.title}</h4>
//           <p>Price: ₹{product?.offerPrice}</p>
//           <p>Quantity:
//             <input
//               type="number"
//               value={quantity}
//               onChange={(e) => setQuantity(e.target.value)}
//               min="1"
//             />
//           </p>
//           <p>Total Amount: ₹{totalAmount}</p>
//         </div>

//         <form onSubmit={handleSubmit}>
//           <h4>Select Payment Method</h4>
//           <div>
//             <input
//               type="radio"
//               id="online"
//               name="paymentMethod"
//               value="online"
//               onChange={handlePaymentMethodChange}
//             />
//             <label htmlFor="online">Online Payment</label>
//           </div>
//           <div>
//             <input
//               type="radio"
//               id="cod"
//               name="paymentMethod"
//               value="cod"
//               onChange={handlePaymentMethodChange}
//             />
//             <label htmlFor="cod">Cash on Delivery</label>
//           </div>

//           <button type="submit" className="btn btn-primary" disabled={loading}>
//             {loading ? 'Processing...' : 'Place Order'}
//           </button>
//         </form>

//         {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
//         {successMessage && <div className="alert alert-success">{successMessage}</div>}
//       </div>
//     </div>
//   );
// };

// export default Buynow;



// /* global Razorpay */

// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import styled from 'styled-components';

// const Buynow = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const product = location.state?.product;
//   const [loading, setLoading] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [quantity, setQuantity] = useState(1);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     if (product) {
//       const calculatedAmount = product.offerPrice * quantity;
//       setTotalAmount(calculatedAmount); // Update total price based on quantity
//     }
//   }, [product, quantity]);

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
//         // console.error('Error fetching user data:', error);
//       }
//     };

//     fetchUser();
//   }, [navigate]);

//   const handlePaymentMethodChange = (e) => {
//     setPaymentMethod(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     if (!paymentMethod) {
//       setErrorMessage('Please select a payment method');
//       setLoading(false);
//       return;
//     }

//     const token = Cookies.get('token');
//     if (!token) {
//       setLoading(false);
//       navigate('/login');
//       return;
//     }

//     try {
//       const response = await axios.post(`/api/checkout/${product._id}`, { paymentMethod }, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.status === 200) {
//         const paymentDetails = response.data.paymentDetails;

//         if (paymentMethod === 'online') {
//           if (typeof window.Razorpay === 'undefined') {
//             setErrorMessage('Razorpay is not available.');
//             return;
//           }

//           const options = {
//             key: paymentDetails.key_id,
//             amount: totalAmount * 100, // Razorpay expects the amount in paise
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
//                   setSuccessMessage('Order placed successfully!');
//                   navigate('/order-history');
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
//         } else {
//           setSuccessMessage('Order placed successfully! (Cash on Delivery)');
//         }
//       }
//     } catch (error) {
//       setErrorMessage('An error occurred. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <LoadingContainer>
//         <div className="spinner-border text-primary" role="status"></div>
//         <p>Processing...</p>
//       </LoadingContainer>
//     );
//   }

//   return (
//     <Container>
//       <CheckoutCard>
//         <CheckoutTitle>Checkout</CheckoutTitle>

//         <OrderSummary>
//           <ProductDetails>
//             <h4>{product?.title}</h4>
//             <p><strong>Price:</strong> ₹{product?.offerPrice}</p>
//             <p><strong>Quantity:</strong>
//               <QuantityInput
//                 type="number"
//                 value={quantity}
//                 onChange={(e) => setQuantity(e.target.value)}
//                 min="1"
//               />
//             </p>
//             <p><strong>Total Amount:</strong> ₹{totalAmount}</p>
//           </ProductDetails>

//           <Form onSubmit={handleSubmit}>
//             <h4>Select Payment Method</h4>
//             <PaymentMethods>
//               <PaymentOption>
//                 <input
//                   type="radio"
//                   id="online"
//                   name="paymentMethod"
//                   value="online"
//                   onChange={handlePaymentMethodChange}
//                 />
//                 <label htmlFor="online">Online Payment</label>
//               </PaymentOption>
//               <PaymentOption>
//                 <input
//                   type="radio"
//                   id="cod"
//                   name="paymentMethod"
//                   value="cod"
//                   onChange={handlePaymentMethodChange}
//                 />
//                 <label htmlFor="cod">Cash on Delivery</label>
//               </PaymentOption>
//             </PaymentMethods>

//             <SubmitButton type="submit" disabled={loading}>
//               {loading ? 'Processing...' : 'Place Order'}
//             </SubmitButton>
//           </Form>

//           {errorMessage && <Alert className="alert-danger">{errorMessage}</Alert>}
//           {successMessage && <Alert className="alert-success">{successMessage}</Alert>}
//         </OrderSummary>
//       </CheckoutCard>
//     </Container>
//   );
// };

// export default Buynow;

// // Styled Components

// const Container = styled.div`
//   display: flex;
//   justify-content: center;
//   margin-top: 40px;
// `;

// const CheckoutCard = styled.div`
//   background-color: #fff;
//   padding: 20px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   border-radius: 8px;
//   width: 100%;
//   max-width: 600px;
// `;

// const CheckoutTitle = styled.h3`
//   font-size: 24px;
//   margin-bottom: 20px;
//   text-align: center;
// `;

// const OrderSummary = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// const ProductDetails = styled.div`
//   margin-bottom: 20px;
// `;

// const QuantityInput = styled.input`
//   width: 60px;
//   padding: 5px;
//   margin-left: 10px;
//   border: 1px solid #ddd;
//   border-radius: 4px;
// `;

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
// `;

// const PaymentMethods = styled.div`
//   margin-bottom: 20px;
// `;

// const PaymentOption = styled.div`
//   margin-bottom: 10px;
// `;

// const SubmitButton = styled.button`
//   width: 100%;
//   padding: 12px;
//   font-size: 16px;
//   background-color: #007bff;
//   color: white;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
  
//   &:disabled {
//     background-color: #ddd;
//   }
// `;

// const Alert = styled.div`
//   margin-top: 10px;
//   padding: 10px;
//   border-radius: 5px;
//   text-align: center;
// `;

// const LoadingContainer = styled.div`
//   text-align: center;
//   padding-top: 50px;
//   font-size: 20px;
// `;




// /* global Razorpay */


// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import styled from 'styled-components';

// const Buynow = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const product = location.state?.product;
//   const [loading, setLoading] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [quantity, setQuantity] = useState(1);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [user, setUser] = useState(null);

//   // Modal visibility states
//   const [showConfirmationModal, setShowConfirmationModal] = useState(false);
//   const [showSuccessModal, setShowSuccessModal] = useState(false);

//   useEffect(() => {
//     if (product) {
//       const calculatedAmount = product.offerPrice * quantity;
//       setTotalAmount(calculatedAmount); // Update total price based on quantity
//     }
//   }, [product, quantity]);

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
//         // Handle error fetching user data
//       }
//     };

//     fetchUser();
//   }, [navigate]);

//   const handlePaymentMethodChange = (e) => {
//     setPaymentMethod(e.target.value);
//     setShowConfirmationModal(true); // Show confirmation modal
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     if (!paymentMethod) {
//       setErrorMessage('Please select a payment method');
//       setLoading(false);
//       return;
//     }

//     const token = Cookies.get('token');
//     if (!token) {
//       setLoading(false);
//       navigate('/login');
//       return;
//     }

//     try {
//       const response = await axios.post(`/api/checkout`, {
//         paymentMethod,
//         type: 'buyNow',
//         productId: product._id
//       }, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.status === 200) {
//         const paymentDetails = response.data.paymentDetails;

//         if (paymentMethod === 'online') {
//           if (typeof window.Razorpay === 'undefined') {
//             setErrorMessage('Razorpay is not available.');
//             return;
//           }

//           const options = {
//             key: paymentDetails.key_id,
//             amount: totalAmount * 100, // Razorpay expects the amount in paise
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
//                   setSuccessMessage('Order placed successfully!');
//                   setShowSuccessModal(true); // Show success modal
//                   setTimeout(() => navigate('/order-history'), 2000); // Navigate after success message
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
//         } else {
//           setSuccessMessage('Order placed successfully! (Cash on Delivery)');
//           setShowSuccessModal(true); // Show success modal for COD
//           setTimeout(() => navigate('/order-details'), 2000); // Navigate after success message
//         }
//       }
//     } catch (error) {
//       setErrorMessage('An error occurred. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <LoadingContainer>
//         <div className="spinner-border text-primary" role="status"></div>
//         <p>Processing...</p>
//       </LoadingContainer>
//     );
//   }

//   return (
//     <Container>
//       <CheckoutCard>
//         <CheckoutTitle>Checkout</CheckoutTitle>

//         <OrderSummary>
//           <ProductDetails>
//             <h4>{product?.title}</h4>
//             <p><strong>Price:</strong> ₹{product?.offerPrice}</p>
//             <p><strong>Quantity:</strong>
//               <QuantityInput
//                 type="number"
//                 value={quantity}
//                 onChange={(e) => setQuantity(e.target.value)}
//                 min="1"
//               />
//             </p>
//             <p><strong>Total Amount:</strong> ₹{totalAmount}</p>
//           </ProductDetails>

//           <Form onSubmit={handleSubmit}>
//             <h4>Select Payment Method</h4>
//             <PaymentMethods>
//               <PaymentOption>
//                 <input
//                   type="radio"
//                   id="online"
//                   name="paymentMethod"
//                   value="online"
//                   onChange={handlePaymentMethodChange}
//                 />
//                 <label htmlFor="online">Online Payment</label>
//               </PaymentOption>
//               <PaymentOption>
//                 <input
//                   type="radio"
//                   id="cod"
//                   name="paymentMethod"
//                   value="cod"
//                   onChange={handlePaymentMethodChange}
//                 />
//                 <label htmlFor="cod">Cash on Delivery</label>
//               </PaymentOption>
//             </PaymentMethods>

//             <SubmitButton type="submit" disabled={loading}>
//               {loading ? 'Processing...' : 'Place Order'}
//             </SubmitButton>
//           </Form>

//           {errorMessage && <Alert className="alert-danger">{errorMessage}</Alert>}
//           {successMessage && <Alert className="alert-success">{successMessage}</Alert>}
//         </OrderSummary>
//       </CheckoutCard>

//       {/* Confirmation Modal */}
//       {showConfirmationModal && (
//         <ConfirmationModal>
//           <ModalContent>
//           <h2>Confirm Order</h2>
//             <p>Are you sure you want to proceed with {paymentMethod === 'online' ? 'Online Payment' : 'Cash on Delivery'}?</p>
//             <ModalButtons>
//               <CancelButton onClick={() => setShowConfirmationModal(false)}>Cancel</CancelButton>
//               <ConfirmButton onClick={handleSubmit}>Confirm</ConfirmButton>
//             </ModalButtons>
//           </ModalContent>
//         </ConfirmationModal>
//       )}

//       {/* Success Modal */}
//       {showSuccessModal && (
//         <SuccessModal>
//           <ModalContent>
//             <h4>Order Successfully Placed!</h4>
//             <p>Your order has been placed successfully.</p>
//             <ModalButtons>
//               <GoToOrderButton onClick={() => navigate('/order-details')}>Go to Order History</GoToOrderButton>
//             </ModalButtons>
//           </ModalContent>
//         </SuccessModal>
//       )}
//     </Container>
//   );
// };

// export default Buynow;

// // Styled Components
// const Container = styled.div`
//   display: flex;
//   justify-content: center;
//   margin-top: 40px;
// `;

// const CheckoutCard = styled.div`
//   background-color: #fff;
//   padding: 20px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   border-radius: 8px;
//   width: 100%;
//   max-width: 600px;
// `;

// const CheckoutTitle = styled.h3`
//   font-size: 24px;
//   margin-bottom: 20px;
//   text-align: center;
// `;

// const OrderSummary = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// const ProductDetails = styled.div`
//   margin-bottom: 20px;
// `;

// const QuantityInput = styled.input`
//   width: 60px;
//   padding: 5px;
//   margin-left: 10px;
//   border: 1px solid #ddd;
//   border-radius: 4px;
// `;

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
// `;

// const PaymentMethods = styled.div`
//   margin-bottom: 20px;
// `;

// const PaymentOption = styled.div`
//   margin-bottom: 10px;
// `;

// const SubmitButton = styled.button`
//   width: 100%;
//   padding: 12px;
//   font-size: 16px;
//   background-color: #007bff;
//   color: white;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
  
//   &:disabled {
//     background-color: #ddd;
//   }
// `;

// const Alert = styled.div`
//   margin-top: 10px;
//   padding: 10px;
//   border-radius: 5px;
//   text-align: center;
// `;

// const LoadingContainer = styled.div`
//   text-align: center;
//   padding-top: 50px;
//   font-size: 20px;
// `;

// const ConfirmationModal = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background: rgba(0, 0, 0, 0.5);
//   z-index: 1000;
// `;

// const SuccessModal = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background: rgba(0, 0, 0, 0.5);
//   z-index: 1000;
// `;

// const ModalContent = styled.div`
//   background-color: #fff;
//   padding: 30px;
//   border-radius: 8px;
//    maxWidth: 500px;
//   text-align: center;
//   box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
// `;

// const ModalButtons = styled.div`
//   display: flex;
//   justify-content: space-around;
//   margin-top: 20px;
// `;

// const CancelButton = styled.button`
//   background-color: #f44336;
//   color: white;
//   padding: 10px 20px;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
// `;

// const ConfirmButton = styled.button`
//   background-color: #4CAF50;
//   color: white;
//   padding: 10px 20px;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
// `;

// const GoToOrderButton = styled.button`
//   background-color: #007bff;
//   color: white;
  
//   padding: 10px 20px;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
// `;










// /* global Razorpay */

// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import styled from 'styled-components';

// const Buynow = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const product = location.state?.product;
//   const [loading, setLoading] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState('online');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [quantity, setQuantity] = useState(1);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [user, setUser] = useState(null);
//    const [isAddressCreated, setIsAddressCreated] = useState(false);
//     const [isAddressEditing, setIsAddressEditing] = useState(false);
//     const [addresses, setAddresses] = useState([]);
//     const [selectedAddressId, setSelectedAddressId] = useState(null);
//     const [isNewAddress, setIsNewAddress] = useState(false);
//       const [address, setAddress] = useState({
//         phoneNo: '',
//         address: '',
//         username: ''
//       });

//   useEffect(() => {
//     if (product) {
//       const calculatedAmount = product.offerPrice * quantity;
//       setTotalAmount(calculatedAmount); // Update total price based on quantity
//     }
//   }, [product, quantity]);

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
//         // Handle error fetching user data
//       }
//     };
//   }, [navigate]);


  
//   // Fetch cart items and addresses
//   const fetchCartAndAddresses = async () => {
//     const token = Cookies.get('token');
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     try {
//       const cartResponse = await axios.get('/api/viewcart', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
 

//       const addressResponse = await axios.get('/api/userget', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setAddresses(addressResponse.data.length > 0 ? addressResponse.data[0].items : []);
//     } catch (error) {
//       console.error('Error fetching cart or addresses:', error);
    
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle selecting an address
//   const handleSelectAddress = (addressId) => {
//     setSelectedAddressId(addressId);
//     const selectedAddress = addresses.find(item => item._id === addressId);
//     setAddress(selectedAddress);
//     setIsAddressEditing(false); // Hide edit mode after selection
//     setIsNewAddress(false); // It's an existing address now
//   };

//   // Handle adding a new address
//   const handleAddAddress = async () => {
//     const token = Cookies.get('token');
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     try {
//       const response = await axios.post('/api/create', address, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (response.data.delivery) {
//         setIsNewAddress(false); // Reset state after successful address creation
//         fetchCartAndAddresses();
//       }
//     } catch (error) {
//       console.error('Error adding address:', error);
//       alert('Failed to add address');
//     }
//   };

//   // Handle updating an existing address
//   const handleUpdateAddress = async () => {
//     const token = Cookies.get('token');
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     try {
//       const response = await axios.put('/api/delivery', { ...address, deliveryId: selectedAddressId }, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (response.data.delivery) {
//         fetchCartAndAddresses();
//         setIsAddressEditing(false);
//       }
//     } catch (error) {
//       console.error('Error updating address:', error);
//       alert('Failed to update address');
//     }
//   };

//   useEffect(() => {
//     fetchCartAndAddresses();
//   }, []);
  
//   const handlePaymentMethodChange = (method) => {
//     setPaymentMethod(method);  // Directly set the payment method
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
  
//     // Check if payment method is selected
//     if (!paymentMethod) {
//       setErrorMessage('Please select a payment method');
//       setLoading(false);
//       return;
//     }
  
//     // Check if delivery address is selected
//     if (!selectedAddressId) {
//       setErrorMessage('Please select a delivery address');
//       setLoading(false);
//       return;
//     }
  
//     // Check if user is logged in (token is available)
//     const token = Cookies.get('token');
//     if (!token) {
//       setLoading(false);
//       navigate('/login');
//       return;
//     }
  
//     // Log the selected product ID to verify it is correct
//     console.log('Product ID:', product._id);
//     console.log('Selected Address ID:', selectedAddressId);
  
//     try {
//       // Call checkout API endpoint
//       const response = await axios.post(
//         '/api/checkout',
//         {
//           paymentMethod,
//           type: 'buyNow',
//           productId: product._id,  // Make sure this is the correct product ID
//           selectedAddressId,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
  
//       // Handle response
//       if (response.status === 200) {
//         const paymentDetails = response.data.paymentDetails;
  
//         if (paymentMethod === 'online') {
//           // Razorpay payment handling
//           if (typeof window.Razorpay === 'undefined') {
//             setErrorMessage('Razorpay is not available.');
//             return;
//           }
  
//           const options = {
//             key: paymentDetails.key_id,
//             amount: totalAmount * 100, // Razorpay expects the amount in paise
//             currency: 'INR',
//             order_id: paymentDetails.razorpayOrderId,
//             handler: async (paymentResponse) => {
//               try {
//                 const confirmResponse = await axios.post(
//                   '/api/orders/confirm-payment',
//                   {
//                     razorpayOrderId: paymentDetails.razorpayOrderId,
//                     razorpayPaymentId: paymentResponse.razorpay_payment_id,
//                     razorpaySignature: paymentResponse.razorpay_signature,
//                   },
//                   {
//                     headers: { Authorization: `Bearer ${token}` },
//                   }
//                 );
  
//                 if (confirmResponse.status === 200) {
//                   setSuccessMessage('Order placed successfully!');
//                   setTimeout(() => navigate('/order-history'), 2000);
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
//         } else {
//           // Cash on Delivery
//           setSuccessMessage('Order placed successfully! (Cash on Delivery)');
//           setTimeout(() => navigate('/order-details'), 2000);
//         }
//       }
//     } catch (error) {
//       console.error('Error placing order:', error.response || error);
  
//       // Check if the error is a 404, which could indicate product not found
//       if (error.response && error.response.status === 404 && error.response.data.message === 'Product not found') {
//         setErrorMessage('The product you are trying to purchase could not be found. Please try again.');
//       } else {
//         setErrorMessage('An error occurred. Please try again.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   if (loading) {
//     return (
//       <LoadingContainer>
//         <div className="spinner-border text-primary" role="status"></div>
//         <p>Processing...</p>
//       </LoadingContainer>
//     );
//   }

//   return (
//     <Container>
//       <CheckoutCard>
//         <CheckoutTitle>Checkout</CheckoutTitle>

//         <MainContent>
//           {/* Left side: Order Summary */}
//           <OrderSummary>
//             <ProductDetails>
//               <h4>{product?.title}</h4>
//               <p><strong>Price:</strong> ₹{product?.offerPrice}</p>
//               <p><strong>Quantity:</strong>
//                 <QuantityInput
//                   type="number"
//                   value={quantity}
//                   onChange={(e) => setQuantity(e.target.value)}
//                   min="1"
//                 />
//               </p>
//               <p><strong>Total Amount:</strong> ₹{totalAmount}</p>
//             </ProductDetails>
//           </OrderSummary>

//           {/* Right side: Payment Method & Address */}
//           <RightPanel>
//             <Form onSubmit={handleSubmit}>
//               <h4>Select Payment Method</h4>
//               <PaymentMethods>
//       <PaymentOption>
//         <PaymentButton
//           selected={paymentMethod === 'online'}
//           onClick={() => handlePaymentMethodChange('online')}
//         >
//           Online Payment
//         </PaymentButton>
//       </PaymentOption>
//       <PaymentOption>
//         <PaymentButton
//           selected={paymentMethod === 'cod'}
//           onClick={() => handlePaymentMethodChange('cod')}
//         >
//           Cash on Delivery
//         </PaymentButton>
//       </PaymentOption>
//     </PaymentMethods>

//               <div className="delivery-address">
//           <h4>Delivery Address</h4>

//           {addresses.length > 0 ? (
//             <div>
//               {addresses.map((addressItem) => (
//               <div key={addressItem._id} className="address-item">
//               <div
//                 className={`address-option ${selectedAddressId === addressItem._id ? 'selected' : ''}`}
//                 onClick={() => handleSelectAddress(addressItem._id)}
//               >
//                 <span className="address-text">
//                   {addressItem.username} - {addressItem.phoneNo} - {addressItem.address}
//                 </span>
//               </div>
//             </div>
            
//               ))}
//             </div>
//           ) : (
//             <p>No addresses found. Please add one.</p>
//           )}

//           {/* Show "Edit Address" button only when an address is selected */}
//           {selectedAddressId && !isAddressEditing && !isNewAddress && (
//             <button
//               className="address-button mt-2"
//               onClick={() => setIsAddressEditing(true)}
//             >
//               Edit Address
//             </button>
//           )}
          

//           {/* Address Form - Either Add New or Edit Existing */}
//           {(isNewAddress || isAddressEditing) && (
//             <div className="address-form">
//               <input
//                 type="text"
//                 placeholder="Enter Name"
//                 value={address.username}
//                 onChange={(e) => setAddress({ ...address, username: e.target.value })}
//               />
//               <input
//                 type="text"
//                 placeholder="Enter Phone Number"
//                 value={address.phoneNo}
//                 onChange={(e) => setAddress({ ...address, phoneNo: e.target.value })}
//               />
//               <textarea
//                 placeholder="Enter Address"
//                 value={address.address}
//                 onChange={(e) => setAddress({ ...address, address: e.target.value })}
//               />
//               <button onClick={isNewAddress ? handleAddAddress : handleUpdateAddress} 
//                className="address-button mt-2">
//                 {isNewAddress ? 'Add Address' : 'Update Address'}
//               </button>
//             </div>
//           )}

//           {/* Show "Add New Address" button only if not editing */}
//           {!isNewAddress && !isAddressEditing && !selectedAddressId && addresses.length < 5 && (
//   <button
//     className="address-button mt-2"
//     onClick={() => setIsNewAddress(true)}
//   >
//     Add New Address
//   </button>
// )}


          
//         </div>

//               <SubmitButton type="submit" disabled={loading} className='mt-2'>
//                 {loading ? 'Processing...' : 'Place Order'}
//               </SubmitButton>
//             </Form>

//             {errorMessage && <Alert className="alert-danger">{errorMessage}</Alert>}
//             {successMessage && <Alert className="alert-success">{successMessage}</Alert>}
//           </RightPanel>
//         </MainContent>
//       </CheckoutCard>
//     </Container>
//   );
// };

// export default Buynow;

// // Styled Components
// const Container = styled.div`
//   display: flex;
//   justify-content: center;
//   margin-top: 40px;
// `;

// const CheckoutCard = styled.div`
//   background-color: #fff;
//   padding: 20px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   border-radius: 8px;
//   width: 100%;
//   max-width: 900px;
// `;

// const CheckoutTitle = styled.h3`
//   font-size: 24px;
//   margin-bottom: 20px;
//   text-align: center;
// `;

// const MainContent = styled.div`
//   display: flex;
//   justify-content: space-between;
// `;

// const OrderSummary = styled.div`
//   flex: 1;
//   margin-right: 20px;
// `;

// const ProductDetails = styled.div`
//   margin-bottom: 20px;
// `;

// const QuantityInput = styled.input`
//   width: 60px;
//   padding: 5px;
//   margin-left: 10px;
//   border: 1px solid #ddd;
//   border-radius: 4px;
// `;

// const RightPanel = styled.div`
//   flex: 1;
// `;

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
// `;

// const InputField = styled.input`
//   padding: 10px;
//   margin: 10px 0;
//   border: 1px solid #ddd;
//   border-radius: 4px;
// `;

// const SubmitButton = styled.button`
//   width: 100%;
//   padding: 12px;
//   font-size: 16px;
//   background-color: #007bff;
//   color: white;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;

//   &:disabled {
//     background-color: #ddd;
//   }
// `;

// const Alert = styled.div`
//   margin-top: 10px;
//   padding: 10px;
//   border-radius: 5px;
//   text-align: center;
// `;

// const LoadingContainer = styled.div`
//   text-align: center;
//   padding-top: 50px;
//   font-size: 20px;
// `;


// const PaymentMethods = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// const PaymentOption = styled.div`
//   margin: 10px 0;
// `;

// const PaymentButton = styled.button`
//   padding: 10px 20px;
//   background-color: ${(props) => (props.selected ? '#4CAF50' : '#f1f1f1')};
//   color: ${(props) => (props.selected ? 'white' : '#000')};
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   transition: background-color 0.3s;

//   &:hover {
//     background-color: ${(props) => (props.selected ? '#45a049' : '#ddd')};
//   }
// `;

   







/* global Razorpay */

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import styled from 'styled-components';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Buynow = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const product = location.state?.product;
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);
  const [user, setUser] = useState(null);
  const [isAddressCreated, setIsAddressCreated] = useState(false);
  const [isAddressEditing, setIsAddressEditing] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isNewAddress, setIsNewAddress] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false); // For confirmation modal
  const [showSuccessModal, setShowSuccessModal] = useState(false); // For success modal
  const [address, setAddress] = useState({
    phoneNo: '',
    address: '',
    username: ''
  });

  useEffect(() => {
    if (product) {
      const calculatedAmount = product.offerPrice * quantity;
      setTotalAmount(calculatedAmount); // Update total price based on quantity
    }
  }, [product, quantity]);

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false); // Close success modal
    navigate('/order-details'); // Redirect to order history
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false); // Close confirmation modal
  };

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
        // Handle error fetching user data
      }
    };

    fetchUser();
  }, [navigate]);

  // Fetch cart items and addresses
  const fetchCartAndAddresses = async () => {
    const token = Cookies.get('token');
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const addressResponse = await axios.get('/api/userget', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAddresses(addressResponse.data.length > 0 ? addressResponse.data[0].items : []);
    } catch (error) {
      console.error('Error fetching cart or addresses:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle selecting an address
  const handleSelectAddress = (addressId) => {
    setSelectedAddressId(addressId);
    const selectedAddress = addresses.find(item => item._id === addressId);
    setAddress(selectedAddress);
    setIsAddressEditing(false); // Hide edit mode after selection
    setIsNewAddress(false); // It's an existing address now
  };

  // Handle adding a new address
  const handleAddAddress = async () => {
    const token = Cookies.get('token');
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post('/api/create', address, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.delivery) {
        setIsNewAddress(false); // Reset state after successful address creation
        fetchCartAndAddresses();
      }
    } catch (error) {
      console.error('Error adding address:', error);
      alert('Failed to add address');
    }
  };

  // Handle updating an existing address
  const handleUpdateAddress = async () => {
    const token = Cookies.get('token');
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await axios.put('/api/delivery', { ...address, deliveryId: selectedAddressId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.delivery) {
        fetchCartAndAddresses();
        setIsAddressEditing(false);
      }
    } catch (error) {
      console.error('Error updating address:', error);
      alert('Failed to update address');
    }
  };

  useEffect(() => {
    fetchCartAndAddresses();
  }, []);

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);  
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);

    if (!paymentMethod) {
      setErrorMessage('Please select a payment method');
      setLoading(false);
      return;
    }
  

    // Check if delivery address is selected
    if (!selectedAddressId) {
      setErrorMessage('Please select a delivery address');
      setLoading(false);
      return;
    }

    // Check if user is logged in (token is available)
    const token = Cookies.get('token');
    if (!token) {
      setLoading(false);
      navigate('/login');
      return;
    }

    setShowConfirmationModal(true); // Show confirmation modal before submitting the order
  };

  const confirmOrder = async () => {
    setShowConfirmationModal(false); // Close confirmation modal
    setLoading(true); // Start loading for final order placement
  
    try {
      // Call checkout API endpoint
      const response = await axios.post(
        '/api/checkout',
        {
          paymentMethod,
          type: 'buyNow',
          productId: product._id, // Make sure this is the correct product ID
          selectedAddressId,       // Ensure this is passed correctly
          deliveryId: selectedAddressId, // Add the missing deliveryId here
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        }
      );
  
      // Handle response
      if (response.status === 200) {
        const paymentDetails = response.data.paymentDetails;
  
        if (paymentMethod === 'online') {
          // Razorpay payment handling
          if (typeof window.Razorpay === 'undefined') {
            setErrorMessage('Razorpay is not available.');
            return;
          }
  
          const options = {
            key: paymentDetails.key_id,
            amount: totalAmount * 100, // Razorpay expects the amount in paise
            currency: 'INR',
            order_id: paymentDetails.razorpayOrderId,
            handler: async (paymentResponse) => {
              try {
                const confirmResponse = await axios.post(
                  '/api/orders/confirm-payment',
                  {
                    razorpayOrderId: paymentDetails.razorpayOrderId,
                    razorpayPaymentId: paymentResponse.razorpay_payment_id,
                    razorpaySignature: paymentResponse.razorpay_signature,
                  },
                  {
                    headers: { Authorization: `Bearer ${Cookies.get('token')}` },
                  }
                );
  
                if (confirmResponse.status === 200) {
                  setSuccessMessage('Order placed successfully!');
                  setShowSuccessModal(true);
                } else {
                  setErrorMessage('Payment verification failed.');
                  console.log('Payment verification failed');
                  // Show failure modal when verification fails
                }
              } catch (error) {
                console.error('Error during payment confirmation:', error);
                setErrorMessage('Payment verification failed. Please try again.');
              }
            },
            prefill: {
              name: user?.name || 'John Doe',
              email: user?.email || 'john.doe@example.com',
              contact: user?.contact || '1234567890',
            },
            modal: {
              ondismiss: async () => {
                // Handle Razorpay window close event
                console.log('Razorpay payment window closed without completing the payment');
                try {
                  const confirmResponse = await axios.post(
                    '/api/orders/confirm-payment',
                    {
                      razorpayOrderId: paymentDetails.razorpayOrderId,
                      razorpayPaymentId: '', // No payment ID
                      razorpaySignature: '', // No signature
                      status: 'Failed', // Mark the order as failed
                    },
                    {
                      headers: { Authorization: `Bearer ${Cookies.get('token')}` },
                    }
                  );
                  if (confirmResponse.status === 200) {
                    setErrorMessage('Payment was not completed. Order has been marked as failed.');
                  }
                } catch (error) {
                  console.error('Error while confirming payment failure:', error);
                  setErrorMessage(' order is failed.');
                }
              },
            },
          };
  
          const rzp1 = new window.Razorpay(options);
          rzp1.open();
  
          rzp1.on('payment.failed', (paymentFailureResponse) => {
            // If payment failed due to Razorpay issue, show the failure message
            console.error('Razorpay Payment Failed:', paymentFailureResponse.error);
            setErrorMessage('Payment failed. Please try again.');
          });
  
        } else {
          // Cash on Delivery
          setSuccessMessage('Order placed successfully! (Cash on Delivery)');
          setShowSuccessModal(true);
        }
      }
    } catch (error) {
      console.error('Error placing order:', error.response || error);
  
      // Handle Razorpay API errors
      if (error.response && error.response.status === 500) {
        setErrorMessage('Internal server error occurred. Please try again later.');
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
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

  return (
    <Container>
      <CheckoutCard>
        <CheckoutTitle>Checkout</CheckoutTitle>

        <MainContent>
          {/* Left side: Order Summary */}
          <OrderSummary>
            <ProductDetails>
              <h4>{product?.title}</h4>
              <p><strong>Price:</strong> ₹{product?.offerPrice}</p>
              <p><strong>Quantity:</strong>
                <QuantityInput
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min="1"
                />
              </p>
              <p><strong>Total Amount:</strong> ₹{totalAmount}</p>
            </ProductDetails>
          </OrderSummary>

          {/* Right side: Payment Method & Address */}
          <RightPanel>
            <Form onSubmit={handleSubmit}>
              
              <PaymentMethods>
 
              <Wrapper>
      <Label>Choose Payment Method</Label>
      <StyledSelect value={paymentMethod} onChange={(e) => handlePaymentMethodChange(e.target.value)}>
        <option value="online">Online Payment</option>
        <option value="cod">Cash on Delivery</option>
      </StyledSelect>
    </Wrapper>
</PaymentMethods>



              <div className="delivery-address">
                <h4>Delivery Address</h4>

                {addresses.length > 0 ? (
                  <div>
                    {addresses.map((addressItem) => (
                      <div key={addressItem._id} className="address-item">
                        <div
                          className={`address-option ${selectedAddressId === addressItem._id ? 'selected' : ''}`}
                          onClick={() => handleSelectAddress(addressItem._id)}
                        >
                          <span className="address-text">
                            {addressItem.username} - {addressItem.phoneNo} - {addressItem.address}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No addresses found. Please add one.</p>
                )}

                {/* Show "Add New Address" button */}
                {!isNewAddress && !isAddressEditing && !selectedAddressId && addresses.length < 5 && (
                  <button
                    className="address-button mt-2"
                    onClick={() => setIsNewAddress(true)}
                  >
                    Add New Address
                  </button>
                )}
                  {/* Show "Edit Address" button only when an address is selected */}
          {selectedAddressId && !isAddressEditing && !isNewAddress && (
            <button
              className="address-button mt-2"
              onClick={() => setIsAddressEditing(true)}
            >
              Edit Address
            </button>
          )}
       
              </div>

              <SubmitButton type="submit" disabled={loading || isAddressEditing} className='mt-2'>
                {loading ? 'Processing...' : 'Place Order'}
              </SubmitButton>
            </Form>
     {/* Address Form - Either Add New or Edit Existing */}
     {(isNewAddress || isAddressEditing) && (
            <div className="address-form">
              <input
                type="text"
                placeholder="Enter Name"
                value={address.username}
                onChange={(e) => setAddress({ ...address, username: e.target.value })}
              />
              <input
                type="text"
                placeholder="Enter Phone Number"
                value={address.phoneNo}
                onChange={(e) => setAddress({ ...address, phoneNo: e.target.value })}
              />
              <textarea
                placeholder="Enter Address"
                value={address.address}
                onChange={(e) => setAddress({ ...address, address: e.target.value })}
              />
              <button onClick={isNewAddress ? handleAddAddress : handleUpdateAddress} 
               className="address-button mt-2">
                {isNewAddress ? 'Add Address' : 'Update Address'}
              </button>
            </div>
          )}
            {errorMessage && <Alert className="alert-danger">{errorMessage}</Alert>}
          </RightPanel>
        </MainContent>
      </CheckoutCard>

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <h2>Confirm Order</h2>
            <p>Are you sure you want to place the order with {paymentMethod === 'online' ? 'Online Payment' : 'Cash on Delivery'}?</p>
            <div>
              <button onClick={confirmOrder} style={confirmButtonStyle}>Confirm</button>
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
            <p>Your order has been placed successfully.</p>
            <button onClick={handleCloseSuccessModal} style={closeButtonStyle}>Close</button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Buynow;

// Styled Components
const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

const CheckoutCard = styled.div`
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 100%;
  max-width: 900px;
`;

const CheckoutTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
`;

const MainContent = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;


const OrderSummary = styled.div`
  flex: 1;
  margin-right: 20px;
`;

const ProductDetails = styled.div`
  margin-bottom: 20px;
`;

const QuantityInput = styled.input`
  width: 60px;
  padding: 5px;
  margin-left: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const RightPanel = styled.div`
  flex: 1;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputField = styled.input`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    background-color: #ddd;
  }
`;

const Alert = styled.div`
  margin-top: 10px;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding-top: 50px;
  font-size: 20px;
`;


const PaymentMethods = styled.div`
  display: flex;
  flex-direction: column;
`;

   
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

const Wrapper = styled.div`
  width: 300px;

  padding: 20px;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Label = styled.label`
  display: block;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
  color: #333;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  outline: none;
  appearance: none;
  background-color: #fff;
  color: #333;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    border-color: #007bff;
  }

  &:focus {
    border-color: #0056b3;
    box-shadow: 0 0 5px rgba(0, 91, 179, 0.4);
  }

  option {
    padding: 10px;
  }
`;