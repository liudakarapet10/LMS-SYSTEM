import type { DaysWithLessons, ILessonWithMarks } from "~/types/project.types";
import { convertTimeToDate } from "./timeConvertor";

export const formColumnsByLessons = (lessons: ILessonWithMarks[]) => {
  let columnsWithLessonId: DaysWithLessons = [];
  lessons.forEach((e: ILessonWithMarks) => {
    const column = {
      date: convertTimeToDate(e.startTime),
      lessonId: e.id,
      classroom: e.classroom,
      marks: e.marks,
      teacherId: e.teacherId,
    };
    columnsWithLessonId.push(column);
  });
  return columnsWithLessonId;
};

export const isLessonInThisDate = (
  date: number,
  daysWithLessons: DaysWithLessons
) => {
  return daysWithLessons.find((e) => e.date === date) ? true : false;
};
export const getAttributtes = (
  lessonDate: number,
  daysWithLessons: DaysWithLessons
) => {
  const lesson = daysWithLessons.find((e) => e.date === lessonDate);
  if (!lesson) return;
  return { lessonId: lesson.lessonId, teacherId: lesson.teacherId };
};

export const findMarkOfLessonDateAndStudentId = (
  lessonDate: number,
  studentID: string,
  daysWithLessons: DaysWithLessons
) => {
  const lesson = daysWithLessons.find((e) => e.date === lessonDate);
  if (!lesson) return;
  if (lesson?.marks.length < 0) return;
  const mark = lesson?.marks.find((e) => e.studentId === studentID);
  if (!mark) return;
  return mark.value;
};
