import { useState, useEffect } from "react";
import { auth } from "../firebase/firebase.js";
import { get, getDatabase, ref } from "firebase/database";

export const useAdminStatus = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      setLoading(true);
      try {
        const user = auth.currentUser;
        if (user) {
          const db = getDatabase();
          const userRef = ref(db, `users/${user.uid}`);
          const snapshot = await get(userRef);

          if (snapshot.exists()) {
            const userData = snapshot.val();
            setIsAdmin(userData.role === "admin"); // ✅ Use database role
          }
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("❌ Error checking admin status:", error);
      }
      setLoading(false);
    };

    const unsubscribe = auth.onAuthStateChanged(() => {
      checkAdminStatus();
    });

    return () => unsubscribe();
  }, []);

  return { isAdmin, loading };
};
