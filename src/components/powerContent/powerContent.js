import React from "react";

import ReadView from "../../stepViews/readView/readView";
import TagView from "../../stepViews/tagView/tagView";
import DiagramSelectView from "../../stepViews/diagramSelectView/diagramSelectView";
import DiagrammerView from "../../stepViews/diagrammerView/diagrammerView";
import EquationatorView from "../../stepViews/equationatorView/equationatorView";
import StepWiseView from "../../stepViews/stepwiseView/stepwiseView";
import ExplainerView from "../../stepViews/explainerView/explainerView";
import ReviewerView from "../../stepViews/reviewerView/reviewerView";
import DiagramAnalyzeView from "../../stepViews/diagramAnalyzeView/diagramAnalyzeView";

import "./powerContent.css";
import TestView from "../../stepViews/testView/testView";
import IdentifierView from "../../stepViews/identifierView/identifierView";

function PowerContent(props) {
  const contentType = props.type;
  const problem = props.problem;
  const solution = props.solution;
  const dispatch = props.dispatcher;

  return (
    <div className="powerContent">
      {
        {
          READ: <ReadView stimulus={problem.stimulus}></ReadView>,
          TAG: (
            <TagView
              problem={problem}
              solution={solution}
              onChange={dispatch}
            ></TagView>
          ),
          DIAGRAMANALYZE: (
            <DiagramAnalyzeView
              problem={problem}
              solution={solution}
              onChange={dispatch}
            ></DiagramAnalyzeView>
          ),
          DIAGRAMSELECT: (
            <DiagramSelectView
              problem={problem}
              solution={solution}
              onChange={dispatch}
            ></DiagramSelectView>
          ),
          DIAGRAMMER: (
            <DiagrammerView
              problem={problem}
              solution={solution}
              onChange={dispatch}
            ></DiagrammerView>
          ),
          EQUATIONATOR: (
            <EquationatorView
              problem={problem}
              solution={solution}
              onChange={dispatch}
            ></EquationatorView>
          ),
          STEPWISE: (
            <StepWiseView
              problem={problem}
              solution={solution}
              onChange={dispatch}
            ></StepWiseView>
          ),
          IDENTIFIER: (
            <IdentifierView
              problem={problem}
              solution={solution}
              onChange={dispatch}
            ></IdentifierView>
          ),
          EXPLAINER: (
            <ExplainerView
              problem={problem}
              solution={solution}
              onChange={dispatch}
            ></ExplainerView>
          ),
          REVIEWER: (
            <ReviewerView
              problem={problem}
              solution={solution}
              onChange={dispatch}
            ></ReviewerView>
          ),
          TEST: (
            <TestView
              problem={problem}
              solution={solution}
              onChange={dispatch}
            ></TestView>
          ),
        }[contentType]
      }
    </div>
  );
}

export default PowerContent;
