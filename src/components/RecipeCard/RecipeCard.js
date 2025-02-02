import { ImCancelCircle } from "react-icons/im";
import {
  Wrapper,
  RecipeName,
  MetaWrapper,
  CloseBtn,
} from "./RecipeCard.styled";

export const RecipeCard = ({ recipe = {}, onDelete }) => {
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

  return (
    <Wrapper>
      <CloseBtn onClick={() => onDelete(id)}>
        <ImCancelCircle />
      </CloseBtn>
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

        <button>Add to favorites</button>
        <button onClick={() => onDelete(id)}>Delete from favorites</button>
      </MetaWrapper>
    </Wrapper>
  );
};
