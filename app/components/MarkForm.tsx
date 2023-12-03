import { Form } from "@remix-run/react";
import { Button } from "./Button";
import { useId } from "react";

interface IMarkFormProps {
  markId?: string;
  teacherId?: string;
  studentId?: string;
  lessonId?: string;
}

export const MarkForm = ({
  markId,
  teacherId,
  studentId,
  lessonId,
}: IMarkFormProps) => {
  const id = useId();
  return (
    <div>
      {!markId && (
              <div>
              <Form method="POST">
                <input type="hidden" name="intent" value="createMark" />
                <label htmlFor={id}>Напишіть оцінку від одного до 12</label>
                <input
                  type="number"
                  aria-label="Напишіть цифру від одного до 12 включно"
                  aria-required="true"
                  name="mark_value"
                  min="1"
                  max="12"
                  id={id}
                />
                <input type="hidden" name="m_teacher_id" value={teacherId} />
                <input type="hidden" name="m_student_id" value={studentId} />
                <input type="hidden" name="m_lesson_id" value={lessonId} />
                <input type="hidden" name="m_mark_id" value={markId} />
                <Button label="Submit" type="submit" ariaLabel="Додати оцінку" />
              </Form>
            </div>
      )}


      {markId !== "" && (
        <div>
          <Form method="post">
            <input type="hidden" name="intent" value="updateMark" />
            <label htmlFor={id}>Оновіть оцінку</label>
            <input
              type="number"
              aria-label="Напишіть цифру від одного до 12 включно"
              aria-required="true"
              name="mark_value"
              min="1"
              max="12"
              id={id}
            />
            <input type="hidden" name="m_mark_id" value={markId} />
            <Button label="Update" type="submit" ariaLabel="Оновити оцінку" />
          </Form>
        </div>
      )}

      {markId !== "" && ( 
        <div>
          <Form method="post">
            <input type="hidden" name="intent" value="deleteMark" />
            <input type="hidden" name="m_mark_id" value={markId} />
            <Button label="Delete" type="submit" ariaLabel="Видалити оцінку" />
          </Form>
        </div>
      )}
    </div>
  );
};
