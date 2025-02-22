import { useState } from "react";
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
  const { userData, setUserData, loading, removeRecipe } = useUserData();
  const [isCreating, setIsCreating] = useState(false);

  console.log("🔄 Rendering UserPage with userData:", userData);

  if (loading) return <Loader />;

  // ✅ Function to remove a recipe and update UI immediately
  const handleRemoveRecipe = (recipeId, isFavorite = false, onCloseModal) => {
    console.log(`🗑️ Removing recipe ${recipeId}`);

    // 🔄 **Optimistic UI Update Before Calling removeRecipe**
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

    removeRecipe(recipeId, isFavorite, onCloseModal);
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
                  console.error(
                    "🚨 Recipe submission failed, no recipe returned."
                  );
                  toast.error("Something went wrong. Please try again.");
                  return;
                }

                console.log(
                  "✅ Recipe submitted successfully in UserPage:",
                  newRecipe
                );

                // ✅ Manually update userData to reflect the new recipe instantly
                setUserData((prevData) => ({
                  ...prevData,
                  createdRecipes: {
                    ...(prevData?.createdRecipes || {}),
                    [newRecipe.id]: newRecipe, // ✅ Update UI immediately
                  },
                }));

                setIsCreating(false); // ✅ Closes the form properly
              }}
            />
          </RecipeFormWrapper>
        )}

        {/* ✅ Ensure `createdRecipes` is correctly mapped */}
        {userData?.createdRecipes &&
        Object.keys(userData.createdRecipes).length > 0 ? (
          Object.entries(userData.createdRecipes).map(([key, recipe]) => (
            <RecipeCard
              key={recipe.id || key} // ✅ Ensure unique key
              recipe={recipe}
              onDelete={() => handleRemoveRecipe(recipe.id, false)}
            />
          ))
        ) : (
          <p>No created recipes yet.</p> // ✅ Show message when there are no recipes
        )}
      </RecipeList>

      <h2>Your Favorite Recipes</h2>
      <RecipeList>
        {userData?.favorites &&
          Object.entries(userData.favorites).map(([key, recipe]) => (
            <RecipeCard
              key={recipe.id || key}
              recipe={recipe}
              onDelete={() => handleRemoveRecipe(recipe.id, true)}
            />
          ))}
      </RecipeList>
    </Wrapper>
  );
};
