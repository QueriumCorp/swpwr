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
      `You already know the first POWER step: Prepare.`,
      `Remember, the first thing we do to Prepare is read the problem.`,
      `Don't try to solve the problem. Just read it carefully. Click → when you're done reading.`,
    ],
    psHints: [`Click → when you're done reading.`],
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
    aiHints: false,
  },
  {
    rank: 'cadet',
    id: 'SelectDiagram',
    title: 'Pick the problem type',
    phase: 'P',
    intro: [
      `You're doing great! Time to pick the problem type.

I'll talk you through it. Just click me when you're ready.`,
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
      `Good job! Now you're ready to learn the second P**O**WER step...`,
      `O is for **O**rganize!
To organize the information, we write it in an equation. Click me to learn how.`,
    ],
    phaseLabel: 'Organize',
    aiHints: false,
  },
  {
    rank: 'cadet',
    id: 'SolveTheEquation',
    title: 'Find the unknown amount',
    phase: 'W',
    intro: [
      `All right! You've made it to the next PO**W**ER step, **W**ork the Problem.`,
      `This is where we use math to find the unknown amount. We'll go one step at a time. Anytime you need math help, click me.

But not yet! First let me show you around.`,
      `Do you see the box above all the buttons? That's the math entry box. It's where you'll type your math. You can use your device's keyboard or the keys on the screen.
In the lower right corner of the page you will see a circular button with a [check mark].`,
      `When you're done typing a math step, click [check mark] and I'll check it.`,
      `Look above the math entry box. That's where all your correct math steps will go.
And look! Step 1 is already there. You did Step 1 when you wrote the equation. The equation from O is always Step 1 in W.`,
      `The equation is in the math entry box, too. The last step you did stays there until you change it.`,
      `Whew! Let's stop and take a breath or two. Then we'll get back to our word problem! 
      
Click me when you're ready.`,
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
      `Yippee! It's time for the next POW**E**R step. E stands for **E**xplain the Answer.`,
      `In W, you found the unknown amount. That's part of the answer. But it's not the *whole* answer. You have to tell what the answer *means*.`,
      `Look back at the problem. Reread the question sentence. Write a complete sentence that answers the question.

Give it a try! Click me if you need some help. Click → when your sentence is done.`,
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
      `This is it! The last POWE**R** step! Let's do this.`,
      `**R**eflect means to look back. Think about the answer. Does it make sense? Use good math thinking to tell why it makes sense.`,
      `Here are three possible reasons why the answer you found makes sense. Each one might be a good reason, or it might not be.`,
      `Read each one carefully. Then choose the one you think is best. Click → to check your answer.`,
    ],
    psHints: [`Choose the reason you think is best. Then click →.`],
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
      `Now let's practice that POWER on some more problems!`,
      `I'll let you take the lead. I think you have enough POWER!

Never fear, I'm still here for you. If you're not sure what to do, click me for help. Ok?`,
      `I know you can do it! Click Next to get started.`,
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
