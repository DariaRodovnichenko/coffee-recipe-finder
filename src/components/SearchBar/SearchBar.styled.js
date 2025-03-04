import styled from "styled-components";

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 15px 20px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  margin-bottom: 20px;

  /* ✅ Add margin to push it below the fixed header */
  margin-top: 80px; /* Adjust this value based on your header height */

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const SearchBtn = styled.button`
  background-color: #ff9d00;
  color: black;
  font-size: 16px;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.2s ease;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #ff7a00;
    transform: scale(1.05);
  }
`;
