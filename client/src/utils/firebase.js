// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
    authDomain: "quessto-3ba28.firebaseapp.com",
    projectId: "quessto-3ba28",
    storageBucket: "quessto-3ba28.firebasestorage.app",
    messagingSenderId: "751667198987",
    appId: "1:751667198987:web:792ae9d66996d97461db0e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { auth, provider }