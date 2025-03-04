import { Canvas } from "@react-three/fiber";
import styled from "styled-components";

export const StyledCanvas = styled(Canvas)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -100;
  pointer-events: none; /* Prevents blocking UI elements */
  background: black; /* Ensures background color */
`;