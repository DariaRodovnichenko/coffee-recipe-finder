import { RecipeCard } from "../RecipeCard/RecipeCard.js";
import { CardContainer, List, ListItem } from "./RecipeList.styled.js";

export const RecipeList = ({ items, onDelete }) => {
     if (items.length === 0) {
     return (
       <p>
         No recipes found. Try adjusting your filters or adding new recipes!
       </p>
     );
   }

  return (
    <CardContainer>
      <List>
        {items.map((item) => (
          <ListItem key={item.id}>
            <RecipeCard recipe={item} onDelete={onDelete} />
          </ListItem>
        ))}
      </List>
    </CardContainer>
  );
};
