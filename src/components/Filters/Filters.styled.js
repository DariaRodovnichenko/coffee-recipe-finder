import styled from "styled-components";

/* ✅ Common Wrapper for Filters */
export const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

/* ✅ Styled Input for MethodFilter */
export const FilterInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  width: 180px;
  outline: none;
  transition: border 0.2s ease-in-out;
  background-color: #1a1a1a;
  color: white;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    border-color: #ff9d00;
  }
`;

/* ✅ Styled Select Dropdown for YearFilter */
export const FilterSelect = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  width: 180px;
  outline: none;
  transition: border 0.2s ease-in-out;
  background-color: #1a1a1a;
  color: white;
  cursor: pointer;

  &:focus {
    border-color: #ff9d00;
  }
`;
