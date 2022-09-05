import React from "react";

import { Chip } from "@react-md/chip";
import { AddCircleSVGIcon } from "@react-md/material-icons";

import "./chipster.css";

function XCircleIcon(props) {
  return (
    <AddCircleSVGIcon
      {...props}
      style={{
        transform: "rotate(45deg)",
        WebkitTransform: "rotate(45deg)",
      }}
    />
  );
}

function Chipster(props) {
  const chips = props.chips;
  const onChange = props.onChange;

  function deleteChip(chip) {
    console.info("deleteChip:", chip);
    if (chip.length) {
      onChange({
        type: "deleteTag",
        payload: chip,
      });
    }
  }

  if (chips.length) {
    return (
      <div className="chipster">
        {chips.map((chip, i) => {
          return (
            <Chip
              className="chip"
              key={i}
              onClick={() => deleteChip(chip)}
              rightIcon={<XCircleIcon />}
            >
              {chip}
            </Chip>
          );
        })}
      </div>
    );
  } else {
    return <div className="noChips">select text to create tags</div>;
  }
}

export default Chipster;
