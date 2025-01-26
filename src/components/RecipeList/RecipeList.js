import { RecipeCard } from "../RecipeCard/RecipeCard";
import { List, ListItem } from "./RecipeList.styled";

export const RecipeList = ({ items, onDelete }) => {
  return (
    <List>
      {items.map((item) => {
        return (
          <ListItem key={item.id}>
            <RecipeCard recipe={item} onDelete={onDelete} />
          </ListItem>
        );
      })}
    </List>
  );
};
