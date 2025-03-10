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
  height: 70px;
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

/* ✅ Close Button */
export const CloseBtn = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  transition: color 0.3s ease, transform 0.2s ease;

  &:hover {
    color: red;
    transform: scale(1.2);
  }

  @media (max-width: 400px) {
    top: 5px;
    right: 5px;
    font-size: 20px;
  }
`;
