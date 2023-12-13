import { type ActionFunction, type LoaderFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import {
  getAllLessonsWithNestedMarksAndNestedStudents,
  getClassesWithNestedStudents,
  getLessonsWithNestedTeachers,
  getStudentsWithNestedClasses,
  getTeacherWithNestedLessons,
  tCreateClass,
  tCreateLesson,
  tCreateMark,
  tCreateStudent,
} from "~/utils/testing.server";
import { useEffect } from "react";

export const loader: LoaderFunction = async ({ request }) => {
  // const first = await getClassesWithNestedStudents();
  // const second = await getStudentsWithNestedClasses();
  const first = await getAllLessonsWithNestedMarksAndNestedStudents();
  // const second = await getLessonsWithNestedTeachers();
  return { first };
  // return null;
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const intent = form.get("intent");

  if (intent === "createClass") {
    const class_name = form.get("class_name");
    if (!class_name || typeof class_name !== "string") return null;
    await tCreateClass(class_name);
  } else if (intent === "createStudent") {
    const student_name = form.get("student_name");
    const student_surname = form.get("student_surname");
    const classroom_id = form.get("classroom_id");
    if (!student_name || !student_surname || !classroom_id) return null;
    if (
      typeof student_name !== "string" ||
      typeof student_surname !== "string" ||
      typeof classroom_id !== "string"
    )
      return null;
    await tCreateStudent(student_name, student_surname, classroom_id);
  } else if (intent === "createLesson") {
    const lesson_name = form.get("lesson_name");
    const classroomId = form.get("Lesson_room");
    const teacher_id = form.get("teacher_id");
    const lesson_start1 = form.get("lesson_start");
    const lesson_end1 = form.get("lesson_end");

    // new Date(localTime).toISOString();
    const lesson_start = new Date(lesson_start1).toISOString();
    const lesson_end = new Date(lesson_end1).toISOString();

    await tCreateLesson(
      lesson_name,
      classroomId,
      teacher_id,
      lesson_start,
      lesson_end
    );
    // await
  } else if (intent === "createMark") {
    const mark_valueS = form.get("mark_value");
    const mark_value = Number(mark_valueS);
    const m_teacher_id = form.get("m_teacher_id");
    const m_student_id = form.get("m_student_id");
    const m_lesson_id = form.get("m_lesson_id");

    await tCreateMark(mark_value, m_teacher_id, m_student_id, m_lesson_id);
  }

  return null;
};

export default function Testing() {
  useEffect(() => {
    document.title = 'Тестова сторінка';
  });

  const data = useLoaderData();
  console.log(data);
  return (
    <div>
      <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
        Тестова сторінка
      </h1>

      <div className="border p-2 my-2 bg-white">
        Test Create Lesson
        <Form method="post">
          <input type="hidden" name="intent" value="createClass" />
          Classname
          <input type="text" name="class_name" className="border" />
          <button type="submit" className="button">submit</button>
        </Form>
      </div>
      <div className="border p-2 my-2 bg-white">
        Create Student and Connect to Class
        <Form method="post">
          <input type="hidden" name="intent" value="createStudent" />
          name
          <input type="text" name="student_name" className="border" />
          surname
          <input type="text" name="student_surname" className="border" />
          classroomId
          <input type="text" name="classroom_id" className="border" />
          <button type="submit" className="button">submit</button>
        </Form>
      </div>

      <div className="border p-2 my-2 bg-white">
        Create Lesson and Connect to teacher
        <Form method="post">
          <input type="hidden" name="intent" value="createLesson" />
          name
          <input type="text" name="lesson_name" className="border" />
          classRoom
          <input type="text" name="Lesson_room" className="border" />
          teacherId
          <input type="text" name="teacher_id" className="border" />
          start
          <input type="datetime-local" name="lesson_start" className="border" />
          end
          <input type="datetime-local" name="lesson_end" className="border" />
          <button type="submit" className="button">submit</button>
        </Form>
      </div>
      {/* do we need to connect lesson to class ???? */}

      <div className="border p-2 my-2 bg-white">
        Create Mark and Connect to Teacher, Student and Lesson
        <Form method="post">
          <input type="hidden" name="intent" value="createMark" />
          value
          <input type="number" name="mark_value" className="border" />
          classRoom
          <input type="text" name="Lesson_room" className="border" />
          teacherId
          <input type="text" name="m_teacher_id" className="border" />
          studentId
          <input type="text" name="m_student_id" className="border" />
          LessonId
          <input type="text" name="m_lesson_id" className="border" />
          <button type="submit" className="button">submit</button>
        </Form>
      </div>
    </div>
  );
}
