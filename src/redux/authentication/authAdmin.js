import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDatabase, ref, get } from "firebase/database";
import { setAdminStatus } from "./authSlice.js"; // Import Redux action

export const checkAdminStatus = createAsyncThunk(
  "auth/checkAdminStatus",
  async (uid, { rejectWithValue, dispatch }) => {
    try {
      console.log(`🔍 Checking admin status for UID: ${uid}`);
      const db = getDatabase();
      const userRef = ref(db, `users/${uid}/role`);
      const snapshot = await get(userRef);

      if (snapshot.exists() && snapshot.val() === "admin") {
        console.log("✅ Admin confirmed!");
        dispatch(setAdminStatus(true));
        return true; // ✅ Return true for Redux
      }

      console.warn("❌ Not an admin!");
      dispatch(setAdminStatus(false));
      return false;
    } catch (error) {
      console.error("🚨 Error checking admin status:", error);
      return rejectWithValue(error.message);
    }
  }
);
