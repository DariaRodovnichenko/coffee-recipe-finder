import { createSlice } from "@reduxjs/toolkit";
import {
  loginUser,
  logoutUser,
  listenForAuthChanges,
} from "./authOperations.js";
import { checkAdminStatus } from "./authAdmin.js"; // Import checkAdminStatus

const initialState = {
  isAdmin: false,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log("🟢 Redux: Setting user ->", action.payload);
      state.user = action.payload;
    },
    setAdminStatus: (state, action) => {
      console.log("🟡 Redux: Setting admin status ->", action.payload);
      state.isAdmin = action.payload;
    },
    resetAuthState: (state) => {
      return initialState; // ✅ Clears user on logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log(
          "🟢 Redux: Login successful, setting user ->",
          action.payload
        );
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
         console.log("🔴 Redux: User logged out, resetting state");
        state.user = null;
        state.isAdmin = false; // Reset admin status on logout
      })
      .addCase(listenForAuthChanges.fulfilled, (state, action) => {
        console.log("🔄 Redux: Auth state changed ->", action.payload);
        state.user = action.payload;
      })
      // Handle admin status check
      .addCase(checkAdminStatus.fulfilled, (state, action) => {
        console.log("🔵 Redux: Admin status updated ->", action.payload);
        state.isAdmin = action.payload; // Update isAdmin based on the check
      });
  },
});

export const { setUser, setAdminStatus, resetAuthState } = authSlice.actions;
export default authSlice.reducer;
