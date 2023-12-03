// app/utils/user.server.ts
import bcrypt from "bcryptjs";
import type { RegisterForm } from "./types.server";
import { prisma } from "./prisma.server";
import { Role } from "@prisma/client";

export const createUser = async (
  user: RegisterForm,
  role: Role,
  classId: string | null
) => {
  console.log(user, role, classId);
  const passwordHash = await bcrypt.hash(user.password, 10);
  if (role === "student") {
    const newUser = await prisma.student.create({
      data: {
        email: user.email,
        password: passwordHash,
        profile: {
          firstName: user.firstName,
          lastName: user.lastName,
        },
        classroom: {
          connect: {
            id: classId,
          },
        },
      },
    });
    return { id: newUser.id, email: user.email };
  }
  if (role === "teacher") {
    const newUser = await prisma.teacher.create({
      data: {
        email: user.email,
        password: passwordHash,
        profile: {
          firstName: user.firstName,
          lastName: user.lastName,
        },
      },
    });
    return { id: newUser.id, email: user.email };
  }
};

// todo - refactor all logic with 2 user types !!
export const getUserByIdAndRole = async (userId: string, role: Role) => {
  if (role === "student") {
    return prisma.student.findUnique({
      where: {
        id: userId,
      },
    });
  }
  if (role === "teacher") {
    return prisma.teacher.findUnique({
      where: {
        id: userId,
      },
    });
  }
};
