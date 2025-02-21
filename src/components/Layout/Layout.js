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
  const [isRegistering, setIsRegistering] = useState(false); // To toggle between login and registration
  const firstInputRef = useRef(null); // To focus on the first input
  const dispatch = useDispatch();

  // Access the auth state to check if there's an error or success
  const { error, user } = useSelector((state) => state.auth);
  // Automatically focus the first input when the modal opens
  useEffect(() => {
    if (isLoginModalOpen) {
      firstInputRef.current?.focus(); // Automatically focus on the first input in the modal
    }
  }, [isLoginModalOpen]);

  useEffect(() => {
    if (user) {
      setIsLoginModalOpen(false); // Close modal if user is logged in
    }
  }, [user]);

  return (
    <Wrapper>
      <header>
        {/* <LangSwitcher />
        <b>Selected lang: {lang}</b> */}
        <ul>
          <li>
            <StyledLink to="/create" end>
              Create recipe
            </StyledLink>
          </li>
          <li>
            <StyledLink to="/recipes" end>
              Recipe list
            </StyledLink>
          </li>
          <li>
            <StyledLink to="/my-recipes" end>
              My Page
            </StyledLink>
          </li>

          {/* Show Admin link only if user is logged in and is an admin */}
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
              dispatch(logoutUser()); // Log out if user is logged in
              toast.success("Successfully logged out!"); // Show logout toast
            } else {
              setIsLoginModalOpen(true); // Open login modal if user is logged out
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
        {/* Switch between login and registration */}
        {isRegistering ? (
          <div>
            <h2>Register</h2>
            {/* Registration form component */}
            <AuthForm isRegistering={true} />
            <button onClick={() => setIsRegistering(false)}>
              Already have an account? Log in
            </button>
          </div>
        ) : (
          <div>
            <h2>Login</h2>
            {/* Login form component */}
            <AuthForm isRegistering={false} />
            <button onClick={() => setIsRegistering(true)}>
              Don't have an account? Sign in!
            </button>
          </div>
        )}

        <button onClick={() => setIsLoginModalOpen(false)}>Close</button>
        {/* Show error message if there's an error */}
        {error && <div style={{ color: "red" }}>{error}</div>}
      </Modal>
      {/* Render the rest of the page */}
      <Outlet />
      <Toaster />
    </Wrapper>
  );
};
