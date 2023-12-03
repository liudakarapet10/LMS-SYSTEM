import { db } from "./db.server";

export const tCreateMark1 = async (
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

  export const tUpdateMark = async (
    id: string,  // як отримати цей id
    mark_value: number
  ) => {
    return await db.mark.update({
      where: {
        id,
      },
      data: {
        value: mark_value
      },
    });
  };


  export const deleteMarkById = async (id: string) => {
    return await db.mark.delete({ where: { id } });
  };
