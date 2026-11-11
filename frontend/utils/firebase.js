import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "setu-734ac.firebaseapp.com",
  projectId: "setu-734ac",
  storageBucket: "setu-734ac.firebasestorage.app",
  messagingSenderId: "251271356269",
  appId: "1:251271356269:web:d0165236ad24138ab04464",
  measurementId: "G-4QGSV84CMH"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});
