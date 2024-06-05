import type { AvatarAPIType } from "./contexts/AvatarAPI";
import { useAvatarAPI } from "./contexts/AvatarAPI";
import { cn } from "./utils";

export const Chat = ({
  msg,
  className,
}: {
  msg: string;
  className?: string;
}) => {
  // const { msg } = useAvatarAPI() as AvatarAPIType

  if (msg) {
    return (
      <div
        className={cn(
          "rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-none bg-amber-400 text-cyan-700 relative block  w-[fit-content] px-4 py-[.5rem] max-w-[90%] min-h-[2.75rem] min-w-[2.75rem]",
          "before:start-[99.9%]",
          "before:[mask-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMycgaGVpZ2h0PSczJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxwYXRoIGZpbGw9J2JsYWNrJyBkPSdtIDAgMyBMIDEgMyBMIDMgMyBDIDIgMyAwIDEgMCAwJy8+PC9zdmc+)]",
          "before:absolute before:bottom-[0] before:h-[.75rem] before:w-[.75rem] before:[background-color:inherit] before:content-[''] before:[mask-size:contain] before:[mask-repeat:no-repeat] before:[mask-position:center]",
          className,
        )}
      >
        {msg}
      </div>
    );
  }
  return null;
};
