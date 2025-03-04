import styled from "styled-components";

/* ✅ Wrapper */
export const Wrapper = styled.div`
  max-width: 900px;
  margin: auto;
  padding: 20px;
  color: white;
`;

/* ✅ Recipe List */
export const RecipeList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

/* ✅ Base Recipe Card */
export const RecipeCardBase = styled.div`
  width: 200px;
  height: 200px;
  background: #1a1a1a;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 2px 2px 10px rgba(255, 255, 255, 0.1);
  transition: transform 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;

/* ✅ Recipe Card for Existing Recipes */
export const RecipeCard = styled(RecipeCardBase)`
  background: #222;
`;

/* ✅ Special Card for "New Recipe" */
export const RecipeCardNew = styled(RecipeCardBase)`
  background: #e3f2fd;
  color: #0077cc;
  opacity: 0.5;
  border: 2px dashed #0077cc;

  &:hover {
    background: #d1e8ff;
  }
`;

/* ✅ Plus Icon */
export const PlusIcon = styled.div`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

/* ✅ Form Wrapper */
export const RecipeFormWrapper = styled.div`
  width: 100%;
  margin-top: 20px;
`;
