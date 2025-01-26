import { Formik, Field, Form } from "formik";

export const LofInForm = () => {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      <Form>
        <Field name="email" type="email" />
        <Field name="password" type="password" />

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};
