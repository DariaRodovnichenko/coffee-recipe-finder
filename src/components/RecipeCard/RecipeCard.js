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
import { useAdminRecipes } from "../../hooks/useAdminRecipes.js";

CardModal.setAppElement("#root"); // Accessibility fix

export const RecipeCard = ({ recipe = {}, onDelete }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { addToFavorites, removeUserRecipe, userData, setUserData } =
    useUserData();
  const { deleteRecipe } = useAdminRecipes();

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

  const isAdmin = userData?.role === "admin";

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

        keyToRemove = favoriteEntry[0];
        await removeUserRecipe(keyToRemove, true);
      } else {
        await addToFavorites(recipe);
      }

      setUserData((prevData) => {
        if (!prevData) return prevData;

        const updatedUserData = JSON.parse(JSON.stringify(prevData)); // Deep copy!
        if (isFavorite) {
          delete updatedUserData.favorites[keyToRemove];
        } else {
          updatedUserData.favorites[keyToRemove] = JSON.parse(
            JSON.stringify(recipe)
          ); // Deep Copy recipe too!
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
  const handleRemoveUserRecipe = async () => {
    console.log(`🗑️ Attempting to remove recipe from UI: ${id}`);

    try {
      if (!onDelete) {
        console.error("❌ onDelete function is not defined in RecipeCard!");
        return;
      }

      await onDelete(id, true); // ✅ Call the function passed from `UserPage.js`
      console.log(`✅ Successfully removed from UI: ${id}`);
      setModalIsOpen(false); // ✅ Close modal
    } catch (error) {
      console.error("❌ Error removing recipe:", error);
      toast.error("❌ Failed to remove recipe.");
    }
  };

  // ✅ Remove recipe from Firebase (Admin only)
  const handleDeleteRecipe = async () => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;
    try {
      await deleteRecipe(id);
      toast.success("✅ Recipe deleted successfully.");
      setModalIsOpen(false); // ✅ Close modal after deletion
    } catch (error) {
      console.error("❌ Error deleting recipe:", error);
      toast.error("❌ Failed to delete recipe.");
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
            <button
              onClick={() => {
                if (isFavorite) {
                  handleRemoveUserRecipe(); // ✅ Use correct function for removing
                } else {
                  handleToggleFavorite(); // ✅ Use toggle function for adding
                }
              }}
            >
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          )}

          {isCreatedByUser && (
            <button onClick={handleRemoveUserRecipe}>Remove Recipe</button>
          )}

          {/* ✅ Show Delete Button for Admins */}
          {isAdmin && (
            <button onClick={handleDeleteRecipe} style={{ color: "red" }}>
              Delete Recipe
            </button>
          )}
        </MetaWrapper>

        <CloseBtn onClick={() => setModalIsOpen(false)}>
          <ImCancelCircle />
        </CloseBtn>
      </CardModal>
    </Wrapper>
  );
};
