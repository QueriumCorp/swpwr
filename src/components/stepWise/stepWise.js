/* global angular */

import React from "react";

export default class SWContainer extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();

    angular.module("myApp", []).controller("MyController", [
      "$scope",
      function ($scope) {
        $scope.greetMe = "World";
      },
    ]);

    angular.element(function () {
      angular.bootstrap(document, ["myApp"]);
    });
  }

  componentDidMount() {
    const qqNode = this.myRef.current.appendChild(
      document.createElement("querium")
    );
    qqNode.className = "qq";

    setTimeout(() => {
      console.info("trying to start the question");
      window.querium.startQuestion(
        "appID",
        "JoeSixpack",
        { type: "gradeBasicAlgebra", definition: "SolveFor[4(y-5)-3y=-1,y]" },
        {},
        {}
      );
    }, 2000);
  }

  render() {
    return <div ref={this.myRef}></div>;
  }
}
