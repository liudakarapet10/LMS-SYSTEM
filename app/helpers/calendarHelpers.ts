import type {
  Prisma,
  Teacher as ITeacher,
  Lesson as ILesson,
} from "@prisma/client";
import { LESSON_TYPES } from "~/constants/lessonTypes";
// export type ILessonWithTeacher = Prisma.LessonGetPayload<{
//   include: { teacher: true };
// }>;
export type IPopulatedLesson = {
  id: ILesson["id"];
  type: ILesson["type"];
  topic: ILesson["topic"];
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
    // todo - need refactor
    let additionalStyles =
      userId === el.teacher.id ? {} : { backgroundColor: "#476930" };
    let isEditable = userId === el.teacher.id ? { editable: true } : {};

    const updatedElement = {
      serviceData: {
        ownerTeacherId: el.teacher.id,
      },
      ...isEditable,
      ...additionalStyles,
      id: el.id,
      title: `${el.type}-'${el.topic}'${
        el.location ? ", " + el.location : ""
      }, ${el.teacher.profile.firstName} ${el.teacher.profile.lastName}`,
      start: el.startTime,
      end: el.endTime,
    };
    return updatedElement;
  });
  return convertedArray;
};

// todo - need refactor !!!!!!!!!!!!!!!!!
// todo - another convert Lesson name to Ukrainian language
export const convertToCalendarFormatSingle = (data, userId, profile) => {
  const updatedElement = {
    serviceData: {
      ownerTeacherId: userId,
    },
    editable: true,
    id: data.id,
    title: `${data.type}-'${data.topic}'${
      data.location ? ", " + data.location : ""
    }, ${profile.firstName} ${profile.lastName}`,
    start: data.startTime,
    end: data.endTime,
  };
  return updatedElement;
};
