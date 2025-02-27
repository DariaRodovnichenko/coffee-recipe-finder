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
import { useDispatch, useSelector } from "react-redux";
import { checkAdminStatus } from "../redux/authentication/authAdmin.js";
import { useEffect } from "react";
import { ManageUsers } from "../pages/admin/ManageUsers.js";

// ✅ Protecting the Admin Route
const AdminRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { isAdmin, loading } = useAdminStatus();
  const { user } = useSelector((state) => state.auth);

  console.log("🚀 [AdminRoute] Rendering...");
  console.log("👤 User:", user);
  console.log("👑 Admin Status:", isAdmin);
  console.log("⏳ Loading Status:", loading);

  useEffect(() => {
    if (user && !isAdmin) {
      console.log("🔄 Checking admin status...");
      dispatch(checkAdminStatus(user.uid));
    }
  }, [user, isAdmin, dispatch]);

  if (loading) {
    console.log("⏳ Waiting for admin check...");
    return <Loader />;
  }

  if (!isAdmin) {
    console.warn("🚫 Access Denied: Redirecting to `/`");
    return <Navigate to="/" replace />;
  }

  console.log("✅ Access Granted!");
  return children;
};

const UserRoute = ({ children }) => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) return <Loader />; // Show a loader while checking auth state

  return user ? children : <Navigate to="/" replace />; // Redirect if not logged in
};

export const App = () => {
  return (
    <>
      <Routes>
        {/* ✅ Layout Wrapping All Pages */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/recipes" replace />} />
          <Route path="recipes" element={<RecipesPage />} />

          <Route
            path="my-recipes"
            element={
              <UserRoute>
                <UserPage />
              </UserRoute>
            }
          />

          {/* ✅ Protected Admin Panel */}
          <Route
            path="admin"
            element={
              <AdminRoute>
                <AdminPanel />
              </AdminRoute>
            }
          />

          {/* ✅ Only allow admins to access user management */}
          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <ManageUsers />
              </AdminRoute>
            }
          />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>

      <GlobalStyle />
      <Toaster />
    </>
  );
};
