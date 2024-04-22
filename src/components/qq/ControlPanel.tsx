import { useAvatarAPI } from "@queriumcorp/animetutor";

export const ControlPanel = () => {
  const { emotes, sayMsg } = useAvatarAPI();

  if (!emotes) return null;

  return (
    <div>
      <h2>Control Panel</h2>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {emotes.map((emote) => {
          return emote.variants.map((variant) => (
            <div
              key={`${emote.name}:${variant}`}
              style={{
                width: 144,
                height: 32,
                margin: 2,
                background: "Blue",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => sayMsg(`${emote.name}:${variant}`, emote.name)}
            >
              {emote.name}:{variant}
            </div>
          ));
        })}
      </div>
    </div>
  );
};