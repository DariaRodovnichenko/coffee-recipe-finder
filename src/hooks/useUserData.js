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
    if (!auth.currentUser) {
      toast.error("❌ Please log in to create recipes.");
      return;
    }

    if (isSaving) {
      console.warn("🚫 Already saving recipe, skipping duplicate submission.");
      return;
    }

    setIsSaving(true);

    const userId = auth.currentUser.uid;
    const db = getDatabase();
    const userRecipesRef = ref(db, `users/${userId}/createdRecipes`);

    try {
      console.log("📤 Attempting to save recipe:", recipe);

      // ✅ Fetch current recipes to check for duplicates
      const snapshot = await get(userRecipesRef);
      if (snapshot.exists()) {
        const existingRecipes = snapshot.val();
        const isDuplicate = Object.values(existingRecipes).some(
          (r) => r.name === recipe.name && r.method === recipe.method
        );

        if (isDuplicate) {
          console.warn("🚫 Duplicate recipe detected, skipping save.");
          toast.error("Recipe already exists!");
          setIsSaving(false);
          return;
        }
      }

      // ✅ Save recipe to Firebase
      const newRecipeRef = push(userRecipesRef);
      const recipeId = newRecipeRef.key;

      if (!recipeId) {
        throw new Error("❌ Failed to generate recipe ID.");
      }

      const recipeWithId = { id: recipeId, ...recipe };

      await set(newRecipeRef, recipeWithId);
      console.log("✅ Recipe saved successfully!");

      // ✅ DEBUG: Log before UI update
      console.log("🟢 Updating userData with new recipe:", recipeWithId);

      // ✅ Instant UI update
      setUserData((prevData) => {
        console.log("🟡 Before UI update:", prevData);
        const updatedData = {
          ...prevData,
          createdRecipes: {
            ...(prevData?.createdRecipes || {}),
            [recipeId]: recipeWithId, // ✅ Adds the new recipe immediately
          },
        };
        console.log("🔵 After UI update:", updatedData);
        return updatedData;
      });

      toast.success("🎉 Recipe added successfully!");
    } catch (error) {
      console.error("❌ Error adding recipe:", error);
      toast.error("❌ Failed to add recipe.");
    } finally {
      setTimeout(() => setIsSaving(false), 1000);
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

  const removeRecipe = async (recipeId, isFavorite = false, onCloseModal) => {
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
      // 🔍 Check if the recipe exists in the correct location
      const recipeSnapshot = await get(recipeRef);

      if (!recipeSnapshot.exists()) {
        toast.error(
          `❌ This recipe does not exist in your ${
            isFavorite ? "favorites" : "created recipes"
          }.`
        );
        return;
      }

      // ❌ Remove from Firebase (ONLY from user's favorites or createdRecipes)
      await remove(recipeRef);

      // ✅ Close modal (if provided)
      if (onCloseModal) onCloseModal();

      // ✅ Ensure UI updates immediately
      setUserData((prevData) => {
        if (!prevData) return prevData;

        return {
          ...prevData,
          favorites: isFavorite
            ? Object.fromEntries(
                Object.entries(prevData.favorites || {}).filter(
                  ([key]) => key !== recipeId
                )
              )
            : prevData.favorites,
          createdRecipes: !isFavorite
            ? Object.fromEntries(
                Object.entries(prevData.createdRecipes || {}).filter(
                  ([key]) => key !== recipeId
                )
              )
            : prevData.createdRecipes,
        };
      });

      toast.success(
        `✅ Recipe removed from ${
          isFavorite ? "favorites" : "created recipes"
        }!`
      );
      console.log(
        `🗑️ Recipe ${recipeId} removed from ${
          isFavorite ? "favorites" : "created recipes"
        }.`
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
    removeRecipe,
  };
};
