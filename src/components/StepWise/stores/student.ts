import z from "zod";
import { fromZodError } from "zod-validation-error";

// ============================================================================
// STUDENT STORE
// ============================================================================

export type StudentStatus = {
  studentValid: boolean;
  studentStatusMsg: string;
};
export const DEFAULT_STUDENT_STATUS: StudentStatus = {
  studentValid: false,
  studentStatusMsg: "No student loaded",
};
export type Student = {
  studentId: string;
  fullName?: string;
  familiarName?: string;
};
export const DEFAULT_STUDENT: Student = {
  studentId: "",
  fullName: "",
  familiarName: "",
};
export const StudentSchema = z.object({
  studentId: z.string().min(5),
  fullName: z.string().optional(),
  familiarName: z.string().min(1).optional(),
}) satisfies z.ZodType<Student>;

// VALIDATE & STORE STUDENT
export const validateStudent = (student: Student): StudentStatus => {
  const studentValidation = StudentSchema.safeParse(student);
  if (studentValidation.success) {
    return { studentValid: true, studentStatusMsg: "Valid Student" };
  } else {
    return {
      studentValid: false,
      studentStatusMsg: JSON.stringify(
        fromZodError(studentValidation.error),
        null,
        2
      ),
    };
  }
};
