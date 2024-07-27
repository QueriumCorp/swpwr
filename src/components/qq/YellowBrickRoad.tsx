export type YBRpage = {
  rank: "dev" | "newb" | "cadet" | "learner" | "ranger";
  id: string;
  title: string;
  phase: "I" | "P" | "O" | "W" | "E" | "R";
  phaseLabel: string;
  intro?: string | string[];
  psHints?: string[]; // Not used on I pages as they have the giant avatar
  aiHints?: boolean;
};

export const YellowBrickRoad: YBRpage[] = [
  // {
  //   rank: "dev",
  //   id: "MeetTutor",
  //   title: "string",
  //   phase: "I",
  //   phaseLabel: "str",
  // },
  {
    rank: "dev",
    id: "SolveTheEquation",
    title: "Solve the Equation",
    phase: "W",
    phaseLabel: "Work the Problem",
    intro: "Solve the equation above. Click the button to begin!",
    psHints: [
      "Use the + and - buttons to add and subtract numbers",
      "Use the = button to solve the equation",
    ],
    aiHints: false,
  },

  {
    rank: "newb",
    id: "MeetTutor",
    title: "string",
    phase: "I",
    phaseLabel: "str",
    intro: [
      "Hi! My name is Kettu.",
      "Together, we’re going to get the POWER to solve math word problems!",
      "Each letter in POWER is a problem‐solving step that I will teach you.",
      "Some word problems are easy. But others are harder. When you have POWER, you can use it to solve any word problem.",
      "When we work together, we’ll always use POWER, even for easy problems. That’s so you can practice your skills and keep your POWER strong.",
      `Let’s learn the first POWER step!
The first step is P. P stands for Prepare.
Ready? Click → and I’ll show you how to Prepare.`,
    ],
  },
  {
    rank: "newb",
    id: "FeelThePower",
    title: "string",
    phase: "I",
    phaseLabel: "str",
  },
  {
    rank: "newb",
    id: "GratzWatchedVideo",
    title: "string",
    phase: "I",
    phaseLabel: "str",
  },
  {
    rank: "newb",
    id: "FindTutor",
    title: "string",
    phase: "I",
    phaseLabel: "str",
    intro: [
      "We’ll work together. I’ll be right here if you need me. Just click my cute self to get my attention. 🥰 Try it now.",
    ],
  },
  {
    rank: "newb",
    id: "Reflect",
    title: "Why is this answer correct?",
    phase: "R",
    phaseLabel: "Reflect on the Answer",
  },
  {
    rank: "newb",
    id: "GratzFoundTutor",
    title: "string",
    phase: "I",
    phaseLabel: "str",
  },
  {
    rank: "newb",
    id: "ReadProblem",
    title: "string",
    phase: "P",
    phaseLabel: "str",
    intro:
      "Read this statement carefully and then click the right arrow to continue.",
  },
  {
    rank: "newb",
    id: "KnownFacts",
    title: "string",
    phase: "P",
    phaseLabel: "str",
  },
  {
    rank: "newb",
    id: "GratzOnPrepare",
    title: "string",
    phase: "I",
    phaseLabel: "str",
  },
  {
    rank: "newb",
    id: "NewbProblemType",
    title: "string",
    phase: "P",
    phaseLabel: "str",
  },
  {
    rank: "newb",
    id: "NewbVictory",
    title: "string",
    phase: "I",
    phaseLabel: "str",
  },
  {
    rank: "cadet",
    id: "ReadProblem",
    title: "string",
    phase: "P",
    phaseLabel: "str",
  },
  // {
  //   rank: "cadet",
  //   id: "WhatToAnswer",
  //   title: "Read the Problem",
  //   phase: "P",
  //   phaseLabel: "str",
  // },
  {
    rank: "cadet",
    id: "FindFacts",
    title: "What are the relevant facts?",
    phase: "P",
    phaseLabel: "str",
  },
  {
    rank: "cadet",
    id: "SelectDiagram",
    title: "What type of problem is it?",
    phase: "O",
    phaseLabel: "str",
  },
  // {
  //   rank: "cadet",
  //   id: "FillDiagram",
  //   title: "Fill in the Diagram",
  //   phase: "O",
  //   phaseLabel: "str",
  // },
  {
    rank: "cadet",
    id: "FillEquation",
    title: "string",
    phase: "O",
    phaseLabel: "Fill in the Equation",
  },
  {
    rank: "cadet",
    id: "GratzOnOrganize",
    title: "string",
    phase: "I",
    phaseLabel: "",
  },
  {
    rank: "cadet",
    id: "SolveTheEquation",
    title: "Solve the Equation",
    phase: "W",
    phaseLabel: "Work the Problem",
  },
  // {
  //   rank: "cadet",
  //   id: "GratzEquationSolved",
  //   title: "Congratulations you solved the equation",
  //   phase: "I",
  //   phaseLabel: "Work the Problem",
  // },
  {
    rank: "cadet",
    id: "SolvedFor",
    title: "Do you remember what XXX is?",
    phase: "E",
    phaseLabel: "Explain your Answer",
  },
  {
    rank: "cadet",
    id: "Reflect",
    title: "Why is this answer correct?",
    phase: "R",
    phaseLabel: "Reflect on the Answer",
  },
  {
    rank: "cadet",
    id: "GratzOnLearner",
    title: "",
    phase: "I",
    phaseLabel: "",
  },
  {
    rank: "cadet",
    id: "QuestIntro",
    title: "",
    phase: "I",
    phaseLabel: "",
  },
  {
    rank: "cadet",
    id: "WhatIsPower",
    title: "",
    phase: "I",
    phaseLabel: "",
  },

  {
    rank: "ranger",
    id: "ReadProblem",
    title: "string",
    phase: "P",
    phaseLabel: "str",
  },
  {
    rank: "ranger",
    id: "WhatToAnswer",
    title: "Read the Problem",
    phase: "P",
    phaseLabel: "str",
  },
  {
    rank: "ranger",
    id: "FindFacts",
    title: "What are the relevant facts?",
    phase: "P",
    phaseLabel: "str",
  },
  {
    rank: "ranger",
    id: "SelectDiagram",
    title: "What type of problem is it?",
    phase: "O",
    phaseLabel: "str",
  },
  {
    rank: "ranger",
    id: "FillDiagram",
    title: "Fill in the Diagram",
    phase: "O",
    phaseLabel: "str",
  },
  {
    rank: "ranger",
    id: "FillEquation",
    title: "string",
    phase: "O",
    phaseLabel: "Fill in the Equation",
  },
  {
    rank: "ranger",
    id: "SolveTheEquation",
    title: "Solve the Equation",
    phase: "W",
    phaseLabel: "Work the Problem",
  },
  {
    rank: "ranger",
    id: "SolvedFor",
    title: "Do you remember what XXX is?",
    phase: "E",
    phaseLabel: "Explain your Answer",
  },
  {
    rank: "ranger",
    id: "Reflect",
    title: "Why is this answer correct?",
    phase: "R",
    phaseLabel: "Reflect on the Answer",
  },
];
