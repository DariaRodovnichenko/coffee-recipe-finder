import { Outlet } from "react-router-dom";
import Modal from "react-modal";
import {
  StyledLink,
  LoginBtn,
  NavBar,
  RightNav,
  LeftNav,
  ModalOverlay,
  LoginModal,
  CloseButton,
} from "./Layout.styled.js";
import { AuthForm } from "../AuthForm/AuthForm.js";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/authentication/authOperations.js";
import toast, { Toaster } from "react-hot-toast";
import { useAdminStatus } from "../../hooks/useAdminStatus.js";
import { checkAdminStatus } from "../../redux/authentication/authAdmin.js";

Modal.setAppElement("#root");

export const Layout = () => {
  const { isAdmin } = useAdminStatus();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
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

  useEffect(() => {
    if (user) {
      dispatch(checkAdminStatus(user.uid));
    }
  }, [user, dispatch]);

  return (
    <>
      <header>
        <NavBar>
          <LeftNav>
            <StyledLink to="/recipes" end>
              Home
            </StyledLink>
          </LeftNav>

          <RightNav>
            {user && !isAdmin && (
              <StyledLink to="/my-recipes" end>
                My Page
              </StyledLink>
            )}

            {user && isAdmin && (
              <StyledLink to="/admin" end>
                Admin Panel
              </StyledLink>
            )}

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
          </RightNav>
        </NavBar>
      </header>

      {/* Login Modal */}
      <Modal
        isOpen={isLoginModalOpen}
        onRequestClose={() => setIsLoginModalOpen(false)}
        contentLabel="Login Form"
        style={{ overlay: { backgroundColor: "transparent" } }}
      >
        <ModalOverlay>
          <LoginModal>
            <CloseButton onClick={() => setIsLoginModalOpen(false)}>
              ✖
            </CloseButton>
            <AuthForm
              isSignedUp={isSignedUp}
              setIsSignedUp={setIsSignedUp}
              setIsLoginModalOpen={setIsLoginModalOpen}
            />
            {error && <div style={{ color: "red" }}>{error}</div>}
          </LoginModal>
        </ModalOverlay>
      </Modal>

      <Outlet />
      <Toaster />
    </>
  );
};
