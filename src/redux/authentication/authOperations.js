import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../firebase/firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database"; // Realtime Database imports
import toast from "react-hot-toast";
import { resetAuthState, setAdminStatus } from "./authSlice.js";
import { handleUserAuth } from "../../firebase/auth.js";

export const refreshAuthToken = async () => {
  if (auth.currentUser) {
    console.log("🔄 Refreshing auth token...");
    await auth.currentUser.getIdToken(true); // Forces Firebase to update the token
    console.log("✅ Token refreshed!");
  }
};

// ✅ Register User & Assign Role
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ email, password, username }, { rejectWithValue }) => {
    try {
      const db = getDatabase();
      const role = "user"; // Default role for new users

      // ✅ Step 1: Create Firebase User
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // ✅ Step 2: Save User Data to Firebase Realtime Database & Wait for it
      const userRef = ref(db, `users/${user.uid}`);
      await set(userRef, {
        uid: user.uid,
        email,
        username,
        role, // Role stored in database
      });

      console.log(`✅ User created: ${user.uid} (Role: ${role})`);

      // ✅ Step 3: Wait for data to be available before proceeding
      let attempts = 0;
      let userData;
      while (attempts < 5) {
        // Retry up to 5 times
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          userData = snapshot.val();
          break;
        }
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait before retrying
        attempts++;
      }

      if (!userData) {
        throw new Error("User data failed to save in database.");
      }

      toast.success("Successfully registered!");
      return userData; // ✅ Return fetched user data instead of manually creating an object
    } catch (error) {
      console.error("❌ Registration error:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Login User & Retrieve Role
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    try {
      // ✅ Step 1: Sign in user
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      console.log("✅ Logged in as:", user.email);

      // ✅ Step 2: Fetch User Role from Realtime Database
      const db = getDatabase();
      const userRef = ref(db, `users/${user.uid}`);
      const snapshot = await get(userRef);

      if (!snapshot.exists()) {
        throw new Error("User not found in the database.");
      }

      const userData = snapshot.val();
      // Default role if not found
      const role = userData.role || "user";
      // Use database role
      const isAdmin = role === "admin";

      dispatch(setAdminStatus(isAdmin));
      dispatch(setUser(userData));

      console.log(`🔍 User Role: ${role}`);
      toast.success("Successfully logged in!");
      return userData;
    } catch (error) {
      console.error("❌ Login error:", error);
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Logout User
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      await signOut(auth);
      dispatch(resetAuthState()); // ✅ Clear user state
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

let authListenerInitialized = false;

export const listenForAuthChanges = createAsyncThunk(
  "auth/listenForAuthChanges",
  async (_, { dispatch, getState }) => {
    if (authListenerInitialized) return; // ✅ Prevent multiple listeners
    authListenerInitialized = true;

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        await refreshAuthToken();

        const db = getDatabase();
        const userRef = ref(db, `users/${user.uid}`);
        const snapshot = await get(userRef);

        if (!snapshot.exists()) return;

        const userData = snapshot.val();
        const role = userData.role || "user";
        const isAdmin = role === "admin";

        if (getState().auth.user?.uid !== user.uid) {
          dispatch(setUser(userData));
        }

        dispatch(setAdminStatus(isAdmin));
      } else {
        dispatch(setUser(null));
      }
    });
  }
);

// ✅ Google Sign-In
export const signInWithGoogle = createAsyncThunk(
  "auth/signInWithGoogle",
  async (_, { rejectWithValue, dispatch }) => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // ✅ Ensure Firebase Database Structure
      await handleUserAuth(user);

      // ✅ Retrieve Admin Status
      const db = getDatabase();
      const userRef = ref(db, `users/${user.uid}`);
      const snapshot = await get(userRef);
      const isAdmin = snapshot.exists() && snapshot.val().role === "admin";
      dispatch(setAdminStatus(isAdmin));

      return user;
    } catch (error) {
      console.error("❌ Google Sign-In error:", error);
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Helper Action to Update Redux State
const setUser = (user) => ({
  type: "auth/setUser",
  payload: user,
});
