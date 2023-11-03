import type {
  ActionFunction,
  LoaderFunction,
} from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { getUserId} from "~/utils/auth.server";
import {
  createLessonByTeacher,
  getAllLessonsByTeacherId,
} from "~/utils/teacher.server";

export const loader: LoaderFunction = async ({ request }) => {
  const teacherId = await getUserId(request);
  if (!teacherId) return null;

  const allLessonsById = await getAllLessonsByTeacherId(teacherId);
  return allLessonsById;
};
export const action: ActionFunction = async ({ request }) => {
  const teacherId = await getUserId(request);
  if (!teacherId) return null;

  const form = await request.formData();

  const name = form.get("name");
  const time = form.get("time");
  const location = form.get("location");
  if (
    typeof name !== "string" ||
    typeof time !== "string" ||
    typeof location !== "string" ||
    typeof teacherId !== "string"
  ) {
    return null;
  }

  return await createLessonByTeacher(teacherId, name, time, location);
};

export default function Lessons() {
  const data = useLoaderData();

  return (
    <div>
      diary
      {data.length > 0 && (
        <ul>
          {data.map((e) => (
            <li key={e.id}>
              {e.name} - {e.time} - {e.location}
            </li>
          ))}
        </ul>
      )}
      <Form method="post">
        <label>
          Name(MATH)
          <input type="text" name="name" className="border" />
        </label>

        <label>
          Time
          <input type="text" name="time" className="border" />
        </label>

        <label>
          Class
          <input type="text" name="classroom" className="border" />
        </label>
        <button>Submit</button>
      </Form>
    </div>
  );
}
