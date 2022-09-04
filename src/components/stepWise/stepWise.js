import React from "react";

export default class SWContainer extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    const qqNode = this.myRef.current.appendChild(
      document.createElement("querium")
    );
    qqNode.className = "qq";

    setTimeout(() => {
      console.info("trying to start the question");
      document
        .getElementById("swHolder")
        .appendChild(document.getElementById("swBuffer"));
    }, 2000);
  }

  render() {
    return <div id="swHolder" ref={this.myRef}></div>;
  }
}
