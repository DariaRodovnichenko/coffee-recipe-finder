import { Outlet } from "react-router-dom";
import Modal from "react-modal";
import { Wrapper, StyledLink, LoginBtn } from "./Layout.styled.js";
import { AuthForm } from "../AuthForm/AuthForm.js";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/authentication/authOperations.js";
import toast, { Toaster } from "react-hot-toast";
import { useAdminStatus } from "../../hooks/useAdminStatus.js";

Modal.setAppElement("#root");

export const Layout = () => {
  const { isAdmin } = useAdminStatus();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const firstInputRef = useRef(null);
  const dispatch = useDispatch();
  const { error, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoginModalOpen) {
      firstInputRef.current?.focus();
    }
  }, [isLoginModalOpen]);

  useEffect(() => {
    if (user) {
      setIsLoginModalOpen(false);
    }
  }, [user]);

  return (
    <Wrapper>
      <header>
        <ul>
          <li>
            <StyledLink to="/recipes" end>
              Recipe list
            </StyledLink>
          </li>

          {/* ✅ Conditionally render "My Page" only if user is logged in */}
          {user && (
            <li>
              <StyledLink to="/my-recipes" end>
                My Page
              </StyledLink>
            </li>
          )}

          {/* ✅ Show Admin Panel link only if user is logged in and is an admin */}
          {user && isAdmin && (
            <li>
              <StyledLink to="/admin" end>
                Admin Panel
              </StyledLink>
            </li>
          )}
        </ul>
        
        <LoginBtn
          onClick={() => {
            if (user) {
              dispatch(logoutUser());
              toast.success("Successfully logged out!");
            } else {
              setIsLoginModalOpen(true);
            }
          }}
        >
          {user ? "Log out" : "Log in"}
        </LoginBtn>
      </header>

      {/* Login Modal */}
      <Modal
        isOpen={isLoginModalOpen}
        onRequestClose={() => setIsLoginModalOpen(false)}
        contentLabel="Login Form"
      >
        {isRegistering ? (
          <div>
            <h2>Register</h2>
            <AuthForm isRegistering={true} />
            <button onClick={() => setIsRegistering(false)}>
              Already have an account? Log in
            </button>
          </div>
        ) : (
          <div>
            <h2>Login</h2>
            <AuthForm isRegistering={false} />
            <button onClick={() => setIsRegistering(true)}>
              Don't have an account? Sign in!
            </button>
          </div>
        )}

        <button onClick={() => setIsLoginModalOpen(false)}>Close</button>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </Modal>

      <Outlet />
      <Toaster />
    </Wrapper>
  );
};
