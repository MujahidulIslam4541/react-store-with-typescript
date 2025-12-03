import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { FilterProvider } from "./components/FilterContext.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FilterProvider>
      <App></App>
    </FilterProvider>
  </StrictMode>
);
