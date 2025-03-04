import styled from "styled-components";
import {
  StyledForm,
  ErrorMsg,
  FormBtn,
} from "../RecipeForm/RecipeForm.styled.js";

/* ✅ Reuse common styles */
export { StyledForm, ErrorMsg, FormBtn };

/* ✅ Auth Form Container */
export const LogInContainer = styled.div`
  width: 100%;
  max-width: 360px;
  margin: auto;
  padding: 20px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 4px 10px rgba(255, 255, 255, 0.2);
  color: white;
  text-align: center;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000000 !important;
`;

/* ✅ Input Group Wrapper */
export const FormGroup = styled.div`
  margin-bottom: 16px;
  text-align: left;
`;

/* ✅ Labels */
export const LogInLbl = styled.label`
  display: block;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 5px;
  color: white;
`;

/* ✅ Input Fields (Customization for Auth Forms) */
export const LogInInput = styled.input`
  background-color: #222;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
  outline: none;
  transition: border 0.2s ease-in-out;

  &:focus {
    border-color: #ff9d00;
  }
`;

/* ✅ Password Wrapper */
export const PasswordWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

/* ✅ Toggle Password Button */
export const TogglePasswordBtn = styled.button`
  position: absolute;
  right: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: white;
`;

/* ✅ Login / Sign-Up Button */
export const LogInBtn = styled(FormBtn)`
  width: 100%;
`;

/* ✅ Google Sign-In Button */
export const GoogleSignInBtn = styled(FormBtn)`
  background-color: #db4437;
  color: white;
  margin-top: 10px;

  &:hover {
    background-color: #c1351d;
  }
`;

/* ✅ Toggle Between Sign-In and Sign-Up */
export const ToggleFormBtn = styled.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 14px;
  cursor: pointer;
  margin-top: 10px;
  text-decoration: underline;

  &:hover {
    color: #ff9d00;
  }
`;
