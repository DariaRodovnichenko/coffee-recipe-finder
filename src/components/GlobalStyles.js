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
    overflow-x: hidden;
  }

  /* ✅ Ensure smooth font rendering */
  html {
    font-size: 16px;
    font-family: 'Inter', Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #0a0a0a; /* Adjust to match cosmic theme */
    color: white;
  }

  body {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    overflow-x: hidden;
    position: relative;
  }

  ul {
    list-style: none;
  }

  img {
    display: block;
    max-width: 100%;
    object-fit: cover;
  }

  p {
    margin: 0 0 10px;
    line-height: 1.6;
  }

  button {
    cursor: pointer;
    border: none;
    padding: 8px 16px;
    border-radius: 5px;
    font-weight: 500;
    transition: all 0.3s ease;
  }

  /* ✅ Modal Overlay */
  .ReactModal__Overlay {
    position: fixed !important;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6); /* Dark semi-transparent overlay */
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000 !important; /* ✅ Ensures it is on top */
  }

  /* ✅ Modal Content */
  .ReactModal__Content {
    background: #292929;
    padding: 20px;
    border-radius: 10px;
    max-width: 400px;
    width: 90%;
    position: relative;
    z-index: 3000 !important; /* ✅ Ensure modal is above everything */
    box-shadow: 0px 10px 30px rgba(255, 255, 255, 0.5);
  }

  /* ✅ Fix navbar and other elements from blocking modal */
  nav, header, footer, .recipe-card {
    z-index: 1000; /* ✅ Keep below modal */
  }
`;
