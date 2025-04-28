// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgaahIDBalazjShG2bhPsHlO_rgQNAkgo",
  authDomain: "netflix-gpt-95100.firebaseapp.com",
  projectId: "netflix-gpt-95100",
  storageBucket: "netflix-gpt-95100.firebasestorage.app",
  messagingSenderId: "468617022726",
  appId: "1:468617022726:web:916e9fc685ff8985d26287"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
