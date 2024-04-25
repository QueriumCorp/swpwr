import CadetFillDiagram from "../pages/CadetFillDiagram";
import CadetFillEquation from "../pages/CadetFillEquation";
import CadetFindFacts from "../pages/CadetFindFacts";
import CadetGratzEquationSolved from "../pages/CadetGratzEquationSolved";
import CadetGratzOnLearner from "../pages/CadetGratzOnLearner";
import CadetGratzOnOrganize from "../pages/CadetGratzOnOrganize";
import CadetQuestIntro from "../pages/CadetQuestIntro";
import CadetReadProblem from "../pages/CadetReadProblem";
import CadetReflect from "../pages/CadetReflect";
import CadetSelectDiagram from "../pages/CadetSelectDiagram";
import CadetSolveTheEquation from "../pages/CadetSolveTheEquation";
import CadetSolvedFor from "../pages/CadetSolvedFor";
import CadetWhatIsPower from "../pages/CadetWhatIsPower";
import CadetWhatToAnswer from "../pages/CadetWhatToAnswer";
import NewbFeelThePower from "../pages/NewbFeelThePower";
import NewbFindTutor from "../pages/NewbFindTutor";
import NewbGratzFoundTutor from "../pages/NewbGratzFoundTutor";
import NewbGratzOnPrepare from "../pages/NewbGratzOnPrepare";
import NewbGratzWatchedVideo from "../pages/NewbGratzWatchedVideo";
import NewbKnownFacts from "../pages/NewbKnownFacts";
import NewbMeetTutor from "../pages/NewbMeetTutor";
import NewbReadProblem from "../pages/NewbReadProblem";
import RangerFillDiagram from "../pages/RangerFillDiagram";
import RangerFillEquation from "../pages/RangerFillEquation";
import RangerFindFacts from "../pages/RangerFindFacts";
import RangerReadProblem from "../pages/RangerReadProblem";
import RangerReflect from "../pages/RangerReflect";
import RangerSelectDiagram from "../pages/RangerSelectDiagram";
import RangerSolveTheEquation from "../pages/RangerSolveTheEquation";
import RangerSolvedFor from "../pages/RangerSolvedFor";
import RangerWhatToAnswer from "../pages/RangerWhatToAnswer";
import { YBRpage } from "./YellowBrickRoad";

export function renderPage(page: YBRpage) {
  switch (page.rank + ":" + page.id) {
    // NEWB
    case "newb:MeetTutor":
      return <NewbMeetTutor></NewbMeetTutor>;
    case "newb:FeelThePower":
      return <NewbFeelThePower></NewbFeelThePower>;
    case "newb:GratzWatchedVideo":
      return <NewbGratzWatchedVideo></NewbGratzWatchedVideo>;
    case "newb:FindTutor":
      return <NewbFindTutor></NewbFindTutor>;
    case "newb:GratzFoundTutor":
      return <NewbGratzFoundTutor></NewbGratzFoundTutor>;
    case "newb:ReadProblem":
      return <NewbReadProblem></NewbReadProblem>;
    case "newb:KnownFacts":
      return <NewbKnownFacts></NewbKnownFacts>;
    case "newb:GratzOnPrepare":
      return <NewbGratzOnPrepare></NewbGratzOnPrepare>;

    // CADET
    case "cadet:ReadProblem":
      return <CadetReadProblem></CadetReadProblem>;
    case "cadet:WhatToAnswer":
      return <CadetWhatToAnswer></CadetWhatToAnswer>;
    case "cadet:FindFacts":
      return <CadetFindFacts></CadetFindFacts>;
    case "cadet:SelectDiagram":
      return <CadetSelectDiagram></CadetSelectDiagram>;
    case "cadet:FillDiagram":
      return <CadetFillDiagram></CadetFillDiagram>;
    case "cadet:FillEquation":
      return <CadetFillEquation></CadetFillEquation>;
    case "cadet:GratzOnOrganize":
      return <CadetGratzOnOrganize></CadetGratzOnOrganize>;
    case "cadet:SolveTheEquation":
      return <CadetSolveTheEquation></CadetSolveTheEquation>;
    case "cadet:GratzEquationSolved":
      return <CadetGratzEquationSolved></CadetGratzEquationSolved>;
    case "cadet:SolvedFor":
      return <CadetSolvedFor></CadetSolvedFor>;
    case "cadet:Reflect":
      return <CadetReflect></CadetReflect>;
    case "cadet:GratzOnLearner":
      return <CadetGratzOnLearner></CadetGratzOnLearner>;
    case "cadet:FindFacts":
      return <CadetFindFacts></CadetFindFacts>;
    case "cadet:QuestIntro":
      return <CadetQuestIntro></CadetQuestIntro>;
    case "cadet:WhatIsPower":
      return <CadetWhatIsPower></CadetWhatIsPower>;

    // RANGER
    case "ranger:ReadProblem":
      return <RangerReadProblem></RangerReadProblem>;
    case "ranger:WhatToAnswer":
      return <RangerWhatToAnswer></RangerWhatToAnswer>;
    case "ranger:FindFacts":
      return <RangerFindFacts></RangerFindFacts>;
    case "ranger:SelectDiagram":
      return <RangerSelectDiagram></RangerSelectDiagram>;
    case "ranger:FillDiagram":
      return <RangerFillDiagram></RangerFillDiagram>; // DEFAULT
    case "ranger:FillEquation":
      return <RangerFillEquation></RangerFillEquation>;
    case "ranger:SolveTheEquation":
      return <RangerSolveTheEquation></RangerSolveTheEquation>;
    case "ranger:SolvedFor":
      return <RangerSolvedFor></RangerSolvedFor>;
    case "ranger:Reflect":
      return <RangerReflect></RangerReflect>;
    default:
      return (
        <>
          <h1>NO COMPONENT FOR</h1>
          <h2>{page.rank + ":" + page.id}</h2>
        </>
      );
  }
}
