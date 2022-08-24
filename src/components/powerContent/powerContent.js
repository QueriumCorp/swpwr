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
  // const problem = props.problem;
  // const dispatch = props.dispatcher;

  return (
    <div className="powerContent">
      <div>{contentType}</div>
      {
        {
          READ: <ReadView></ReadView>,
          TAG: <TagView></TagView>,
          DIAGRAMMER: <DiagrammerView></DiagrammerView>,
          DIAGRAMSELECT: <DiagramSelectView></DiagramSelectView>,
          EQUATIONATOR: <EquationatorView></EquationatorView>,
          STEPWISE: <StepWiseView></StepWiseView>,
          EXPLAINER: <ExplainerView></ExplainerView>,
          REVIEWER: <ReviewerView></ReviewerView>,
        }[contentType]
      }
    </div>
  );
}

export default PowerContent;
