import { RecipeList } from "./RecipeList/RecipeList";
import { SearchBar } from "./SearchBar/SearchBar";
import { RecipeForm } from "./RecipeForm/RecipeForm";

import { GlobalStyle } from "./GlobalStyles";
import { Loader } from "./Loader/Loader";
import toast, { Toaster } from "react-hot-toast";
import { Layout } from "./Layout/Layout.styled";
import { Component } from "react";
import { ref, onValue, push, remove } from "firebase/database";
import { database } from "./firebase"; // Import the initialized Firebase app

export class App extends Component {
  state = {
    recipeItems: [],
    loading: false,
    error: false,
    filters: {
      method: "",
      year: "all",
    },
    currentPage: 1,
    itemsPerPage: 2,
  };

  // Fetch data from Firebase when the component mounts
  componentDidMount() {
    this.setState({ loading: true, error: false });

    const recipeRef = ref(database, "recipes");

    onValue(
      recipeRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const recipesData = snapshot.val();
          const recipesArray = Object.keys(recipesData).map((key) => ({
            id: key,
            ...recipesData[key],
          }));

          this.setState({ recipeItems: recipesArray, loading: false });
        } else {
          this.setState({ recipeItems: [], loading: false });
        }
      },
      (error) => {
        this.setState({ error: true });
        console.error("Error fetching data from Firebase: ", error);
        this.setState({ loading: false });
      }
    );

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

  addRecipe = async (newRecipe) => {
    const recipesRef = ref(database, "recipes");

    try {
      this.setState({ loading: true, error: false });
      const newRecipeRef = await push(recipesRef, newRecipe);
      const newRecipeId = newRecipeRef.key; // Get the generated ID

      // Update state with the recipe including its Firebase ID
      this.setState((prevState) => ({
        recipeItems: [
          ...prevState.recipeItems,
          { id: newRecipeId, ...newRecipe },
        ],
      }));
    } catch (error) {
      this.setState({ error: true });
      console.error("Error adding recipe: ", error);
    } finally {
      this.setState({ loading: false });
    }
  };

  deleteRecipe = async (recipeId) => {
    const recipeRef = ref(database, `recipes/${recipeId}`);

    try {
      this.setState({ loading: true, error: false });
      await remove(recipeRef); // Delete from Firebase
      this.setState((prevState) => ({
        recipeItems: prevState.recipeItems.filter(
          (recipe) => recipe.id !== recipeId
        ),
      }));
      toast.success("Delete successful!");
    } catch (error) {
      console.error("Error deleting recipe: ", error);
    } finally {
      this.setState({ loading: false });
    }
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
    const { filters, recipeItems, itemsPerPage, currentPage, loading, error } =
      this.state;
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

        {loading && <Loader />}
        {error && !loading && <div>OOPS! An ERROR!!!</div>}
        {visibleRecipes.length > 0 && (
          <RecipeList items={visibleRecipes} onDelete={this.deleteRecipe} />
        )}

        {hasMore && <button onClick={this.handleLoadMore}>Load more</button>}
        <GlobalStyle />
        <Toaster />
      </Layout>
    );
  }
}
