import * as React from "react";

import { cn } from "@/lib/utils";
import { useAvatarAPI } from "@queriumcorp/animetutor";

const NavBar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { emotes, setEmote } = useAvatarAPI();
  function TutorEmote() {
    const randomEmoteIndex = Math.floor(Math.random() * emotes.length);

    const targetEmote = emotes[randomEmoteIndex];

    const randomVariantIndex = Math.floor(
      Math.random() * targetEmote.variants.length,
    );
    console.log(targetEmote);
    const newEmote = `${targetEmote.name}:${targetEmote.variants[randomVariantIndex]}`;
    setEmote(newEmote);
  }
  return (
    <div
      ref={ref}
      className={cn("NavBar min-h-24 w-full border-none relative", className)}
      {...props}
    />
  );
});
NavBar.displayName = "NavBar";

export { NavBar };
