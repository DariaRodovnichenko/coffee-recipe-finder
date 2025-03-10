import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  loginUser,
  registerUser,
  signInWithGoogle,
} from "../../redux/authentication/authOperations.js";

import {
  ErrorMsg,
  FormGroup,
  LogInBtn,
  LogInInput,
  LogInLbl,
  GoogleSignInBtn,
  ToggleFormBtn,
  PasswordWrapper,
  TogglePasswordBtn,
} from "./AuthStyledForm.styled.js";
import toast from "react-hot-toast";

export const AuthForm = ({
  isSignedUp,
  setIsSignedUp,
  setIsLoginModalOpen,
}) => {
  if (!setIsSignedUp) {
    console.error("setIsSignedUp is not provided to AuthForm.");
  }
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      const { email, password, username } = values;
      const action = isSignedUp
        ? registerUser({ email, password, username })
        : loginUser({ email, password });
      dispatch(action)
        .unwrap()
        .then((userData) => {
          setIsLoginModalOpen(false);

          // ✅ Redirect admin users to admin panel
          if (userData.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/my-recipes");
          }
        })
        .catch((error) => {
          toast.error(error); // Show error message in UI
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
    <>
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
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.username && formik.errors.username && (
              <ErrorMsg>{formik.errors.username}</ErrorMsg>
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
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <ErrorMsg>{formik.errors.email}</ErrorMsg>
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
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <TogglePasswordBtn
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </TogglePasswordBtn>
          </PasswordWrapper>
          {formik.touched.password && formik.errors.password && (
            <ErrorMsg>{formik.errors.password}</ErrorMsg>
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
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
                <ErrorMsg>{formik.errors.confirmPassword}</ErrorMsg>
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
    </>
  );
};
