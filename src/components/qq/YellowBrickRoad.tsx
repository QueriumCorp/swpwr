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
  ///////////////////////////////////////////////////////////////////
  // DEV
  ///////////////////////////////////////////////////////////////////

  {
    rank: 'dev',
    id: 'FindTutor',
    title: 'string',
    phase: 'I',
    phaseLabel: 'Instruction',
    intro: ['Intro 1', 'Intro 2', 'Intro 3'],
    psHints: ['psHint 1', 'psHint 2', 'psHint 3'],
  },
  {
    rank: 'dev',
    id: 'ReadProblem',
    title: 'Read the problem',
    phase: 'P',
    phaseLabel: 'Prepare',
    psHints: [
      `Click ➜ when you're done reading.`,
      `Go ahead and click ➜ to continue.`,
    ],
    aiHints: false,
  },
  {
    rank: 'dev',
    id: 'SolveTheEquation',
    title: 'Find the unknown amount',
    phase: 'W',
    phaseLabel: 'Work the Problem',
    aiHints: false,
  },

  ///////////////////////////////////////////////////////////////////
  // NEWB
  ///////////////////////////////////////////////////////////////////

  {
    rank: 'newb',
    id: 'MeetTutor',
    title: 'string',
    phase: 'I',
    phaseLabel: 'Instruction',
    intro: [
      `Hi! My name is Kettu. Welcome to StepWise for Word Problems!
      
  Look below these words. Do you see [MORE]? That button means I have more to tell you. Click it to find out what.`,
      `Great job!

  Here's a pro tip: Always click [MORE] if it's there. If you don't, you might miss something important. Ok?`,
      `All right!
      
  Together, we're going to get the POWER to solve math word problems.
  
  Each letter in POWER is a problem-solving step that I will teach you.`,
      `Let's learn the first **P**OWER step!

  **P** is the first step. **P** stands for **P**repare.

  Ready? Find the ➜ under my feet and click it to get started.`,
    ],
  },
  {
    rank: 'newb',
    id: 'FindTutor',
    title: 'string',
    phase: 'I',
    phaseLabel: 'Instruction',
    intro: [
      'We’ll work together. I’ll be down here if you need me. Click my cute self to ask for help. 🥰 Try it now.',
    ],
    psHints: [
      `Perfect! You found me!

Anytime you're not sure what to do, you can click me just like that. I'll do my best to help. Now click [MORE].`,
      `See the ➜ next to me? When it's blue, you can click it to move on.

Go ahead and click ➜ now.`,
    ],
  },
  {
    rank: 'newb',
    id: 'ReadProblem',
    title: 'Read',
    phase: 'P',
    phaseLabel: 'Prepare',
    intro: [
      `You did that just right! Now let's **P**repare.

There are three things we do to Prepare. The first one is Read.

Click [MORE] to learn more.`,

      `Read the story in the box above. 

Take your time, and read every word carefully.

Click ➜ when you're done.`,
    ],
    psHints: [`Click ➜ when you're done reading.`],
  },
  {
    rank: 'newb',
    id: 'VideoFindFacts',
    title: 'How to Find Facts',
    phase: 'I',
    phaseLabel: 'Instruction',
    intro: [
      `The next Prepare task is identify the facts in the problem; the knowns and unknowns.`,
      `Press ▶️ to start the video.

When it finishes, click ➜ to continue.`,
    ],
  },
  {
    rank: 'newb',
    id: 'FindFacts',
    title: 'Pull Apart',
    phase: 'P',
    phaseLabel: 'Prepare',
    intro: [
      `After reading a problem, we pull it apart. That means to find the important amounts and pull them out, one at a time.

An amount in a word problem can be known or unknown.`,
      `A known amount has a number. But it's not *just* a number. It also has a word or words that tell what the number means.

Let's find known amounts in the story above. Click me and I'll show you how.`,
    ],
    aiHints: true,
  },
  {
    rank: 'newb',
    id: 'VideoTotal',
    title: 'Total Stories (First Total Video)',
    phase: 'I',
    phaseLabel: 'Instruction',
    intro: [
      `The last Prepare task is Pick the Problem Type.

A word problem tells a story. Before you solve a word problem, it helps to know what *type* of story it tells.`,
      `There are a few different story types. The first one we'll learn about is Total.

Press ▶️ to start the video.

When it finishes, click ➜ to continue.`,
    ],
  },
  {
    rank: 'newb',
    id: 'NewbProblemType',
    title: 'Pick the problem type',
    phase: 'P',
    phaseLabel: 'Prepare',
    intro: [
      `Super! Now let's pick the problem type.

The only type we know for now is Total. Have we got a Total story here?
      
Yes! Click me for more details.`,
    ],
    aiHints: true,
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

  ///////////////////////////////////////////////////////////////////
  // CADET
  ///////////////////////////////////////////////////////////////////

  {
    rank: 'cadet',
    id: 'ReadProblem',
    title: 'Read the problem',
    phase: 'P',
    phaseLabel: 'Prepare',
    intro: [
      `You already know the first POWER step: Prepare.

Remember, the first thing we do to Prepare is read the problem.`,
      `Don't try to solve the problem. Just read it carefully.

Click ➜ when you're done reading.`,
    ],
    psHints: [`Click ➜ when you're done reading.`],
    aiHints: false,
  },
  {
    rank: 'cadet',
    id: 'FindFacts',
    title: 'Pull apart the problem',
    phase: 'P',
    intro: [
      `Next, we pull apart the problem. Let's do it together. Click me when you're ready.`,
    ],
    phaseLabel: 'Prepare',
    aiHints: true,
  },
  {
    rank: 'cadet',
    id: 'SelectDiagram',
    title: 'Pick the problem type',
    phase: 'P',
    intro: [
      `You're doing great! Time to pick the problem type.

I'll talk you through it. Click me when you're ready.`,
    ],
    phaseLabel: 'Prepare',
    aiHints: true,
  },
  {
    rank: 'cadet',
    id: 'FillDiagram',
    title: 'Write an equation',
    phase: 'O',
    intro: [
      `Good job! Now you're ready to learn the second P**O**WER step...

**O** is for **O**rganize!

To organize the information, we write an equation. Click me to learn how.`,
    ],
    phaseLabel: 'Organize',
    aiHints: true,
  },
  {
    rank: 'cadet',
    id: 'VideoStepWise',
    title: 'How to use StepWise',
    phase: 'I',
    phaseLabel: 'Instruction',
    intro: [
      `Next I'll show you how to **W**ork the problem step by step.`,
      `Press ▶️ to start the video and learn how.

When it finishes, click ➜ to continue.`,
    ],
  },
  {
    rank: 'cadet',
    id: 'SolveTheEquation',
    title: 'Find the unknown amount',
    phase: 'W',
    intro: [
      `The next PO**W**ER step is **W**ork the Problem. Click [MORE] to learn more.`,
      `Here, we use math to find the unknown amount, one step at a time.`,
      `If you ever need math help, click me. But not now! Let me show you around. Click [MORE].`,
      `Find the long oval above all the buttons That's the math entry box. It's where you'll type in math.`,
      `You can use your keyboard or the keys on the screen.`,
      `When you're done typing a math step, click ✔ and I'll check it.`,
      `Then your step will appear above the math entry box.`,
      `Wanna see? Let's do the first math step together. Click [MORE].`,
      `Pro tip: The first math step in W is always the equation from O.`,
      `If you don't remember the equation, it's up at the top. See it? Type it into the math entry box. Then click ✔.`,
    ],
    phaseLabel: 'Work the Problem',
    aiHints: true,
  },
  {
    rank: 'cadet',
    id: 'OwnWords',
    title: 'Answer the question',
    phase: 'E',
    intro: [
      `Yippee! It's time for the next POW**E**R step.

**E** stands for **E**xplain the Answer. Click [MORE] to learn more.`,
      `In W, you found the unknown amount. That's part of the answer.

But it's not the *whole* answer. You have to tell what it *means*.`,
      `Reread the question sentence. Write a complete sentence that answers the question. The unknown amount should be in your sentence.`,
      `Give it a try! Click me if you need some help. 

Click ✔ when your sentence is done.`,
    ],
    phaseLabel: 'Explain the Answer',
    aiHints: true,
  },
  {
    rank: 'cadet',
    id: 'Reflect',
    title: 'Think about the answer',
    phase: 'R',
    phaseLabel: 'Reflect',
    intro: [
      `This is it! The last POWE**R** step! Click [MORE] and let's do this!`,
      `**R**eflect means to look back. Think about the answer.`,
      `Does the answer make sense? Use good math thinking to give a reason why.`,
      `A good reason does not mean you just restate the answer.`,
      `A good reason does not mean you explain how to find the answer.`,
      `Here are three possible reasons why your answer makes sense.`,
      `Each one might be a good reason, or it might not be. Read them carefully. Then click [MORE].`,
      `Choose the reason you think is best. Click ✔ to check your answer.`,
    ],
    psHints: [`Choose the reason you think is best. Then click ✔.`],
    aiHints: true,
  },
  {
    rank: 'cadet',
    id: 'RangerVictory',
    title: 'string',
    phase: 'I',
    phaseLabel: 'Congratulations',
    intro: [
      `FANTASTIC!! You used all five POWER steps to solve a word problem!
* [ ] **P**repare
* [ ] **O**rganize
* [ ] **W**ork the Problem
* [ ] **E**xplain the Answer
* [ ] **R**eflect`,
      `Let's POWER up by solving more problems!

Now I'll let you take the lead. But don't worry, I'm still here for you. If you're not sure what to do, click me for help. Ok?

I know you can do it! Click Next to get started.`,
    ],
  },

  ///////////////////////////////////////////////////////////////////
  // RANGER
  ///////////////////////////////////////////////////////////////////

  {
    rank: 'ranger',
    id: 'ReadProblem',
    title: 'Read the problem',
    phase: 'P',
    phaseLabel: 'Prepare',
    psHints: [`Click ➜ when you're done reading.`],
    aiHints: false,
  },
  {
    rank: 'ranger',
    id: 'FindFacts',
    title: 'Pull apart the problem',
    phase: 'P',
    phaseLabel: 'Prepare',
    aiHints: true,
  },
  {
    rank: 'ranger',
    id: 'SelectDiagram',
    title: 'Pick the problem type',
    phase: 'P',
    phaseLabel: 'Prepare',
    aiHints: true,
  },
  {
    rank: 'ranger',
    id: 'FillDiagram',
    title: 'Write an equation',
    phase: 'O',
    phaseLabel: 'Organize',
    aiHints: true,
  },
  {
    rank: 'ranger',
    id: 'SolveTheEquation',
    title: 'Find the unknown amount',
    phase: 'W',
    phaseLabel: 'Work the Problem',
    aiHints: true,
  },
  {
    rank: 'ranger',
    id: 'OwnWords',
    title: 'Answer the question',
    phase: 'E',
    phaseLabel: 'Explain the Answer',
    aiHints: true,
  },
  {
    rank: 'ranger',
    id: 'Reflect',
    title: 'Think about the answer',
    phase: 'R',
    phaseLabel: 'Reflect',
    psHints: [`Choose the reason you think is best. Then click ✔.`],
    aiHints: false,
  },
  {
    rank: 'ranger',
    id: 'RangerVictory',
    title: 'string',
    phase: 'I',
    phaseLabel: 'Congratulations',
    intro: [
      `Congratulations! You solved the problem with POWER!
      
Click Next when you're ready to move on.`,
    ],
  },
]
