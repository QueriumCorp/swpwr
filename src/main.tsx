import React from "react";
import ReactDOM from "react-dom/client";
import StepWisePower from "./SWPower.tsx";
import "./index.css";
import "./swReact.css";
import "./animeTutor.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="w-dvw h-dvh overflow-hidden relative">
      <StepWisePower
        className="absolute top-0 left-0 right-0 bottom-0 flex flex-col"
        swapiUrl="http://0.0.0.0:4000"
      />
    </div>
  </React.StrictMode>,
);
