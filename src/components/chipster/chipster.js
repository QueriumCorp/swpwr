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

  return (
    <div className="chipster">
      {chips.map((chip, i) => {
        return (
          <Chip
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
}

export default Chipster;
