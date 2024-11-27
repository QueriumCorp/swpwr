import { YBRpage } from './YellowBrickRoad'

import FindFacts from '../pages/FindFacts'
import PickSchema from '../pages/PickSchema'

import DevFindTutor from '../pages/DevFindTutor'

import NewbMeetTutor from '../pages/NewbMeetTutor'
import NewbFindTutor from '../pages/NewbFindTutor'
import NewbReadProblem from '../pages/NewbReadProblem'
import NewbVideoFindFacts from '../pages/NewbVideoFindFacts'
// generic FindFacts
import NewbVideoTotal from '../pages/NewbVideoTotal'
// generic PickSchema
import NewbVictory from '../pages/NewbVictory'

import CadetReflect from '../pages/CadetReflect'
import CadetVideoStepWise from '../pages/CadetVideoStepWise'
import CadetReadProblem from '../pages/CadetReadProblem'

import RangerFillDiagram from '../pages/RangerFillDiagram'
import RangerSolveTheEquation from '../pages/RangerSolveTheEquation'
import RangerOwnWords from '../pages/RangerOwnWords'
import RangerVictory from '../pages/RangerVictory'

export function renderPage(page: YBRpage, index: number) {
  switch (page.rank + ':' + page.id) {
    ///////////////////////////////////////////////////////////////////
    // DEV
    ///////////////////////////////////////////////////////////////////
    case 'dev:MeetTutor':
      return <NewbMeetTutor page={page} index={index}></NewbMeetTutor>
    case 'dev:Reflect':
      return <CadetReflect page={page} index={index}></CadetReflect>
    case 'dev:FindFacts':
      return <FindFacts page={page} index={index}></FindFacts>
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
    case 'newb:FindTutor':
      return <NewbFindTutor page={page} index={index}></NewbFindTutor>
    case 'newb:ReadProblem':
      return <NewbReadProblem page={page} index={index}></NewbReadProblem>
    case 'newb:VideoFindFacts':
      return <NewbVideoFindFacts page={page} index={index}></NewbVideoFindFacts>
    case 'newb:FindFacts':
      return <FindFacts page={page} index={index}></FindFacts>
    case 'newb:VideoTotal':
      return <NewbVideoTotal page={page} index={index}></NewbVideoTotal>
    case 'newb:PickSchema':
      return <PickSchema page={page} index={index}></PickSchema>
    case 'newb:NewbVictory':
      return <NewbVictory page={page} index={index}></NewbVictory>

    ///////////////////////////////////////////////////////////////////
    // CADET
    ///////////////////////////////////////////////////////////////////

    case 'cadet:ReadProblem':
      return <CadetReadProblem page={page} index={index}></CadetReadProblem>
    case 'cadet:FindFacts':
      return <FindFacts page={page} index={index}></FindFacts>
    case 'cadet:SelectDiagram':
      return <PickSchema page={page} index={index}></PickSchema>
    case 'cadet:FillDiagram':
      return <RangerFillDiagram page={page} index={index}></RangerFillDiagram>
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
    // SCOUT
    ///////////////////////////////////////////////////////////////////

    case 'scout:ReadProblem':
      return <CadetReadProblem page={page} index={index}></CadetReadProblem>
    case 'scout:FindFacts':
      return <FindFacts page={page} index={index}></FindFacts>
    case 'scout:SelectDiagram':
      return <PickSchema page={page} index={index}></PickSchema>
    case 'scout:FillDiagram':
      return <RangerFillDiagram page={page} index={index}></RangerFillDiagram>
    case 'scout:SolveTheEquation':
      return (
        <RangerSolveTheEquation
          page={page}
          index={index}
        ></RangerSolveTheEquation>
      )
    case 'scout:OwnWords':
      return <RangerOwnWords page={page} index={index}></RangerOwnWords>
    case 'scout:Reflect':
      return <CadetReflect page={page} index={index}></CadetReflect>
    case 'scout:RangerVictory':
      return <RangerVictory page={page} index={index}></RangerVictory>

    ///////////////////////////////////////////////////////////////////
    // RANGER
    ///////////////////////////////////////////////////////////////////

    case 'ranger:ReadProblem':
      return <CadetReadProblem page={page} index={index}></CadetReadProblem>
    case 'ranger:FindFacts':
      return <FindFacts page={page} index={index}></FindFacts>
    case 'ranger:SelectDiagram':
      return <PickSchema page={page} index={index}></PickSchema>
    case 'ranger:FillDiagram':
      return <RangerFillDiagram page={page} index={index}></RangerFillDiagram>
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
      return <CadetReflect page={page} index={index}></CadetReflect>
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
