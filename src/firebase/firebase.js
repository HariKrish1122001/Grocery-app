





// import { initializeApp } from "firebase/app";
// import { getMessaging, getToken, onMessage } from "firebase/messaging";

// // Firebase config
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
// const app = initializeApp(firebaseConfig);
// const messaging = getMessaging(app);

// // Request notification permission and get the FCM token
// export const requestPermissionAndGetFCMToken = async () => {
//   try {
//     const permission = await Notification.requestPermission();
//     console.log('Notification permission:', permission);  // Debug log
//     if (permission === "granted") {
//       const currentToken = await getToken(messaging, {
//         vapidKey: "BDAtLt-OIKq5fk8Ztyjaky9_wfXSQUx-jfaxi6DqsV38Y7trVb4jYw2B3gKl58TSXxKODdLugGKX7I-qi3NCUIo", // Replace with your VAPID key
//       });

//       if (currentToken) {
//         console.log('FCM Token:', currentToken);  // Debug log
//         return currentToken;
//       }
//     }
//   } catch (error) {
//     console.error('Error getting permission or token:', error);  // Debug log
//     return null;
//   }
// };

// // Foreground notification handling
// onMessage(messaging, (payload) => {


//   if (Notification.permission === "granted") {
 
//     payload.onclick = function () {
//       window.location.href = 'http://localhost:3000'; // Replace with your app's URL
//     };
//   }
// });






import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Firebase config
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
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Request notification permission and get the FCM token
export const requestPermissionAndGetFCMToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const currentToken = await getToken(messaging, {
        vapidKey: "BDAtLt-OIKq5fk8Ztyjaky9_wfXSQUx-jfaxi6DqsV38Y7trVb4jYw2B3gKl58TSXxKODdLugGKX7I-qi3NCUIo", // Replace with your VAPID key
      });

      if (currentToken) {
        return currentToken;
      }
    }
  } catch (error) {
    console.error('Error getting permission or token:', error);  // Debug log
    return null;
  }
};

// Foreground notification handling
onMessage(messaging, (payload) => {

  const { title, body, icon } = payload.notification;

  if (Notification.permission === "granted") {
    const notificationOptions = {
      body: body || 'You have a new message.',
      icon: icon || '/img/man.png',
    };

    const notification = new Notification(title || "New Notification", notificationOptions);

    notification.onclick = function () {
      window.location.href = 'http://localhost:3000'; // Replace with your app's URL
    };
  }
});
