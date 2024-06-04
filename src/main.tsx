import React from "react";
import ReactDOM from "react-dom/client";
import StepWisePower from "./SWPower.tsx";
import "./index.css";
import "./swReact.css";
import "./animeTutor.css";

const swapiUrl = import.meta.env.DEV
  ? "http://0.0.0.0:4000"
  : "https://swapi2.onrender.com";
console.info("ENVIRONMENT", import.meta.env);
console.info("SWAPI URL", swapiUrl);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="w-dvw h-dvh overflow-hidden relative">
      <StepWisePower
        className="absolute top-0 left-0 right-0 bottom-0 flex flex-col"
        swapiUrl={swapiUrl}
      />
    </div>
  </React.StrictMode>,
);
