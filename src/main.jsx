import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

import { DayLogProvider } from "./context/DayLogContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <DayLogProvider>

      <App />

    </DayLogProvider>

  </React.StrictMode>
);
