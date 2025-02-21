import { useState, useEffect, useMemo } from "react";
import { ref, onValue, remove } from "firebase/database";
import { database } from "../firebase/firebase.js"; // Import the initialized Firebase app

import toast from "react-hot-toast";
import { Loader } from "../components/Loader/Loader.js";
import { RecipeList } from "../components/RecipeList/RecipeList.js";
import { SearchBar } from "../components/SearchBar/SearchBar.js";
import { useQueryParams } from "../hooks/useQueryParams.js";

// const getInitialFilters = () => {
//   const savedFilters = localStorage.getItem("recipe-filters");
//   return savedFilters !== null
//     ? JSON.parse(savedFilters)
//     : { year: "2024", method: "" };
// };

export default function RecipesPage() {
  const [recipeItems, setRecipeItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  // Use query params instead of local state
  const { method, year } = useQueryParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  useEffect(() => {
    setLoading(true);
    setError(false);

    const recipeRef = ref(database, "recipes");

    const unsubscribe = onValue(
      recipeRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const recipesData = snapshot.val();
          const recipesArray = Object.keys(recipesData).map((key) => ({
            id: key,
            ...recipesData[key],
          }));

          setRecipeItems(recipesArray);
        } else {
          setRecipeItems([]);
        }
        setLoading(false);
      },
      (error) => {
        setError(true);
        console.error("Error fetching data from Firebase:", error);
        setLoading(false);
      }
    );

    // Cleanup function to unsubscribe from Firebase updates
    return () => unsubscribe();
  }, []);

  //   useEffect(() => {
  //     localStorage.setItem("recipe-filters", JSON.stringify(filters));
  //   }, [filters]);

  //   const changeFilters = (value, key) => {
  //     setFilters((prevFilters) => ({
  //       ...prevFilters,
  //       [key]: value,
  //     }));
  //   };

  //   const resetFilters = () => {
  //     setFilters({
  //       method: "",
  //       year: "2024",
  //     });
  //   };

  const visibleRecipes = useMemo(() => {
    return recipeItems
      .filter((recipe) =>
        year === "all"
          ? recipe.method.toLowerCase().includes(method.toLowerCase())
          : recipe.method.toLowerCase().includes(method.toLowerCase()) &&
            recipe.year === year
      )
      .slice(0, currentPage * itemsPerPage);
  }, [recipeItems, method, year, currentPage, itemsPerPage]);

  // Calculate if more recipes can be loaded
  const totalFilteredItems = useMemo(() => {
    return recipeItems.filter((recipe) =>
      year === "all"
        ? recipe.method.toLowerCase().includes(method.toLowerCase())
        : recipe.method.toLowerCase().includes(method.toLowerCase()) &&
          recipe.year === year
    ).length;
  }, [recipeItems, method, year]);

  const hasMore = currentPage * itemsPerPage < totalFilteredItems;

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  //   // Handle search logic
  //   const handleSearch = () => {
  //     setCurrentPage(1); // Reset pagination to first page when searching
  //   };

  const deleteRecipe = async (recipeId) => {
    const recipeRef = ref(database, `recipes/${recipeId}`);

    try {
      setLoading(true);
      setError(false);
      await remove(recipeRef); // Delete from Firebase
      setRecipeItems((prevItem) =>
        prevItem.filter((recipe) => recipe.id !== recipeId)
      );
      toast.success("Delete successful!");
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SearchBar />
      {loading && <Loader />}
      {error && !loading && <div>OOPS! An ERROR!!!</div>}
      {visibleRecipes.length > 0 && (
        <RecipeList items={visibleRecipes} onDelete={deleteRecipe} />
      )}

      {hasMore && <button onClick={handleLoadMore}>Load more</button>}
    </div>
  );
}
