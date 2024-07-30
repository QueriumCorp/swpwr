import type { SetFn, GetFn } from "./_types";

const submitOrganize = async (_set: SetFn, get: GetFn, equation: string) => {
  const problem = get().problem;
  const session = get().session;

  const body = {
    appKey: problem.appKey,
    sessionToken: session.sessionToken,
    equation: equation,
  };

  const response = await fetch(get().swapiUrl + "/submitOrganize/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();

  get().logAction(`submitOrganize: ${response.status} ${JSON.stringify(data)}`);
  return data;
};

export default submitOrganize;
