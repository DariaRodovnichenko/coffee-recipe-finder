import { Formik } from "formik";
import * as Yup from "yup";
import { StyledField, StyledForm, ErrorMsg } from "./RecipeForm.styled.js";
import { useUserData } from "../../hooks/useUserData.js";

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
  // year: Yup.string().oneOf(["2024", "2023", "2022"]).required("Invalid year"),
  ingredients: Yup.string()
    .min(10, "Must be at least 10 characters")
    .required("Required"),
  steps: Yup.string()
    .min(10, "Must be at least 10 characters")
    .required("Required"),
});

export const RecipeForm = () => {
  const { addUserRecipe } = useUserData();

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
      onSubmit={(values, actions) => {
        // ✅ Prepare recipe and add it to the user's recipes
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

        addUserRecipe(newRecipe);
        actions.resetForm();
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
          {/* {errors.name && touched.name ? <div>{errors.name}</div> : null} */}
          <ErrorMsg name="name" component="div" />

          <StyledField
            name="method"
            type="text"
            placeholder="Method of brewing"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.method}
          />
          {/* {errors.method && touched.method ? <div>{errors.method}</div> : null} */}
          <ErrorMsg name="method" component="div" />

          <StyledField
            name="beans"
            type="text"
            placeholder="Beans"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.beans}
          />

          {/* {errors.year && touched.year ? (
            <div>{errors.year}</div>
          ) : null} */}
          {/* <ErrorMsg name="year" component="div" /> */}

          <StyledField
            name="grinder"
            type="text"
            placeholder="Grinder type"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.grinder}
          />
          <ErrorMsg name="year" component="div" />

          <StyledField
            name="filter"
            type="text"
            placeholder="Filter type"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.filter}
          />
          <ErrorMsg name="year" component="div" />

          <StyledField
            as="textarea"
            name="ingredients"
            type="text"
            placeholder="Ingredients"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.ingredients}
          />
          {/* {errors.ingredients && touched.ingredients ? (
            <div>{errors.ingredients}</div>
          ) : null} */}
          <ErrorMsg name="ingredients" component="div" />

          <StyledField
            as="textarea"
            name="steps"
            type="text"
            placeholder="Steps"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.steps}
          />
          {/* {errors.steps && touched.steps ? <div>{errors.steps}</div> : null} */}
          <ErrorMsg name="steps" component="div" />

          <button type="submit">Submit</button>
        </StyledForm>
      )}
    </Formik>
  );
};
