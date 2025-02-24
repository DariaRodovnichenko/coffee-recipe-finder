import { ImCancelCircle } from "react-icons/im";
import { useState } from "react";
import {
  Wrapper,
  RecipeName,
  MetaWrapper,
  CloseBtn,
  CardModal,
} from "./RecipeCard.styled.js";
import { useUserData } from "../../hooks/useUserData.js";
import toast from "react-hot-toast";

CardModal.setAppElement("#root"); // Accessibility fix

export const RecipeCard = ({ recipe = {}, onDelete }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { addToFavorites, removeRecipe, userData, setUserData } = useUserData();

  const {
    id,
    name = "Unknown Recipe",
    country = "",
    year = "",
    method = "",
    beans = "",
    grinder = "",
    filter = "",
    ingredients = "",
    steps = "",
  } = recipe;

  const ingredientsArray = ingredients
    ? ingredients.split(",").map((item) => item.trim())
    : [];
  const stepsArray = steps ? steps.split(",").map((item) => item.trim()) : [];

  // ✅ Check if the recipe is in user's favorites
  const isFavorite =
    userData?.favorites &&
    Object.values(userData.favorites).some((fav) => fav.id === id);

  // ✅ Check if the recipe is created by the user
  const isCreatedByUser =
    userData?.createdRecipes &&
    Object.values(userData.createdRecipes).some((rec) => rec.id === id);

  // ✅ Toggle favorite status and close modal
  const handleToggleFavorite = async () => {
    try {
      let keyToRemove = id;
  
      if (isFavorite) {
        // 🔍 Find the correct Firebase key
        const favoriteEntry = Object.entries(userData.favorites || {}).find(
          ([, favRecipe]) => favRecipe.id === id
        );
  
        if (!favoriteEntry) {
          console.warn(`❌ Recipe ${id} not found in favorites.`);
          toast.error("❌ Recipe not found in favorites.");
          return;
        }
  
        keyToRemove = favoriteEntry[0]; // ✅ Use correct Firebase key
      }
  
      // if (isFavorite) {
      //   await removeRecipe(keyToRemove, true);
      // } else {
      //   await addToFavorites(recipe);
      // }
  
      // // ✅ **Ensure UI Updates Properly by creating a NEW OBJECT**
      // setUserData((prevData) => {
      //   if (!prevData) return prevData;
  
      //   const updatedFavorites = { ...prevData.favorites };
  
      //   if (isFavorite) {
      //     delete updatedFavorites[keyToRemove]; // Remove from favorites
      //   } else {
      //     updatedFavorites[keyToRemove] = recipe; // Add to favorites
      //   }
  
      //   return { ...prevData, favorites: { ...updatedFavorites } }; // ✅ New object forces re-render
      // });
  
      if (isFavorite) {
        await removeRecipe(keyToRemove, true);
      } else {
        await addToFavorites(recipe);
      }
  
      setUserData((prevData) => {
        if (!prevData) return prevData;
  
        const updatedUserData = JSON.parse(JSON.stringify(prevData)); // Deep copy!
        if (isFavorite) {
          delete updatedUserData.favorites[keyToRemove];
        } else {
          updatedUserData.favorites[keyToRemove] = JSON.parse(JSON.stringify(recipe)); // Deep Copy recipe too!
        }
        return updatedUserData;
      });

      setModalIsOpen(false); // ✅ Close modal
    } catch (error) {
      console.error("❌ Error toggling favorite:", error);
      toast.error("❌ Failed to update favorites.");
    }
  };
  
  // ✅ Remove recipe from Favorites or Created Recipes
  const handleRemoveRecipe = async () => {
    console.log(`🗑️ Removing recipe from UI: ${id}`);
    try {
      await onDelete(); // ✅ Calls `handleRemoveRecipe` from UserPage.js
      console.log(`✅ Successfully removed from UI: ${id}`);
      setModalIsOpen(false); // ✅ Close modal
    } catch (error) {
      console.error("❌ Error removing recipe:", error);
      toast.error("❌ Failed to remove recipe.");
    }
  };

  return (
    <Wrapper>
      {/* Clickable Card to Open Modal */}
      <div onClick={() => setModalIsOpen(true)} style={{ cursor: "pointer" }}>
        <RecipeName>{name}</RecipeName>

        {country && <p>Representative of {country}</p>}
        {year && (
          <p>
            Year of performance: <span>{year}</span>
          </p>
        )}
        <p>
          <strong>Method of brewing:</strong> {method}
        </p>
      </div>

      {/* Recipe Modal */}
      <CardModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Recipe Details"
      >
        <h2>{name}</h2>
        {country && <p>Representative of {country}</p>}
        {year && <p>Year of performance: {year}</p>}
        <p>
          <strong>Method of brewing:</strong> {method}
        </p>

        <MetaWrapper>
          {beans && (
            <p>
              <strong>Beans:</strong> {beans}
            </p>
          )}
          {grinder && (
            <p>
              <strong>Grinder:</strong> {grinder}
            </p>
          )}
          {filter && (
            <p>
              <strong>Filter:</strong> {filter}
            </p>
          )}

          {ingredientsArray.length > 0 && (
            <>
              <h3>Ingredients:</h3>
              <ul>
                {ingredientsArray.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </>
          )}

          {stepsArray.length > 0 && (
            <>
              <h3>Step By Step:</h3>
              <ol>
                {stepsArray.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </>
          )}

          {/* ✅ Show Correct Button Based on Recipe Type */}
          {!isCreatedByUser && (
            <button onClick={handleToggleFavorite}>
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          )}

          {isCreatedByUser && (
            <button onClick={handleRemoveRecipe}>Remove Recipe</button>
          )}
        </MetaWrapper>

        <CloseBtn onClick={() => setModalIsOpen(false)}>
          <ImCancelCircle />
        </CloseBtn>
      </CardModal>
    </Wrapper>
  );
};
