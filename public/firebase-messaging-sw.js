/* eslint-disable no-undef */
// Scripts for firebase and firebase messaging

importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js",
);

const firebaseConfig = {
  apiKey: "AIzaSyCqieSmiIe9STIaP8UBBBR-E05hCOkFfTc",
  authDomain: "react-message-service.firebaseapp.com",
  projectId: "react-message-service",
  storageBucket: "react-message-service.appspot.com",
  messagingSenderId: "1089574679017",
  appId: "1:1089574679017:web:557e5973097d164aa59b78",
};

// Initialize the Firebase app in the service worker by passing the firebaseConfig directly
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload,
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
