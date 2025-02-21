import styled from "styled-components";

/* ✅ Wrapper */
export const Wrapper = styled.div`
  padding: 20px;
`;

/* ✅ Recipe List */
export const RecipeList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

/* ✅ Base Recipe Card for Both New & Existing Recipes */
export const RecipeCardBase = styled.div`
  width: 220px; /* ✅ Ensure all cards are the same width */
  height: 280px; /* ✅ Ensures same height */
  background: #f9f9f9;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

/* ✅ Recipe Card for Existing Recipes */
export const RecipeCard = styled(RecipeCardBase)`
  background: #ffffff; /* Normal card background */

`;

/* ✅ Special Card for "New Recipe" */
export const RecipeCardNew = styled(RecipeCardBase)`
  background: #e3f2fd; /* Light blue for contrast */
  color: #0077cc;
  opacity: 0.5;
  cursor: pointer;
  border: 2px dashed #0077cc; /* ✅ Dashed border to make it distinct */

  &:hover {
    background: #d1e8ff;
  }
`;

/* ✅ Plus Icon in "New Recipe" Card */
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
