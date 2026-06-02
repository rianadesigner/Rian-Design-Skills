import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@iflow.cn/iflow-design/styles";
import App from "./App";
import "./App.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
