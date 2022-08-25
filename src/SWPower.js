import React, { useReducer } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import { Wizard } from "react-use-wizard";

import workReducer, { blankWork } from "./reducer.js";

import PowerTitle from "./components/powerTitle/powerTitle.js";
import "./SWPower.css";
import PowerContent from "./components/powerContent/powerContent.js";
import Footer from "./components/footer/footer.js";

function SWPower() {
  const [work, workDispatch] = useReducer(workReducer, blankWork);

  const Header = () => <PowerTitle problem={work.problem}></PowerTitle>;

  return (
    <div className="SWPowerComponent">
      <Wizard header={<Header />} footer={<Footer />}>
        {work.problem.steps.map((step, i) => {
          return (
            <PowerContent
              key={i}
              problem={work.problem}
              type={step.type}
              dispatcher={workDispatch}
            ></PowerContent>
          );
        })}
      </Wizard>
    </div>
  );
}

export default SWPower;
