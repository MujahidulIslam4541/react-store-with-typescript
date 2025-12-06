import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { FilterProvider } from "@/components/FilterContext";
import App from "@/App";
import { Provider } from "react-redux";
import { store } from "./redux/store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FilterProvider>
      <Provider store={store}>
        <App></App>
      </Provider>
    </FilterProvider>
  </StrictMode>
);
