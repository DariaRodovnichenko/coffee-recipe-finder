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

CardModal.setAppElement("#root"); // Necessary for accessibility

export const RecipeCard = ({ recipe = {}, onDelete }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { addToFavorites, removeRecipe, userData } = useUserData();

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
  const isFavorite = userData?.favorites && Object.values(userData.favorites).some((fav) => fav.id === id);

  // ✅ Check if the recipe is created by the user
  const isCreatedByUser = userData?.createdRecipes && Object.values(userData.createdRecipes).some((rec) => rec.id === id);

  // ✅ Toggle favorite status and close modal
  const handleToggleFavorite = async () => {
    if (isFavorite) {
      await removeRecipe(id, true); // Remove from favorites
    } else {
      await addToFavorites(recipe); // Add to favorites
    }
    setModalIsOpen(false); // ✅ Close modal after action
  };

  // ✅ Handles removing from "Created Recipes"
  const handleRemoveRecipe = async () => {
    if (onDelete) {
      onDelete(id); // Use onDelete prop if provided
    } else {
      await removeRecipe(id); // Fallback to default removal
    }
    setModalIsOpen(false); // ✅ Close modal after deletion
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

          {isCreatedByUser && <button onClick={handleRemoveRecipe}>Remove Recipe</button>}
        </MetaWrapper>

        <CloseBtn onClick={() => setModalIsOpen(false)}>
          <ImCancelCircle />
        </CloseBtn>
      </CardModal>
    </Wrapper>
  );
};
