import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import { listenForAuthChanges } from "./authOperations.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Dispatch the listener when the app starts
store.dispatch(listenForAuthChanges());

export default store;
