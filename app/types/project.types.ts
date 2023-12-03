import type { Prisma } from "@prisma/client";
export type IClassroomWithStudents = Prisma.ClassroomGetPayload<{
  include: { students: true };
}>;

export type ILessonWithMarks = Prisma.LessonGetPayload<{
  include: { marks: true };
}>;


export type LessonInColumn = {
  classroom: string;
  date: number;
  lessonId: ILessonWithMarks["id"];
  marks: ILessonWithMarks["marks"];
  teacherId: string;
};
export type DaysWithLessons = LessonInColumn[];


export type Lessons = {
  id: string;
  type: string;
  topic: string;
  description: string;
  startTime: string;
  endTime: string;
  classroomId: string;
  location: string;
  teacherId: string;
};
