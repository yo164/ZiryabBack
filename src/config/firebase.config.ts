// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADRm1ot81xIDrrW3iKu6ywdAd8NR1G0gA",
  authDomain: "ziryab-7006e.firebaseapp.com",
  projectId: "ziryab-7006e",
  storageBucket: "ziryab-7006e.firebasestorage.app",
  messagingSenderId: "708163806772",
  appId: "1:708163806772:web:720c4ff307a56df1c14c61",
  measurementId: "G-DHQ753E6NT"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);