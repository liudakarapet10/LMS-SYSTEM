import type { RegisterForm, LoginForm } from "./types.server";
import { prisma } from "./prisma.server";
import { redirect, json, createCookieSessionStorage } from "@remix-run/node";
import { createUser } from "./user.server";
import bcrypt from "bcryptjs";
import { Role } from "@prisma/client";

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

const storage = createCookieSessionStorage({
  cookie: {
    name: "lms-session",
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

export async function createUserSession(
  userId: string,
  redirectTo: string,
  role: string
) {
  const session = await storage.getSession();
  session.set("userId", userId);
  session.set("userRole", role);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}

export async function register(
  user: RegisterForm,
  role: Role,
  classId: string | null
) {
  const teacherExists = await prisma.teacher.count({
    where: { email: user.email },
  });

  const studentExists = await prisma.student.count({
    where: { email: user.email },
  });

  if (teacherExists || studentExists) {
    return json(
      { error: `User already exists with that email` },
      { status: 400 }
    );
  }

  const newUser = await createUser(user, role, classId);
  if (!newUser) {
    return json(
      {
        error: `Something went wrong trying to create a new user.`,
        fields: { email: user.email, password: user.password },
      },
      { status: 400 }
    );
  }

  return createUserSession(newUser.id, "/", role);
}

export async function login({ email, password }: LoginForm, role: Role) {
  let user;
  if (role === "student") {
    user = await prisma.student.findUnique({
      where: { email },
    });
  } else {
    user = await prisma.teacher.findUnique({
      where: { email },
    });
  }

  if (!user || !(await bcrypt.compare(password, user.password)))
    return json({ error: `Incorrect login` }, { status: 400 });

  return createUserSession(user.id, "/", role);
}

export async function requireUserIdAndRole(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  const userRole = session.get("userRole");

  if (
    !userId ||
    typeof userId !== "string" ||
    !userRole ||
    typeof userRole !== "string"
  ) {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }
  return { userId, userRole };
}

function getUserSession(request: Request) {
  return storage.getSession(request.headers.get("Cookie"));
}

export async function getUserId(request: Request) {
  const session = await getUserSession(request);
  const userId = session.get("userId");

  if (!userId || typeof userId !== "string") return null;
  return userId;
}

export async function getUserIdAndRole(request: Request) {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  const userRole = session.get("userRole");
  if (
    !userId ||
    typeof userId !== "string" ||
    !userRole ||
    typeof userRole !== "string"
  )
    return null;
  return { userId, userRole };
}

export async function getUser(request: Request) {
  const userId = await getUserId(request);
  if (typeof userId !== "string") {
    return null;
  }

  try {
    const user = await prisma.teacher.findUnique({
      where: { id: userId },
      select: { id: true, email: true, profile: true },
    });
    return user;
  } catch {
    throw logout(request);
  }
}

export async function logout(request: Request) {
  const session = await getUserSession(request);
  return redirect("/login", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
}
