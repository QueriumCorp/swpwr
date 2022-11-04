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
          READ: (
            <ReadView
              stimulus={problem.stimulus}
              onChange={dispatch}
              contentType={contentType}
            ></ReadView>
          ),
          TAG: (
            <TagView
              problem={problem}
              solution={solution}
              onChange={dispatch}
              contentType={contentType}
            ></TagView>
          ),
          DIAGRAMANALYZE: (
            <DiagramAnalyzeView
              problem={problem}
              solution={solution}
              onChange={dispatch}
              contentType={contentType}
            ></DiagramAnalyzeView>
          ),
          DIAGRAMSELECT: (
            <DiagramSelectView
              problem={problem}
              solution={solution}
              onChange={dispatch}
              contentType={contentType}
            ></DiagramSelectView>
          ),
          DIAGRAMMER: (
            <DiagrammerView
              problem={problem}
              solution={solution}
              onChange={dispatch}
              contentType={contentType}
            ></DiagrammerView>
          ),
          EQUATIONATOR: (
            <EquationatorView
              problem={problem}
              solution={solution}
              onChange={dispatch}
              contentType={contentType}
            ></EquationatorView>
          ),
          STEPWISE: (
            <StepWiseView
              problem={problem}
              solution={solution}
              onChange={dispatch}
              contentType={contentType}
            ></StepWiseView>
          ),
          IDENTIFIER: (
            <IdentifierView
              problem={problem}
              solution={solution}
              onChange={dispatch}
              contentType={contentType}
            ></IdentifierView>
          ),
          EXPLAINER: (
            <ExplainerView
              problem={problem}
              solution={solution}
              onChange={dispatch}
              contentType={contentType}
            ></ExplainerView>
          ),
          REVIEWER: (
            <ReviewerView
              problem={problem}
              solution={solution}
              onChange={dispatch}
              contentType={contentType}
            ></ReviewerView>
          ),
          TEST: (
            <TestView
              problem={problem}
              solution={solution}
              onChange={dispatch}
              contentType={contentType}
            ></TestView>
          )
        }[contentType]
      }
    </div>
  );
}

export default PowerContent;
