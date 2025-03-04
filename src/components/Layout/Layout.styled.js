import styled from "styled-components";
import { NavLink } from "react-router-dom";

/* ✅ Navigation Bar */
export const NavBar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 15px 40px;
  width: 100vw;
  max-width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  box-shadow: 0px 4px 10px rgba(255, 255, 255, 0.1);
  height: 70px; /* ✅ Ensure consistent header height */

  @media (max-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 10px;
  }
`;

/* ✅ Left Section: Home Button */
export const LeftNav = styled.div`
  display: flex;
  align-items: center;
`;

/* ✅ Right Section: My Page / Admin / Login-Logout */
export const RightNav = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

/* ✅ Navigation Links */
export const StyledLink = styled(NavLink)`
  color: white;
  font-size: 18px;
  font-weight: 500;
  text-decoration: none;
  padding: 10px;
  border-radius: 5px;
  transition: color 0.3s ease, background-color 0.3s ease;

  &:hover {
    color: #ff9d00;
    background-color: rgba(255, 255, 255, 0.1);
  }

  &.active {
    color: orange;
    font-weight: bold;
  }
`;

/* ✅ Login/Logout Button */
export const LoginBtn = styled.button`
  background-color: #ff9d00;
  color: black;
  font-size: 16px;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #ff7a00;
    transform: scale(1.05);
  }
`;

/* ✅ Modal Overlay */
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6); /* ✅ Darker overlay */
  backdrop-filter: blur(8px); /* ✅ Frosted glass effect */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  opacity: 0;
  transform: scale(0.95);
  animation: fadeIn 0.3s ease-out forwards;

  @keyframes fadeIn {
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

/* ✅ Modal Content */
export const LoginModal = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  padding: 40px 30px 30px;
  border-radius: 12px;
  max-width: 420px;
  width: 90%;
  text-align: center;
  box-shadow: 0px 10px 30px rgba(255, 255, 255, 0.2);
  z-index: 3000;
  position: relative;
  animation: slideIn 0.3s ease-out forwards;

  @keyframes slideIn {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  h2 {
    color: #ff9d00;
    margin-bottom: 15px;
  }
`;

/* ✅ Close Button */
export const CloseButton = styled.button`
  position: absolute;
  top: 5px; /* Reduce top spacing */
  right: 5px; /* Reduce right spacing */
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: red;
  }
`;
