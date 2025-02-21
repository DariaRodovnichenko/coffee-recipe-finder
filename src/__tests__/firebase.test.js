// firebase.test.js
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";

jest.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: jest.fn(),
}));

jest.mock("firebase/database", () => ({
  getDatabase: jest.fn(),
  ref: jest.fn(),
  set: jest.fn(),
  get: jest.fn(),
}));

describe("Firebase Authentication", () => {
  it("should sign in a user with valid credentials", async () => {
    require("firebase/auth").signInWithEmailAndPassword.mockResolvedValue({
      user: { uid: "user123", email: "user@example.com" },
    });

    const userCredential = await signInWithEmailAndPassword(
      auth,
      "user@example.com",
      "password123"
    );

    expect(userCredential.user).toEqual({
      uid: "user123",
      email: "user@example.com",
    });
  });
});
