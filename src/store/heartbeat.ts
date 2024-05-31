import { GetFn, SetFn } from "./_types";

const heartbeat = async (set: SetFn, get: GetFn) => {
  const response = await fetch("http://localhost:3002/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.info(response.status, data);
  get().logAction(`heartbeat: ${response.status} ${data}`);
};

export default heartbeat;
