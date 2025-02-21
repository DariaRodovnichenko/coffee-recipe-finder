import { useAdminRecipes } from "../../hooks/useAdminRecipes.js";
import { AdminForm } from "../../components/AdminForm/AdminForm.js";
import { Loader } from "../../components/Loader/Loader.js";
import { useAdminStatus } from "../../hooks/useAdminStatus.js";

export const AdminPanel = () => {
  const { isAdmin, loading: adminLoading } = useAdminStatus();
  const { loading: recipesLoading, error, addRecipe } = useAdminRecipes();

  if (adminLoading) return <Loader />;
  if (!isAdmin) return <p>❌ Access Denied. You are not an admin.</p>;

  return (
    <div>
      <h2>Admin Dashboard</h2>
      {/* ✅ Recipe Creation Form */}
      <h3>Create Public Recipe</h3>
      <AdminForm onAdd={addRecipe} /> {/* ✅ Pass addRecipe to AdminForm */}
      {recipesLoading && <Loader />}
      {error && <div>❌ ERROR: {error}</div>}
    </div>
  );
};
