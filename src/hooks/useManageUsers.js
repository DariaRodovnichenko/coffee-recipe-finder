import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { auth } from "../firebase/firebase.js"; // Ensure auth is properly imported
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

// ✅ REPLACE WITH YOUR **ACTUAL FUNCTION URLs**:
const GET_USERS_URL =
  "https://europe-west1-coffee-recipe-finder.cloudfunctions.net/getUsers";
const DELETE_USER_URL =
  "https://europe-west1-coffee-recipe-finder.cloudfunctions.net/deleteUser";

export const useManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAdmin } = useSelector((state) => state.auth); // ✅ Check Redux for admin status

  // 🔍 Fetch Users from Cloud Function
  const fetchUsers = useCallback(async () => {
    console.log("🔄 fetchUsers() CALLED!");

    try {
      const response = await axios.get(GET_USERS_URL, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("✅ Users fetched:", response.data);
      setUsers(response.data);
    } catch (error) {
      console.error("❌ Error fetching users:", error);
      setError(error.response?.data?.error || "Failed to load users.");
      toast.error("❌ Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  }, []); // ✅ No external dependencies

  useEffect(() => {
    console.log("🔍 useEffect TRIGGERED in useManageUsers.js");
    fetchUsers();
  }, [fetchUsers]); // ✅ Now ESLint won't complain!

  // 🗑️ Delete a User (Admin Only)
  const deleteUser = async (uid) => {
    console.log(`🗑️ [useManageUsers] Attempting to delete user: ${uid}`);

    try {
      if (!isAdmin) {
        throw new Error("Unauthorized: You are not an admin.");
      }

      const user = auth.currentUser;
      if (!user) {
        throw new Error("User not authenticated.");
      }

      // 🔐 Get Firebase Auth Token
      const token = await user.getIdToken();

      await axios.delete(`${DELETE_USER_URL}?uid=${uid}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // ✅ Update state to remove deleted user
      setUsers((prevUsers) => prevUsers.filter((user) => user.uid !== uid));

      toast.success("✅ User deleted successfully.");
      console.log(`✅ [useManageUsers] User ${uid} deleted.`);
    } catch (error) {
      console.error("❌ [useManageUsers] Error deleting user:", error);
      toast.error("❌ Failed to delete user.");
    }
  };

  return { users, loading, error, fetchUsers, deleteUser };
};
