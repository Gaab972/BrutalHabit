import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1M_QQEwZnznsksIIuHVMtN3D-f6bCX-Q",
  authDomain: "brutalhabits-14c08.firebaseapp.com",
  projectId: "brutalhabits-14c08",
  storageBucket: "brutalhabits-14c08.firebasestorage.app",
  messagingSenderId: "935295270194",
  appId: "1:935295270194:web:a4ce8fa71d6e696f786b2b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Exports utiles
export const database = getFirestore(app);
export const auth = getAuth(app);