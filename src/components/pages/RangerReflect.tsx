"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { type YBRpage } from "../qq/YellowBrickRoad";
import { NavContext, NavContextType } from "@/NavContext";

const RangerReflect: React.FC<{
  className?: string;
  children?: React.ReactNode;
  page?: YBRpage;
  index: number;
}> = ({ className, children, index }) => {
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
      <h1>RangerReflect</h1>
      {children}
    </div>
  );
};
RangerReflect.displayName = "RangerReflect";
export default RangerReflect;

/*

Type: estimation
"Right on! I also think that's the best reason."
"Oooh, yay! I totally agree with you, cutie pie! Your reason is as clever as my tail is fluffy! It's definitely the most paw-some explanation we've seen so far!"
"Aww, absolutely sweetie! I think your reasoning is just as sharp as my little fox teeth! You're absolutely right on track - that's the best reason yet!"

Type: schema
"Ok! That's not the reason I like best, but it's a good one."
"Hmm, okay! While it's not my top pick, I do think that's a pretty cool reason! You're getting close to finding the perfect answer!"
"Alrighty then! That's a great try, but there is an even better reason."

TYPE: bad
No, that reason doesn't use good math thinking to tell why the answer makes sense. Try again.
Oh my whiskers! I think we can do better than that! Let's try again and use our super sharp fox brains to figure out why the answer makes sense, okay?
Hmmm, sweetie, I think we need to dig deeper into the mathy goodness to make sure it really adds up! Can you try again and use your super clever fox mind to find a reason that's as smooth as my fur? Let's get those numbers working together like a pack of happy foxes!
*/
