






// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Routes, Route, useLocation } from "react-router-dom";
// import 'font-awesome/css/font-awesome.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Home from "./components/Home";
// import ProductList from "./components/Product/ProductList";
// import ViewCart from "./components/Product/ViewCart";
// import ViewWishlist from "./components/Product/ViewWishlist";
// import Profile from "./components/User/Profile";
// import Login from "./components/Auth/Login";
// import Register from "./components/Auth/Register";
// import Otppage from "./components/Auth/OTPVerification";
// import Fp from "./components/Auth/ForgotPassword";
// import Rp from "./components/Auth/ResetPassword";
// import ProductDetailPage from './components/Product/ProductDetails';
// import Homecategory from "./components/homepage/homecategory";
// import Searchpage from "./components/homepage/searchpage";
// import Navbar from './components/Common/Navbar';
// import Homeoffer from './components/homepage/homeoffer';
// import SubcategoryPage from './components/homepage/SubcategoryPage';
// import Category from './components/Product/catrgory';
// import SubcategoryProductPage from './components/Product/subcategoryproduct';
// import CartProvider from './context/CartContext'; 
// import Footer from './components/Common/footer';
// import OrderHistory from './components/orders/orderhistory';
// import OfferDeatils from './components/Product/offerdeatil';
// import Checkout from './components/orders/checkout';
// import VH from './components/orders/viewhistory';

// // owl carousel 
// import "owl.carousel/dist/assets/owl.carousel.css";
// import "owl.carousel/dist/assets/owl.theme.default.css";


// const App = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchAllProducts = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get('/api/getallp');
//       setProducts(response.data.products);
//     } catch (error) {
//       console.error("Error fetching all products:", error);
//       setError('Failed to fetch products. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAllProducts();
//   }, []);

//   const location = useLocation();
//   const hideComponentsRoutes = [
//     '/login', '/register', '/otppage', '/fp', '/rp'
//   ];

//   const routes = [
//     { path: "/", component: Home },
//     { path: "/products", component: ProductList },
//     { path: "/product/:productId", component: ProductDetailPage },
//     { path: "/cart", component: ViewCart },
//     { path: "/wishlist", component: ViewWishlist },
//     { path: "/profile", component: Profile },
//     { path: "/login", component: Login },
//     { path: "/register", component: Register },
//     { path: "/otppage", component: Otppage },
//     { path: "/fp", component: Fp },
//     { path: "/rp", component: Rp },
//     { path: "/homecategory", component: Homecategory },
//     { path: "/search", component: Searchpage },
//     { path: "/homeoffer", component: Homeoffer },
//     { path: "/getsubc/:categoryId", component: SubcategoryPage },
//     { path: "/category", component: Category },
//     { path: "/getproduct/:subCategoryId", component: SubcategoryProductPage },
//     { path: "/oh", component: OrderHistory },
//     { path: "/od/:productId", component: OfferDeatils },
//     { path: "/checkout", component: Checkout },
//     { path: "/order-details/:orderId", component: VH },
//   ];

//   return (
    
//     <CartProvider>
//       {/* Conditional rendering for Navbar */}
//       {!hideComponentsRoutes.includes(location.pathname) && <Navbar />}

//       {/* Main Content */}
//       <div className="main-content">
//         {error && (
//           <div className="error-message">
//             <p>{error}</p>
//             <button className="btn btn-primary" onClick={fetchAllProducts}>Retry</button>
//           </div>
//         )}
//         {loading && !error && (
//           <div
//           style={{
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             height: '100vh',
//           }}
//         >
//           <div
//             style={{
//               border: '8px solid #f3f3f3', 
//               borderTop: '8px solid #fff', 
//               borderRadius: '50%',
//               width: '50px',  
//               height: '50px',
//               animation: 'spin 1s linear infinite', 
//             }}
//           ></div>
//           <style>
//             {`
//               @keyframes spin {
//                 0% { transform: rotate(0deg); }
//                 100% { transform: rotate(360deg); }
//               }
//             `}
//           </style>
//         </div>
//         )}
        
//         {/* Routes rendering */}
//         <Routes>
//           {routes.map((route, index) => (
//             <Route key={index} path={route.path} element={<route.component />} />
//           ))}
//         </Routes>
//       </div>

//       {/* Conditional rendering for Footer */}
//       {!hideComponentsRoutes.includes(location.pathname) && <Footer />}
//     </CartProvider>

//   );
// };

// export default App;














import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, useLocation } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Home from "./components/Home";
import ProductList from "./components/Product/ProductList";
import ViewCart from "./components/Product/ViewCart";
import ViewWishlist from "./components/Product/ViewWishlist";
import Profile from "./components/User/Profile";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Otppage from "./components/Auth/OTPVerification";
import Fp from "./components/Auth/ForgotPassword";
import Rp from "./components/Auth/ResetPassword";
import ProductDetailPage from './components/Product/ProductDetails';
import Homecategory from "./components/homepage/homecategory";
import Searchpage from "./components/homepage/searchpage";
import Navbar from './components/Common/Navbar';
import Homeoffer from './components/homepage/homeoffer';
import SubcategoryPage from './components/homepage/SubcategoryPage';
import Category from './components/Product/catrgory';
import SubcategoryProductPage from './components/Product/subcategoryproduct';
import CartProvider from './context/CartContext'; 
import Footer from './components/Common/footer';
import OrderHistory from './components/orders/orderhistory';
import OfferDeatils from './components/Product/offerdeatil';
import Checkout from './components/orders/checkout';
import VH from './components/orders/viewhistory';
import Notifications from './components/Common/notification';
import Buynow from './components/orders/buynow';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

// owl carousel 
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  const fetchAllProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('/api/getallp');
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching all products:", error);
     
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const location = useLocation();
  const hideComponentsRoutes = [
    '/login', '/register', '/otppage', '/fp', '/rp','/checkout','/cart'
  ];

  const routes = [
    { path: "/", component: Home },
    { path: "/products", component: ProductList },
    { path: "/product/:productId", component: ProductDetailPage },
    { path: "/cart", component: ViewCart },
    { path: "/wishlist", component: ViewWishlist },
    { path: "/profile", component: Profile },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: "/otppage", component: Otppage },
    { path: "/fp", component: Fp },
    { path: "/rp", component: Rp },
    { path: "/homecategory", component: Homecategory },
    { path: "/search", component: Searchpage },
    { path: "/homeoffer", component: Homeoffer },
    { path: "/getsubc/:categoryId", component: SubcategoryPage },
    { path: "/category", component: Category },
    { path: "/getproduct/:subCategoryId", component: SubcategoryProductPage },
    { path: "/offer-details", component: OfferDeatils },
    { path:"/checkout/:deliveryId",component: Checkout },   
    { path: "/buynow/:productId", component: Buynow },  

    { path: "/order-details", component: OrderHistory },
    { path: "/order-details/:deliveryId/:orderId", component: VH },
    
    { path: "/notifications", component: Notifications },
  ];

  return (
    <CartProvider>
      {/* Conditional rendering for Navbar */}
      {!hideComponentsRoutes.includes(location.pathname) && <Navbar />}

      {/* Main Content */}
      <div className="main-content">
   
        {loading && !error && (
          <DotLottieReact
          src="https://lottie.host/304b6b43-2a24-45bb-9012-ed8264aa2340/6hUDLfTOmC.lottie"
          loop
          autoplay
        />
        )}
        
        {/* Routes rendering */}
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={<route.component />} />
          ))}
        </Routes>
      </div>

      {/* Conditional rendering for Footer */}
      {!hideComponentsRoutes.includes(location.pathname) && <Footer />}
    </CartProvider>
  );
};

export default App;
