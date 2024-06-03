import type { SetFn, GetFn } from "./_types";

const initSession = async (set: SetFn, get: GetFn) => {
  const problem = get().problem;
  const student = get().student;

  const theHints = [];
  if (problem.qs1) {
    theHints.push(problem.qs1);
  }
  if (problem.qs2) {
    theHints.push(problem.qs2);
  }
  if (problem.qs3) {
    theHints.push(problem.qs3);
  }

  const theProblem = {
    appKey: problem.appKey,
    studentId: student.studentId,
    id: problem.id,
    title: problem.title,
    definition: problem.question,
    stimulus: problem.stimulus,
    topic: problem.class,
    hints: theHints,
  };

  const response = await fetch("https://swapi2.onrender.com/start/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(theProblem),
  });
  const data = await response.json();
  set((state) => ({
    session: {
      ...state.session,
      sessionToken: data.sessionToken,
      identifiers: data.identifiers,
      operators: data.operators,
    },
  }));
  get().logAction(`initSession: ${response.status} ${JSON.stringify(data)}`);
};

export default initSession;
