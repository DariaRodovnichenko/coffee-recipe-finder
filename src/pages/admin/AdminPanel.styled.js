import styled from "styled-components";

export const AdminPanelWrapper = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(255, 255, 255, 0.2);
  color: white;
  text-align: center;
`;

export const AdminTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 16px;
  color: #ff9d00;
`;

export const AdminSubtitle = styled.h3`
  font-size: 20px;
  margin-bottom: 12px;
  color: white;
`;

export const AdminBtn = styled.button`
  background-color: #ff9d00;
  color: black;
  font-size: 16px;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.2s ease;
  border: none;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #ff7a00;
    transform: scale(1.05);
  }
`;

export const ErrorMessage = styled.div`
  color: red;
  font-size: 16px;
  margin-top: 10px;
`;
