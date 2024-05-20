"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { YBRpage, YellowBrickRoad } from "../qq/YellowBrickRoad";
import { NavContext, NavContextType } from "@/NavContext";
import { AnimeTutor } from "@queriumcorp/animetutor";
import { NavBar } from "../qq/NavBar";
import { CarouselPrevious, CarouselNext } from "../ui/carousel";

const CadetFillEquation: React.FC<{
  className?: string;
  children?: React.ReactNode;
  page: YBRpage;
  index: number;
}> = ({ className, children, page, index }) => {
  // Dont render if page not active
  const { current } = React.useContext(NavContext) as NavContextType;
  if (current !== index + 1) return null;
  return (
    <div
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        className,
      )}
    >
      <h1>CadetFillEquation</h1>
      <h1>KILL ME UNLESS APRIL OBJECTS.</h1>
      <h2>Dupe of CadetFillDiagram</h2>
      {children}{" "}
      <NavBar className="flex justify-end pr-2 space-x-3 bg-slate-300">
        {/* Tiny Avatar */}
        {YellowBrickRoad[current].phase !== "I" ? (
          <AnimeTutor
            style={{
              bottom: "0px",
              right: "0px",
              height: "100%",
            }}
          />
        ) : null}
        <CarouselPrevious className="relative left-0">
          Previous
        </CarouselPrevious>
        <CarouselNext className="relative right-0">Next</CarouselNext>
      </NavBar>
    </div>
  );
};
CadetFillEquation.displayName = "CadetFillEquation";
export default CadetFillEquation;
