import React from "react";
import ReactDOM from "react-dom/client";
import StepWisePower from "./SWPower.tsx";
import "./index.css";
import "./swReact.css";
import "./animeTutor.css";

// Extend window namespace so TS knows about it
declare global {
  interface Window {
    swpwr: any;
  }
}
window.swpwr = window.swpwr || {};

const swapiUrl = import.meta.env.DEV
  ? "http://0.0.0.0:4000"
  : "https://swapi2.onrender.com";

var gltfUrl;
console.info("ENVIRONMENT", import.meta.env);
console.info("SWAPI URL", swapiUrl);

let problem: any = {},
  student: any = {},
  options: any = {},
  handlers: any = {};

if (window.swpwr) {
  problem.appKey = window.swpwr.problem.appKey;
  problem.policyId = window.swpwr.problem.policyId;
  problem.problemId = window.swpwr.problem.problemId;
  problem.title = window.swpwr.problem.title;
  problem.stimulus = window.swpwr.problem.stimulus;
  problem.class = window.swpwr.problem.topic;
  problem.question = window.swpwr.problem.definition;
  problem.hints = window.swpwr.problem.mathHints;

  student.studentId = window.swpwr.student.studentId;
  student.studentName = window.swpwr.student.fullName;

  options.swapiUrl = window.swpwr.options.swapiUrl;
  options.gltfUrl = window.swpwr.options.gltfUrl;
  options.rank = window.swpwr.options.rank;
  options.disabledSchemas = window.swpwr.options.disableSchemas;

  handlers.onComplete = window.swpwr.handlers.onComplete;
} else {
  problem = {
    appKey: "JiraTestPage",
    policyId: "$A9$",
    problemId: "QUES-30533",
    title: "Sticker Book Cost",
    stimulus:
      "Minh spent $6.25 on 5 sticker books to give his nephews. Find the cost of each sticker book.",
    class: "gradeBasicAlgebra",
    question:
      'SolveWordProblemAns[{"Minh spent $6.25 on 5 sticker books to give his nephews. Find the cost of each sticker book."}]',
    hints: [],
  };

  student = {
    studentId: "PokeyLoki",
    studentName: "Loki Van Riper",
  };

  handlers.onComplete = () => {
    console.info("I'm a built-in onComplete Handler");
  };

  // get rank from url
  let params = new URLSearchParams(window.location.search);
  let urlRank = params.get("rank");

  options = {
    swapiUrl,
    gltfUrl,
    rank: urlRank || import.meta.env.VITE_RANK || "newb",
    disabledSchemas: [],
  };
}
debugger;
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="w-dvw h-dvh overflow-hidden relative">
      <StepWisePower
        className="absolute top-0 left-0 right-0 bottom-0 flex flex-col"
        problem={problem}
        student={student}
        options={options}
        onComplete={handlers.onComplete}
      />
    </div>
  </React.StrictMode>,
);
