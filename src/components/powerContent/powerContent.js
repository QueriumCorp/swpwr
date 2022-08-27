import React from "react";

import ReadView from "../../stepViews/readView/readView";
import TagView from "../../stepViews/tagView/tagView";
import DiagramSelectView from "../../stepViews/diagramSelectView/diagramSelectView";
import DiagrammerView from "../../stepViews/diagrammerView/diagrammerView";
import EquationatorView from "../../stepViews/equationatorView/equationatorView";
import StepWiseView from "../../stepViews/stepwiseView/stepwiseView";
import ExplainerView from "../../stepViews/explainerView/explainerView";
import ReviewerView from "../../stepViews/reviewerView/reviewerView";

import "./powerContent.css";

function PowerContent(props) {
  const contentType = props.type;
  const problem = props.problem;
  const solution = props.solution;
  const dispatch = props.dispatcher;

  return (
    <div className="powerContent">
      <div style={{ color: "green" }}>{contentType}</div>
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
        }[contentType]
      }
    </div>
  );
}

export default PowerContent;
