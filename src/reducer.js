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

    // changeDiagramSign
    case "changeDiagramSign": {
      newProduct.solution.diagram.change.sign = action.payload;
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

    // combineDiagramTotal
    case "combineDiagramTotal": {
      newProduct.solution.diagram.combine.total = action.payload;
      return newProduct;
    }

    // combineDiagramPart1
    case "combineDiagramPart1": {
      newProduct.solution.diagram.combine.part1 = action.payload;
      return newProduct;
    }

    // combineDiagramPart2
    case "combineDiagramPart2": {
      newProduct.solution.diagram.combine.part2 = action.payload;
      return newProduct;
    }

    // timesDiagramProduct
    case "timesDiagramProduct": {
      newProduct.solution.diagram.times.product = action.payload;
      return newProduct;
    }

    // timesDiagramSets
    case "timesDiagramSets": {
      newProduct.solution.diagram.times.sets = action.payload;
      return newProduct;
    }

    // timesDiagramMultiplier
    case "timesDiagramMultiplier": {
      newProduct.solution.diagram.times.multiplier = action.payload;
      return newProduct;
    }

    // groupsDiagramProduct
    case "groupsDiagramProduct": {
      newProduct.solution.diagram.groups.product = action.payload;
      return newProduct;
    }

    // groupsDiagramNumber
    case "groupsDiagramNumber": {
      newProduct.solution.diagram.groups.number = action.payload;
      return newProduct;
    }

    // groupsDiagramGroups
    case "groupsDiagramGroups": {
      newProduct.solution.diagram.groups.groups = action.payload;
      return newProduct;
    }

    // saveStepWise
    case "saveStepWise": {
      newProduct.solution.stepWise = action.payload;
      console.info(newProduct);
      return newProduct;
    }

    // identifyNumber
    case "identifyNumber": {
      newProduct.solution.identify.number = action.payload;
      return newProduct;
    }

    // identifyLabel
    case "identifyLabel": {
      newProduct.solution.identify.label = action.payload;
      return newProduct;
    }

    // explanation
    case "explanation": {
      newProduct.solution.explanation = action.payload;
      return newProduct;
    }

    // review
    case "review": {
      newProduct.solution.review = action.payload;
      return newProduct;
    }

    // SUBMIT
    case "SUBMIT": {
      alert("YOU SUBMIT! Bend the knee and look in the console!");
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
