import { Formik } from "formik";
import { StyledField, StyledForm } from "./RecipeForm.styled";

export const RecipeForm = () => {
  return (
    <Formik
      initialValues={{ name: "", method: "", difficulty: "" }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      <StyledForm>
        <StyledField name="name" type="text" placeholder="Recipe name" />
        <StyledField
          name="method"
          type="text"
          placeholder="Method of brewing"
        />
        <StyledField as="select" name="difficulty">
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </StyledField>
        <StyledField
          as="textarea"
          name="ingredients"
          type="text"
          placeholder="Ingredients"
        />
        <StyledField
          as="textarea"
          name="steps"
          type="text"
          placeholder="Steps"
        />
        <button type="submit">Submit</button>
      </StyledForm>
    </Formik>
  );
};
