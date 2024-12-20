// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPyHaalU7Dk8TINWy71H2mXPreH4YzGI8",
  authDomain: "email-password-auth-af2bc.firebaseapp.com",
  projectId: "email-password-auth-af2bc",
  storageBucket: "email-password-auth-af2bc.firebasestorage.app",
  messagingSenderId: "481892040312",
  appId: "1:481892040312:web:f918abf0e9ad49b3de778d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
