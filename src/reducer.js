import { defaultProblem } from "./utils/defaultProblem";
import { defaultSolution } from "./utils/defaultSolution";

export const blankWork = {
  _lastUpdated: null,
  problem: { ...defaultProblem },
  solution: { ...defaultSolution },
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

    // diagramAnalyzed
    case "updateAnalysis": {
      newProduct.solution.diagramAnalysis = action.payload;
      return newProduct;
    }

    // diagramSelected
    case "diagramSelected": {
      newProduct.solution.selectedDiagram = action.payload;
      return newProduct;
    }

    // changeDiagramStart
    case "changeDiagramStart": {
      newProduct.solution.diagram.change.start = action.payload;
      return newProduct;
    }

    // changeDiagramChange
    case "changeDiagramChange": {
      newProduct.solution.diagram.change.change = action.payload;
      return newProduct;
    }

    // changeDiagramEnd
    case "changeDiagramEnd": {
      newProduct.solution.diagram.change.end = action.payload;
      return newProduct;
    }

    // changeDiagramEnd
    case "SUBMIT": {
      console.info(work);
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
