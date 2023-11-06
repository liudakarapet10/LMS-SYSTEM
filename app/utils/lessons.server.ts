import { prisma as db } from "./prisma.server";

// for certain teacher
export const getLessonsByPeriodAndClass = async (
  classroom: string,
  { firstDay, lastDay }: { firstDay: string; lastDay: string }
) => {
  return await db.lesson.findMany({
    where: {
      classroom,
      startTime: {
        gte: firstDay,
        lte: lastDay,
      },
      // if teacheer is owner
    },
    include: {
      marks: {
        include: {
          student: true,
        },
      },
    },
  });
};
// for all lessons by period

// export const getAllLessonsByPeriodAndClass = async (
//   classroom: string,
//   { firstDay, lastDay }: { firstDay: string; lastDay: string }
// ) => {
//   return await db.lesson.findMany({
//     where: {
//       classroom,
//       startTime: {
//         gte: firstDay,
//         lte: lastDay,
//       },
//     },
//   });
// };

// CALENDAR SERVICE ROUTES
export const getAllLessonsByPeriodAndClass = async (
  classroom: string,
  start: string,
  end: string
) => {
  return await db.lesson.findMany({
    where: {
      classroom,
      startTime: {
        gte: start,
        lte: end,
      },
    },
    select: {
      id: true,
      startTime: true,
      endTime: true,
      classroom: true,
      title: true,
      location: true,
      teacher: {
        select: {
          id: true,
          profile: true,
        },
      },
    },
  });
};
