import { prisma as db } from "./prisma.server";

export const getAllClassrooms = async () => {
  return await db.classroom.findMany({
    select: {
        id: true,
        name: true
    }
  });
};

export const getClassWithStudents = async (className: string) => {
  return await db.classroom.findUnique({
    where: {
      name: className
    },
    include: {
      students: true
    }
  })
}