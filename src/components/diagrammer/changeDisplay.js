import React from "react";

import Card from "react-bootstrap/Card";

import "./diagrammer.css";
import "../diagramChange/diagramChange.css";

import Toggle from "react-toggle";
import "react-toggle/style.css";
import { TiPlus } from "react-icons/ti";
import { FaMinus } from "react-icons/fa";

export default function ChangeDisplay(props) {
  const solution = props.solution;

  // JSX
  return (
    <div className="diagramContainer">
      <Card style={{ flexGrow: "2" }}>
        <Card.Body className="diagramScroll" style={{ padding: 0 }}>
          <div
            className="diagramExample"
            style={{
              flexDirection: "row",
              justifyContent: "center",
              maxWidth: "initial"
            }}
          >
            <div className="diagramChangeArrowBox">
              <svg
                className="diagramChangeArrow"
                version="1.1"
                viewBox="0 0 920 281.7"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g transform="translate(-45.141 -322.39)">
                  <g
                    transform="matrix(.40782 1.0902 2.1895 -.20307 -572.25 1088.6)"
                    strokeWidth="0"
                  >
                    <path
                      d="m-543.8 549.31c21.012 159.22 238.48 193.45 142.86 175.71-102.4-18.993-188.57-81.228-188.57-181.43s86.06-163.05 188.57-181.43c74.041-13.272-166.77 5.932-142.86 187.14z"
                      color="#000000"
                    />
                    <path
                      transform="matrix(.95969 -.28107 .28107 .95969 -196.31 -60.926)"
                      d="m-380 746.65c-5.7405 5.1467-181.6-52.408-183.18-59.952-1.5869-7.5448 136.19-131.06 143.51-128.67 7.3274 2.3981 45.413 183.47 39.672 188.62z"
                      color="#000000"
                    />
                  </g>
                </g>
              </svg>
            </div>
            <div className="diagramBox">
              <div className="diagramChangeItem">
                start
                <input
                  id="start"
                  value={solution.diagram.change.start}
                  className="inputField"
                  readOnly={true}
                />
              </div>
              <Toggle
                defaultChecked={props.solution.diagram.change.sign}
                className="signToggle"
                icons={{
                  checked: <TiPlus size={28} />,
                  unchecked: <FaMinus size={42} />
                }}
              />
              <div className="diagramChangeItem">
                change
                <input
                  id="change"
                  value={solution.diagram.change.change}
                  className="inputField"
                  readOnly={true}
                />
              </div>
              <div className="diagramChangeItem">
                end
                <input
                  id="end"
                  value={solution.diagram.change.end}
                  className="inputField"
                  readOnly={true}
                />
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
