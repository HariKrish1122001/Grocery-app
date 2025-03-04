


importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");

// Firebase configuration (same as in the main app)
const firebaseConfig = {
  apiKey: "AIzaSyAxWAEU4vYyQzu2SVwF_TwRome0CJe2iBg",
  authDomain: "grocery-app-fc017.firebaseapp.com",
  databaseURL: "https://grocery-app-fc017-default-rtdb.firebaseio.com",
  projectId: "grocery-app-fc017",
  storageBucket: "grocery-app-fc017.firebasestorage.app",
  messagingSenderId: "1003045775966",
  appId: "1:1003045775966:web:71216548d4faee475c62cf",
  measurementId: "G-HW7CBZVB85"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Handle push event (background notifications)
self.addEventListener("push", function (event) {
  // const payload = event.data ? event.data.json() : {};
  const { title, body, icon } = payload.notification || {};

  const notificationTitle = title || "New Notification";
  const notificationOptions = {
    body: body || "You have a new message.",
    icon: icon || "/img/man.png",
  };

  

  event.waitUntil(
    self.registration.showNotification(notificationTitle, notificationOptions)
  );
});

// Handle notification click (background)
self.addEventListener("notificationclick", (event) => {
 

  event.notification.close();

});




// importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
// importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");

// // Firebase configuration (same as in the main app)
// const firebaseConfig = {
//   apiKey: "AIzaSyAxWAEU4vYyQzu2SVwF_TwRome0CJe2iBg",
//   authDomain: "grocery-app-fc017.firebaseapp.com",
//   databaseURL: "https://grocery-app-fc017-default-rtdb.firebaseio.com",
//   projectId: "grocery-app-fc017",
//   storageBucket: "grocery-app-fc017.firebasestorage.app",
//   messagingSenderId: "1003045775966",
//   appId: "1:1003045775966:web:71216548d4faee475c62cf",
//   measurementId: "G-HW7CBZVB85"
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// const messaging = firebase.messaging();

// // Handle push event (background notifications)
// self.addEventListener("push", function (event) {
//   // const payload = event.data ? event.data.json() : {};
//   const { title, body, icon, data } = payload.notification || {};

//   const notificationTitle = title || "New Notification";
//   const notificationOptions = {
//     body: body || "You have a new message.",
//     icon: icon || "/img/man.png",
//     data: data || {}  // Including data with URL or any extra info
//   };

//   console.log("Received message notification:", payload);

//   event.waitUntil(
//     self.registration.showNotification(notificationTitle, notificationOptions)
//   );
// });

// // Handle notification click (background)
// self.addEventListener("notificationclick", (event) => {
//   console.log("Notification clicked in background!");

//   event.notification.close();

//   // Removed the navigation function here, no redirect occurs.
//   console.log("Notification click handled, but no navigation occurs.");
// });
