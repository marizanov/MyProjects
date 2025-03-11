import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ✅ Add this

const firebaseConfig = {
  apiKey: "AIzaSyDs2BRgHTXjr8xzb6ou5RENUY5oYNahzJo",
  authDomain: "challenge-21-react-5.firebaseapp.com",
  projectId: "challenge-21-react-5",
  storageBucket: "challenge-21-react-5.firebasestorage.app",
  messagingSenderId: "237418221712",
  appId: "1:237418221712:web:2ccaa77bae3ea7cdde8815",
  measurementId: "G-2ZRD415VLM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); 

export { app, auth, db }; 



