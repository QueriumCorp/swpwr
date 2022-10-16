/* global querium */

import React from "react";

export default class SWContainer extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    // TODO: We need to support multiple sw questions in different steps
    const problem = this.props.problem.steps[5];
    setTimeout(() => {
      document
        .getElementById("swStage")
        .appendChild(document.getElementById("swClient"));
      querium.startQuestion("JiraTestPage", "Winry", {
        label: problem.swlabel,
        type: problem.swtype,
        definition: problem.definition,
      });
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
