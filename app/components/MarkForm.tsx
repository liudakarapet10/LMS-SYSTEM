import { Form } from "@remix-run/react";
import { Button } from "./Button";


interface IMarkFormProps {
    teacherId?: string;
    studentId?: string;
    lessonId?: string;
}

export const MarkForm = ({teacherId ,studentId, lessonId } : IMarkFormProps) => {


  return (
    <div>
      <h1>Введіть оцінку </h1>
      <Form method="POST">
        оцінка
        <input type="number" name="mark_value" min="0" max="12" />
        <input type="hidden" name="m_teacher_id" value={teacherId} />
        <input type="hidden" name="m_student_id" value={studentId} />
        <input type="hidden" name="m_lesson_id" value={lessonId} />
        <Button label="Submit"/>
      </Form>
    </div>
  );
};
