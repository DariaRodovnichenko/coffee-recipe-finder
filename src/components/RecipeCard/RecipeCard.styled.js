import styled from "styled-components";

const getBorderColor = (p) => {
  console.log(p);
  switch (p.difficulty) {
    case "Easy":
      return "green";
    case "Medium":
      return "orange";
    case "Hard":
      return "red";
    default:
      return p.theme.colors.black;
  }
};

export const Wrapper = styled.div`
  padding: 4px;
  border: 2px solid ${getBorderColor};
  border-radius: ${(p) => p.theme.radii.md};
`;

export const RecipeName = styled.h2`
  margin-top: 0;
  margin-bottom: 12px;
`;

export const MetaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const CloseBtn = styled.button`
  padding: 4px;
  margin: 0;
  background-color: transparent;
  border: none;
  border-radius: 90px;

:hover {
    color: red;
}

  svg {
    display: block;
    color: navy;
  }
`;
