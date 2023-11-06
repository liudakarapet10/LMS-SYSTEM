import { Form } from "@remix-run/react";

interface IMarkForm {
  dataId: {
    teacherId: string | null;
    studentId: string | null;
    lessonId: string | null;
  };
}

export const MarkForm = ({ dataId }: IMarkForm) => {
  const teacherId = dataId.teacherId || "";
  const studentId = dataId.studentId || "";
  const lessonId = dataId.lessonId || "";

  return (
    <div>
      <h1>Введіть оцінку </h1>
      <Form method="POST">
        оцінка
        <input type="hidden" name="intent" value="createMark" />
        <input type="number" name="mark_value" min="0" max="12" />
        {/* inputs values are empty */}
        <input type="hidden" name="m_teacher_id" value={teacherId} />     
        <input type="hidden" name="m_teacher_id" value={studentId} />
        <input type="hidden" name="m_lesson_id" value={lessonId} />
        <button>submit</button>
      </Form>
    </div>
  );
};
