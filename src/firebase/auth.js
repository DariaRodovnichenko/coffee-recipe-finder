import { database } from "./firebase.js";
import { ref, get, set } from "firebase/database";

// ✅ Function to Handle User Authentication & Store in Database
export const handleUserAuth = async (user) => {
  if (!user) return;
  const db = database;
  const userRef = ref(db, `users/${user.uid}`);

  try {
    const snapshot = await get(userRef);
    if (!snapshot.exists()) {
      await set(userRef, {
        uid: user.uid,
        email: user.email,
        username: user.displayName || "",
        role: "user", // ✅ Default role
      });
    }
  } catch (error) {
    console.error("❌ Error handling user auth:", error);
  }
};
