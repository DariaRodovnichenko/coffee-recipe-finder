import { useEffect, useState } from "react";
import { Loader } from "../../components/Loader/Loader.js";
import { RecipeCard } from "../../components/RecipeCard/RecipeCard.js";
import { useUserData } from "../../hooks/useUserData.js";
import { RecipeForm } from "../../components/RecipeForm/RecipeForm.js";
import {
  RecipeList,
  Wrapper,
  RecipeCardNew,
  PlusIcon,
  RecipeFormWrapper,
} from "./UserPage.styled.js";
import toast from "react-hot-toast";

export const UserPage = () => {
  const { userData, setUserData, loading, removeUserRecipe } = useUserData();
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    console.log("🟢 UI Re-Rendering with Updated userData:", userData);
  }, [userData]);

  if (loading) return <Loader />;

  // ✅ Function to remove a recipe and update UI instantly
  const handleRemoveUserRecipe = async (recipeId, isFavorite = false) => {
    console.log(
      `🗑️ Removing recipe: ${recipeId} from ${
        isFavorite ? "favorites" : "created recipes"
      }`
    );

    let keyToRemove = recipeId; // Default for created recipes

    if (isFavorite) {
      // 🔍 **Find the correct Firebase key in favorites**
      const favoriteEntry = Object.entries(userData.favorites || {}).find(
        ([, favRecipe]) => favRecipe.id === recipeId
      );

      if (!favoriteEntry) {
        console.warn(`❌ Recipe ${recipeId} not found in favorites.`);
        toast.error("❌ Recipe not found in favorites.");
        return;
      }

      keyToRemove = favoriteEntry[0]; // ✅ Use Firebase key for removal
    }

    try {
      await removeUserRecipe(keyToRemove, isFavorite);
      console.log(`✅ Successfully removed recipe: ${recipeId}`);

      // ✅ **Ensure UI Updates Before Closing Modal**
      // setUserData((prevData) => {
      //   if (!prevData) return prevData;

      //   const updatedUserData = { ...prevData }; // Copy entire userData object
      //   if (isFavorite) {
      //     updatedUserData.favorites = { ...prevData.favorites };
      //     delete updatedUserData.favorites[keyToRemove]; // Remove the favorite
      //   } else {
      //     updatedUserData.createdRecipes = { ...prevData.createdRecipes };
      //     delete updatedUserData.createdRecipes[keyToRemove]; // Remove the created recipe
      //   }

      //   return updatedUserData; // ✅ React will detect the change
      // });

      setUserData((prevData) => {
        console.log(prevData);
        if (!prevData) return prevData;

        // Create entirely new objects to guarantee re-render
        const newFavorites = isFavorite
          ? Object.entries(prevData.favorites || {})
              .filter(([key]) => key !== recipeId)
              .reduce((acc, [key, value]) => {
                acc[key] = value;
                return acc;
              }, {})
          : prevData.favorites;
        console.log(newFavorites);

        const newCreatedRecipes = !isFavorite
          ? Object.entries(prevData.createdRecipes || {})
              .filter(([key]) => key !== recipeId)
              .reduce((acc, [key, value]) => {
                acc[key] = value;
                return acc;
              }, {})
          : prevData.createdRecipes;

        return {
          ...prevData,
          favorites: newFavorites,
          createdRecipes: newCreatedRecipes,
        };
      });

      toast.success(
        `Recipe removed from ${isFavorite ? "favorites" : "created recipes"}!`
      );
    } catch (error) {
      console.error("❌ Error removing recipe:", error);
      toast.error("❌ Failed to remove recipe.");
    }
  };

  return (
    <Wrapper>
      <h2>Your Created Recipes</h2>
      <RecipeList>
        <RecipeCardNew onClick={() => setIsCreating(true)}>
          <PlusIcon>➕</PlusIcon>
          <p>Add Recipe</p>
        </RecipeCardNew>

        {isCreating && (
          <RecipeFormWrapper>
            <RecipeForm
              onSubmit={async (newRecipe) => {
                if (!newRecipe) {
                  toast.error("Something went wrong. Please try again.");
                  return;
                }

                // ✅ Update userData to reflect the new recipe instantly
                setUserData((prevData) => ({
                  ...prevData,
                  createdRecipes: {
                    ...(prevData?.createdRecipes || {}),
                    [newRecipe.id]: newRecipe,
                  },
                }));

                setIsCreating(false);
              }}
              onCancel={() => setIsCreating(false)}
            />
          </RecipeFormWrapper>
        )}

        {userData?.createdRecipes &&
          Object.entries(userData.createdRecipes).map(([key, recipe]) => (
            <RecipeCard
              key={key}
              recipe={recipe}
              onDelete={(recipeId) => handleRemoveUserRecipe(recipeId, false)}
            />
          ))}
      </RecipeList>

      <h2>Your Favorite Recipes</h2>
      <RecipeList>
        {userData?.favorites &&
          Object.entries(userData.favorites).map(([key, recipe]) => (
            <RecipeCard
              key={key}
              recipe={recipe}
              onDelete={(recipeId) => handleRemoveUserRecipe(recipeId, true)}
            />
          ))}
      </RecipeList>
    </Wrapper>
  );
};
