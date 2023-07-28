import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ReactErrorBoundary from "./ErrorHandler/ReactErrorHandler.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ReactErrorBoundary>
      <App />
    </ReactErrorBoundary>
  </React.StrictMode>
);
