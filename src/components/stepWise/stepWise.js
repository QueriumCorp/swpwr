import React from "react";

export default class SWContainer extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    setTimeout(() => {
      document
        .getElementById("swStage")
        .appendChild(document.getElementById("swClient"));
    }, 0);
  }
  componentWillUnmount() {
    document
      .getElementById("swBackStage")
      .appendChild(document.getElementById("swStage"));
  }
  render() {
    return <div id="swStage" ref={this.myRef}></div>;
  }
}
