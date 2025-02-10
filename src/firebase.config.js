import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  //your firebase credentials
  apiKey: "AIzaSyBiBRD1ECpC1L5v0R8fOeeppEv6qT_p37g",
  authDomain: "mobile-verification-933b7.firebaseapp.com",
  projectId: "mobile-verification-933b7",
  storageBucket: "mobile-verification-933b7.firebasestorage.app",
  messagingSenderId: "574412371120",
  appId: "1:574412371120:web:bda063c7fff23f562eb775"
};
// firebase credential part over.

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
