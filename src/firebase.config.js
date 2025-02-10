import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  //your firebase credentials
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

// firebase

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
