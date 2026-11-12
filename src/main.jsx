import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
// The Bootstrap Icons stylesheet contains the font required for the icons.
import "bootstrap-icons/font/bootstrap-icons.css";
import "./style.css";

// The createRoot connects the React application to the root element in index.html.
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
