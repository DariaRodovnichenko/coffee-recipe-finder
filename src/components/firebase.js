import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "coffee-recipe-finder.firebaseapp.com",
  databaseURL:
    "https://coffee-recipe-finder-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "coffee-recipe-finder",
  storageBucket: "coffee-recipe-finder.firebasestorage.app",
  messagingSenderId: "999168278096",
  appId: "1:999168278096:web:1eef9bd77cbf27572f5b55",
  measurementId: "G-579TPKVLTM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
export const database = getDatabase(app);
