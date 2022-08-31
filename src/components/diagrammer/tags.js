import React from "react";

import { useDrag } from "react-dnd";

import { Chip } from "@react-md/chip";

import "./tags.css";

function Tag(props) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: !isNaN(props.tag) ? "NUM" : "STR",
    value: props.tag,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <Chip
      key={props.idx}
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: "bold",
        cursor: "move",
      }}
    >
      {props.tag}
    </Chip>
  );
}

function Tags(props) {
  const tags = [...props.tags];
  tags.push("unknown");

  return (
    <div className="tags">
      {tags.map((tag, i) => {
        return <Tag key={i} idx={i} tag={tag}></Tag>;
      })}
    </div>
  );
}

export default Tags;
