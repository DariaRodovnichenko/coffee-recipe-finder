import styled from "styled-components";
import { Form, Field } from "formik";

export const StyledForm = styled(Form)`
  border-radius: 4px;
  border: 1px solid black;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StyledField = styled(Field)`
  padding: 4px;
`;
