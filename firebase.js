
// Import and configure Firebase
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
    // Your Firebase config object here
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
