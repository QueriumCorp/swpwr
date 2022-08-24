import React, { useState, useReducer } from "react";

import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";

import workReducer, { blankWork } from "./reducer.js";

import PowerTitle from "./components/powerTitle/powerTitle.js";
import "./SWPower.css";
import PowerContent from "./components/powerContent/powerContent.js";

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  // Student's WorkProduct
  const [work, workDispatch] = useReducer(workReducer, blankWork);

  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      interval={null}
      variant={"dark"}
    >
      {work.problem.steps.map((step, i) => {
        return (
          <Carousel.Item key={i} className="page min-vh-100">
            <Carousel.Caption className="pageCaption">
              <PowerTitle
                title={work.problem.stepsMnemonic}
                subTitle={step.label}
                instructions={step.instruction}
                current={step.mnemonicIndex}
              ></PowerTitle>
              <PowerContent
                problem={work.problem}
                type={step.type}
                dispatcher={workDispatch}
              ></PowerContent>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

function SWPower() {
  return (
    <div className="SWPowerComponent">
      <ControlledCarousel />
    </div>
  );
}

export default SWPower;
