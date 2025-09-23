// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // <--- Add this import!

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARjV75CdMRY1aNKK_uNssy9npnrhb-U3g",
  authDomain: "read-it-f3217.firebaseapp.com", // <-- keep this (from console)
  projectId: "read-it-f3217",
  storageBucket: "read-it-f3217.appspot.com",
  messagingSenderId: "413436742608",
  appId: "1:413436742608:web:fb16f1749c2637d8d947d5",
  measurementId: "G-K599BLJP9B"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // <--- Initialize and store the Auth instance

// Export only what you need
export { app, analytics, auth }; // <--- Export 'auth' explicitly!



// Initialize Firebase
