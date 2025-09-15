// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import config from "../config/config";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: config.firebaseApiKey,
  authDomain: "travel-explorer-a0289.firebaseapp.com",
  projectId: "travel-explorer-a0289",
  storageBucket: "travel-explorer-a0289.firebasestorage.app",
  messagingSenderId: config.fbMessagingSenderId,
  appId: config.fbAppId,
  measurementId: config.fbMeasurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
