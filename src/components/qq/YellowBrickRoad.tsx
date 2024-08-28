export type YBRpage = {
  rank: 'dev' | 'newb' | 'cadet' | 'learner' | 'ranger'
  id: string
  title: string
  phase: 'I' | 'P' | 'O' | 'W' | 'E' | 'R'
  phaseLabel: string
  intro?: string | string[]
  psHints?: string[] // Not used on I pages as they have the giant avatar
  aiHints?: boolean
}

export const YellowBrickRoad: YBRpage[] = [
  {
    rank: 'dev',
    id: 'MeetTutor',
    title: 'string',
    phase: 'I',
    phaseLabel: 'str',
  },
  {
    rank: 'dev',
    id: 'FillDiagram',
    title: 'Fill in the Diagram',
    phase: 'O',
    phaseLabel: 'Organize',
  },
  {
    rank: 'dev',
    id: 'SolveTheEquation',
    title: 'Solve the Equation',
    phase: 'W',
    phaseLabel: 'Work the Problem',
    intro: 'Solve the equation above. Click the button to begin!',
    psHints: [
      'Use the + and - buttons to add and subtract numbers',
      'Use the = button to solve the equation',
    ],
    aiHints: false,
  },

  {
    rank: 'newb',
    id: 'MeetTutor',
    title: 'string',
    phase: 'I',
    phaseLabel: 'Instruction',
    intro: [
      'Hi! My name is Kettu.',
      "Together, we're going to get the POWER to solve math word problems!",
      'Each letter in POWER is a problem-solving step that I will teach you.',
      'Some word problems are easy. Others are harder. When you have POWER, you can use it to solve *any* word problem.',
      "When we work together, we'll always use POWER, even for easy problems. That's so you can practice your skills and keep your POWER strong.",
      `Let's learn the first **P**OWER step!

  **P** is the first step. **P** stands for **P**repare.

  Ready? Click →.`,
    ],
  },

  // {
  //   rank: "newb",
  //   id: "FeelThePower",
  //   title: "string",
  //   phase: "I",
  //   phaseLabel: "Instruction",
  // },
  // {
  //   rank: "newb",
  //   id: "GratzWatchedVideo",
  //   title: "string",
  //   phase: "I",
  //   phaseLabel: "Instruction",
  // },
  {
    rank: 'newb',
    id: 'FindTutor',
    title: 'string',
    phase: 'I',
    phaseLabel: 'Instruction',
    intro: [
      'We’ll work together. I’ll be right here if you need me. Just click my cute self to get my attention. 🥰 Try it now.',
    ],
    psHints: [
      `Perfect! You found me!

If you're ever stuck, click on me just like that. I'll do my best to give you a hand.`,
      `Look next to me. Do you see the →? When it's blue, you can click it. If you've done any work, I'll check it before we move on. If something isn't right, I can help you fix it.

      Click → now to continue.`,
    ],
  },
  // {
  //   rank: "newb",
  //   id: "GratzFoundTutor",
  //   title: "string",
  //   phase: "I",
  //   phaseLabel: "Instruction",
  // },
  {
    rank: 'newb',
    id: 'ReadProblem',
    title: 'Read',
    phase: 'P',
    phaseLabel: 'Prepare',
    intro: [
      `You did that just right! Now let's Prepare.`,
      `There are three things we do to Prepare. The first one is Read.

Read the story above. Take your time, and read every word carefully.

Click → when you're done.`,
    ],
    psHints: [
      `Click → when you're done reading.`,
      `Go ahead and click → to continue.`,
    ],
  },
  {
    rank: 'newb',
    id: 'FindFacts',
    title: 'Pull Apart',
    phase: 'P',
    phaseLabel: 'Prepare',
    intro: [
      `After reading a problem, we pull it apart. That means to find the important amounts and pull them out.`,
      `An amount in a word problem can be known, or it can be unknown.`,
      `When you find an amount, highlight it. Then pull it out and place it under Known or Unknown.

Let's find the known amounts together. Click on me and I'll show you how.`,
    ],
  },
  {
    rank: 'newb',
    id: 'VideoTotal',
    title: 'Total Stories (First Total Video)',
    phase: 'I',
    phaseLabel: 'Instruction',
    intro: [
      `The final Prepare task is to pick the problem type.

A word problem tells a story. Before you solve a word problem, it helps to know what *type* of story it tells.`,
      `There are a few different story types. The first one we'll learn about is Total.

Press ▶️ to start the video.

When the video finishes, click → to continue.`,
    ],
  },
  // {
  //   rank: "newb",
  //   id: "GratzOnPrepare",
  //   title: "string",
  //   phase: "I",
  //   phaseLabel: "Instruction",
  // },
  {
    rank: 'newb',
    id: 'NewbProblemType',
    title: 'Pick the problem type',
    phase: 'P',
    phaseLabel: 'Prepare',
    intro: [
      `Super! Now we can pick the problem type.

The only type we know for now is Total. Let's make sure we've got a Total story here.`,
      `Are parts put together to make a total?

Yes! Click on me for more details.`,
    ],
  },
  {
    rank: 'newb',
    id: 'NewbVictory',
    title: 'string',
    phase: 'I',
    phaseLabel: 'Instruction',
    intro: [
      `Great work!

Now you know the first POWER step, **P**repare.`,
      `To **P**repare, we:
1. Read
1. Pull apart
1. Pick the problem type`,
      `*And* you now know one problem type: Total.

Click Next to practice and check your understanding.`,
    ],
  },
  {
    rank: 'cadet',
    id: 'ReadProblem',
    title: 'string',
    phase: 'P',
    phaseLabel: 'Prepare',
  },
  // {
  //   rank: "cadet",
  //   id: "WhatToAnswer",
  //   title: "Read the Problem",
  //   phase: "P",
  //   phaseLabel: "str",
  // },
  {
    rank: 'cadet',
    id: 'FindFacts',
    title: 'What are the relevant facts?',
    phase: 'P',
    phaseLabel: 'Prepare',
  },
  {
    rank: 'cadet',
    id: 'SelectDiagram',
    title: 'What type of problem is it?',
    phase: 'O',
    phaseLabel: 'Organize',
  },
  // {
  //   rank: "cadet",
  //   id: "FillDiagram",
  //   title: "Fill in the Diagram",
  //   phase: "O",
  //   phaseLabel: "str",
  // },
  {
    rank: 'cadet',
    id: 'FillEquation',
    title: 'string',
    phase: 'O',
    phaseLabel: 'Fill in the Equation',
  },
  {
    rank: 'cadet',
    id: 'GratzOnOrganize',
    title: 'string',
    phase: 'I',
    phaseLabel: '',
  },
  {
    rank: 'cadet',
    id: 'SolveTheEquation',
    title: 'Solve the Equation',
    phase: 'W',
    phaseLabel: 'Work the Problem',
  },
  // {
  //   rank: "cadet",
  //   id: "GratzEquationSolved",
  //   title: "Congratulations you solved the equation",
  //   phase: "I",
  //   phaseLabel: "Work the Problem",
  // },
  {
    rank: 'cadet',
    id: 'SolvedFor',
    title: 'Do you remember what XXX is?',
    phase: 'E',
    phaseLabel: 'Explain your Answer',
  },
  {
    rank: 'cadet',
    id: 'Reflect',
    title: 'Why is this answer correct?',
    phase: 'R',
    phaseLabel: 'Reflect on the Answer',
  },
  {
    rank: 'cadet',
    id: 'GratzOnLearner',
    title: '',
    phase: 'I',
    phaseLabel: '',
  },
  {
    rank: 'cadet',
    id: 'QuestIntro',
    title: '',
    phase: 'I',
    phaseLabel: '',
  },
  {
    rank: 'cadet',
    id: 'WhatIsPower',
    title: '',
    phase: 'I',
    phaseLabel: '',
  },

  {
    rank: 'ranger',
    id: 'ReadProblem',
    title: 'Read the problem',
    phase: 'P',
    phaseLabel: 'Prepare',
    psHints: [
      `Click → when you're done reading.`,
      `Go ahead and click → to continue.`,
    ],
    aiHints: false,
  },
  {
    rank: 'ranger',
    id: 'FindFacts',
    title: 'Pull apart the problem',
    phase: 'P',
    phaseLabel: 'Prepare',
    aiHints: false,
  },
  {
    rank: 'ranger',
    id: 'SelectDiagram',
    title: 'Pick the problem type',
    phase: 'P',
    phaseLabel: 'Prepare',
    aiHints: false,
  },
  {
    rank: 'ranger',
    id: 'FillDiagram',
    title: 'Define the equation',
    phase: 'O',
    phaseLabel: 'Organize',
    aiHints: false,
  },
  {
    rank: 'ranger',
    id: 'SolveTheEquation',
    title: 'Find the unknown amount',
    phase: 'W',
    phaseLabel: 'Work the Problem',
    aiHints: false,
  },
  {
    rank: 'ranger',
    id: 'OwnWords',
    title: 'Answer the question',
    phase: 'E',
    phaseLabel: 'Explain the Answer',
    aiHints: false,
  },
  {
    rank: 'ranger',
    id: 'Reflect',
    title: 'Think about the answer',
    phase: 'R',
    phaseLabel: 'Reflect',
    psHints: [`Choose the reason you think is best. Then click →.`],
    aiHints: true,
  },
  {
    rank: 'ranger',
    id: 'RangerVictory',
    title: 'string',
    phase: 'I',
    phaseLabel: 'Congratulations',
    intro: [
      `Congratulations! You solved the problem!
      
Click Next when you're ready to move on.`,
    ],
  },
]
