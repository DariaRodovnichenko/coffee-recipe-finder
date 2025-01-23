import { RecipeCard } from "../RecipeCard/RecipeCard";
import { List, ListItem } from "./RecipeList.styled";

export const RecipeList = ({ items }) => {
  return (
    <List>
      {items.map((item) => {
        return (
          <ListItem key={item.id}>
            <RecipeCard recipe={item} />
          </ListItem>
        );
      })}
    </List>
  );
};
