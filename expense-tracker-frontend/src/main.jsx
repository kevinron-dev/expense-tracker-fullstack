import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SpeedInsights } from "@vercel/speed-insights/react";
import App from "./App.jsx";
import "./index.css";
import "primereact/resources/themes/vela-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <SpeedInsights />
  </React.StrictMode>
);
