import { RecipeList } from "./RecipeList/RecipeList";
import { SearchBar } from "./SearchBar/SearchBar";
import { RecipeForm } from "./RecipeForm/RecipeForm";

import initialRecipeItems from "../recipes.json";
import { GlobalStyle } from "./GlobalStyles";
import { Layout } from "./Layout/Layout.styled";
import { Component } from "react";

export class App extends Component {
  state = {
    recipeItems: initialRecipeItems,
    filters: {
      method: "",
      difficulty: "",
    },
  };

  deleteRecipe = (recipeId) => {
    this.setState((prevState) => ({
      recipeItems: prevState.recipeItems.filter(
        (recipe) => recipe.id !== recipeId
      ),
    }));
  };

  changeDifficultyFilter = (newDifficulty) => {
    this.setState((prevState) => ({
      filters: {
        ...prevState.filters,
        difficulty: newDifficulty,
      },
    }));
  };

  changeMethodFilter = (newMethod) => {
    this.setState((prevState) => ({
      filters: {
        ...prevState.filters,
        method: newMethod,
      },
    }));
  };

  getVisibleRecipeItems = () => {
    const { recipeItems, filters } = this.state;
    return recipeItems.filter((recipe) => {
      if (filters.difficulty === "all") {
        return recipe.method
          .toLowerCase()
          .includes(filters.method.toLowerCase());
      }

      return (
        recipe.method.toLowerCase().includes(filters.method.toLowerCase()) &&
        (filters.difficulty === "" || recipe.difficulty === filters.difficulty)
      ); // Include difficulty filter if set
    });
  };

  render() {
    const { filters } = this.state;
    const visibleRecipes = this.getVisibleRecipeItems();

    return (
      <Layout>
        <RecipeForm />
        <SearchBar
          difficulty={filters.difficulty}
          method={filters.method}
          onChangeDifficulty={this.changeDifficultyFilter}
          onChangeMethod={this.changeMethodFilter}
        />
        <RecipeList items={visibleRecipes} onDelete={this.deleteRecipe} />
        <GlobalStyle />
      </Layout>
    );
  }
}
