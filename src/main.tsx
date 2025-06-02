import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initializeEmailJS } from "./lib/email.ts";

initializeEmailJS();

createRoot(document.getElementById("root")!).render(<App />);
