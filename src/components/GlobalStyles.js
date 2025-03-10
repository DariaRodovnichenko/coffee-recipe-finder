import { createGlobalStyle } from "styled-components";
import "modern-normalize";

export const GlobalStyle = createGlobalStyle`
  /* ✅ Reset default styles */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* ✅ Prevent unwanted horizontal scrolling */
  html, body, #root {
    width: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
    position: relative;
  }

  /* ✅ Smooth font rendering */
  html {
    font-size: 16px;
    font-family: 'Inter', Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #0a0a0a; /* Match cosmic theme */
    color: white;
  }

  body {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }

  /* ✅ Prevent elements from interfering with modals */
  nav, header, footer, .recipe-card {
    z-index: 1000;
    position: relative;
  }

 /* ✅ Modal Overlay */
.LoginModal_Overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8); /* Darker overlay */
  backdrop-filter: blur(8px); /* Frosted glass effect */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999 !important;
}

/* ✅ Login Modal Content */
.LoginModal_Content {
  background: rgba(19, 19, 19, 0.95);
  padding: 36px;
  border-radius: 12px;
  max-width: 420px;
  width: 90%;
  text-align: center;
  box-shadow: 0px 10px 30px rgba(255, 255, 255, 0.2);
  position: relative;
  z-index: 10000 !important;
}
`;
