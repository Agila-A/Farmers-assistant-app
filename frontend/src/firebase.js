// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKxrnv6c_yaVP5LNdC6dO71XcEjk4CzKI",
  authDomain: "farmersassistant-b8178.firebaseapp.com",
  projectId: "farmersassistant-b8178",
  storageBucket: "farmersassistant-b8178.firebasestorage.app",
  messagingSenderId: "527098004464",
  appId: "1:527098004464:web:fd847deba0ee679b6b1335"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);

export { db, auth, provider };
export default app;