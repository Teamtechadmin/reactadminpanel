/* eslint-disable no-undef */
// Scripts for firebase and firebase messaging

importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js",
);

const firebaseConfig = {
  apiKey: "AIzaSyAiuzgOcvwOCji6EJJdKBdMJGhWNxd2zgs",
  authDomain: "merapartners-35393.firebaseapp.com",
  projectId: "merapartners-35393",
  storageBucket: "merapartners-35393.appspot.com",
  messagingSenderId: "28440160509",
  appId: "1:28440160509:web:9efad0eb68c6190d857694",
  measurementId: "G-CKJM3E863C",
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
