

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';
// import './assets/css/viewcart.css';
// import { FaShoppingCart, FaTimes } from 'react-icons/fa'; // Removed FaHeart since we're using an emoji

// const ViewCart = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [quote, setQuote] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [wishlist, setWishlist] = useState([]);
//   const navigate = useNavigate();
//   const [address, setAddress] = useState({
//     phoneNo: '',
//     address: '',
//     username: ''
//   });
//   const [isAddressCreated, setIsAddressCreated] = useState(false);
//   const [isAddressEditing, setIsAddressEditing] = useState(false);

//   const fetchWishlist = async () => {
//     const token = Cookies.get("token");
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     try {
//       const response = await axios.get('/api/viewwishlist', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setWishlist(response.data.wishlist.map(item => item.productId));
//     } catch (error) {
//       console.error('Error fetching wishlist:', error);
//     }
//   };

//   const fetchAddress = async () => {
//     const token = Cookies.get('token');
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     try {
//       const response = await axios.get('/api/userget', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (response.data.length > 0) {
//         setAddress(response.data[0]);
//         setIsAddressCreated(true);
//       } else {
//         setIsAddressCreated(false);
//       }
//     } catch (error) {
//       console.error('Error fetching delivery address:', error);
//     }
//   };

//   const handleAddAddress = async () => {
//     const token = Cookies.get('token');
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     try {
//       await axios.post('/api/create', address, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchAddress();
//     } catch (error) {
//       console.error('Error adding delivery address:', error);
//       alert('Failed to add address');
//     }
//   };

//   const handleUpdateAddress = async () => {
//     const token = Cookies.get('token');
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     try {
//       await axios.put('/api/delivery', address, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchAddress();
//       setIsAddressEditing(false);
//     } catch (error) {
//       console.error('Error updating delivery address:', error);
//       alert('Failed to update address');
//     }
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
//     fetchWishlist();
//     fetchAddress();
//   }, [navigate]);

//   const handleContinueOrder = () => {
//     if (!isAddressCreated) {
//       alert('Please add your delivery address first.');
//       return;
//     }
//     navigate('/checkout');
//   };

//   const handleRemoveFromCart = async (productId) => {
//     try {
//       const token = Cookies.get('token');
//       await axios.put('/api/removefromcart', { productId }, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCartItems((prevItems) => prevItems.filter(item => item.productId !== productId));
//     } catch (error) {
//       console.error('Failed to remove item:', error);
//       setError('Failed to remove item. Please try again.');
//     }
//   };

//   const handleContinueShopping = () => {
//     navigate('/');
//   };

//   const handleUpdateQuantity = async (productId, newQuantity) => {
//     try {
//       const token = Cookies.get('token');
//       await axios.put(`/api/updatecart/${productId}`, { quantity: newQuantity }, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCartItems((prevItems) => prevItems.map(item =>
//         item.productId === productId ? { ...item, quantity: newQuantity } : item
//       ));
//     } catch (error) {
//       console.error('Failed to update quantity:', error);
//       setError('Failed to update quantity. Please try again.');
//     }
//   };

//   const handleWishlistToggle = async (productId, isInWishlist) => {
//     const token = Cookies.get("token");
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     try {
//       if (isInWishlist) {
//         await axios.delete('/api/removefromwishlist', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           data: { productId },
//         });
//         setWishlist((prev) => prev.filter(id => id !== productId));
//       } else {
//         await axios.post('/api/addtowishlist', { productId }, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setWishlist((prev) => [...prev, productId]);
//       }
//     } catch (error) {
//       console.error('Error updating wishlist:', error);
//       alert('Failed to update wishlist.');
//     }
//   };

//   if (loading) {
//     return (
//       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//         <div style={{ border: '8px solid #f3f3f3', borderTop: '8px solid #fff', borderRadius: '50%', width: '50px', height: '50px', animation: 'spin 1s linear infinite' }}></div>
//         <style>{`
//           @keyframes spin {
//             0% { transform: rotate(0deg); }
//             100% { transform: rotate(360deg); }
//           }
//         `}</style>
//       </div>
//     );
//   }

//   return (
//     <div className="container mt-4">
//     <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>YOUR CART</h2>
  
//     {error && <div className="alert alert-danger">{error}</div>}
  
//     {cartItems.length > 0 ? (
//       <div className="cart-layout">
//         <div className="product-details">
//           {cartItems.map((item) => (
//             <div key={item.productId} className="cart-item">
//               <div className="cart-item-left">
//                 <div className="image-container">
//                   <img
//                     src={item.productImages || '/default-placeholder.png'}
//                     alt={item.productTitle}
//                     className="cart-item-image"
//                   />
//                   <button
//                     className="wishlist-button"
//                     onClick={() => handleWishlistToggle(item.productId, wishlist.includes(item.productId))}
//                   >
//                     {wishlist.includes(item.productId) ? '❤️' : '🤍'}
//                   </button>
//                 </div>
//               </div>
//               <div className="cart-item-right">
//                 <button
//                   className="remove-button"
//                   onClick={() => handleRemoveFromCart(item.productId)}
//                 >
//                   <FaTimes />
//                 </button>
//                 <h3 style={{ color: '#333', marginBottom: '10px' }} className='cart-product-tittle'>{item.productTitle}</h3>
//                 <p style={{ color: '#555', marginBottom: '5px' }}>Price: <span className="original-price">₹{item.originalPrice}</span></p>
//                 <p style={{ color: '#333', marginBottom: '10px' }}>Offer Price: ₹{item.offerPrice}</p>
//                 <div className="quantity-control">
//                   <button
//                     onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
//                     disabled={item.quantity <= 1}
//                   >
//                     -
//                   </button>
//                   <span style={{ color: '#333' }}>{item.quantity}</span>
//                   <button
//                     onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
  
//         <div className="order-summary">
//           <h3 style={{ color: '#1b7b16', marginBottom: '20px' }}>Order Summary</h3>
//           <div className="summary-details">
//             <p><strong>Total Quantity:</strong> {cartItems.reduce((acc, item) => acc + item.quantity, 0)}</p>
//             <p><strong>Items:</strong> {cartItems.length}</p>
//             <p><strong>Total Amount:</strong> ₹{quote.totalAmount}</p>
//             <p><strong>Savings:</strong> ₹{quote.savings}</p>
//           </div>
  
//           <div className="delivery-address">
//             <h4 style={{ color: '#1b7b16', marginBottom: '15px' }}>Delivery Address</h4>
//             {!isAddressEditing ? (
//               <div>
//                 {isAddressCreated ? (
//                   <div>
//                     <p>Name: {address.username}</p>
//                     <p>Phone: {address.phoneNo}</p>
//                     <p>Address: {address.address}</p>
//                     <button
//                       onClick={() => setIsAddressEditing(true)}
//                       className="address-button"
//                     >
//                       Edit Address
//                     </button>
//                   </div>
//                 ) : (
//                   <button
//                     onClick={() => setIsAddressEditing(true)}
//                     className="address-button"
//                   >
//                     Add Address
//                   </button>
//                 )}
//               </div>
//             ) : (
//               <div className="address-form">
//                 <input
//                   type="text"
//                   placeholder="Enter Name"
//                   value={address.username}
//                   onChange={(e) => setAddress({ ...address, username: e.target.value })}
//                 />
//                 <input
//                   type="text"
//                   placeholder="Enter Phone Number"
//                   value={address.phoneNo}
//                   onChange={(e) => setAddress({ ...address, phoneNo: e.target.value })}
//                 />
//                 <textarea
//                   placeholder="Enter Address"
//                   value={address.address}
//                   onChange={(e) => setAddress({ ...address, address: e.target.value })}
//                 />
//                 <button
//                   onClick={isAddressCreated ? handleUpdateAddress : handleAddAddress}
//                   className="address-button"
//                 >
//                   Save Address
//                 </button>
//               </div>
//             )}
//           </div>
  
//           <button
//             className="btn btn-primary mt-3"
//             onClick={handleContinueOrder}
//             style={{ width: '100%', padding: '12px', fontSize: '1rem' }}
//           >
//             Continue Order
//           </button>
//         </div>
//       </div>
//     ) : (
//       <div className="empty-cart">
//         <p style={{ fontSize: '1.5rem', color: '#555', marginBottom: '20px' }}>Your Cart is empty.</p>
//         <button
//           onClick={handleContinueShopping}
//           className="continue-shopping-button"
//         >
//           <FaShoppingCart style={{ marginRight: '8px' }} />
//           Continue Shopping
//         </button>
//       </div>
//     )}
//   </div>
//   );
// };

// export default ViewCart;












import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './assets/css/viewcart.css';
import { FaShoppingCart, FaTimes } from 'react-icons/fa'; // Removed FaHeart since we're using an emoji
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const ViewCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [quote, setQuote] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    phoneNo: '',
    address: '',
    username: ''
  });
  const [isAddressCreated, setIsAddressCreated] = useState(false);
  const [isAddressEditing, setIsAddressEditing] = useState(false);

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isNewAddress, setIsNewAddress] = useState(false);


  const fetchWishlist = async () => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await axios.get('/api/viewwishlist', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWishlist(response.data.wishlist.map(item => item.productId));
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  const fetchAddress = async () => {
    const token = Cookies.get('token');
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await axios.get('/api/userget', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.length > 0) {
        setAddress(response.data[0]);
        setIsAddressCreated(true);
      } else {
        setIsAddressCreated(false);
      }
    } catch (error) {
      console.error('Error fetching delivery address:', error);
    }
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
    fetchWishlist();
    fetchAddress();
  }, [navigate]);

  const handleContinueOrder = () => {
    if (!isAddressCreated) {
      alert('Please add your delivery address first.');
      return;
    }
  
    if (!selectedAddressId) {
      alert('Please select a delivery address.');
      return;
    }
  
    console.log('Navigating to checkout with deliveryId:', selectedAddressId); // Debugging log
    navigate(`/checkout/${selectedAddressId}`); // Passing selectedAddressId in the URL
  };
  
  

  const handleRemoveFromCart = async (productId) => {
    try {
      const token = Cookies.get('token');
      await axios.put('/api/removefromcart', { productId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems((prevItems) => prevItems.filter(item => item.productId !== productId));
    } catch (error) {
      console.error('Failed to remove item:', error);
      setError('Failed to remove item. Please try again.');
    }
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    try {
      const token = Cookies.get('token');
      await axios.put(`/api/updatecart/${productId}`, { quantity: newQuantity }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems((prevItems) => prevItems.map(item =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      ));
    } catch (error) {
      console.error('Failed to update quantity:', error);
      setError('Failed to update quantity. Please try again.');
    }
  };

  const handleWishlistToggle = async (productId, isInWishlist) => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      if (isInWishlist) {
        await axios.delete('/api/removefromwishlist', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: { productId },
        });
        setWishlist((prev) => prev.filter(id => id !== productId));
      } else {
        await axios.post('/api/addtowishlist', { productId }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setWishlist((prev) => [...prev, productId]);
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
      alert('Failed to update wishlist.');
    }
  };

  // Fetch cart items and addresses
  const fetchCartAndAddresses = async () => {
    const token = Cookies.get('token');
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const cartResponse = await axios.get('/api/viewcart', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(cartResponse.data.cart.items);
      setQuote(cartResponse.data.cart.quote);

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
    <div className="container ">
     {error && <div className="alert alert-danger">{error}</div>}
  
    {cartItems.length > 0 ? (
     <>
      <h5 className='viewcart-h5 mt-4'  style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}><span style={{color:'#1b7b16'}}>C A R T</span> ... P A Y M E N T</h5>
   
   <div className="cart-layout">
     
     <div className="product-details">
     {
cartItems.map((item) => {
 const isOutOfStock = item.stock === 0;  // Define the out-of-stock logic inside the map function
 return (
   <div key={item.productId} className="cart-item">
     <div className="cart-item-left">
       <div className="image-container">
         <img
           src={item.productImages || '/default-placeholder.png'}
           alt={item.productTitle}
           className="cart-item-image"
         />
         <button
           className="wishlist-button"
           onClick={() => handleWishlistToggle(item.productId, wishlist.includes(item.productId))}
         >
           {wishlist.includes(item.productId) ? '❤️' : '🤍'}
         </button>
       </div>
     </div>
     <div className="cart-item-right">
       <button
         className="remove-button"
         onClick={() => handleRemoveFromCart(item.productId)}
       >
         <FaTimes />
       </button>
       <h3 style={{ color: '#333', marginBottom: '10px' }} className='cart-product-tittle'>{item.productTitle}</h3>
       <p style={{ color: '#555', marginBottom: '5px' }}>Price: <span className="original-price">₹{item.originalPrice}</span></p>
       <p style={{ color: '#333', marginBottom: '10px' }}>Offer Price: ₹{item.offerPrice}</p>
       <p className="text-muted" style={{ fontSize: '14px' }}>
         {isOutOfStock ? 'Out of Stock' : `Stock: ${item.stock}`}
       </p>
       <div className="quantity-control">
         <button
           onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
           disabled={item.quantity <= 1}
         >
           -
         </button>
         <span style={{ color: '#333' }}>{item.quantity}</span>
         <button
           onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
         >
           +
         </button>
       </div>
     </div>
   </div>
 );
})
}


     </div>

     <div className="order-summary">
       <h3 style={{ color: '#1b7b16', marginBottom: '20px' }}>Order Summary</h3>
       <div className="summary-details">
         <p><strong>Total Quantity:</strong> {cartItems.reduce((acc, item) => acc + item.quantity, 0)}</p>
         <p><strong>Items:</strong> {cartItems.length}</p>
         <p><strong>Total Amount:</strong> ₹{quote.totalAmount}</p>
         <p><strong>Savings:</strong> ₹{quote.savings}</p>
       </div>

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

       {/* Show "Edit Address" button only when an address is selected */}
       {selectedAddressId && !isAddressEditing && !isNewAddress && (
         <button
           className="address-button mt-2"
           onClick={() => setIsAddressEditing(true)}
         >
           Edit Address
         </button>
       )}
       

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

       {/* Show "Add New Address" button only if not editing */}
       {!isNewAddress && !isAddressEditing && !selectedAddressId && addresses.length < 5 && (
<button
 className="address-button mt-2"
 onClick={() => setIsNewAddress(true)}

>
 Add New Address
</button>
)}

       
     </div>


       <button
         className="btn btn-primary mt-3"
         onClick={handleContinueOrder}
         style={{ width: '100%', padding: '12px', fontSize: '1rem' }}
         disabled={ isAddressEditing} 
       >
         Continue Order
       </button>
     </div>
   </div>
     </>
    ) : (
      <div className="empty-cart">
        <p style={{ fontSize: '1.5rem', color: '#555', marginBottom: '20px' }}>Your Cart Empty</p>
         <DotLottieReact
            src="https://lottie.host/4b93d2e2-4131-49ee-a24f-4aae638e4503/BAqorRQidY.lottie"
            loop
            autoplay
            style={{ height:'400px'}}
          />
        <button
          onClick={handleContinueShopping}
          className="continue-shopping-button"
        >
          <FaShoppingCart style={{ marginRight: '8px' }} />
          Continue Shopping
        </button>
      </div>
    )}
  </div>
  );
};

export default ViewCart;