import { db } from "./db.server";

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