"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { StepWise } from "@queriumcorp/swreact";
import { type YBRpage } from "../qq/YellowBrickRoad";
import { NavContext, NavContextType } from "@/NavContext";

const CadetSolveTheEquation: React.FC<{
  className?: string;
  children?: React.ReactNode;
  page: YBRpage;
  index: number;
}> = ({ className, children, page, index }) => {
  // Dont render if page not active
  const { current } = React.useContext(NavContext) as NavContextType;
  if (current !== index + 1) return null;

  // JSX
  return (
    <div
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        className,
      )}
    >
      <h1>CadetSolveTheEquation</h1>
      <StepWise
        // h-full and w-full will cause the component to fill its parent
        set
        className="h-full w-full"
        problem={{
          appKey: "StepWiseAPI",
          problemId: "QUES18374",
          title: "An amazing question title",
          stimulus:
            "Four score and seven years ago our fathers brought forth, upon this continent, a new nation, conceived in liberty, and dedicated to the proposition that all men are created equal.",
          latex: "x = \\frac {-b \\pm \\sqrt{b^2 -4ac}} {2a}",
          topic: "gradeBasicAlgebra",
          definition: "SolveFor[5*z/9=-25, z]",
          hints: [],
        }}
        student={{
          studentId: "8675309",
          fullName: "Joe Sixpack",
          familiarName: "Joe",
        }}
      />
      {children}
    </div>
  );
};
CadetSolveTheEquation.displayName = "CadetSolveTheEquation";
export default CadetSolveTheEquation;
