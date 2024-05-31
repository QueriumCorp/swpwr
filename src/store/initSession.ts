import type { Problem, State, Student, SetFn } from "./_types";

const initSession = async (set: SetFn, problem: Problem, student: Student) => {
  set((state: State) => ({
    problem: problem,
    student: student,
  }));

  const theProblem: = {
    appKey: problem.appKey,
    studentId: student.studentId,
    id: problem.id,
    title: problem.title,
    definition: problem.question,
    stimulus: problem.stimulus,
    topic: problem.class,
    hints: [],
  };

  const response = await fetch("http://localhost:3002/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    // body: JSON.stringify(theProblem),
  });
  const data = await response.json();
  console.info(response.status, data);
};

export default initSession;
