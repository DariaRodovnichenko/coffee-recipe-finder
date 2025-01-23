import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "./components/App";
import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    black: " #212121",
    white: "#fff",
    red: "red",
  },
  radii: {
    md: '8px',
  }
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
