import { useState, useEffect } from "react";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { auth } from "../firebase/firebase.js";
import toast from "react-hot-toast";

export const useManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("🔍 useEffect: Fetching users...");

    const db = getDatabase();
    const usersRef = ref(db, "users");

    const unsubscribe = onValue(
      usersRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const usersArray = Object.entries(snapshot.val()).map(
            ([uid, user]) => ({
              uid,
              ...user,
            })
          );

          console.log("✅ Fetched Users:", usersArray);
          setUsers(usersArray);
        } else {
          console.warn("⚠️ No users found in database.");
          setUsers([]);
        }
        setLoading(false);
      },
      (error) => {
        console.error("❌ Firebase Read Error:", error);
        setError("Failed to load users.");
        setLoading(false);
      }
    );

    return () => unsubscribe(); // ✅ Cleanup Firebase listener
  }, []);

  const deleteUser = async (uid) => {
    console.log(`🗑️ [useManageUsers] Attempting to delete user: ${uid}`);
    if (uid === auth.currentUser?.uid) {
      toast.error("❌ You cannot delete your own account.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const db = getDatabase();
      const userRef = ref(db, `users/${uid}`);

      await remove(userRef);
      setUsers((prevUsers) => prevUsers.filter((user) => user.uid !== uid)); // ✅ Update local state after deletion
      toast.success("✅ User deleted successfully.");
      console.log(`✅ [useManageUsers] User ${uid} deleted.`);
    } catch (error) {
      console.error("❌ [useManageUsers] Error deleting user:", error);
      toast.error("Failed to delete user.");
    }
  };

  return { users, loading, error, deleteUser };
};
