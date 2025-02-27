import { useEffect } from "react";
import { useManageUsers } from "../../hooks/useManageUsers.js";
import { useSelector } from "react-redux";
import { DeleteBtn, UserItem, UserList } from "./ManageUsers.styled.js";
import { useNavigate } from "react-router-dom";

export const ManageUsers = () => {
  console.log("🟢 ManageUsers Component Mounted");

  const { users, loading, error, deleteUser } = useManageUsers();
  const { isAdmin } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("useEffect triggered in ManageUsers.js");
  }, []);

  console.log("👑 Admin Status from Redux:", isAdmin);
  console.log("👀 Rendered Users:", users);

  return (
    <div>
      <h2>User Management</h2>
      <button onClick={() => navigate("/admin")}>Back to Admin Panel</button>

      {!isAdmin ? (
        <p>❌ You do not have permission to view this page.</p>
      ) : loading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <UserList>
          {users.map((user) => (
            <UserItem key={user.uid}>
              <span>
                {user.username || "Unnamed User"} ({user.email})
              </span>
              <DeleteBtn onClick={() => deleteUser(user.uid)}>Delete</DeleteBtn>
            </UserItem>
          ))}
        </UserList>
      )}
    </div>
  );
};
