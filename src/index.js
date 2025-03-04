// // // import React from 'react';
// // // import ReactDOM from 'react-dom/client';
// // // import App from './App';
// // // import reportWebVitals from './reportWebVitals';


// // // const root = ReactDOM.createRoot(document.getElementById('root'));
// // // root.render(
// // //   <React.StrictMode>
// // //     <App />
// // //   </React.StrictMode>
// // // );

// // // // If you want to start measuring performance in your app, pass a function
// // // // to log results (for example: reportWebVitals(console.log))
// // // // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// // // reportWebVitals();


// // import React from 'react';
// // import ReactDOM from 'react-dom/client'; // If you're using React 18
// // import { BrowserRouter } from 'react-router-dom';  // Import BrowserRouter
// // import App from './App'; // Import your App component

// // const rootElement = document.getElementById('root');
// // const root = ReactDOM.createRoot(rootElement);

// // root.render(
// //   <BrowserRouter>  {/* Wrap your whole app inside BrowserRouter */}
// //     <App />
// //   </BrowserRouter>
// // );



// // src/index.js
// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App";

// // Register service worker for push notifications
// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker
//     .register("./firebase-messaging-sw.js")
//     .then((registration) => {
//       console.log("Service Worker registered:", registration);
//     })
//     .catch((err) => {
//       console.error("Service Worker registration failed:", err);
//     });
// }

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Service Worker Registration
const root = ReactDOM.createRoot(document.getElementById('root'));

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then((registration) => {
      // console.log('Service Worker registered:', registration);
    })
    .catch((error) => {
      // console.error('Service Worker registration failed:', error);
    });
}



root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
