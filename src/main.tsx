import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App"; // Assuming App.tsx is correctly typed
import "./index.css";

// Type assertion to ensure TypeScript knows the element is not null
const rootElement = document.getElementById("root") as HTMLElement;

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
