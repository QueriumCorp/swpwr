import type { Log } from "../solution";

export const heartbeatAction = async () => {
  let response;
  const logEntry: Log = {
    timestamp: Date.now(),
    action: "heartbeat",
    response: "",
  };

  try {
    response = await fetch("https://qq-stepwise-api.querium.com/");
  } catch (error) {
    logEntry.response = error as string;
  }

  if (response?.ok) {
    logEntry.response = response?.statusText;
  } else {
    logEntry.response = `HTTP Response Code: ${response?.status}`;
  }

  return {
    logEntry,
  };
};
