// import { useUserData } from "../../hooks/useUserData";
// import { Link } from "react-router-dom";
// import { RecipeItem, RecipeList, Wrapper } from "./UserRecipesStyled";

// export const UserRecipes = () => {
//   const { userData, loading, removeFromFavorites } = useUserData();

//   if (loading) return <p>Loading...</p>;

//   return (
//     <Wrapper>
//       <h2>My Saved Recipes</h2>
//       {userData?.favorites && Object.keys(userData.favorites).length > 0 ? (
//         <RecipeList>
//           {Object.values(userData.favorites).map((recipe) => (
//             <RecipeItem key={recipe.id || recipe.name}>
//               {" "}
//               {/* Ensure recipe.id is unique */}
//               <Link to={`/recipe/${recipe.id}`}>{recipe.name}</Link>
//               <button onClick={() => removeFromFavorites(recipe.id)}>
//                 Remove
//               </button>
//             </RecipeItem>
//           ))}
//         </RecipeList>
//       ) : (
//         <p>No saved recipes yet.</p>
//       )}
//     </Wrapper>
//   );
// };
