import { LessonType as ILessonType } from "@prisma/client";

export const LESSON_TYPES = [
  { label: "Українська", value: ILessonType["UKRAINIAIN"] },
  { label: "Математика", value: ILessonType["MATH"] },
  { label: "Англійська", value: ILessonType["ENGLISH"] },
  { label: "Інше", value: ILessonType["OTHER"] },
];
