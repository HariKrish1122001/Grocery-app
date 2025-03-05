

// // import React, { useState, useEffect } from 'react';
// // import { useParams, useLocation, Link } from 'react-router-dom';
// // import axios from 'axios';
// // import Cookies from 'js-cookie';

// // const OrderDetailPage = () => {
// //     const { orderId } = useParams();
// //     const location = useLocation();
// //     const [orderDetails, setOrderDetails] = useState(null);
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState(null);
// //     const [isCanceling, setIsCanceling] = useState(false);
// //     const [progressWidth, setProgressWidth] = useState(0);

// //     const formatPrice = (price) => {
// //         return new Intl.NumberFormat('en-IN', {
// //             style: 'currency',
// //             currency: 'INR',
// //         }).format(price);
// //     };

// //     const fetchOrderDetails = async () => {
// //         try {
// //             const token = Cookies.get('token');
// //             if (!token) {
// //                 setError('Token not found. Please log in.');
// //                 setLoading(false);
// //                 return;
// //             }

// //             const response = await axios.get('/api/orders/history', {
// //                 headers: {
// //                     Authorization: `Bearer ${token}`,
// //                 },
// //             });

// //             const selectedOrder = response.data.orders.find(
// //                 (order) => order.orderId === orderId
// //             );

// //             if (selectedOrder) {
// //                 setOrderDetails(selectedOrder);
// //                 setLoading(false);
// //             } else {
// //                 setError('Order not found.');
// //                 setLoading(false);
// //             }
// //         } catch (err) {
// //             setError('Something went wrong. Please try again.');
// //             setLoading(false);
// //         }
// //     };

// //     const handleRetry = () => {
// //         setError(null);
// //         setLoading(true);
// //         fetchOrderDetails();
// //     };

// //     useEffect(() => {
// //         if (location.state?.orders) {
// //             const selectedOrder = location.state.orders.find(
// //                 (order) => order.orderId === orderId
// //             );
// //             if (selectedOrder) {
// //                 setOrderDetails(selectedOrder);
// //                 setLoading(false);
// //             } else {
// //                 setError('Order not found.');
// //                 setLoading(false);
// //             }
// //         } else {
// //             fetchOrderDetails();
// //         }
// //     }, [orderId, location.state?.orders]);

// //     const handleCancelOrder = async () => {
// //         setIsCanceling(true);
// //         try {
// //             const token = Cookies.get('token');
// //             if (!token) {
// //                 setError('Token not found. Please log in.');
// //                 setIsCanceling(false);
// //                 return;
// //             }

// //             const response = await axios.delete('/api/orders/cancel', {
// //                 headers: {
// //                     Authorization: `Bearer ${token}`,
// //                 },
// //                 data: { orderId },
// //             });

// //             if (response.status === 200) {
// //                 setOrderDetails({ ...orderDetails, status: 'Cancelled' });
// //                 setIsCanceling(false);
// //             }
// //         } catch (err) {
// //             setError('Error cancelling the order. Please try again.');
// //             setIsCanceling(false);
// //         }
// //     };

// //     const handleDownloadInvoice = async () => {
// //         try {
// //             const token = Cookies.get('token');
// //             if (!token) {
// //                 setError('Token not found. Please log in.');
// //                 return;
// //             }

// //             const response = await axios.get(`/api/order/invoice/${orderId}`, {
// //                 headers: {
// //                     Authorization: `Bearer ${token}`,
// //                 },
// //                 responseType: 'blob',
// //             });

// //             const url = window.URL.createObjectURL(new Blob([response.data]));
// //             const link = document.createElement('a');
// //             link.href = url;
// //             link.setAttribute('download', `invoice_${orderId}.pdf`);
// //             document.body.appendChild(link);
// //             link.click();
// //             document.body.removeChild(link);
// //         } catch (err) {
// //             setError('Error downloading the invoice. Please try again.');
// //         }
// //     };

// //     const statusSteps = orderDetails?.status === 'Cancelled'
// //         ? ['Placed', 'Cancelled']
// //         : ['Placed', 'Shipped', 'Delivered'];

// //     const currentStatusIndex = statusSteps.indexOf(orderDetails?.status);

// //     useEffect(() => {
// //         if (currentStatusIndex !== -1) {
// //             setTimeout(() => {
// //                 setProgressWidth((currentStatusIndex / (statusSteps.length - 1)) * 100);
// //             }, 1000);
// //         }
// //     }, [currentStatusIndex, statusSteps.length]);

// //     if (loading) {
// //         return (
// //             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
// //                 <div style={{ border: '8px solid #f3f3f3', borderTop: '8px solid #fff', borderRadius: '50%', width: '50px', height: '50px', animation: 'spin 1s linear infinite' }}></div>
// //                 <style>
// //                     {
// //                         `@keyframes spin {
// //                             0% { transform: rotate(0deg); }
// //                             100% { transform: rotate(360deg); }
// //                         }`
// //                     }
// //                 </style>
// //             </div>
// //         );
// //     }

// //     return (
// //         <div>
// //             <h1 style={{ textAlign: 'center' }}>Order Details</h1>

// //             {/* Status with Circle Dots and Progress Bar */}
// //             <div style={{ textAlign: 'center', marginBottom: '20px' }} className='container mt-5'>
// //                 {/* Circle Indicators and Progress Bar */}
// //                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
// //                     {statusSteps.map((status, index) => {
// //                         const isCompleted = index <= currentStatusIndex;
// //                         const isCancelled = status === 'Cancelled';
// //                         return (
// //                             <div key={index} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }} >
// //                                 {/* Circle Indicators */}
// //                                 <div
// //                                     style={{
// //                                         width: '20px',
// //                                         height: '20px',
// //                                         borderRadius: '50%',
// //                                         backgroundColor: isCancelled ? 'red' : isCompleted ? '#4caf50' : '#bbb',
// //                                         color: 'white',
// //                                         display: 'flex',
// //                                         alignItems: 'center',
// //                                         justifyContent: 'center',
// //                                         fontSize: '14px',
// //                                         fontWeight: 'bold',
// //                                         zIndex: 2,
// //                                     }}
// //                                 />
// //                             </div>
// //                         );
// //                     })}

// //                     {/* Progress Bar */}
// //                     <div style={{ position: 'absolute', top: '50%', left: '1%', right: '1%', height: '4px', backgroundColor: '#ddd', borderRadius: '10px', zIndex: 1 }}>
// //                         <div
// //                             style={{
// //                                 width: `${progressWidth}%`,
// //                                 height: '100%',
// //                                 backgroundColor: orderDetails?.status === 'Cancelled' ? 'red' : '#4caf50',
// //                                 borderRadius: '10px',
// //                                 transition: 'width 2s',
// //                             }}
// //                         />
// //                     </div>
// //                 </div>

// //                 {/* Status Steps Below the Progress Bar */}
// //                 <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
// //                     {statusSteps.map((status, index) => (
// //                         <span
// //                             key={index}
// //                             style={{
// //                                 fontWeight: index <= currentStatusIndex ? 'bold' : 'normal',
// //                                 color: index <= currentStatusIndex ? '#4caf50' : '#bbb',
// //                             }}
// //                         >
// //                             {status}
// //                         </span>
// //                     ))}
// //                 </div>
// //             </div>

// //             {/* Order Details */}
// //             <div className='container'>
// //                 <h4>Order ID: {orderDetails?.orderId}</h4>
// //                 <h3>Items in this Order:</h3>
// //                 <div
// //                     style={{
// //                         display: 'grid',
// //                         gridTemplateColumns: 'repeat(4, 1fr)',
// //                         gap: '16px',
// //                         marginBottom: '20px',
// //                     }}
// //                 >
// //                     {orderDetails?.items.map((item, index) => (
// //                         <div key={index} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '16px', textAlign: 'center', backgroundColor: '#fff', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
// //                             <img
// //                                 src={item.productImage}
// //                                 alt={item.productTitle}
// //                                 style={{
// //                                     width: '100%',
// //                                     height: 'auto',
// //                                     marginBottom: '12px',
// //                                     borderRadius: '4px',
// //                                 }}
// //                             />
// //                             <p style={{ fontWeight: 'bold' }}>{item.productTitle}</p>
// //                             <p>Quantity: {item.quantity}</p>
// //                             <p>Price: {formatPrice(item.offerPrice)}</p>
// //                         </div>
// //                     ))}
// //                 </div>
// //             </div>

// //             <div style={{ textAlign: 'center', marginTop: '20px' }} className='mb-1 mt-5'>
// //                 {/* Cancel Button */}
// //                 {orderDetails?.status === 'Placed' && (
// //                     <button
// //                         onClick={handleCancelOrder}
// //                         disabled={isCanceling}
// //                         style={{
// //                             padding: '10px 20px',
// //                             fontSize: '16px',
// //                             fontWeight: 'bold',
// //                             color: 'white',
// //                             backgroundColor: '#f44336',
// //                             border: 'none',
// //                             borderRadius: '8px',
// //                             cursor: 'pointer',
// //                             transition: 'background-color 0.3s ease, transform 0.3s ease',
// //                             width: '200px',
// //                             marginBottom: '10px',
// //                         }}
// //                     >
// //                         {isCanceling ? (
// //                             <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
// //                                 <div className="spinner" style={{ width: '20px', height: '20px', marginRight: '10px' }}></div> {/* Spinner */}
// //                                 Canceling...
// //                             </span>
// //                         ) : (
// //                             'Cancel Order'
// //                         )}
// //                     </button>
// //                 )}

// //                 {/* Invoice Download Button */}
// //                 <div style={{ marginTop: '10px' }} className='mt-2'>
// //                     <button
// //                         onClick={handleDownloadInvoice}
// //                         style={{
// //                             padding: '10px 20px',
// //                             fontSize: '16px',
// //                             fontWeight: 'bold',
// //                             color: 'white',
// //                             backgroundColor: '#1b7b16',
// //                             border: 'none',
// //                             borderRadius: '8px',
// //                             cursor: 'pointer',
// //                             transition: 'background-color 0.3s ease, transform 0.3s ease',
// //                             width: '200px',
// //                             marginBottom: '10px',
// //                         }}
// //                     >
// //                         Download Invoice
// //                     </button>
// //                 </div>

// //                 {/* Back to Order History Link */}
// //                 <div style={{ marginTop: '10px' }}>
// //                     <Link
// //                         to="/order-details"
// //                         style={{
// //                             color: '#2196f3',
// //                             fontSize: '16px',
// //                             fontWeight: 'bold',
// //                             textDecoration: 'none',
// //                             transition: 'color 0.3s ease',
// //                         }}
// //                         onMouseOver={(e) => e.target.style.color = '#1e88e5'}
// //                         onMouseOut={(e) => e.target.style.color = '#2196f3'}
// //                     >
// //                         Back to Order History
// //                     </Link>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default OrderDetailPage;



// import React, { useState, useEffect } from 'react';
// import { useParams, useLocation, Link } from 'react-router-dom';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import { FaCheckCircle } from 'react-icons/fa';

// const OrderDetailPage = () => {
//     const { orderId } = useParams();
//     const location = useLocation();
//     const [orderDetails, setOrderDetails] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [isCanceling, setIsCanceling] = useState(false);
//     const [progressWidth, setProgressWidth] = useState(0);
//     const [showModal, setShowModal] = useState(false); // Modal visibility
//     const [successMessage, setSuccessMessage] = useState(''); // Success message

//     const formatPrice = (price) => {
//         return new Intl.NumberFormat('en-IN', {
//             style: 'currency',
//             currency: 'INR',
//         }).format(price);
//     };

//     const fetchOrderDetails = async () => {
//         try {
//             const token = Cookies.get('token');
//             if (!token) {
//                 setError('Token not found. Please log in.');
//                 setLoading(false);
//                 return;
//             }

//             const response = await axios.get('/api/orders/history', {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });

//             const selectedOrder = response.data.orders.find(
//                 (order) => order.orderId === orderId
//             );

//             if (selectedOrder) {
//                 setOrderDetails(selectedOrder);
//                 setLoading(false);
//             } else {
//                 setError('Order not found.');
//                 setLoading(false);
//             }
//         } catch (err) {
//             setError('Something went wrong. Please try again.');
//             setLoading(false);
//         }
//     };

//     const handleRetry = () => {
//         setError(null);
//         setLoading(true);
//         fetchOrderDetails();
//     };

//     useEffect(() => {
//         if (location.state?.orders) {
//             const selectedOrder = location.state.orders.find(
//                 (order) => order.orderId === orderId
//             );
//             if (selectedOrder) {
//                 setOrderDetails(selectedOrder);
//                 setLoading(false);
//             } else {
//                 setError('Order not found.');
//                 setLoading(false);
//             }
//         } else {
//             fetchOrderDetails();
//         }
//     }, [orderId, location.state?.orders]);

//     const handleCancelOrder = async () => {
//         setIsCanceling(true);
//         try {
//             const token = Cookies.get('token');
//             if (!token) {
//                 setError('Token not found. Please log in.');
//                 setIsCanceling(false);
//                 return;
//             }

//             const response = await axios.delete('/api/orders/cancel', {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//                 data: { orderId },
//             });

//             if (response.status === 200) {
//                 setOrderDetails({ ...orderDetails, status: 'Cancelled' });
//                 setIsCanceling(false);
//                 setSuccessMessage('Your order has been canceled successfully!');
//                 setShowModal(true); // Show modal on successful cancellation
//             }
//         } catch (err) {
//             setError('Error cancelling the order. Please try again.');
//             setIsCanceling(false);
//         }
//     };

//     const handleDownloadInvoice = async () => {
//         try {
//             const token = Cookies.get('token');
//             if (!token) {
//                 setError('Token not found. Please log in.');
//                 return;
//             }

//             const response = await axios.get(`/api/order/invoice/${orderId}`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//                 responseType: 'blob',
//             });

//             const url = window.URL.createObjectURL(new Blob([response.data]));
//             const link = document.createElement('a');
//             link.href = url;
//             link.setAttribute('download', `invoice_${orderId}.pdf`);
//             document.body.appendChild(link);
//             link.click();
//             document.body.removeChild(link);
//         } catch (err) {
//             setError('Error downloading the invoice. Please try again.');
//         }
//     };

//     const statusSteps = orderDetails?.status === 'Cancelled'
//         ? ['Placed', 'Cancelled']
//         : ['Placed', 'Shipped', 'Delivered'];

//     const currentStatusIndex = statusSteps.indexOf(orderDetails?.status);

//     useEffect(() => {
//         if (currentStatusIndex !== -1) {
//             setTimeout(() => {
//                 setProgressWidth((currentStatusIndex / (statusSteps.length - 1)) * 100);
//             }, 1000);
//         }
//     }, [currentStatusIndex, statusSteps.length]);

//     // Modal Close Handler
//     const handleCloseModal = () => {
//         setShowModal(false);
//     };

//     if (loading) {
//         return (
//             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//                 <div style={{ border: '8px solid #f3f3f3', borderTop: '8px solid #fff', borderRadius: '50%', width: '50px', height: '50px', animation: 'spin 1s linear infinite' }}></div>
//                 <style>
//                     {
//                         `@keyframes spin {
//                             0% { transform: rotate(0deg); }
//                             100% { transform: rotate(360deg); }
//                         }`
//                     }
//                 </style>
//             </div>
//         );
//     }

//     return (
//         <div>
//             <h1 style={{ textAlign: 'center' }}>Order Details</h1>

//             {/* Status with Circle Dots and Progress Bar */}
//             <div style={{ textAlign: 'center', marginBottom: '20px' }} className='container mt-5'>
//                 {/* Circle Indicators and Progress Bar */}
//                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
//                     {statusSteps.map((status, index) => {
//                         const isCompleted = index <= currentStatusIndex;
//                         const isCancelled = status === 'Cancelled';
//                         return (
//                             <div key={index} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }} >
//                                 {/* Circle Indicators */}
//                                 <div
//                                     style={{
//                                         width: '20px',
//                                         height: '20px',
//                                         borderRadius: '50%',
//                                         backgroundColor: isCancelled ? 'red' : isCompleted ? '#4caf50' : '#bbb',
//                                         color: 'white',
//                                         display: 'flex',
//                                         alignItems: 'center',
//                                         justifyContent: 'center',
//                                         fontSize: '14px',
//                                         fontWeight: 'bold',
//                                         zIndex: 2,
//                                     }}
//                                 />
//                             </div>
//                         );
//                     })}

//                     {/* Progress Bar */}
//                     <div style={{ position: 'absolute', top: '50%', left: '1%', right: '1%', height: '4px', backgroundColor: '#ddd', borderRadius: '10px', zIndex: 1 }}>
//                         <div
//                             style={{
//                                 width: `${progressWidth}%`,
//                                 height: '100%',
//                                 backgroundColor: orderDetails?.status === 'Cancelled' ? 'red' : '#4caf50',
//                                 borderRadius: '10px',
//                                 transition: 'width 2s',
//                             }}
//                         />
//                     </div>
//                 </div>

//                 {/* Status Steps Below the Progress Bar */}
//                 <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
//                     {statusSteps.map((status, index) => (
//                         <span
//                             key={index}
//                             style={{
//                                 fontWeight: index <= currentStatusIndex ? 'bold' : 'normal',
//                                 color: index <= currentStatusIndex ? '#4caf50' : '#bbb',
//                             }}
//                         >
//                             {status}
//                         </span>
//                     ))}
//                 </div>
//             </div>

//             {/* Order Details */}
//             <div className='container'>
//                 <h4>Order ID: {orderDetails?.orderId}</h4>
//                 <h3>Items in this Order:</h3>
//                 <div
//                     style={{
//                         display: 'grid',
//                         gridTemplateColumns: 'repeat(4, 1fr)',
//                         gap: '16px',
//                         marginBottom: '20px',
//                     }}
//                 >
//                     {orderDetails?.items.map((item, index) => (
//                         <div key={index} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '16px', textAlign: 'center', backgroundColor: '#fff', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
//                             <img
//                                 src={item.productImage}
//                                 alt={item.productTitle}
//                                 style={{
//                                     width: '100%',
//                                     height: 'auto',
//                                     marginBottom: '12px',
//                                     borderRadius: '4px',
//                                 }}
//                             />
//                             <p style={{ fontWeight: 'bold' }}>{item.productTitle}</p>
//                             <p>Quantity: {item.quantity}</p>
//                             <p>Price: {formatPrice(item.offerPrice)}</p>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             <div style={{ textAlign: 'center', marginTop: '20px' }} className='mb-1 mt-5'>
//                 {/* Cancel Button */}
//                 {orderDetails?.status === 'Placed' && (
//                     <button
//                         onClick={handleCancelOrder}
//                         disabled={isCanceling}
//                         style={{
//                             padding: '10px 20px',
//                             fontSize: '16px',
//                             fontWeight: 'bold',
//                             color: 'white',
//                             backgroundColor: '#f44336',
//                             border: 'none',
//                             borderRadius: '8px',
//                             cursor: 'pointer',
//                             transition: 'background-color 0.3s ease, transform 0.3s ease',
//                             width: '200px',
//                             marginBottom: '10px',
//                         }}
//                     >
//                         {isCanceling ? (
//                             <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                                 <div className="spinner" style={{ width: '20px', height: '20px', marginRight: '10px' }}></div> {/* Spinner */}
//                                 Canceling...
//                             </span>
//                         ) : (
//                             'Cancel Order'
//                         )}
//                     </button>
//                 )}

//                 {/* Invoice Download Button */}
//                 <div style={{ marginTop: '10px' }} className='mt-2'>
//                     <button
//                         onClick={handleDownloadInvoice}
//                         style={{
//                             padding: '10px 20px',
//                             fontSize: '16px',
//                             fontWeight: 'bold',
//                             color: 'white',
//                             backgroundColor: '#1b7b16',
//                             border: 'none',
//                             borderRadius: '8px',
//                             cursor: 'pointer',
//                             transition: 'background-color 0.3s ease, transform 0.3s ease',
//                             width: '200px',
//                             marginBottom: '10px',
//                         }}
//                     >
//                         Download Invoice
//                     </button>
//                 </div>

//                 {/* Back to Order History Link */}
//                 <div style={{ marginTop: '10px' }}>
//                     <Link
//                         to="/order-details"
//                         style={{
//                             color: '#2196f3',
//                             fontSize: '16px',
//                             fontWeight: 'bold',
//                             textDecoration: 'none',
//                             transition: 'color 0.3s ease',
//                         }}
//                         onMouseOver={(e) => e.target.style.color = '#1e88e5'}
//                         onMouseOut={(e) => e.target.style.color = '#2196f3'}
//                     >
//                         Back to Order History
//                     </Link>
//                 </div>
//             </div>

//             {/* Modal for Successful Order Cancellation */}
//             {showModal && (
//                 <div style={modalOverlayStyle}>
//                     <div style={modalContentStyle}>
//                         <div style={iconStyle}>
//                             <FaCheckCircle size={50} color="green" />
//                         </div>
//                         <p>{successMessage}</p>
//                         <button onClick={handleCloseModal} style={closeButtonStyle}>Close</button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// // Modal Styles
// const modalOverlayStyle = {
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     width: '100%',
//     height: '100%',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     animation: 'fadeIn 0.5s ease-out',
// };

// const modalContentStyle = {
//     backgroundColor: 'white',
//     padding: '40px 20px',
//     borderRadius: '10px',
//     textAlign: 'center',
//     width: '90%',
//     maxWidth: '500px',
//     animation: 'modalSlideIn 0.5s ease-out',
// };

// const iconStyle = {
//     marginBottom: '20px',
// };

// const closeButtonStyle = {
//     backgroundColor: '#4CAF50',
//     color: '#fff',
//     padding: '10px 20px',
//     borderRadius: '5px',
//     border: 'none',
//     cursor: 'pointer',
// };

// // Modal Animation CSS
// const modalAnimation = `
// @keyframes fadeIn {
//     0% { opacity: 0; }
//     100% { opacity: 1; }
// }

// @keyframes modalSlideIn {
//     0% { transform: translateY(-30px); opacity: 0; }
//     100% { transform: translateY(0); opacity: 1; }
// }
// `;

// export default OrderDetailPage;















import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { FaCheckCircle } from 'react-icons/fa';
import styled from 'styled-components';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const OrderDetailPage = () => {
    const {deliveryId, orderId } = useParams();
    const location = useLocation();
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    const [isCanceling, setIsCanceling] = useState(false);
    const [progressWidth, setProgressWidth] = useState(0);
    const [showModal, setShowModal] = useState(false); // Modal visibility
    const [successMessage, setSuccessMessage] = useState(''); 
    const [order, setOrder] = useState(null);

  // Format price as INR
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
    }).format(price);
};

const fetchOrderDetails = async () => {
    try {
        const token = Cookies.get('token');
        if (!token) {
            // setError('Token not found. Please log in.');
            setLoading(false);
            return;
        }

        const response = await axios.get(`/api/orders/history/${deliveryId}/${orderId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // Check if response.data.order is valid
        if (response.data && response.data.order) {
            setOrderDetails(response.data.order);
            setOrder(response.data.order); // Ensure order is set
            setLoading(false);

            const statusSteps = response.data.order.status === 'Cancelled' ? ['Placed', 'Cancelled'] : ['Placed', 'Shipped', 'Delivered'];
            const currentStatusIndex = statusSteps.indexOf(response.data.order.status);

            if (currentStatusIndex !== -1) {
                // Delay progress bar update by 2 seconds
                setTimeout(() => {
                    setProgressWidth((currentStatusIndex / (statusSteps.length - 1)) * 100);
                }, 2000); // 2-second delay
            }
        } else {
            // setError('Order not found.');
            setLoading(false);
        }
    } catch (err) {
        // setError('Error fetching order details');
        setLoading(false);
    }
};



useEffect(() => {
    fetchOrderDetails();
}, [orderId, deliveryId]);

const handleRetry = () => {
    // setError(null);
    setLoading(true);
    fetchOrderDetails();
};

const handleCancelOrder = async () => {
    setIsCanceling(true);
    try {
        const token = Cookies.get('token');
        if (!token) {
            // setError('Token not found. Please log in.');
            setIsCanceling(false);
            return;
        }

        const response = await axios.delete('/api/orders/cancel', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: { orderId },
        });

        if (response.status === 200) {
            setOrderDetails((prev) => ({ ...prev, status: 'Cancelled' }));
            setIsCanceling(false);
            setSuccessMessage('Your order has been canceled successfully!');
            setShowModal(true); 
        }
    } catch (err) {
        console.error('Error:', err);
        // setError('Error canceling the order. Please try again.');
        setIsCanceling(false);
    }
};

const handleDownloadInvoice = async () => {
    try {
        const token = Cookies.get('token');
        if (!token) {
            // setError('Token not found. Please log in.');
            return;
        }

        const response = await axios.get(`/api/order/invoice/${orderId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            responseType: 'blob',
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `invoice_${orderId}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (err) {
        // setError('Error downloading the invoice. Please try again.');
    }
};

// Define Status Steps dynamically based on current order status
const statusSteps = orderDetails?.status === 'Cancelled'
    ? ['Placed', 'Cancelled']
    : ['Placed', 'Shipped', 'Delivered'];

const currentStatusIndex = statusSteps.indexOf(orderDetails?.status);

useEffect(() => {
    if (currentStatusIndex !== -1) {
        setTimeout(() => {
            setProgressWidth((currentStatusIndex / (statusSteps.length - 1)) * 100);
        }, 1000);
    }
}, [currentStatusIndex, statusSteps.length]);

// Modal Close Handler
const handleCloseModal = () => {
    setShowModal(false);
};

// Error and Loading Handling
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
        <div>
         
            <div style={{ textAlign: 'center',  }} className='container mt-5'>
    {/* Check for Failed Status and Show a Message */}
    {orderDetails?.status === 'Failed' ? (
    
        <h1 style={{ color: 'red',marginTop:'-20px' }}>Order Failed</h1>
    
    ) : (
      <>
        <h1 style={{ textAlign: 'center' ,marginTop:'-40px'}}>Order Details</h1>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }} className='mt-5'>
            {statusSteps.map((status, index) => {
                const isCompleted = index <= currentStatusIndex;
                const isCancelled = status === 'Cancelled';
                return (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                        {/* Circle Indicators */}
                        <div
                            style={{
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                backgroundColor: isCancelled ? 'red' : isCompleted ? '#4caf50' : '#bbb',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '14px',
                                fontWeight: 'bold',
                                zIndex: 2,
                            }}
                        />
                    </div>
                );
            })}

            {/* Progress Bar */}
            <div style={{ position: 'absolute', top: '50%', left: '1%', right: '1%', height: '4px', backgroundColor: '#ddd', borderRadius: '10px', zIndex: 1 }}>
                <div
                    style={{
                        width: `${progressWidth}%`,
                        height: '100%',
                        backgroundColor: orderDetails?.status === 'Cancelled' ? 'red' : '#4caf50',
                        borderRadius: '10px',
                        transition: 'width 2s',
                    }}
                />
            </div>
        </div>
      </>
    )}

    {/* Status Steps Below the Progress Bar */}
    {orderDetails?.status !== 'Failed' && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
            {statusSteps.map((status, index) => (
                <span
                    key={index}
                    style={{
                        fontWeight: index <= currentStatusIndex ? 'bold' : 'normal',
                        color: index <= currentStatusIndex ? '#4caf50' : '#bbb',
                    }}
                >
                    {status}
                </span>
            ))}
        </div>
    )}
</div>

        
            {/* Order Details */}
            <div className='container'>


<OrderDetailsContainer>
    <OrderId>Order ID: {orderDetails?.orderId}</OrderId>
    <ItemsTitle>Items in this Order:</ItemsTitle>

    <ItemsGrid>
        {orderDetails?.items.map((item, index) => (
            <ItemCard key={index}>
                <ItemImage src={item.productImage} alt={item.productTitle} />
                <ItemTitle>{item.productTitle}</ItemTitle>
                <ItemQuantity>Quantity: {item.quantity}</ItemQuantity>
                <ItemPrice>{formatPrice(item.offerPrice)}</ItemPrice>
            </ItemCard>
        ))}
    </ItemsGrid>

    {/* Add Payment Method */}
    <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <h4>Payment Method:</h4>
        <p style={{ fontWeight: 'bold', fontSize: '18px', color: '#4CAF50' }}>
            {orderDetails?.paymentMethod === 'online' ? 'Online Payment' : 'Cash on Delivery'}
        </p>
    </div>
    <div className="delivery-info">
  <h3>Delivery Information</h3>
  {order ? (
    <>
      <p>Username: {order.username}</p>
      <p>Phone Number: {order.phoneNo}</p>
      <p>Address: {order.address}</p>
    </>
  ) : (
    <p>Loading delivery information...</p>
  )}
</div>
</OrderDetailsContainer>


            </div>
        


            <div style={{ textAlign: 'center', marginTop: '20px' }} className='mb-1 mt-5'>
                
                {/* Cancel Button */}
                {orderDetails?.status === 'Placed' && (
                    <button
                        onClick={handleCancelOrder}
                        disabled={isCanceling}
                        style={{
                            padding: '10px 20px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            color: 'white',
                            backgroundColor: '#f44336',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease, transform 0.3s ease',
                            width: '200px',
                            marginBottom: '10px',
                        }}
                    >
                        {isCanceling ? (
                            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div className="spinner" style={{ width: '20px', height: '20px', marginRight: '10px' }}></div> {/* Spinner */}
                                Canceling...
                            </span>
                        ) : (
                            'Cancel Order'
                        )}
                    </button>
                )}

                {/* Invoice Download Button */}
                <div style={{ marginTop: '10px' }} className='mt-2'>
                {orderDetails?.status === 'Delivered' && (
                      <button
                      onClick={handleDownloadInvoice}
                      style={{
                          padding: '10px 20px',
                          fontSize: '16px',
                          fontWeight: 'bold',
                          color: 'white',
                          backgroundColor: '#1b7b16',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          transition: 'background-color 0.3s ease, transform 0.3s ease',
                          width: '200px',
                          marginBottom: '10px',
                      }}
                  >
                      Download Invoice
                  </button>
                )}
                </div>

                {/* Back to Order History Link */}
                <div style={{ marginTop: '10px' }}>
                    <Link
                        to="/order-details"
                        style={{
                            color: '#2196f3',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            textDecoration: 'none',
                            transition: 'color 0.3s ease',
                        }}
                        onMouseOver={(e) => e.target.style.color = '#1e88e5'}
                        onMouseOut={(e) => e.target.style.color = '#2196f3'}
                    >
                        Back to Order History
                    </Link>
                </div>
            </div>

            {/* Modal for Successful Order Cancellation */}
            {showModal && (
                <div style={modalOverlayStyle}>
                    <div style={modalContentStyle}>
                        <div style={iconStyle}>
                            <FaCheckCircle size={50} color="green" />
                        </div>
                        <p>{successMessage}</p>
                        <button onClick={handleCloseModal} style={closeButtonStyle}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};
const OrderDetailsContainer = styled.div`
    margin-top: 30px;
`;

const OrderId = styled.h4`
    text-align: center;
    margin-bottom: 10px;
`;

const ItemsTitle = styled.h3`
    text-align: center;
    margin-bottom: 20px;
`;

const ItemsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
`;

const ItemCard = styled.div`
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
`;

const ItemImage = styled.img`
    width: 100%;
    max-height: 200px;
    object-fit: cover;
    border-radius: 8px;
`;

const ItemTitle = styled.p`
    font-weight: bold;
    margin-top: 10px;
`;

const ItemQuantity = styled.p`
    margin-top: 5px;
`;

const ItemPrice = styled.p`
    margin-top: 5px;
    font-weight: bold;
`;
// Modal Styles
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

const iconStyle = {
    marginBottom: '20px',
};

const closeButtonStyle = {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
};

// Modal Animation CSS
const modalAnimation = `
@keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
}

@keyframes modalSlideIn {
    0% { transform: translateY(-30px); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
}
`;

export default OrderDetailPage;
