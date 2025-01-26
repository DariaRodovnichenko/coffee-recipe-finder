import { Formik, Field, Form } from "formik";

export const SignInForm = () => {
  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      <Form>
        <Field name="name" type="text" />
        <Field name="email" type="email" />
        <Field name="password" type="password" />

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};