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
      `Hi! I'm Kettu. Welcome to StepWise for Word Problems!
      
  Look below these words. Do you see [MORE]? That means I have more to tell you. When I'm done talking, you can click it to find out what.`,
      `Great job!

  Here's a tip. Whenever [MORE] is down there, be sure to click it. Then you won't miss anything important.`,
      `Good! Here's another tip.
      
  In the bottom left corner, you'll see a picture of a speaker. When the speaker is on, like it is now, I will read aloud to you.`,
      `You can turn the speaker off by clicking it. Then I'll be quiet. You can read my words to yourself.

To turn the speaker back on, click it again.`,
      `All right!
      
We're going to get the POWER to solve math word problems.
  
Each letter in POWER stands for a problem-solving step. I will teach you the steps.`,
      `Are you ready? I know I am!

  Find → under my feet. Click it and we'll get started.`,
    ],
  },
  {
    rank: 'newb',
    id: 'FindTutor',
    title: 'string',
    phase: 'I',
    phaseLabel: 'Instruction',
    intro: [
      'We’ll work together. I’ll be down here if you need me. Click my cute self to ask for help. Try it now.',
    ],
    psHints: [
      `Perfect! You found me!

Anytime you're not sure what to do, you can click me like that. I'll do my best to help.`,
      `See → next to me? When it's blue, you can click it to move on.

Go ahead and click → now.`,
    ],
  },
  {
    rank: 'newb',
    id: 'ReadProblem',
    title: 'Read',
    phase: 'P',
    phaseLabel: 'Prepare',
    intro: [
      `You did that just right! Now let's learn the first POWER step.

**P** is the first step. **P** stands for **P**repare.`,
      `There are three things we do to Prepare. 

The first one is Read.`,

      `Find the story in the gray box above. Follow along with me as I read it.

When we're done reading, click →.  

[STIMULUS]`,
    ],
    psHints: [`Click → when we're done reading.`],
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
      `Pull apart means we find the important amounts. We pull them out one at a time.

An amount in a word problem can be known or unknown.`,
      `A known amount has a number. But it's not *just* a number. It also has a word or words that tell what the number means.

Let's find known amounts in the story above. Click me and I'll show you how.`,
    ],
  },
  {
    rank: 'newb',
    id: 'VideoTotal',
    title: 'Total Stories (First Total Video)',
    phase: 'I',
    phaseLabel: 'Instruction',
    intro: [
      `The last Prepare task is Pick the problem type.

A word problem tells a story. Before you solve a word problem, it helps to know what *type* of story it tells.`,
      `The first type we'll learn about is Total.

Click ▶️ to start the video. When it finishes, click →.`,
    ],
  },
  {
    rank: 'newb',
    id: 'NewbProblemType',
    title: 'Pick the problem type',
    phase: 'P',
    phaseLabel: 'Prepare',
    intro: [
      `Super! Now let's Pick the problem type.

The only type we know for now is Total. Have we got a Total story here?
      
Yes! Click me and I'll explain why.`,
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
      `*And* now you know one type of problem: Total.

Click Next to check your understanding.`,
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
      `You know the first POWER step: Prepare.

Remember, the first thing we do to Prepare is Read the problem.`,
      `Don't think about trying to solve the problem yet. Focus on reading and understanding it.`,

      `We'll do it together. Follow along while I read the problem. When we're done reading, click →.
[STIMULUS]`,
    ],
    psHints: [`Click → when we're done reading.`],
    aiHints: false,
  },
  {
    rank: 'cadet',
    id: 'FindFacts',
    title: 'Pull apart the problem',
    phase: 'P',
    intro: [
      `Next, we Pull apart the problem. Let's do it together. Click me when you're ready.`,
    ],
    phaseLabel: 'Prepare',
    aiHints: false,
  },
  {
    rank: 'cadet',
    id: 'SelectDiagram',
    title: 'Pick the problem type',
    phase: 'P',
    intro: [
      `You're doing great! Time to Pick the problem type.

I'll talk you through it. Click me when you're ready.`,
    ],
    phaseLabel: 'Prepare',
    aiHints: false,
  },
  {
    rank: 'cadet',
    id: 'FillDiagram',
    title: 'Write an equation',
    phase: 'O',
    intro: [
      `Good job! Now you're ready for the second P**O**WER step...

**O** is for **O**rganize!

To organize, we write an equation. Click me to learn how.`,
    ],
    phaseLabel: 'Organize',
    aiHints: false,
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
      `We're going to find the unknown amount, one step at a time.`,
      `Let's do the first step together.`,
      `The first step in W is always the equation from O.`,
      `If you don't remember the equation, it's up at the top.`,
      `Type the equation into the math entry box. Then click ✔.`,
    ],
    phaseLabel: 'Work the Problem',
    aiHints: false,
  },
  {
    rank: 'cadet',
    id: 'OwnWords',
    title: 'Answer the question',
    phase: 'E',
    intro: [
      `Yippee! It's time for the next POWER step.

**E** stands for **E**xplain the Answer.`,
      `In W, you found the unknown amount. That's part of the answer.

But it's not the *whole* answer. You have to tell what it *means*.`,
      `The problem asks a question. Write a complete sentence that answers it. The unknown amount should be in your sentence.`,
      `Give it a try! Click me if you need some help. 

Click ✔ when your sentence is done.`,
    ],
    phaseLabel: 'Explain the Answer',
    aiHints: false,
  },
  {
    rank: 'cadet',
    id: 'Reflect',
    title: 'Think about the answer',
    phase: 'R',
    phaseLabel: 'Reflect',
    intro: [
      `This is it! The last POWER step! Let's do this!`,
      `**R**eflect means to look back. Think about the answer. Does it make sense?`,
      `Why does the answer make sense? A good reason uses correct math thinking to tell why.`,
      `A good reason does not mean you just restate the answer.`,
      `A good reason does not mean you explain how to find the answer.`,
      `We found the answer for this problem. Here is a possible reason why it makes sense. [EXPLANATION]`,
      `Do you think the reason is a good reason? Choose Yes or No. Then click →.`,
    ],
    psHints: [
      `Do you think the reason is a good reason? Choose Yes or No. Then click →.`,
    ],

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
    intro: [`Here's your next problem. Follow along as I read it. [STIMULUS]`],
    psHints: [`Click ➜ when you're done reading.`],
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
    title: 'Write an equation',
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
    intro: [
      `Here is a possible reason why the answer makes sense. [EXPLANATION]`,
      `Do you think the reason is a good reason?`,
    ],
    psHints: [
      `Do you think the reason is a good reason? Choose Yes or No. Then click →.`,
    ],
    aiHints: true,
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
