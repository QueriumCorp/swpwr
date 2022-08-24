export const blankWork = {
  _lastUpdated: null,
  problem: {
    label: "the problem label",
    description: "a desc",
    class: "sampleWord",
    steps: [
      {
        label: "Prepare",
        instruction: "Analyze the stimulus and highlight key parts",
        longInstruction: `What are the key pieces of information in the word problem below? Select 
           the important pieces of text. This will allow you to quickly paste helpful 
           snippets as you work the problem.`,
      },
      {
        label: "Organize",
        instruction: "Match the problem to a diagram",
        longInstruction: `Pick a diagram! Any diagram will do!`,
      },
      {
        label: "Organize",
        instruction: "Fill in the Diagram",
        longInstruction: `Fill in the diagram to model the problem. Either click in the boxes to type 
          the values with your keyboard or drag and drop them from the 
          selections you made.`,
      },
      {
        label: "Work the Problem",
        instruction: "Work the Problem",
        longInstruction: `Enter you solutions steps one by one.`,
      },
      {
        label: "Explain",
        instruction: "Explain your Solution",
        longInstruction: `Enter you solutions steps one by one.`,
      },
      {
        label: "Review",
        instruction: "Review your Work",
        longInstruction: `Always review and, if necessary, revise your work before submitting it for grading.`,
      },
    ],
  },
};

const workReducer = (work, action) => {
  // console.info("reducer", action);
  let newProduct = { ...work };

  switch (action.type) {
    case "init": {
      // Create empty work
      return blankWork;
    }

    // Something
    case "updateSomething": {
      console.info(action.payload.something);
      newProduct.something = action.payload.something;
      return newProduct;
    }

    // Default
    default: {
      console.error("Bad reducer action:", action);
    }
  }
  return work;
};

export default workReducer;
