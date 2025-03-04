


// import React, { createContext, useState, useEffect, useContext } from 'react';
// import Cookies from 'js-cookie';
// import axios from 'axios';

// // Create the CartContext
// export const CartContext = createContext();

// // Custom hook to use the CartContext
// export const useCart = () => {
//   return useContext(CartContext);
// };

// const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);
//   const [itemsCount, setItemsCount] = useState(0); // To store the total quantity of items
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Function to fetch cart data from the server
//   const fetchCart = async () => {
//     const token = Cookies.get('token'); // Get token from cookies

//     if (!token) {
//       setError('No authentication token found.');
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await fetch('/api/viewcart', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`, // Send token in the request header
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to fetch cart data: ${response.status} ${response.statusText}`);
//       }

//       const data = await response.json();
//       setCartItems(data.cart); // Set cart data
//       calculateItemsCount(data.cart); // Calculate the total quantity of items
//       setLoading(false);
//     } catch (err) {
//       setError(err.message); // Handle error
//       setLoading(false);
//     }
//   };

//   // Helper function to calculate the total quantity of items in the cart
//   const calculateItemsCount = (cart) => {
//     const count = cart.reduce((acc, item) => acc + item.quantity, 0);
//     setItemsCount(count);
//   };

//   // Add item to the cart
//   const addToCart = async (product) => {
//     const token = Cookies.get('token');
//     if (!token) return;

//     setCartItems((prevItems) => {
//       const updatedItems = [...prevItems];
//       const existingItem = updatedItems.find(item => item.productId === product.productId);
//       if (existingItem) {
//         existingItem.quantity += 1; // Increment quantity if item already exists
//       } else {
//         updatedItems.push({ ...product, quantity: 1 });
//       }
//       return updatedItems;
//     });

//     // Update the itemsCount based on new cart state
//     setItemsCount(prevCount => prevCount + 1);

//     try {
//       await axios.post('/api/addtocart', { productId: product.productId }, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Save cart to localStorage
//     } catch (error) {
//       console.error('Error adding to cart:', error);
//       fetchCart(); // Refresh cart if error occurs
//     }
//   };

//   // Remove item from the cart
//   const removeFromCart = async (productId) => {
//     const token = Cookies.get('token');
//     if (!token) return;

//     setCartItems((prevItems) => {
//       const updatedItems = prevItems.filter(item => item.productId !== productId);
//       return updatedItems;
//     });

//     // Update the itemsCount based on new cart state
//     setItemsCount(prevCount => prevCount - 1);

//     try {
//       await axios.post('/api/removefromcart', { productId }, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Save cart to localStorage
//     } catch (error) {
//       console.error('Error removing from cart:', error);
//       fetchCart(); // Refresh cart if error occurs
//     }
//   };

//   // Load cart items from localStorage if available
//   useEffect(() => {
//     const storedCart = localStorage.getItem('cartItems');
//     if (storedCart) {
//       const cart = JSON.parse(storedCart);
//       setCartItems(cart);
//       calculateItemsCount(cart); // Calculate the total quantity based on stored cart
//     } else {
//       fetchCart(); // Fetch cart data from the API if no cart data in localStorage
//     }
//   }, []);

//   return (
//     <CartContext.Provider value={{ cartItems, itemsCount, loading, error, addToCart, removeFromCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export default CartProvider;






import React, { createContext, useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

// Create the CartContext
export const CartContext = createContext();

// Custom hook to use the CartContext
export const useCart = () => {
  return useContext(CartContext);
};

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [itemsCount, setItemsCount] = useState(0); // To store the total quantity of items
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch cart data from the server
  const fetchCart = async () => {
    const token = Cookies.get('token'); // Get token from cookies

    if (!token) {
      setError('No authentication token found.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/viewcart', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Send token in the request header
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch cart data: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setCartItems(data.cart.items); // Set cart data
      calculateItemsCount(data.cart.items); // Calculate the total quantity of items
      setLoading(false);
    } catch (err) {
      setError(err.message); // Handle error
      setLoading(false);
    }
  };

  // Helper function to calculate the total quantity of items in the cart
  const calculateItemsCount = (cartItems) => {
    const count = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    setItemsCount(count);
  };

  // Add item to the cart
  const addToCart = async (product) => {
    const token = Cookies.get('token');
    if (!token) return;

    // Update cart items locally and in localStorage
    setCartItems((prevItems) => {
      const updatedItems = [...prevItems];
      const existingItem = updatedItems.find(item => item.productId === product.productId);
      if (existingItem) {
        existingItem.quantity += 1; // Increment quantity if item already exists
      } else {
        updatedItems.push({ ...product, quantity: 1 });
      }
      localStorage.setItem('cartItems', JSON.stringify(updatedItems)); // Update localStorage
      return updatedItems;
    });

    // Update the itemsCount based on new cart state
    setItemsCount(prevCount => prevCount + 1);

    try {
      await axios.post('/api/addtocart', { productId: product.productId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      fetchCart(); // Refresh cart if error occurs
    }
  };

  // Remove item from the cart
  const removeFromCart = async (productId) => {
    const token = Cookies.get('token');
    if (!token) return;

    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter(item => item.productId !== productId);
      localStorage.setItem('cartItems', JSON.stringify(updatedItems)); // Update localStorage
      return updatedItems;
    });

    // Update the itemsCount based on new cart state
    setItemsCount(prevCount => prevCount - 1);

    try {
      await axios.post('/api/removefromcart', { productId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.error('Error removing from cart:', error);
      fetchCart(); // Refresh cart if error occurs
    }
  };

  useEffect(() => {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      const cart = JSON.parse(storedCart);
      setCartItems(cart);
      calculateItemsCount(cart);
    } else {
      fetchCart();
    }
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, itemsCount, loading, error, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
