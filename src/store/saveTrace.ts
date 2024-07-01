import { GetFn, SetFn } from "./_types";

const saveTrace = async (_set: SetFn, get: GetFn, comment: string) => {
  const problem = get().problem;
  const session = get().session;

  const body = {
    appKey: problem.appKey,
    sessionToken: session.sessionToken,
    comment: comment,
  };
  const response = await fetch(get().swapiUrl + "/saveTrace/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  get().logAction(`saveTrace: ${response.status} ${JSON.stringify(data)}`);
  return `saveTrace: ${response.status} ${JSON.stringify(data)}`;
};

export default saveTrace;
