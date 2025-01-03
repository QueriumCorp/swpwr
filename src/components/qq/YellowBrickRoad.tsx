export type YBRpage = {
  rank: 'dev' | 'newb' | 'cadet' | 'scout' | 'ranger'
  id: string
  title: string
  phase: 'I' | 'P' | 'O' | 'W' | 'E' | 'R'
  phaseLabel: string
  intro?: string[]
  psHints?: string[] // Not used on I pages as they have the giant avatar
  aiHints?: boolean
  videos?: { title: string; url: string }[]
}

export const YellowBrickRoad: YBRpage[] = [
  ///////////////////////////////////////////////////////////////////
  // DEV
  ///////////////////////////////////////////////////////////////////

  {
    rank: 'dev',
    id: 'FindFacts',
    title: 'Pull Apart',
    phase: 'P',
    phaseLabel: 'Prepare',
    intro: [],
    aiHints: false,
    videos: [
      {
        title: 'Pull Apart',
        url: 'https://querium.wistia.com/medias/6cq1njtrjd',
      },

      {
        title: 'Work the Problem',
        url: 'https://querium.wistia.com/medias/3iht7uc7nw',
      },

      {
        title: 'Total Problems',
        url: 'https://querium.wistia.com/medias/sjxgx93yp3',
      },
      {
        title: 'More Total Problems',
        url: 'https://querium.wistia.com/medias/kwwo2f1d0v',
      },
      {
        title: 'Change Problems',
        url: 'https://querium.wistia.com/medias/w1i6awm1wz',
      },
      {
        title: 'More Change Problems',
        url: 'https://querium.wistia.com/medias/be860p7oat',
      },
      {
        title: 'Difference Problems',
        url: 'https://querium.wistia.com/medias/wf7uchx2b8',
      },
      {
        title: 'Equal Groups Problems',
        url: 'https://querium.wistia.com/medias/zqv49r0xu0',
      },
      {
        title: 'Compare Problems',
        url: 'https://querium.wistia.com/medias/57rdlxaf90',
      },
    ],
  },
  {
    rank: 'dev',
    id: 'MeetTutor',
    title: 'string',
    phase: 'I',
    phaseLabel: 'Instruction',
    intro: [`Hi! I'm Kettu. Welcome to StepWise for Word Problems!`],
  },
  {
    rank: 'dev',
    id: 'Reflect',
    title: 'Think about the answer',
    phase: 'R',
    phaseLabel: 'Reflect',
    intro: [
      `We found the answer for this problem. Here is a possible reason why it makes sense. [EXPLANATION]`,
      `Do you think the reason is a good reason? Choose Yes or No. Then click ➜.`,
    ],
    psHints: [
      `Do you think the reason is a good reason? Choose Yes or No. Then click ➜.`,
    ],

    aiHints: false,
  },

  {
    rank: 'dev',
    id: 'ReadProblem',
    title: 'Read the problem',
    phase: 'P',
    phaseLabel: 'Prepare',
    intro: [
      `There are three things we do to Prepare. 

The first one is Read.`,

      `Find the story in the gray box above. Follow along with me as I read it.

When we're done reading, click ➜.  

[STIMULUS]`,
      'Here is the last msg',
    ],
    psHints: [`Click ➜ when we're done reading.`],
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
      `Hi! I'm Kettu. Welcome to StepWise for Word Problems!\n\nLook below these words. Do you see [MORE]? That means I have more to tell you. When I'm done talking, you can click it to find out what.`,
      `GREAT JOB!\n\nHere's a tip. Whenever you see [MORE] down there, be sure to click it. Then you won't miss anything important.`,
      `GOOD! Here's another tip.\n\nIn the bottom left corner, you'll see a picture of a speaker. When the speaker is on, like it is now, I will read aloud to you.`,
      `If you want me to be quiet, click the speaker to turn it off. You can read my words to yourself.\n\nTo turn the speaker back on, click it again.`,
      `ALL RIGHT!\n\nWe're going to get the POWER to solve math word problems.\n\nEach letter in POWER stands for a problem-solving step. I will teach you the steps.`,
      `I'm ready to go! Are you?\n\nFind ➜ under my feet. Click it and we'll get started.`,
    ],
  },
  {
    rank: 'newb',
    id: 'FindTutor',
    title: 'string',
    phase: 'I',
    phaseLabel: 'Instruction',
    intro: [
      `We’ll work together. I’ll be down here if you need me. Click my cute self to ask for help. Try it now.`,
    ],
    psHints: [
      `Perfect! You found me!\n\nAnytime you're not sure what to do, you can click me like that. I'll do my best to help.`,
      `That's important, so I'll say it again. The way to ask for help is to click me. You can click me ANYTIME. Now click [MORE].`,
      `See ➜ next to me? When it's blue, you can click it to move on.\n\nGo ahead and click ➜ now.`,
    ],
    videos: [
      {
        title: 'Pull Apart',
        url: 'https://querium.wistia.com/medias/6cq1njtrjd',
      },
    ],
  },
  {
    rank: 'newb',
    id: 'ReadProblem',
    title: 'Read',
    phase: 'P',
    phaseLabel: 'Prepare',
    intro: [
      `You did that just right! Now let's learn the first POWER step.\n\n**P** is the first step. **P** stands for **P**repare.`,
      `There are three things we do to Prepare.\n\nThe first one is Read.`,
      `Find the story in the box above. Follow along with me as I read it.\n\nWhen we're done reading, click [MORE]. [STIMULUS]`,
      `Click ➜ to continue.`,
    ],
    videos: [
      {
        title: 'Pull Apart',
        url: 'https://querium.wistia.com/medias/6cq1njtrjd',
      },

      {
        title: 'Work the Problem',
        url: 'https://querium.wistia.com/medias/3iht7uc7nw',
      },

      {
        title: 'Total Problems',
        url: 'https://querium.wistia.com/medias/sjxgx93yp3',
      },
      {
        title: 'More Total Problems',
        url: 'https://querium.wistia.com/medias/kwwo2f1d0v',
      },
      {
        title: 'Change Problems',
        url: 'https://querium.wistia.com/medias/w1i6awm1wz',
      },
      {
        title: 'More Change Problems',
        url: 'https://querium.wistia.com/medias/be860p7oat',
      },
      {
        title: 'Difference Problems',
        url: 'https://querium.wistia.com/medias/wf7uchx2b8',
      },
      {
        title: 'Equal Groups Problems',
        url: 'https://querium.wistia.com/medias/zqv49r0xu0',
      },
      {
        title: 'Compare Problems',
        url: 'https://querium.wistia.com/medias/57rdlxaf90',
      },
    ],
  },
  {
    rank: 'newb',
    id: 'VideoFindFacts',
    title: 'How to Find Facts',
    phase: 'I',
    phaseLabel: 'Instruction',
    intro: [
      `After Read comes Pull apart. The video will show you the basics of what to do.\n\nClick ▶️ to start the video.`,
    ],
  },
  {
    rank: 'newb',
    id: 'FindFacts',
    title: 'Pull Apart',
    phase: 'P',
    phaseLabel: 'Prepare',
    intro: [
      `Wait! Don't do anything yet. Just listen for now to learn more about Pull apart. Click [MORE].`,
      `Pull apart means we find the important amounts. We pull them out one at a time.\n\nAn amount in a word problem can be known or unknown. Click [MORE].`,
      `A known amount has a number. But it's not *just* a number. It also has a word or words that tell what the number means. Click [MORE].`,
      `Click me to find known amounts in the story above.`,
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
      `The last Prepare task is Pick the problem type. Click [MORE].`,
      `A word problem tells a story. Before you solve a word problem, it helps to know what *type* of story it tells. Click [MORE].`,
      `The first type we'll learn about is Total. \n\nClick ▶️ to start the video.`,
    ],
  },
  {
    rank: 'newb',
    id: 'PickSchema',
    title: 'Pick the problem type',
    phase: 'P',
    phaseLabel: 'Prepare',
    intro: [
      `Super! Now let's Pick the problem type.\n\nThe only type we know for now is Total. Have we got a Total story here?\n\nYes! Click me and I'll explain why.`,
    ],
  },
  {
    rank: 'newb',
    id: 'NewbVictory',
    title: 'string',
    phase: 'I',
    phaseLabel: 'Instruction',
    intro: [
      `GREAT WORK!\n\nNow you know the first POWER step, **P**repare.`,
      `To **P**repare, we:\n
* [ ] **R**ead
* [ ] **P**ull apart      
* [ ] **P**ick the problem type`,
      `*And* now you know one type of problem: Total.\n\nFind the Next button above my head. Click Next to check your understanding.`,
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
      `You know the first POWER step: Prepare.\n\nRemember, the first thing we do to Prepare is Read the problem. Click [MORE].`,
      `Don't think about trying to solve the problem yet. Focus on reading and understanding it. Click [MORE].`,
      `Follow along while I read the problem. \n\nWhen we're done reading, click [MORE]. [STIMULUS]`,
      `Click ➜ to continue.`,
    ],
    psHints: [],
    aiHints: false,
  },
  {
    rank: 'cadet',
    id: 'FindFacts',
    title: 'Pull apart the problem',
    phase: 'P',
    intro: [
      `Next, we will Pull apart the problem. Don't start without me! Let's do it together. Click me when you're ready and I'll tell you what to do.`,
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
      `You're doing GREAT! Let's Pick the problem type together. Click me when you're ready.`,
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
      `GOOD JOB! Now you're ready for the second P**O**WER step...

**O** is for **O**rganize!

To organize, we write an equation. Click me to learn how.`,
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
      `The next POWER step is **W**. **W** stands for **W**ork the Problem.\n\nThe video will show you the W screen. Click ▶️ to start the video.`,
    ],
  },
  {
    rank: 'cadet',
    id: 'SolveTheEquation',
    title: 'Find the unknown amount',
    phase: 'W',
    intro: [
      `WAIT. Don't do anything yet. Just listen first, ok? Click [MORE].`,
      `We're going to find the unknown amount, one step at a time. Click [MORE].`,
      `Let's do the first step together. Click [MORE].`,
      `The first step in W is always the equation from O. Click [MORE].`,
      `If you don't remember the equation, it's up at the top. Click [MORE].`,
      `Now type the equation in the math entry box. Then click ✔.`,
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
      `YIPPEE! It's time for the next POWER step.\n\n**E** stands for **E**xplain the Answer.`,
      `In W, you found the unknown amount. That number is part of the answer.\n\nBut it's not the *whole* answer. Click [MORE].`,
      `You have to tell what the number *means*. You can write it in a sentence. Click [MORE].`,
      `Here is a sentence that answers the question. Click me to learn how to fill in the blanks.`,
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
      `This is it! The last POWER step! Let's do this! Click [MORE].`,
      `**R**eflect means to look back. Think about the answer. Does it make sense? Why? Click [MORE].`,
      `A good reason uses correct math thinking to tell why. Click [MORE].`,
      `A good reason does not mean you just restate the answer. Click [MORE].`,
      `A good reason does not mean you explain how to find the answer.`,
      `We found the answer for this problem. I will read a possible reason why it makes sense. Click [MORE].`,
      `The reason I'm about to read might be a good reason, or it might not be. Follow along as I read. [EXPLANATION]`,
      `Do you think that's a good reason? Choose Yes or No. Then click ➜.`,
    ],
    psHints: [
      `Do you think the reason is a good reason? Choose Yes or No. Then click ➜.`,
    ],

    aiHints: false,
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
      `Let's POWER up by solving more problems!\n\nNow I'll let you take the lead. But don't worry, I'm still here for you. Anytime you're not sure what to do, click me for help. Ok?\n\nI know you can do it! Click the Next button above my head to get started.`,
    ],
  },

  ///////////////////////////////////////////////////////////////////
  // SCOUT
  ///////////////////////////////////////////////////////////////////

  {
    rank: 'scout',
    id: 'ReadProblem',
    title: 'Read the problem',
    phase: 'P',
    phaseLabel: 'Prepare',
    intro: [
      `Here's your next problem. Follow along as I read it.\n\nWhen we're done reading, click [MORE].[STIMULUS]`,
      `Now you will solve the problem. Remember, click me anytime you need help.\n\nClick ➜ to continue.`,
    ],
    psHints: [],
    aiHints: false,
  },
  {
    rank: 'scout',
    id: 'FindFacts',
    title: 'Pull apart the problem',
    phase: 'P',
    intro: [`Pull apart the problem`],
    psHints: [
      `A known amount has a number. The unknown amount is in the question sentence.`,
    ],
    phaseLabel: 'Prepare',
    aiHints: true,
  },
  {
    rank: 'scout',
    id: 'SelectDiagram',
    title: 'Pick the problem type',
    phase: 'P',
    intro: [`Pick the problem type`],
    phaseLabel: 'Prepare',
    aiHints: true,
  },
  {
    rank: 'scout',
    id: 'FillDiagram',
    title: 'Write an equation',
    phase: 'O',
    intro: [`Organize`],
    phaseLabel: 'Organize',
    aiHints: true,
  },
  {
    rank: 'scout',
    id: 'SolveTheEquation',
    title: 'Find the unknown amount',
    phase: 'W',
    intro: [`Work the Problem`],
    phaseLabel: 'Work the Problem',
    aiHints: true,
  },
  {
    rank: 'scout',
    id: 'OwnWords',
    title: 'Answer the question',
    phase: 'E',
    intro: [`Explain the Answer`],
    psHints: [
      `Finish the sentence. Give the number *and* a label that tells what the number means.`,
    ],
    phaseLabel: 'Explain the Answer',
    aiHints: true,
  },
  {
    rank: 'scout',
    id: 'Reflect',
    title: 'Think about the answer',
    phase: 'R',
    phaseLabel: 'Reflect',
    intro: [
      `Reflect. Here is a possible reason why the answer makes sense. [EXPLANATION]`,
      `Do you think that's a good reason?`,
    ],
    psHints: [
      `Do you think the reason is a good reason? Choose Yes or No. Then click ➜.`,
    ],

    aiHints: false,
  },
  {
    rank: 'scout',
    id: 'RangerVictory',
    title: 'string',
    phase: 'I',
    phaseLabel: 'Congratulations',
    intro: [
      `Congratulations! You solved the problem with POWER!\n\nClick the Next button above my head when you're ready to move on.`,
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
    intro: [
      `Here's your next problem. Follow along as I read it.\n\nWhen we're done reading, click [MORE]. [STIMULUS]`,
      `Click ➜ to continue.`,
    ],
    psHints: [],
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
    intro: [`Finish the sentence.`],
    psHints: [],
    phaseLabel: 'Explain the Answer',
    aiHints: true,
  },
  {
    rank: 'ranger',
    id: 'Reflect',
    title: 'Think about the answer',
    phase: 'R',
    phaseLabel: 'Reflect',
    intro: [
      `Here is a possible reason why the answer makes sense. [EXPLANATION]`,
      `Do you think that's a good reason?`,
    ],
    psHints: [
      `Do you think the reason is a good reason? Choose Yes or No. Then click ➜.`,
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
      `Congratulations! You solved the problem with POWER!\n\nClick the Next button above my head when you're ready to move on.`,
    ],
  },
]
