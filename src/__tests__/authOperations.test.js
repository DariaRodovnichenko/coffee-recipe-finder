import { configureStore } from "@reduxjs/toolkit";
import { loginUser } from "../redux/authentication/authOperations";
import authReducer, { setAdminStatus } from "../redux/authentication/authSlice";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";
import { checkAdminStatus } from "../redux/authentication/authAdmin";
jest.mock("../redux/authentication/authAdmin", () => ({
  checkAdminStatus: jest.fn().mockResolvedValue(true), // Adjust as needed
}));

// Mock Firebase imports
jest.mock("../__mocks__/firebase.js"); // ✅ Fix the mock path
jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({})),
  signInWithEmailAndPassword: jest.fn(),
}));
jest.mock("firebase/database", () => ({
  getDatabase: jest.fn(),
  ref: jest.fn(),
  get: jest.fn(),
}));
jest.mock("../redux/authentication/authAdmin", () => ({
  checkAdminStatus: jest.fn(),
}));

// Setup the store
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

describe("loginUser async action", () => {
  it("should login user and retrieve admin status", async () => {
    // Mock user data
    const mockUser = {
      uid: "user123",
      email: "user@example.com",
      username: "testuser",
    };

    // Mock Firebase Authentication
    signInWithEmailAndPassword.mockResolvedValueOnce({
      user: mockUser,
    });

    // Mock Firebase Realtime Database
    get.mockResolvedValueOnce({
      exists: () => true,
      val: () => ({ username: "testuser" }),
    });

    // Mock Admin Status Check (User is Admin)
    checkAdminStatus.mockImplementationOnce((email) => {
      if (email === "user@example.com") {
        store.dispatch(setAdminStatus(true));
      }
    });

    // Dispatch loginUser and wait for it to complete
    await store.dispatch(
      loginUser({ email: "user@example.com", password: "password123" })
    );

    // Check Redux state after login
    const state = store.getState().auth;
    expect(state.user).toEqual(mockUser); // ✅ Correctly stores user data
    expect(state.isAdmin).toBe(true); // ✅ User is an admin
  });

  it("should login user and set admin status as false if user is not admin", async () => {
    // Mock user data (Non-admin)
    const mockUser = {
      uid: "user456",
      email: "nonadmin@example.com",
      username: "nonadminuser",
    };

    // Mock Firebase Authentication
    signInWithEmailAndPassword.mockResolvedValueOnce({
      user: mockUser,
    });

    // Mock Firebase Realtime Database
    get.mockResolvedValueOnce({
      exists: () => true,
      val: () => ({ username: "nonadminuser" }),
    });

    // Mock Admin Status Check (User is NOT Admin)
    checkAdminStatus.mockImplementationOnce((email) => {
      if (email === "nonadmin@example.com") {
        store.dispatch(setAdminStatus(false));
      }
    });

    // Dispatch loginUser and wait for it to complete
    await store.dispatch(
      loginUser({ email: "nonadmin@example.com", password: "password123" })
    );

    // Check Redux state after login
    const state = store.getState().auth;
    expect(state.user).toEqual(mockUser); // ✅ Correctly stores user data
    expect(state.isAdmin).toBe(false); // ✅ User is NOT an admin
  });
});
