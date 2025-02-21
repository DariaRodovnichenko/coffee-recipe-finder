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

export const UserPage = () => {
  const { userData, setUserData, loading, removeRecipe, addUserRecipe } =
    useUserData();
  const [isCreating, setIsCreating] = useState(false);

  console.log("🔄 Rendering UserPage with userData:", userData);

  if (loading) return <Loader />;

  // ✅ Function to remove a recipe and update UI immediately
  const handleRemoveRecipe = (recipeId, isFavorite = false, onCloseModal) => {
    removeRecipe(recipeId, isFavorite, () => {
      if (onCloseModal) onCloseModal();

      // ✅ Update UI optimistically
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
    });
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
              onSubmit={(values) => {
                console.log("✅ Submitting new recipe from UserPage:", values);
                addUserRecipe(values);
                setIsCreating(false);

                // ✅ Instantly update `userData` without waiting for Firebase
                setUserData((prevData) => ({
                  ...prevData,
                  createdRecipes: {
                    ...(prevData?.createdRecipes || {}),
                    [values.name]: { id: values.name, ...values }, // ✅ Adds recipe instantly
                  },
                }));
              }}
              onCancel={() => setIsCreating(false)}
            />
          </RecipeFormWrapper>
        )}

        {/* ✅ Render Recipes Directly from userData */}
        {userData?.createdRecipes &&
          Object.entries(userData.createdRecipes).map(([key, recipe]) => (
            <RecipeCard
              key={recipe.id || key}
              recipe={recipe}
              onDelete={() => handleRemoveRecipe(recipe.id, false)}
            />
          ))}
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
