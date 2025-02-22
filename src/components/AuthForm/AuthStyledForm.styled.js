import styled, { css } from "styled-components";

export const LogInContainer = styled.div`
  width: 360px;
  margin: 0;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: transparent;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
`;

export const LogInLbl = styled.label`
  display: block;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 1px;
  margin-bottom: 6px;
`;

export const LogInInput = styled.input`
  width: 90%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  margin-bottom: 4px;

  ${(props) =>
    props.hasError &&
    css`
      border: 6px solid gold;
    `}

  &:focus {
    outline: none;
    border: 3px solid gold;
  }
`;

export const Error = styled.div`
  color: white;
  font-size: 16px;
`;

export const LogInBtn = styled.button`
  background: white;
  color: #63666a;
  font-weight: bold;
  letter-spacing: 1px;
  padding: 10px 20px;
  border: rgba(227, 37, 26, 255);
  border-radius: 5px;
  box-shadow: 3px 3px 5px 0 rgba(0, 0, 0, 0.5);
  &:hover {
    background-color: rgba(227, 37, 26, 255);
    color: white;
    transition: background-color 0.3s, color 0.3s;
  }
`;

export const GoogleSignInBtn = styled.button``;

export const ToggleFormBtn = styled.button``;

export const PasswordWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const TogglePasswordBtn = styled.button`
  position: absolute;
  right: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
`;
