import React from "react";
import ReactDOM from "react-dom/client";
import SWPower from "./SWPower.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="w-">
      <SWPower />
    </div>
  </React.StrictMode>,
);
