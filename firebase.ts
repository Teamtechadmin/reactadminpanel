import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";
import axios from "axios";

let firebaseConfig: any = null;

const fetchFirebaseConfig = async () => {
  if (!firebaseConfig) {
    const response = await axios.get("/api/firebase-config");
    firebaseConfig = response.data;
  }
  return firebaseConfig;
};

const initializeFirebaseApp = async () => {
  const config = await fetchFirebaseConfig();
  return getApps().length === 0 ? initializeApp(config) : getApp();
};

const messaging = async () => {
  const app = await initializeFirebaseApp();
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
};

export const fetchToken = async () => {
  try {
    const fcmMessaging = await messaging();
    if (fcmMessaging) {
      const config = await fetchFirebaseConfig();
      const token = await getToken(fcmMessaging, {
        vapidKey: config.vapidKey,
      });
      return token;
    }
    return null;
  } catch (err) {
    console.error("An error occurred while fetching the token:", err);
    return null;
  }
};

export { initializeFirebaseApp, messaging };
