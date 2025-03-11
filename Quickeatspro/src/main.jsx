import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, GlobalStyles } from "@mui/material";
import theme from "./theme"; // Import custom theme
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import './index.css';
const globalStyles = (
  <GlobalStyles
    styles={{
      "*": { fontFamily: "'Poppins', sans-serif !important" },
      body: { fontFamily: "'Poppins', sans-serif !important" },
    }}
  />
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {globalStyles} {/* Apply Global Styles */}
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
