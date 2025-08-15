// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQh5TjnKACHRek7q7_bad_njodpFjHYic",
  authDomain: "shopsmart-3100e.firebaseapp.com",
  projectId: "shopsmart-3100e",
  storageBucket: "shopsmart-3100e.firebasestorage.app",
  messagingSenderId: "33692917712",
  appId: "1:33692917712:web:3543ba13b0d3e8370263d5",
  measurementId: "G-HS0C4H5VE6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);