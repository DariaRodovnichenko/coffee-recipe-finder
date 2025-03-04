import { useAdminRecipes } from "../../hooks/useAdminRecipes.js";
import { AdminForm } from "../../components/RecipeForm/AdminForm.js";
import { Loader } from "../../components/Loader/Loader.js";
import { useAdminStatus } from "../../hooks/useAdminStatus.js";
import { useNavigate } from "react-router-dom";
import { AdminBtn, AdminPanelWrapper, AdminSubtitle, AdminTitle, ErrorMessage } from "./AdminPanel.styled.js";

export const AdminPanel = () => {
  const navigate = useNavigate();
  const { isAdmin, loading: adminLoading } = useAdminStatus();
  const { loading: recipesLoading, error, addRecipe } = useAdminRecipes();

  if (adminLoading) return <Loader />;
  if (!isAdmin) return <p>❌ Access Denied. You are not an admin.</p>;

  return (
    <AdminPanelWrapper>
      <AdminTitle>Admin Dashboard</AdminTitle>

      {/* ✅ Recipe Creation Form */}
      <AdminSubtitle>Create Public Recipe</AdminSubtitle>
      <AdminForm onAdd={addRecipe} />
      {recipesLoading && <Loader />}
      {error && <ErrorMessage>❌ ERROR: {error}</ErrorMessage>}

      {/* ✅ Button to Navigate to Manage Users */}
      <AdminBtn onClick={() => navigate("/admin/users")}>Manage Users</AdminBtn>
    </AdminPanelWrapper>
  );
};
