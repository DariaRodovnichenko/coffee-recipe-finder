import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDatabase, ref, get } from "firebase/database";

export const checkAdminStatus = createAsyncThunk(
  "auth/checkAdminStatus",
  async (uid, { rejectWithValue }) => {
    try {
      const db = getDatabase();
      const userRef = ref(db, `users/${uid}/role`); // ✅ Check role inside the user profile
      const snapshot = await get(userRef);
      return snapshot.exists() && snapshot.val() === "admin"; // ✅ Only return true if role is "admin"
    } catch (error) {
      console.error("Error checking admin status:", error);
      return rejectWithValue(error.message);
    }
  }
);
