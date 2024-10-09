import NewbFeelThePower from '../pages/NewbFeelThePower'
import NewbFindTutor from '../pages/NewbFindTutor'
import NewbGratzFoundTutor from '../pages/NewbGratzFoundTutor'
import NewbGratzOnPrepare from '../pages/NewbGratzOnPrepare'
import NewbGratzWatchedVideo from '../pages/NewbGratzWatchedVideo'
import NewbFindFacts from '../pages/NewbFindFacts'
import NewbMeetTutor from '../pages/NewbMeetTutor'
import NewbProblemType from '../pages/NewbSelectDiagram'
import NewbReadProblem from '../pages/NewbReadProblem'
import RangerFillDiagram from '../pages/RangerFillDiagram'
import RangerFillEquation from '../pages/RangerFillEquation'
import RangerFindFacts from '../pages/RangerFindFacts'
import RangerReadProblem from '../pages/RangerReadProblem'
import RangerReflect from '../pages/RangerReflect'
import RangerSelectDiagram from '../pages/RangerSelectDiagram'
import RangerSolveTheEquation from '../pages/RangerSolveTheEquation'
import RangerOwnWords from '../pages/RangerOwnWords'
import RangerWhatToAnswer from '../pages/RangerWhatToAnswer'
import { YBRpage } from './YellowBrickRoad'
import NewbVictory from '../pages/NewbVictory'
import RangerVictory from '../pages/RangerVictory'
import NewbVideoTotal from '../pages/NewbVideoTotal'
import CadetPrepForSolveMath from '../pages/CadetPrepForSolveMath'
import DevFindTutor from '../pages/DevFindTutor'
import CadetReflect from '../pages/CadetReflect'
import NewbVideoFindFacts from '../pages/NewbVideoFindFacts'
import CadetVideoStepWise from '../pages/CadetVideoStepWise'
import CadetReadProblem from '../pages/CadetReadProblem'
import DevMeetTutor from '../pages/DevMeetTutor'

export function renderPage(page: YBRpage, index: number) {
  switch (page.rank + ':' + page.id) {
    ///////////////////////////////////////////////////////////////////
    // DEV
    ///////////////////////////////////////////////////////////////////
    case 'dev:MeetTutor':
      return <DevMeetTutor page={page} index={index}></DevMeetTutor>
    case 'dev:FindTutor':
      return <DevFindTutor page={page} index={index}></DevFindTutor>
    case 'dev:ReadProblem':
      return <NewbReadProblem page={page} index={index}></NewbReadProblem>
    case 'dev:SolveTheEquation':
      return (
        <RangerSolveTheEquation
          page={page}
          index={index}
        ></RangerSolveTheEquation>
      )

    ///////////////////////////////////////////////////////////////////
    // NEWB
    ///////////////////////////////////////////////////////////////////

    case 'newb:MeetTutor':
      return <NewbMeetTutor page={page} index={index}></NewbMeetTutor>
    case 'newb:FeelThePower':
      return <NewbFeelThePower page={page} index={index}></NewbFeelThePower>
    case 'newb:VideoTotal':
      return <NewbVideoTotal page={page} index={index}></NewbVideoTotal>
    case 'newb:GratzWatchedVideo':
      return (
        <NewbGratzWatchedVideo
          page={page}
          index={index}
        ></NewbGratzWatchedVideo>
      )
    case 'newb:FindTutor':
      return <NewbFindTutor page={page} index={index}></NewbFindTutor>
    case 'newb:Reflect':
      return <RangerReflect page={page} index={index}></RangerReflect>

    case 'newb:GratzFoundTutor':
      return (
        <NewbGratzFoundTutor page={page} index={index}></NewbGratzFoundTutor>
      )
    case 'newb:ReadProblem':
      return <NewbReadProblem page={page} index={index}></NewbReadProblem>
    case 'newb:VideoFindFacts':
      return <NewbVideoFindFacts page={page} index={index}></NewbVideoFindFacts>
    case 'newb:FindFacts':
      return <NewbFindFacts page={page} index={index}></NewbFindFacts>
    case 'newb:GratzOnPrepare':
      return <NewbGratzOnPrepare page={page} index={index}></NewbGratzOnPrepare>
    case 'newb:NewbProblemType':
      return <NewbProblemType page={page} index={index}></NewbProblemType>
    case 'newb:NewbVictory':
      return <NewbVictory page={page} index={index}></NewbVictory>

    ///////////////////////////////////////////////////////////////////
    // CADET
    ///////////////////////////////////////////////////////////////////

    case 'cadet:ReadProblem':
      return <CadetReadProblem page={page} index={index}></CadetReadProblem>
    case 'cadet:WhatToAnswer':
      return <RangerWhatToAnswer page={page} index={index}></RangerWhatToAnswer>
    case 'cadet:FindFacts':
      return <RangerFindFacts page={page} index={index}></RangerFindFacts>
    case 'cadet:SelectDiagram':
      return (
        <RangerSelectDiagram page={page} index={index}></RangerSelectDiagram>
      )
    case 'cadet:FillDiagram':
      return <RangerFillDiagram page={page} index={index}></RangerFillDiagram>
    case 'cadet:FillEquation':
      return <RangerFillEquation page={page} index={index}></RangerFillEquation>
    case 'cadet:PrepForSolveMath':
      return (
        <CadetPrepForSolveMath
          page={page}
          index={index}
        ></CadetPrepForSolveMath>
      )
    case 'cadet:VideoStepWise':
      return <CadetVideoStepWise page={page} index={index}></CadetVideoStepWise>
    case 'cadet:SolveTheEquation':
      return (
        <RangerSolveTheEquation
          page={page}
          index={index}
        ></RangerSolveTheEquation>
      )
    case 'cadet:OwnWords':
      return <RangerOwnWords page={page} index={index}></RangerOwnWords>
    case 'cadet:Reflect':
      return <CadetReflect page={page} index={index}></CadetReflect>
    case 'cadet:RangerVictory':
      return <RangerVictory page={page} index={index}></RangerVictory>

    ///////////////////////////////////////////////////////////////////
    // RANGER
    ///////////////////////////////////////////////////////////////////

    case 'ranger:ReadProblem':
      return <RangerReadProblem page={page} index={index}></RangerReadProblem>
    case 'ranger:WhatToAnswer':
      return <RangerWhatToAnswer page={page} index={index}></RangerWhatToAnswer>
    case 'ranger:FindFacts':
      return <RangerFindFacts page={page} index={index}></RangerFindFacts>
    case 'ranger:SelectDiagram':
      return (
        <RangerSelectDiagram page={page} index={index}></RangerSelectDiagram>
      )
    case 'ranger:FillDiagram':
      return <RangerFillDiagram page={page} index={index}></RangerFillDiagram> // DEFAULT
    case 'ranger:FillEquation':
      return <RangerFillEquation page={page} index={index}></RangerFillEquation>
    case 'ranger:SolveTheEquation':
      return (
        <RangerSolveTheEquation
          page={page}
          index={index}
        ></RangerSolveTheEquation>
      )
    case 'ranger:OwnWords':
      return <RangerOwnWords page={page} index={index}></RangerOwnWords>
    case 'ranger:Reflect':
      return <RangerReflect page={page} index={index}></RangerReflect>
    case 'ranger:RangerVictory':
      return <RangerVictory page={page} index={index}></RangerVictory>

    default:
      return (
        <>
          <h1>NO COMPONENT FOR</h1>
          <h2>
            {page.rank + ':' + page.id} for index {index}
          </h2>
          <p>Verify YellowBrickRoad and RenderPage are in sync.</p>
        </>
      )
  }
}
