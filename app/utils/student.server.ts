import { db } from "./db.server";
import type { Student as IStudent , Prisma } from "@prisma/client";


export const createStudent = async ({
    classroomId,
    firstName,
    lastName,
    email,
    password,
  }: Pick<
  IStudent,
    | "classroomId"
    | "firstName"
    | "lastName"
    | "email"
    | "password"
  >) => {
    await db.student.create({
      data: {
        firstName,
        lastName,
        email,
        password,
        classroom: {
          connect: {
            id: classroomId,
          },
        },
      },
    });
  };