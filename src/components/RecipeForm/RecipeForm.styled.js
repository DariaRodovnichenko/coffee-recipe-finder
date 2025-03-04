import styled from "styled-components";
import { Form, Field, ErrorMessage } from "formik";

/* ✅ General Form Styling */
export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: rgba(255, 255, 255, 0.05);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(255, 255, 255, 0.2);
  width: 100%;
  max-width: 400px;
  margin: auto;
  color: white;
`;

/* ✅ Styled Input Fields */
export const StyledField = styled(Field)`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  background-color: #1a1a1a;
  color: white;
  width: 100%;
  outline: none;
  transition: border 0.2s ease-in-out;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    border-color: #ff9d00;
  }
`;

/* ✅ Styled Textarea */
export const StyledTextarea = styled(StyledField).attrs({ as: "textarea" })`
  min-height: 100px;
  resize: vertical;
`;

/* ✅ Error Message */
export const ErrorMsg = styled(ErrorMessage)`
  font-size: 14px;
  color: red;
`;

/* ✅ Button Styles */
export const FormBtn = styled.button`
  background-color: #ff9d00;
  color: black;
  font-size: 16px;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.2s ease;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #ff7a00;
    transform: scale(1.05);
  }

  &:disabled {
    background-color: gray;
    cursor: not-allowed;
  }
`;
