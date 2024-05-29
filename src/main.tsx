import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App.tsx";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
