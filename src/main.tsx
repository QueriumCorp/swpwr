import React from "react";
import ReactDOM from "react-dom/client";
import StepWisePower from "./SWPower.tsx";
import "./index.css";
import "./swReact.css";
import "./animeTutor.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="w-dvw h-dvh overflow-hidden relative">
      {/* <div className="h-[354px] max-h-[354px] bg-slate-300 overflow-hidden ">
        <svg x="0px" y="0px" height="354" viewBox="0 0 1012 685.4">
          <g id="g40">
            <g id="g46">
              <path
                id="path48"
                style={{ fill: "#49a0dd" }}
                d="M878.6,221.9l-0.5-54.9l-136.8,1.1l0.5,54.9l31.1-0.3l-54.8,68.8l-56-67.9l31.2-0.3l-0.5-54.9
			l-102.2,0.9l0.5,61.4l89.2,108.1L593,448.5l0.1,11l42.1-0.4l0.5,56.2l60.1-0.5l-0.5-56.2l-34.8,0.3l58.5-73.3l0,0l59.7,72.4
			l-34.8,0.3l0.5,56.2l136.7-1.1l-0.5-56.2l-25.6,0.2l-98.3-119.1l92.6-116.1L878.6,221.9"
              />
            </g>
            <g id="g50">
              <path
                id="path52"
                style={{ fill: "#2c67aa" }}
                d="M555.4,169.7l0.5,54.9l29.9-0.2l5.4,6.5l-0.5-61.4L555.4,169.7"
              />
            </g>
            <g id="g54">
              <path
                id="path56"
                style={{ fill: "#2c67aa" }}
                d="M593.1,459.5l-0.1-11l-8.8,11l-26.3,0.2l0.5,56.2l77.3-0.7l-0.5-56.2L593.1,459.5"
              />
            </g>
            <g id="g58">
              <path
                id="path60"
                style={{ fill: "#731b2b" }}
                d="M338.1,435.8l48.6-0.4c-5.6,14.1-13.5,27.2-23.5,38.7C352.7,462.9,344.2,449.9,338.1,435.8"
              />
            </g>
            <g id="g62">
              <path
                id="path64"
                style={{ fill: "#731b2b" }}
                d="M337.6,360.6l-8.7,0.1c-1.3,7.6-1.9,15.3-1.8,23c0.1,7.3,0.7,14.5,1.9,21.7l9.2-0.1
			C342.2,390.7,341.9,375.2,337.6,360.6L337.6,360.6z M337.6,360.6c4.4,14.6,4.6,30,0.7,44.7l47.3-0.4c-4.3-14.6-4.3-30.1,0-44.7
			L337.6,360.6z M361.7,292.8c-14,15.5-24.1,34-29.7,54.1c2.3,4.4,4.2,9,5.6,13.8l48-0.4c1.4-4.7,3.2-9.3,5.5-13.7
			C385.6,326.5,375.5,308.1,361.7,292.8"
              />
            </g>
            <g id="g66">
              <path
                id="path68"
                style={{ fill: "#868484" }}
                d="M332,346.8c-1.3,4.6-2.3,9.2-3,13.9l8.7-0.1C336.2,355.9,334.3,351.3,332,346.8z M538.1,492
			l0.2,24.2l20-0.2l-0.4-42C552,480.7,545.3,486.7,538.1,492z M585.8,224.3l-29.9,0.2l-0.5-54.9l-56.5,0.5l0.5,54.9l36.5-0.3
			l0.4,47.3c-22.2-15.7-48.9-23.9-76.1-23.6c-37.6,0.3-73.4,16.4-98.5,44.3c13.8,15.4,23.9,33.8,29.5,53.7
			c13.4-25.7,39.9-42,68.9-42.2c43.3-0.4,76.8,34.4,77.2,77.7v0.4c0.1,43.1-32.8,78.2-75.9,78.5c-29,0.2-55.8-15.6-69.6-41.1l0,0
			c-2.6-4.7-4.6-9.7-6.1-14.9l-56.5,0.5c1.8,10.4,4.8,20.6,9,30.4l48.6-0.4c-5.6,14.1-13.5,27.2-23.5,38.7
			c25.6,27.6,61.6,43.1,99.3,42.7c36.5-0.1,71.2-15.6,95.6-42.8l-0.1-14.2l26.3-0.2l8.8-11l-1.8-217.7L585.8,224.3"
              />
            </g>
            <g id="g70">
              <path
                id="path72"
                style={{ fill: "#cf1f65" }}
                d="M264.1,250.1c-65.2,0.5-120.6,47.9-131.3,112.3l56.7-0.5c9.8-33,40-55.6,74.4-55.9
			c28.6-0.4,55,15.5,68.1,40.9c5.5-20.1,15.7-38.6,29.7-54.1C336.8,265.1,301.2,249.5,264.1,250.1z M322.4,436
			c-14.2,16.8-35.1,26.5-57.2,26.6c-34.9,0.3-65.8-22.5-75.7-56l139.6-1.2c-1.2-7.2-1.9-14.4-1.9-21.7c-0.1-7.7,0.5-15.4,1.8-23
			l-196.1,1.6c-2.4,14.8-2.4,29.9,0.2,44.7l0,0c11.2,64.8,67.6,111.9,133.4,111.4c37.2-0.1,72.5-16.3,96.9-44.3
			c-10.5-11.2-19-24.2-25.1-38.3L322.4,436z M394.2,360.2c-0.8-4.6-1.8-9.2-3.1-13.7c-2.3,4.4-4.1,9-5.5,13.7
			c-4.3,14.6-4.3,30.1,0,44.7l9.2-0.1C397,390,396.8,374.9,394.2,360.2"
              />
            </g>
          </g>
        </svg>
        <h3 className="absolute top-[335px] right-0 z-10">354px</h3>
      </div> */}
      <StepWisePower className="absolute top-0 left-0 right-0 bottom-0 flex flex-col" />
    </div>
  </React.StrictMode>,
);
