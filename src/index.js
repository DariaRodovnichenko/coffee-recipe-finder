import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { App } from "./components/App.js";
import { Provider } from "react-redux";
import store from "./redux/authentication/store.js";

const theme = {
  colors: {
    black: " #212121",
    white: "#fff",
    red: "red",
  },
  radii: {
    md: "8px",
  },
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
