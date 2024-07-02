import CadetFillDiagram from "../pages/CadetFillDiagram";
import CadetFillEquation from "../pages/CadetFillEquation";
import CadetFindFacts from "../pages/CadetFindFacts";
// import CadetGratzEquationSolved from "../pages/CadetGratzEquationSolved";
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
import NewbFindFacts from "../pages/NewbFindFacts";
import NewbMeetTutor from "../pages/NewbMeetTutor";
import NewbProblemType from "../pages/NewbProblemType";
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
import NewbSolveTheEquation from "../pages/NewbSolveTheEquation";
import DevMeetTutor from "../pages/DevMeetTutor";
import DevSolveTheEquation from "../pages/DevSolveTheEquation";
import NewbVictory from "../pages/NewbVictory";

export function renderPage(page: YBRpage, index: number) {
  switch (page.rank + ":" + page.id) {
    // DEV
    case "dev:MeetTutor":
      return <DevMeetTutor page={page} index={index}></DevMeetTutor>;
    case "dev:SolveTheEquation":
      return (
        <DevSolveTheEquation page={page} index={index}></DevSolveTheEquation>
      );

    // NEWB
    case "newb:MeetTutor":
      return <NewbMeetTutor page={page} index={index}></NewbMeetTutor>;
    case "newb:FeelThePower":
      return <NewbFeelThePower page={page} index={index}></NewbFeelThePower>;
    case "newb:GratzWatchedVideo":
      return (
        <NewbGratzWatchedVideo
          page={page}
          index={index}
        ></NewbGratzWatchedVideo>
      );
    case "newb:FindTutor":
      return <NewbFindTutor page={page} index={index}></NewbFindTutor>;
    case "newb:GratzFoundTutor":
      return (
        <NewbGratzFoundTutor page={page} index={index}></NewbGratzFoundTutor>
      );
    case "newb:ReadProblem":
      return <NewbReadProblem page={page} index={index}></NewbReadProblem>;
    case "newb:KnownFacts":
      return <NewbFindFacts page={page} index={index}></NewbFindFacts>;
    case "newb:GratzOnPrepare":
      return (
        <NewbGratzOnPrepare page={page} index={index}></NewbGratzOnPrepare>
      );
    case "newb:NewbProblemType":
      return <NewbProblemType page={page} index={index}></NewbProblemType>;
    case "newb:NewbVictory":
      return <NewbVictory page={page} index={index}></NewbVictory>;

    // CADET
    case "cadet:ReadProblem":
      return <CadetReadProblem page={page} index={index}></CadetReadProblem>;
    case "cadet:WhatToAnswer":
      return <CadetWhatToAnswer page={page} index={index}></CadetWhatToAnswer>;
    case "cadet:FindFacts":
      return <CadetFindFacts page={page} index={index}></CadetFindFacts>;
    case "cadet:SelectDiagram":
      return (
        <CadetSelectDiagram page={page} index={index}></CadetSelectDiagram>
      );
    case "cadet:FillDiagram":
      return <CadetFillDiagram page={page} index={index}></CadetFillDiagram>;
    case "cadet:FillEquation":
      return <CadetFillEquation page={page} index={index}></CadetFillEquation>;
    case "cadet:GratzOnOrganize":
      return (
        <CadetGratzOnOrganize page={page} index={index}></CadetGratzOnOrganize>
      );
    case "cadet:SolveTheEquation":
      return (
        <CadetSolveTheEquation
          page={page}
          index={index}
        ></CadetSolveTheEquation>
      );
    // case "cadet:GratzEquationSolved":
    //   return (
    //     <CadetGratzEquationSolved
    //       page={page}
    //       index={index}
    //     ></CadetGratzEquationSolved>
    //   );
    case "cadet:SolvedFor":
      return <CadetSolvedFor page={page} index={index}></CadetSolvedFor>;
    case "cadet:Reflect":
      return <CadetReflect page={page} index={index}></CadetReflect>;
    case "cadet:GratzOnLearner":
      return (
        <CadetGratzOnLearner page={page} index={index}></CadetGratzOnLearner>
      );
    case "cadet:QuestIntro":
      return <CadetQuestIntro page={page} index={index}></CadetQuestIntro>;
    case "cadet:WhatIsPower":
      return <CadetWhatIsPower page={page} index={index}></CadetWhatIsPower>;

    // RANGER
    case "ranger:ReadProblem":
      return <RangerReadProblem page={page} index={index}></RangerReadProblem>;
    case "ranger:WhatToAnswer":
      return (
        <RangerWhatToAnswer page={page} index={index}></RangerWhatToAnswer>
      );
    case "ranger:FindFacts":
      return <RangerFindFacts page={page} index={index}></RangerFindFacts>;
    case "ranger:SelectDiagram":
      return (
        <RangerSelectDiagram page={page} index={index}></RangerSelectDiagram>
      );
    case "ranger:FillDiagram":
      return <RangerFillDiagram page={page} index={index}></RangerFillDiagram>; // DEFAULT
    case "ranger:FillEquation":
      return (
        <RangerFillEquation page={page} index={index}></RangerFillEquation>
      );
    case "ranger:SolveTheEquation":
      return (
        <RangerSolveTheEquation
          page={page}
          index={index}
        ></RangerSolveTheEquation>
      );
    case "ranger:SolvedFor":
      return <RangerSolvedFor page={page} index={index}></RangerSolvedFor>;
    case "ranger:Reflect":
      return <RangerReflect page={page} index={index}></RangerReflect>;
    default:
      return (
        <>
          <h1>NO COMPONENT FOR</h1>
          <h2>
            {page.rank + ":" + page.id} for index {index}
          </h2>
        </>
      );
  }
}
