/* global querium */

import React from "react";

export default class SWContainer extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.successCallback = stats => {
      props.onChange({
        type: "saveStepWise",
        payload: stats
      });
    };
  }

  componentDidMount() {
    // TODO: We need to support multiple sw questions in different steps
    const problem = this.props.problem.steps[5];
    setTimeout(() => {
      document
        .getElementById("swStage")
        .appendChild(document.getElementById("swClient"));
      querium.startQuestion(
        "JiraTestPage",
        "Winry",
        {
          label: problem.swlabel,
          type: problem.swtype,
          description: problem.description,
          definition: problem.definition,
          hint1: problem.hint1,
          hint2: problem.hint2,
          hint3: problem.hint3
        },
        { success: this.successCallback },
        {
          hideMenu: true,
          scribbles: false
        }
      );
    }, 0);
  }
  componentWillUnmount() {
    document
      .getElementById("swBackStage")
      .appendChild(document.getElementById("swStage"));
  }
  render() {
    return (
      <div
        id="swStage"
        style={{ flexGrow: 2, display: "flex" }}
        ref={this.myRef}
      ></div>
    );
  }
}
