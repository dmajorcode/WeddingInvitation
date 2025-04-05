import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Modal from "./components/Modal.tsx";
import { initFontLoading } from "./utils/fontLoader";

// Initialize font loading
initFontLoading();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
