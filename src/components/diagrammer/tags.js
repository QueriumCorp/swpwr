import React from "react";

import { Chip } from "@react-md/chip";
import { AddCircleSVGIcon } from "@react-md/material-icons";

import "./tags.css";

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

function Tags(props) {
  const tags = [...props.tags];
  tags.push("unknown");
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
    <div className="tags">
      {tags.map((chip, i) => {
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

export default Tags;
