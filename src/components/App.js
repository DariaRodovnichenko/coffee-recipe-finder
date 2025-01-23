import { RecipeList } from "./RecipeList/RecipeList";
import { SearchBar } from "./SearchBar/SearchBar";
import { SomeForm } from "./SomeForm/SomeForm";

import recipeItems from "../recepies.json";
import { GlobalStyle } from "./GlobalStyles";
import { Layout } from "./Layout/Layout.styled";

export const App = () => {
  return (
    <Layout>
      <SomeForm />
      <SearchBar />
      <RecipeList items={recipeItems} />
      <GlobalStyle />
    </Layout>
  );
};
