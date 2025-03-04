import { Formik } from "formik";
import * as Yup from "yup";
import { StyledField, StyledForm, ErrorMsg, StyledTextarea, FormBtn } from "./RecipeForm.styled.js";
import { useUserData } from "../../hooks/useUserData.js";
import toast from "react-hot-toast";
import { useState } from "react";

const RecipeSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  method: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  beans: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
  grinder: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
  filter: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
  ingredients: Yup.string()
    .min(10, "Must be at least 10 characters")
    .required("Required"),
  steps: Yup.string()
    .min(10, "Must be at least 10 characters")
    .required("Required"),
});

export const UserRecipeForm = ({ onSubmit, onCancel }) => {
  const { addUserRecipe } = useUserData();
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Formik
      initialValues={{
        name: "",
        method: "",
        beans: "",
        grinder: "",
        filter: "",
        ingredients: "",
        steps: "",
      }}
      validationSchema={RecipeSchema}
      onSubmit={async (values, actions) => {
        console.log("📝 Form submitted with values:", values);

        if (isSubmitting) {
          console.warn("🚫 Submission blocked to prevent duplicate entry.");
          return;
        }

        setIsSubmitting(true);
        try {
          const newRecipe = await addUserRecipe(values); // ✅ Store new recipe
          if (!newRecipe) {
            throw new Error("Recipe creation failed.");
          }

          actions.resetForm();
          if (onSubmit) onSubmit(newRecipe); // ✅ Pass new recipe to `UserPage.js`
        } catch (error) {
          toast.error("❌ Failed to add recipe.");
        } finally {
          setTimeout(() => setIsSubmitting(false), 500);
        }
      }}
    >
      {({ handleChange, handleBlur, values }) => (
        <StyledForm>
          <StyledField
            name="name"
            type="text"
            placeholder="Recipe name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
          />
          <ErrorMsg name="name" component="div" />

          <StyledField
            name="method"
            type="text"
            placeholder="Method of brewing"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.method}
          />
          <ErrorMsg name="method" component="div" />

          <StyledField
            name="beans"
            type="text"
            placeholder="Beans"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.beans}
          />

          <StyledField
            name="grinder"
            type="text"
            placeholder="Grinder type"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.grinder}
          />
          <ErrorMsg name="grinder" component="div" />

          <StyledField
            name="filter"
            type="text"
            placeholder="Filter type"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.filter}
          />
          <ErrorMsg name="filter" component="div" />

          <StyledTextarea
            as="textarea"
            name="ingredients"
            placeholder="Ingredients"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.ingredients}
          />
          <ErrorMsg name="ingredients" component="div" />

          <StyledTextarea
            as="textarea"
            name="steps"
            placeholder="Steps"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.steps}
          />
          <ErrorMsg name="steps" component="div" />

          <FormBtn type="submit" disabled={isSubmitting}>
            Submit
          </FormBtn>
          {onCancel && (
            <FormBtn type="button" onClick={onCancel} disabled={isSubmitting}>
              Cancel
            </FormBtn>
          )}
        </StyledForm>
      )}
    </Formik>
  );
};
