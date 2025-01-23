import { ImCancelCircle } from "react-icons/im";

import { Wrapper, RecipeName, MetaWrapper, CloseBtn } from "./RecipeCard.styled";

export const RecipeCard = ({
  recipe: { name, difficulty, ingredients, steps },
}) => {
  return (
    <Wrapper difficulty={difficulty}>
      <CloseBtn>
        <ImCancelCircle />
      </CloseBtn>
      <RecipeName>{name}</RecipeName>
      <MetaWrapper>
        <b>Difficulty: {difficulty}</b>
        <h3>Ingredients:</h3>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <h3>Step By Step:</h3>
        <ol>
          {steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
        <button>Add to favorites</button>
      </MetaWrapper>
    </Wrapper>
  );
};
