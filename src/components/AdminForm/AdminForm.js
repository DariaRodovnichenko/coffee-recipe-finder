import { Formik } from "formik";
import * as Yup from "yup";
import {
  StyledField,
  StyledForm,
  ErrorMsg,
} from "../RecipeForm/RecipeForm.styled.js";

const RecipeSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  country: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  year: Yup.string().required("Required"),
  method: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  beans: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  grinder: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  filter: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  ingredients: Yup.string()
    .min(10, "Must be at least 10 characters")
    .required("Required"),
  steps: Yup.string()
    .min(10, "Must be at least 10 characters")
    .required("Required"),
});

export const AdminForm = ({ onAdd }) => {
  if (!onAdd) {
    console.error("❌ onAdd function is missing in AdminForm!");
  }

  return (
    <Formik
      initialValues={{
        name: "",
        country: "",
        year: "",
        method: "",
        beans: "",
        grinder: "",
        filter: "",
        ingredients: "",
        steps: "",
      }}
      validationSchema={RecipeSchema}
      onSubmit={(values, actions) => {
        console.log("🛠 Submitting recipe:", values);

        // Prepare ingredients and steps as comma-separated strings for Firebase
        const newRecipe = {
          ...values,
          ingredients: values.ingredients
            .split(",")
            .map((item) => item.trim())
            .join(","),
          steps: values.steps
            .split(",")
            .map((item) => item.trim())
            .join(","),
        };

        console.log("🔥 Transformed Recipe:", newRecipe);

        if (onAdd) {
          console.log("🚀 Calling onAdd function...");
          onAdd(newRecipe); // ✅ Corrected: Pass newRecipe instead of values
        } else {
          console.error("❌ onAdd function is missing!");
        }

        actions.resetForm();
      }}
    >
      {({ handleSubmit, handleChange, handleBlur, values }) => (
        <StyledForm onSubmit={handleSubmit}>
          <StyledField
            name="name"
            type="text"
            placeholder="Recipe Name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
          />
          <ErrorMsg name="name" component="div" />

          <StyledField
            name="country"
            type="text"
            placeholder="Country"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.country}
          />
          <ErrorMsg name="country" component="div" />

          <StyledField
            as="select"
            name="year"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.year}
          >
            <option value="">Select Year</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
          </StyledField>
          <ErrorMsg name="year" component="div" />

          <StyledField
            name="method"
            type="text"
            placeholder="Brewing Method"
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
          <ErrorMsg name="beans" component="div" />

          <StyledField
            name="grinder"
            type="text"
            placeholder="Grinder Type"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.grinder}
          />
          <ErrorMsg name="grinder" component="div" />

          <StyledField
            name="filter"
            type="text"
            placeholder="Filter Type"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.filter}
          />
          <ErrorMsg name="filter" component="div" />

          <StyledField
            as="textarea"
            name="ingredients"
            type="text"
            placeholder="Ingredients (comma-separated)"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.ingredients}
          />
          <ErrorMsg name="ingredients" component="div" />

          <StyledField
            as="textarea"
            name="steps"
            type="text"
            placeholder="Steps (comma-separated)"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.steps}
          />
          <ErrorMsg name="steps" component="div" />

          <button
            type="submit"
            onClick={() => console.log("🚀 Submit Button Clicked!")}
          >
            Submit
          </button>
        </StyledForm>
      )}
    </Formik>
  );
};
