import React, { useState } from "react";
import { useDispatch} from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  loginUser,
  registerUser,
  signInWithGoogle,
} from "../../redux/authentication/authOperations.js";

import {
  Error,
  FormGroup,
  LogInBtn,
  LogInContainer,
  LogInInput,
  LogInLbl,
  GoogleSignInBtn,
  ToggleFormBtn,
  PasswordWrapper,
  TogglePasswordBtn,
} from "./AuthStyledForm.styled.js";

export const AuthForm = ({
  isSignedUp,
  setIsSignedUp,
  setIsLoginModalOpen,
}) => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Define Yup validation schema
  const validationSchema = Yup.object({
    ...(isSignedUp && {
      username: Yup.string()
        .min(2, "Name should be at least 2 characters")
        .required("Please input your name"),
    }),
    email: Yup.string()
      .email("Invalid email format")
      .required("Please input your Email"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Please input your Password"),
    ...(isSignedUp && {
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Please confirm your password"),
    }),
  });

  // Formik with Yup validation
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const action = isSignedUp ? registerUser(values) : loginUser(values);
      dispatch(action)
        .unwrap()
        .then(() => {
          setIsLoginModalOpen(false); // ✅ Close modal after success
        })
        .finally(() => setSubmitting(false));
    },
  });

  // ✅ Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    dispatch(signInWithGoogle())
      .unwrap()
      .then(() => {
        setIsLoginModalOpen(false); // ✅ Close modal after success
      });
  };

  return (
    <LogInContainer>
      <form onSubmit={formik.handleSubmit}>
        {/* Conditionally show user name field for SignUp */}
        {isSignedUp && (
          <FormGroup>
            <LogInLbl htmlFor="username">User</LogInLbl>
            <LogInInput
              type="text"
              id="username"
              name="username"
              placeholder="User name"
              {...formik.getFieldProps("username")}
            />
            {formik.touched.username && formik.errors.username && (
              <Error>{formik.errors.username}</Error>
            )}
          </FormGroup>
        )}
        <FormGroup>
          <LogInLbl htmlFor="email">Email</LogInLbl>
          <LogInInput
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email && (
            <Error>{formik.errors.email}</Error>
          )}
        </FormGroup>
        <FormGroup>
          <LogInLbl htmlFor="password">Password</LogInLbl>
          <PasswordWrapper>
            <LogInInput
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Password"
              autoComplete="current-password"
              {...formik.getFieldProps("password")}
            />
            <TogglePasswordBtn
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </TogglePasswordBtn>
          </PasswordWrapper>
          {formik.touched.password && formik.errors.password && (
            <Error>{formik.errors.password}</Error>
          )}
        </FormGroup>

        {/* Conditionally show confirmPassword field for SignUp */}
        {isSignedUp && (
          <FormGroup>
            <LogInLbl htmlFor="confirmPassword">Confirm Password</LogInLbl>
            <PasswordWrapper>
              <LogInInput
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                {...formik.getFieldProps("confirmPassword")}
              />
              <TogglePasswordBtn
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </TogglePasswordBtn>
            </PasswordWrapper>
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <Error>{formik.errors.confirmPassword}</Error>
              )}
          </FormGroup>
        )}
        <LogInBtn type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting
            ? isSignedUp
              ? "Signing up..."
              : "Logging in..."
            : isSignedUp
            ? "Sign Up"
            : "Log In"}
        </LogInBtn>
      </form>

      {/* Google Sign-In Button */}
      <GoogleSignInBtn onClick={handleGoogleSignIn}>
        Sign in with Google
      </GoogleSignInBtn>

      {/* Toggle between SignUp and SignIn */}
      <ToggleFormBtn onClick={() => setIsSignedUp((prev) => !prev)}>
        {isSignedUp
          ? "Already have an account? Log In"
          : "Don't have an account? Sign Up"}
      </ToggleFormBtn>
    </LogInContainer>
  );
};
