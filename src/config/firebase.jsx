// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBF2HFZWpsttghhG5Z58CU7uPrzosFTevs",
  authDomain: "react-course-afe78.firebaseapp.com",
  projectId: "react-course-afe78",
  storageBucket: "react-course-afe78.firebasestorage.app",
  messagingSenderId: "826615294719",
  appId: "1:826615294719:web:1beaf3892265167412faca",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();

export const db = getFirestore(app);
