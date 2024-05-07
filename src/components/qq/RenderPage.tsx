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
      return <NewbMeetTutor page={page}></NewbMeetTutor>;
    case "newb:FeelThePower":
      return <NewbFeelThePower page={page}></NewbFeelThePower>;
    case "newb:GratzWatchedVideo":
      return <NewbGratzWatchedVideo page={page}></NewbGratzWatchedVideo>;
    case "newb:FindTutor":
      return <NewbFindTutor page={page}></NewbFindTutor>;
    case "newb:GratzFoundTutor":
      return <NewbGratzFoundTutor page={page}></NewbGratzFoundTutor>;
    case "newb:ReadProblem":
      return <NewbReadProblem page={page}></NewbReadProblem>;
    case "newb:KnownFacts":
      return <NewbKnownFacts page={page}></NewbKnownFacts>;
    case "newb:GratzOnPrepare":
      return <NewbGratzOnPrepare page={page}></NewbGratzOnPrepare>;

    // CADET
    case "cadet:ReadProblem":
      return <CadetReadProblem page={page}></CadetReadProblem>;
    case "cadet:WhatToAnswer":
      return <CadetWhatToAnswer page={page}></CadetWhatToAnswer>;
    case "cadet:FindFacts":
      return <CadetFindFacts page={page}></CadetFindFacts>;
    case "cadet:SelectDiagram":
      return <CadetSelectDiagram page={page}></CadetSelectDiagram>;
    case "cadet:FillDiagram":
      return <CadetFillDiagram page={page}></CadetFillDiagram>;
    case "cadet:FillEquation":
      return <CadetFillEquation page={page}></CadetFillEquation>;
    case "cadet:GratzOnOrganize":
      return <CadetGratzOnOrganize page={page}></CadetGratzOnOrganize>;
    case "cadet:SolveTheEquation":
      return <CadetSolveTheEquation page={page}></CadetSolveTheEquation>;
    case "cadet:GratzEquationSolved":
      return <CadetGratzEquationSolved page={page}></CadetGratzEquationSolved>;
    case "cadet:SolvedFor":
      return <CadetSolvedFor page={page}></CadetSolvedFor>;
    case "cadet:Reflect":
      return <CadetReflect page={page}></CadetReflect>;
    case "cadet:GratzOnLearner":
      return <CadetGratzOnLearner page={page}></CadetGratzOnLearner>;
    case "cadet:QuestIntro":
      return <CadetQuestIntro page={page}></CadetQuestIntro>;
    case "cadet:WhatIsPower":
      return <CadetWhatIsPower page={page}></CadetWhatIsPower>;

    // RANGER
    case "ranger:ReadProblem":
      return <RangerReadProblem page={page}></RangerReadProblem>;
    case "ranger:WhatToAnswer":
      return <RangerWhatToAnswer page={page}></RangerWhatToAnswer>;
    case "ranger:FindFacts":
      return <RangerFindFacts page={page}></RangerFindFacts>;
    case "ranger:SelectDiagram":
      return <RangerSelectDiagram page={page}></RangerSelectDiagram>;
    case "ranger:FillDiagram":
      return <RangerFillDiagram page={page}></RangerFillDiagram>; // DEFAULT
    case "ranger:FillEquation":
      return <RangerFillEquation page={page}></RangerFillEquation>;
    case "ranger:SolveTheEquation":
      return <RangerSolveTheEquation page={page}></RangerSolveTheEquation>;
    case "ranger:SolvedFor":
      return <RangerSolvedFor page={page}></RangerSolvedFor>;
    case "ranger:Reflect":
      return <RangerReflect page={page}></RangerReflect>;
    default:
      return (
        <>
          <h1>NO COMPONENT FOR</h1>
          <h2>{page.rank + ":" + page.id}</h2>
        </>
      );
  }
}
