import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
// A Bootstrap Icons stíluslapja tartalmazza az ikonokhoz szükséges betűkészletet.
import "bootstrap-icons/font/bootstrap-icons.css";
import "./style.css";

// A createRoot összeköti a React alkalmazást az index.html root elemével.
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
