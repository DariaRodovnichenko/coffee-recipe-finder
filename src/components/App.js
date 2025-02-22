import { GlobalStyle } from "./GlobalStyles.js";
import { Toaster } from "react-hot-toast";
import { Route, Routes, Navigate } from "react-router-dom";
import RecipesPage from "../pages/RecipesPage.js";
// import CreateRecipePage from "../pages/CreateRecipePage.js";
import { AdminPanel } from "../pages/admin/AdminPanel.js"; // ✅ Admin Panel (Merged)
import { Layout } from "./Layout/Layout.js";
import { UserPage } from "../pages/user/UserPage.js";
import { useAdminStatus } from "../hooks/useAdminStatus.js"; // ✅ Admin Hook
import { Loader } from "./Loader/Loader.js";

// ✅ Protecting the Admin Route
const AdminRoute = ({ children }) => {
  const { isAdmin, loading } = useAdminStatus();

  console.log("🔍 Checking Admin Status: ", { isAdmin, loading });

  if (loading) return <Loader />;
  return isAdmin ? children : <Navigate to="/" replace />;
};

export const App = () => {
  return (
    <>
      <Routes>
        {/* ✅ Layout Wrapping All Pages */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/recipes" replace />} />
          <Route path="recipes" element={<RecipesPage />} />
          {/* <Route path="create" element={<CreateRecipePage />} /> */}
          <Route path="my-recipes" element={<UserPage />} />

          {/* ✅ Protected Admin Panel */}
          <Route
            path="admin"
            element={
              <AdminRoute>
                <AdminPanel />
              </AdminRoute>
            }
          />
        </Route>
      </Routes>

      <GlobalStyle />
      <Toaster />
    </>
  );
};
