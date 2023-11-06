import { prisma as db } from "./prisma.server";
export const tCreateClass = async (class_name: string) => {
  return await db.classroom.create({
    data: {
      name: class_name,
    },
  });
};

export const tCreateStudent = async (
  student_name: string,
  student_surname: string,
  classroom_id: string
) => {
  return await db.student.create({
    data: {
      profile: {
        firstName: student_name,
        lastName: student_surname,
      },
      classroom: {
        connect: {
          id: classroom_id,
        },
      },
    },
  });
};

export const tCreateLesson = async (
  lesson_name: string,
  Lesson_room: string,
  teacher_id: string,
  lesson_start: string,
  lesson_end: string
) => {
  return await db.lesson.create({
    data: {
      name: lesson_name,
      classroom: Lesson_room,
      startTime: lesson_start,
      endTime: lesson_end,
      teacher: {
        connect: {
          id: teacher_id,
        },
      },
    },
  });
};

export const getClassesWithNestedStudents = async () => {
  return await db.classroom.findMany({
    include: {
      students: true,
    },
  });
};
export const getStudentsWithNestedClasses = async () => {
  return await db.student.findMany({
    include: {
      classroom: true,
    },
  });
};

export const getTeacherWithNestedLessons = async () => {
  return await db.teacher.findMany({
    include: {
      lessons: true,
    },
  });
};
export const getLessonsWithNestedTeachers = async () => {
  return await db.lesson.findMany({
    include: {
      teacher: true,
    },
  });
};

export const tCreateMark = async (
  mark_value: number,
  m_teacher_id: string,
  m_student_id: string,
  m_lesson_id: string
) => {
  return await db.mark.create({
    data: {
      value: mark_value,
      teacher: {
        connect: {
          id: m_teacher_id,
        },
      },
      student: {
        connect: {
          id: m_student_id,
        },
      },
      lesson: {
        connect: {
          id: m_lesson_id,
        },
      },
    },
  });
};

export const getAllLessonsWithNestedMarksAndNestedStudents = async () => {
  return await db.lesson.findMany({
    include: {
      marks: {
        include: {
          student: true,
        },
      },
    },
  });
};
