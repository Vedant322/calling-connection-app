// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABXJfJOYOi4UM7wWYglVtDH9YqZ0UHbPY",
  authDomain: "call-connections.firebaseapp.com",
  projectId: "call-connections",
  storageBucket: "call-connections.firebasestorage.app",
  messagingSenderId: "629900390726",
  appId: "1:629900390726:web:7e4be25eb244f385243547",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);