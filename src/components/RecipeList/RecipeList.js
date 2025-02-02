import { RecipeCard } from "../RecipeCard/RecipeCard";
import { List, ListItem } from "./RecipeList.styled";

export const RecipeList = ({ items, onDelete }) => {
   if (items.length === 0) {
     return (
       <p>
         No recipes found. Try adjusting your filters or adding new recipes!
       </p>
     );
   }

   return (
     <List>
       {items.map((item) => (
         <ListItem key={item.id}>
           <RecipeCard recipe={item} onDelete={onDelete} />
         </ListItem>
       ))}
     </List>
   );
};
