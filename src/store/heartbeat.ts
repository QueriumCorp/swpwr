import { GetFn, SetFn } from "./_types";

const heartbeat = async (_set: SetFn, get: GetFn) => {
  const response = await fetch(get().swapiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  get().logAction(`heartbeat: ${response.status} ${JSON.stringify(data)}`);
};

export default heartbeat;