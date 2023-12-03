import { prisma as db } from "./prisma.server";

export const getAllClasses = async () => {
  return await db.classroom.findMany({
    select: {
      id: true,
      name: true,
    },
  });
};
export const getAllClassrooms = async () => {
  return await db.classroom.findMany({
    select: {
      id: true,
      name: true,
      students: {
        select: {
          id: true,
          profile: true,
        },
      },
    },
  });
};

export const getClassWithStudents = async (classroomId: string) => {
  return await db.classroom.findUnique({
    where: {
      id: classroomId,
    },
    include: {
      students: {
        include: {
          marks: true,
        },
      },
    },
  });
};
