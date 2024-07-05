/* eslint-disable no-undef */
// Scripts for firebase and firebase messaging

importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js",
);

// Fetch Firebase configuration from the server
self.addEventListener("install", (event) => {
  event.waitUntil(
    fetch("/api/firebase-config")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((firebaseConfig) => {
        // Initialize the Firebase app in the service worker with the fetched config
        firebase.initializeApp(firebaseConfig);

        // Retrieve firebase messaging
        const messaging = firebase.messaging();
        console.log("FIREBASE INITIATED");
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

          self.registration.showNotification(
            notificationTitle,
            notificationOptions,
          );
        });
      })
      .catch((error) => {
        console.error("Error fetching Firebase config:", error);
      }),
  );
});
