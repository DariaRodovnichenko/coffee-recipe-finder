import styled from "styled-components";

export const CardContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  z-index: 1 !important;
`;

export const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 0;
`;

export const ListItem = styled.li`
  width: 320px;
  list-style: none;
  z-index: 2 !important;

  @media (max-width: 768px) {
    width: 100%;
  }
`;
