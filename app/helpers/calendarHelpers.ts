import type {
  Prisma,
  Teacher as ITeacher,
  Lesson as ILesson,
} from "@prisma/client";
// export type ILessonWithTeacher = Prisma.LessonGetPayload<{
//   include: { teacher: true };
// }>;
export type IPopulatedLesson = {
  id: ILesson["id"];
  title: ILesson["title"];
  location: ILesson["location"];
  startTime: ILesson["startTime"];
  endTime: ILesson["endTime"];
  teacher: Pick<ITeacher, "id" | "profile">;
};

export const convertToCalendarFormat = (
  data: IPopulatedLesson[],
  userId: string
) => {
  if (!data.length) return [];
  const convertedArray = data.map((el) => {
    let additionalStyles =
      userId === el.teacher.id ? { backgroundColor: "#476930" } : {};

    const updatedElement = {
      ...additionalStyles,
      id: el.id,
      title: `${el.title} ${el.location ? el.location : ""}, ${
        el.teacher.profile.firstName
      } ${el.teacher.profile.lastName}`,
      start: el.startTime,
      end: el.endTime,
    };
    return updatedElement;
  });
  return convertedArray;
};
