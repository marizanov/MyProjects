import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme/theme.ts";
import { AuthProvider } from "./context/AuthContext.tsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);

