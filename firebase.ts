// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { FirebaseApp, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKdArTNwiXlLK0aBmVxCevTJQ5vp787X0",
  authDomain: "personal-diary-e5517.firebaseapp.com",
  projectId: "personal-diary-e5517",
  storageBucket: "personal-diary-e5517.firebasestorage.app",
  messagingSenderId: "686136441402",
  appId: "1:686136441402:web:83dbcf0d6631a6acc65303",
  measurementId: "G-SMEKLQT7ZF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth =  getAuth(app);
export const db = getFirestore(app);

