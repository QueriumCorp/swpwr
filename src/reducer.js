export const blankWork = {
  _lastUpdated: null,
  problem: {
    label: "the problem label",
    description: "a desc",
    class: "sampleWord",
    stimulus: `A mountain bike is on sale for $399. Its regular price is $650. 
    What is the difference between the regular price and the sale price?`,
    stepsMnemonic: "POWER",
    steps: [
      {
        label: "Prepare",
        mnemonicIndex: 0,
        instruction: "Familiarize yourself with the word problem",
        longInstruction: `Take two deep breaths then slowly read the following word problem.  Reflect on what is 
        the question asking you. Say the problem in your own words.`,
        type: "READ",
      },
      {
        label: "Prepare",
        mnemonicIndex: 0,
        instruction: "Analyze the stimulus and highlight key facts",
        longInstruction: `What are the key pieces of information in the word problem below? Select 
          the important pieces of text. This will allow you to quickly paste helpful 
          snippets as you work the problem.`,
        type: "TAG",
      },
      {
        label: "Organize",
        mnemonicIndex: 1,
        instruction: "Match the problem to a diagram",
        longInstruction: `Pick a diagram! Any diagram will do!`,
        type: "DIAGRAMSELECT",
      },
      {
        label: "Organize",
        mnemonicIndex: 1,
        instruction: "Fill in the Diagram",
        longInstruction: `Fill in the diagram to model the problem. Either click in the boxes to type 
          the values with your keyboard or drag and drop them from the 
          selections you made.`,
        type: "DIAGRAMMER",
      },
      {
        label: "Organize",
        mnemonicIndex: 1,
        instruction: "Setup the Equation",
        longInstruction: `Need explanatory instruction copy here.`,
        type: "EQUATIONATOR",
      },
      {
        label: "Work the Problem",
        mnemonicIndex: 2,
        instruction: "Solve the equation",
        longInstruction: `Enter you solutions steps one by one.`,
        type: "STEPWISE",
      },
      {
        label: "Explain",
        mnemonicIndex: 3,
        instruction: "Explain your Solution",
        longInstruction: `Justify your approach and explain your solution.`,
        type: "EXPLAINER",
      },
      {
        label: "Review",
        mnemonicIndex: 4,
        instruction: "Review your Work",
        longInstruction: `Always review and, if necessary, revise your work before submitting it for grading.`,
        type: "REVIEWER",
      },
    ],
  },
  solution: {
    tags: [],
    selectedDiagram: null,
  },
};

const workReducer = (work, action) => {
  console.info("reducer", action);
  let newProduct = { ...work };
  newProduct._lastUpdated = Date.now();

  switch (action.type) {
    case "init": {
      // Create empty work
      return blankWork;
    }

    // addTag
    case "addTag": {
      if (newProduct.solution.tags.find((tag) => tag === action.payload)) {
        console.info("dupe!!!");
        break;
      }
      newProduct.solution.tags.push(action.payload);
      return newProduct;
    }

    // deleteTag
    case "deleteTag": {
      for (let i = 0; i < newProduct.solution.tags.length; i++) {
        if (newProduct.solution.tags[i] === action.payload) {
          newProduct.solution.tags.splice(i, 1);
          break;
        }
      }
      return newProduct;
    }

    // deleteTag
    case "diagramSelected": {
      newProduct.solution.selectedDiagram = action.payload;
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
