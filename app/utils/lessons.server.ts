import { prisma as db } from "./prisma.server";

export const getLessonsByPeriodAndClass = async (classroom: string, {firstDay, lastDay}: {firstDay: string, lastDay: string}) => {
    return await db.lesson.findMany({
    where: {
        classroom,
        startTime: {
            gte: firstDay,
            lte: lastDay,
        }
        // if teacheer is owner
    },
    include: {
        marks: true
    }
  });
};
