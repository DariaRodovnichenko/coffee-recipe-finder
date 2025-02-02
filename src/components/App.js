import { RecipeList } from "./RecipeList/RecipeList";
import { SearchBar } from "./SearchBar/SearchBar";
import { RecipeForm } from "./RecipeForm/RecipeForm";

import { GlobalStyle } from "./GlobalStyles";
import { Layout } from "./Layout/Layout.styled";
import { Component } from "react";
// import { nanoid } from "nanoid";
import { ref, get, push } from "firebase/database";
import { database } from "./firebase"; // Import the initialized Firebase app

export class App extends Component {
  state = {
    recipeItems: [],
    filters: {
      method: "",
      year: "all",
    },
    currentPage: 1,
    itemsPerPage: 2,
  };

  // Fetch data from Firebase when the component mounts
  componentDidMount() {
    const recipeRef = ref(database, "recipes");

    // Get all the recipes from Firebase
    get(recipeRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const recipesData = snapshot.val();
          const recipesArray = Object.keys(recipesData).map((key) => ({
            id: key,
            ...recipesData[key],
          }));
          this.setState({ recipeItems: recipesArray });
        } else {
          console.log("No recipes found.");
        }
      })
      .catch((error) => {
        console.error("Error fetching data from Firebase: ", error);
      });

    const savedFilters = localStorage.getItem("recipe-filters");
    if (savedFilters !== null) {
      this.setState({ filters: JSON.parse(savedFilters) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.filters !== this.state.filters) {
      localStorage.setItem(
        "recipe-filters",
        JSON.stringify(this.state.filters)
      );
    }
  }

  addRecipe = (newRecipe) => {
    // Reference to the "recipes" node in the database
    const recipesRef = ref(database, "recipes");

    // Use `push` to automatically generate a unique ID for the new recipe
    push(recipesRef, newRecipe)
      .then(() => {
        // Optionally update the state with the new recipe to reflect the change in the UI
        this.setState((prevState) => ({
          recipeItems: [...prevState.recipeItems, newRecipe],
        }));
      })
      .catch((error) => {
        console.error("Error adding recipe: ", error);
      });
  };

  deleteRecipe = (recipeId) => {
    this.setState((prevState) => ({
      recipeItems: prevState.recipeItems.filter(
        (recipe) => recipe.id !== recipeId
      ),
    }));
  };

  changeYearFilter = (newYear) => {
    this.setState((prevState) => ({
      filters: {
        ...prevState.filters,
        year: newYear,
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

  resetFilters = () =>
    this.setState({
      filters: {
        method: "",
        year: "all",
      },
    });

  handleLoadMore = () => {
    this.setState((prevState) => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  // Handle search logic
  handleSearch = () => {
    const { year, method } = this.state.filters;
    const { recipeItems } = this.state;

    // Filter recipes based on year and method
    const filteredRecipes = recipeItems.filter((recipe) => {
      const matchesMethod = recipe.method
        .toLowerCase()
        .includes(method.toLowerCase());

      if (year === "all") {
        return matchesMethod;
      }

      return matchesMethod && recipe.year === year;
    });

    this.setState({
      recipeItems: filteredRecipes,
      currentPage: 1, // Reset to first page when searching
    });
  };

  getVisibleRecipeItems = () => {
    const { recipeItems, filters, currentPage, itemsPerPage } = this.state;

    const filteredRecipes = recipeItems.filter((recipe) => {
      const matchesMethod = recipe.method
        .toLowerCase()
        .includes(filters.method.toLowerCase());

      if (filters.year === "all") {
        return matchesMethod;
      }

      return matchesMethod && recipe.year === filters.year;
    });

    const itemsToShow = currentPage * itemsPerPage;

    return filteredRecipes.slice(0, itemsToShow);
  };

  render() {
    const { filters, recipeItems, itemsPerPage, currentPage } = this.state;
    const visibleRecipes = this.getVisibleRecipeItems();

    const totalFilteredItems = recipeItems.filter((recipe) => {
      const matchesMethod = recipe.method
        .toLowerCase()
        .includes(filters.method.toLowerCase());

      if (filters.year === "all") {
        return matchesMethod;
      }

      return matchesMethod && recipe.year === filters.year;
    }).length;

    const hasMore = currentPage * itemsPerPage < totalFilteredItems;

    return (
      <Layout>
        <RecipeForm onAdd={this.addRecipe} />
        <SearchBar
          year={filters.year}
          method={filters.method}
          onChangeYear={this.changeYearFilter}
          onChangeMethod={this.changeMethodFilter}
          onReset={this.resetFilters}
          onSearch={this.handleSearch} // Pass handleSearch to SearchBar
        />
        <RecipeList items={visibleRecipes} onDelete={this.deleteRecipe} />
        {hasMore && <button onClick={this.handleLoadMore}>Load more</button>}
        <GlobalStyle />
      </Layout>
    );
  }
}
