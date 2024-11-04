// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYiFtPD6ioyAq3ci1rm2dkV44xX_e_TKY",
  authDomain: "chromatica-e-commerce.firebaseapp.com",
  projectId: "chromatica-e-commerce",
  storageBucket: "chromatica-e-commerce.appspot.com",
  messagingSenderId: "189020287496",
  appId: "1:189020287496:web:cb95342004bf2934cd57bd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
