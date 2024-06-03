import type { SetFn, GetFn } from "./_types";

const submitPickSchema = async (_set: SetFn, get: GetFn, schema: string) => {
  const problem = get().problem;
  const session = get().session;

  const body = {
    appKey: problem.appKey,
    sessionToken: session.sessionToken,
    schema: schema,
  };

  const response = await fetch(
    "https://swapi2.onrender.com/submitPickSchema/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );
  const data = await response.json();

  get().logAction(
    `submitPickSchema: ${response.status} ${JSON.stringify(data)}`,
  );
  return data;
};

export default submitPickSchema;
