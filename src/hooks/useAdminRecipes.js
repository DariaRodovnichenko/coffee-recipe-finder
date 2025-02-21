import { useState, useEffect } from "react";
import { getDatabase, ref, push, onValue, set } from "firebase/database";

// ✅ Custom Hook to manage admin recipes
export const useAdminRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const db = getDatabase();
    const recipesRef = ref(db, "recipes");

    // ✅ Listen for real-time updates instead of fetching once
    const unsubscribe = onValue(
      recipesRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setRecipes(
            Object.entries(snapshot.val()).map(([id, recipe]) => ({
              id,
              ...recipe,
            }))
          ); // ✅ Convert object to array
        } else {
          setRecipes([]); // ✅ No recipes yet
        }
        setLoading(false);
      },
      (error) => {
        console.error("❌ Error fetching recipes:", error);
        setError(error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe(); // ✅ Cleanup listener on unmount
  }, []);

  // ✅ Function to add a recipe to Firebase
  const addRecipe = async (newRecipe) => {
    console.log("🔥 addRecipe function is running!"); // ✅ Confirm function execution
    console.log("🔥 Adding recipe:", newRecipe); // ✅ Ensure newRecipe is received
    try {
      setLoading(true);
      setError(null);

      const db = getDatabase();
      const recipesRef = ref(db, "recipes");
      const newRecipeRef = push(recipesRef); // ✅ Generate a unique ID

      await set(newRecipeRef, newRecipe); // ✅ Save with generated ID
      console.log("✅ Recipe added successfully:", newRecipe);
    } catch (error) {
      setError(`❌ Error adding recipe: ${error.code} - ${error.message}`);
      console.error("❌ Error adding recipe:", error);
    } finally {
      setLoading(false);
    }
  };

  return { recipes, loading, error, addRecipe };
};
