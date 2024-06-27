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

const problem = {
  appKey: "JiraTestPage",
  policyId: "$A1$",
  problemId: "QUES6018",
  title: "Solve compound linear inequalities in 1 variable",
  stimulus:
    "Minh spent $6.25 on 5 sticker books to give his nephews. Find the cost of each sticker book.",
  class: "gradeBasicAlgebra",
  question:
    'SolveWordProblemAns[{"Minh spent $6.25 on 5 sticker books to give his nephews. Find the cost of each sticker book."}]',
  hints: [],
};

const student = {
  studentId: "PokeyLoki",
  studentName: "Loki Van Riper",
};

const options = {
  swapiUrl,
  rank: import.meta.env.VITE_RANK,
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="w-dvw h-dvh overflow-hidden relative">
      <StepWisePower
        className="absolute top-0 left-0 right-0 bottom-0 flex flex-col"
        problem={problem}
        student={student}
        options={options}
      />
    </div>
  </React.StrictMode>,
);
