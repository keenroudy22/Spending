// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWi_XQ5qq-P14FN9V5GdrqgHEhY-B2nNA",
  authDomain: "spending-902ff.firebaseapp.com",
  projectId: "spending-902ff",
  storageBucket: "spending-902ff.appspot.com",
  messagingSenderId: "424763119988",
  appId: "1:424763119988:web:8bf244879b296a9dc2f421",
  measurementId: "G-GWTQLXRLFH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app);

// Export Firestore functions
export { db, collection, addDoc, getDocs };
