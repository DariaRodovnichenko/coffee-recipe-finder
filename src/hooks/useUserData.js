import { useEffect, useRef, useState } from "react";
import { auth } from "../firebase/firebase.js";
import { getDatabase, ref, get, set, remove, push } from "firebase/database";
import toast from "react-hot-toast";

export const useUserData = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const isFetchingData = useRef(false);

  useEffect(() => {
    const fetchUserData = async (user) => {
      if (!user || isFetchingData.current) return;
      isFetchingData.current = true; // ✅ Prevent multiple fetches

      const db = getDatabase();
      const userRef = ref(db, `users/${user.uid}`);

      let attempts = 0;
      let snapshot;
      while (attempts < 5) {
        snapshot = await get(userRef);
        if (snapshot.exists()) break;
        await new Promise((resolve) => setTimeout(resolve, 500)); // Retry
        attempts++;
      }

      if (snapshot?.exists()) {
        const userInfo = snapshot.val();
        setUserData(userInfo);
        setIsAdmin(userInfo.role === "admin");
      }

      setLoading(false);
      isFetchingData.current = false; // ✅ Unlock fetch
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        setUserData(null);
        setIsAdmin(false);
        setLoading(false);
        isFetchingData.current = false;
        return;
      }
      setLoading(true);
      fetchUserData(user);
    });

    return () => unsubscribe();
  }, []);

  const addUserRecipe = async (recipe) => {
    const user = auth.currentUser;

    if (!user) {
      toast.error("❌ Please log in to create recipes.");
      return null; // ✅ Return `null` if user is not logged in
    }

    if (
      !recipe ||
      typeof recipe !== "object" ||
      !recipe.name ||
      !recipe.method
    ) {
      console.error("🚨 Invalid recipe submitted:", recipe);
      toast.error("❌ Recipe must have a name and method.");
      return null; // ✅ Return `null` on invalid input
    }

    if (isSaving) {
      console.warn("🚫 Already saving recipe, skipping duplicate submission.");
      return null;
    }

    setIsSaving(true);

    const userId = user.uid;
    const db = getDatabase();
    const userRecipesRef = ref(db, `users/${userId}/createdRecipes`);

    try {
      console.log("📤 Attempting to save recipe:", recipe);

      const newRecipeRef = push(userRecipesRef);
      const recipeId = newRecipeRef.key;

      if (!recipeId) {
        throw new Error("❌ Failed to generate recipe ID.");
      }

      const recipeWithId = { id: recipeId, ...recipe };
      await set(newRecipeRef, recipeWithId);
      console.log("✅ Recipe saved successfully!");

      setUserData((prevData) => ({
        ...prevData,
        createdRecipes: {
          ...(prevData?.createdRecipes || {}),
          [recipeId]: recipeWithId,
        },
      }));

      toast.success("🎉 Recipe added successfully!");

      return recipeWithId; // ✅ Return the saved recipe
    } catch (error) {
      console.error("❌ Error adding recipe:", error);
      toast.error("❌ Failed to add recipe.");
      return null;
    } finally {
      setTimeout(() => setIsSaving(false), 500);
    }
  };

  // ✅ Add recipe to user's favorites (without affecting global recipes)
  const addToFavorites = async (recipe) => {
    if (!auth.currentUser) {
      toast.error("Please log in to add favorites.");
      return;
    }

    const userId = auth.currentUser.uid;
    const db = getDatabase();
    const userFavoritesRef = ref(db, `users/${userId}/favorites`);

    try {
      // Retrieve the full recipe from the global recipes database using the id
      const recipeRef = ref(db, `recipes/${recipe.id}`); // Assuming your recipes are stored under /recipes
      const recipeSnapshot = await get(recipeRef);
      const fullRecipe = recipeSnapshot.val();

      if (!fullRecipe) {
        toast.error("This recipe is not available.");
        return;
      }

      // Store the full recipe under user's favorites
      const newFavoriteRef = push(userFavoritesRef);
      const favoriteWithId = { id: newFavoriteRef.key, ...fullRecipe };

      await set(newFavoriteRef, favoriteWithId);

      // Update local state
      setUserData((prevData) => ({
        ...prevData,
        favorites: {
          ...(prevData?.favorites || {}),
          [newFavoriteRef.key]: favoriteWithId,
        },
      }));

      toast.success("Recipe added to favorites!");
    } catch (error) {
      console.error("Error adding to favorites:", error);
      toast.error("Failed to add recipe.");
    }
  };

  const removeUserRecipe = async (recipeId, isFavorite = false) => {
    if (!auth.currentUser) {
      toast.error("❌ Please log in to remove recipes.");
      return;
    }

    const userId = auth.currentUser.uid;
    const db = getDatabase();
    const recipePath = isFavorite
      ? `users/${userId}/favorites/${recipeId}`
      : `users/${userId}/createdRecipes/${recipeId}`;
    const recipeRef = ref(db, recipePath);

    try {
      // 🔍 **Check if the recipe exists before deleting**
      const recipeSnapshot = await get(recipeRef);
      if (!recipeSnapshot.exists()) {
        toast.error(
          `❌ This recipe does not exist in your ${
            isFavorite ? "favorites" : "created recipes"
          }.`
        );
        return;
      }

      // ❌ **Remove from Firebase**
      await remove(recipeRef);
      console.log(`🗑️ Recipe ${recipeId} removed from Firebase.`);

      // ✅ **Create a new userData object to force React re-render**
      setUserData((prevData) => {
        console.log(prevData);
        if (!prevData) return prevData;

        //   const updatedUserData = { ...prevData }; // Copy entire userData object
        //   if (isFavorite) {
        //     updatedUserData.favorites = { ...prevData.favorites }; // Copy favorites
        //     delete updatedUserData.favorites[recipeId]; // Remove the recipe
        //   } else {
        //     updatedUserData.createdRecipes = { ...prevData.createdRecipes }; // Copy created recipes
        //     delete updatedUserData.createdRecipes[recipeId]; // Remove the recipe
        //   }

        //   console.log("📌 Updated userData after removal:", updatedUserData);
        //   return updatedUserData; // ✅ Return a new object to trigger re-render
        // });

        const updatedUserData = JSON.parse(JSON.stringify(prevData)); // Deep copy!
        if (isFavorite) {
          delete updatedUserData.favorites[recipeId];
        } else {
          delete updatedUserData.createdRecipes[recipeId];
        }
        return updatedUserData;
      });

      toast.success(
        `✅ Recipe removed from ${
          isFavorite ? "favorites" : "created recipes"
        }!`
      );
    } catch (error) {
      console.error("❌ Error removing recipe:", error);
      toast.error("❌ Failed to remove recipe.");
    }
  };

  return {
    userData,
    setUserData,
    loading,
    isAdmin,
    addUserRecipe,
    addToFavorites,
    removeUserRecipe,
  };
};
