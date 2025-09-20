// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ✅ Firestore
import config from "../config/config";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: config.firebaseApiKey,
  authDomain: "travel-explorer-a0289.firebaseapp.com",
  projectId: "travel-explorer-a0289",
  storageBucket: "travel-explorer-a0289.appspot.com", // ✅ corrected domain
  messagingSenderId: config.fbMessagingSenderId,
  appId: config.fbAppId,
  measurementId: config.fbMeasurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Export Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// ✅ Export Firestore
export const db = getFirestore(app);

export default app;

