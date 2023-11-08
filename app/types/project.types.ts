import type { Prisma } from "@prisma/client";
export type IClassroomWithStudents = Prisma.ClassroomGetPayload<{
    include: { students: true };
  }>;

  export type ILessonWithMarks = Prisma.LessonGetPayload<{
    include: { marks: true };
  }>;

  export type LessonInColumn = {
      date: number,
      lessonId: ILessonWithMarks['id'],
      marks: ILessonWithMarks['marks'],
      teacherId: string
  }
  export type DaysWithLessons = LessonInColumn[]