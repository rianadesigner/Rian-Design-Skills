import React from "react";
import ReactDOM from "react-dom/client";
import "@alife/mux-components/dist/index.css";
import { MerchantReportPage } from "./MerchantReportPage";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MerchantReportPage />
  </React.StrictMode>,
);
