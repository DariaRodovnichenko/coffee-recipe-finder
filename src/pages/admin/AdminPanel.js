import { useAdminRecipes } from "../../hooks/useAdminRecipes.js";
import { AdminForm } from "../../components/AdminForm/AdminForm.js";
import { Loader } from "../../components/Loader/Loader.js";
import { useAdminStatus } from "../../hooks/useAdminStatus.js";
import { useNavigate } from "react-router-dom";

export const AdminPanel = () => {
  const navigate = useNavigate();
  const { isAdmin, loading: adminLoading } = useAdminStatus();
  const { loading: recipesLoading, error, addRecipe } = useAdminRecipes();

  if (adminLoading) return <Loader />;
  if (!isAdmin) return <p>❌ Access Denied. You are not an admin.</p>;

  return (
    <div>
      <h2>Admin Dashboard</h2>

      {/* ✅ Recipe Creation Form */}
      <h3>Create Public Recipe</h3>
      <AdminForm onAdd={addRecipe} />
      {recipesLoading && <Loader />}
      {error && <div>❌ ERROR: {error}</div>}

      {/* ✅ Button to Navigate to Manage Users */}
      <button onClick={() => navigate("/admin/users")}>Manage Users</button>
    </div>
  );
};
