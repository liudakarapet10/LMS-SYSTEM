import { prisma as db } from "./prisma.server";
import type { Lesson as ILesson } from "@prisma/client";
// for certain teacher
export const getLessonsByPeriodAndClass = async (
  classroomId: string,
  { firstDay, lastDay }: { firstDay: string; lastDay: string },
  type: string
) => {
  return await db.lesson.findMany({
    where: {
      classroomId,
      startTime: {
        gte: firstDay,
        lte: lastDay,
      },
      type,
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

export const createLesson = async ({
  type,
  topic,
  description,
  startTime,
  endTime,
  teacherId,
  classroomId,
}: Omit<ILesson, "id">) => {
  return await db.lesson.create({
    data: {
      type,
      topic,
      description,
      startTime,
      endTime,
      teacher: {
        connect: {
          id: teacherId,
        },
      },
      classroom: {
        connect: {
          id: classroomId,
        },
      },
    },
  });
};

// CALENDAR SERVICE ROUTES
export const getAllLessonsByPeriodAndClass = async (
  classId: string,
  start: string,
  end: string
) => {
  return await db.lesson.findMany({
    where: {
      startTime: {
        gte: start,
        lte: end,
      },
      classroomId: classId,
    },
    select: {
      id: true,
      startTime: true,
      endTime: true,
      classroom: true,
      type: true,
      topic: true,
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

export const simpleUpdateLessonByCP = async (
  lessonId: string,
  newStart: string,
  newEnd: string
) => {
  return await db.lesson.update({
    data: {
      startTime: newStart,
      endTime: newEnd,
    },
    where: {
      id: lessonId,
    },
  });
};

export const deleteLessonById = async (lessonId: string) => {
  await db.lesson.delete({
    where: {
      id: lessonId,
    },
  });
  return;
};

export const getLessonsByPeriodAndClassAndTeacherId = async (
  classroomId: string,
  { firstDay, lastDay }: { firstDay: string; lastDay: string },
  teacherId: string
) => {
  return await db.lesson.findMany({
    where: {
      classroomId,
      startTime: {
        gte: firstDay,
        lte: lastDay,
      },
      teacherId,
    },
  });
};


export const getLessonsByParameters = async (
  classroomId: string,
  { firstDay, lastDay }: { firstDay: string; lastDay: string },
  teacherId: string,
  type: string 
) => {
  return await db.lesson.findMany({
    where: {
      classroomId,
      startTime: {
        gte: firstDay,
        lte: lastDay,
      },
      teacherId,
      type,
    },
  });
};
