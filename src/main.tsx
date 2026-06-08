import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initializeEmailJS } from "./lib/email.ts";

if (import.meta.env.DEV) {
  import("@axe-core/react").then((axe) => {
    axe.default(React, createRoot, 1000);
  });
}

initializeEmailJS();

createRoot(document.getElementById("root")!).render(<App />);
