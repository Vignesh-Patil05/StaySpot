import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { router } from "./router";
import theme from "./theme";
import { supabase } from "./supabaseClient";
import { RoleProvider } from "./pages/RoleContext";

supabase.auth.getSession(); // initializes session from storage

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RoleProvider>
        <RouterProvider router={router} />
      </RoleProvider>
    </ThemeProvider>
  </React.StrictMode>
);
