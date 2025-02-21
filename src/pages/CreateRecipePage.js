import { useState } from "react";

import { database } from "../firebase/firebase.js";
import { ref, push } from "firebase/database";

import { RecipeForm } from "../components/RecipeForm/RecipeForm.js";
import { Loader } from "../components/Loader/Loader.js";

export default function CreateRecipePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const addRecipe = async (newRecipe) => {
    const recipesRef = ref(database, "recipes");

    try {
      setLoading(true);
      setError(false);

      await push(recipesRef, newRecipe);
    } catch (error) {
      setError(true);
      console.error("Error adding recipe:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <RecipeForm onAdd={addRecipe} />
      {loading && <Loader />}
      {error && <div>ERROR!!!</div>}
    </div>
  );
}
