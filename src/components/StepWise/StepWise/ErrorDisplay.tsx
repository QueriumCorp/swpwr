import React from "react";

export interface ErrorDisplayProps {
  propName: string;
  error: string;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  propName,
  error,
}) => {
  if (!error) return null;

  return (
    <div
      style={{
        position: "relative",
        backgroundColor: "lightGray",
        color: "#0000FF",
      }}
    >
      <h3>{propName}</h3>
      <pre>{error}</pre>
    </div>
  );
};
