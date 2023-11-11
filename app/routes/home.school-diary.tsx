import { SchoolDiaryToolbar } from "~/components/schoolDiaryToolbar";
import {
  json,
  type ActionFunction,
  type LoaderFunction,
} from "@remix-run/node";
import { useLoaderData, useRouteLoaderData } from "@remix-run/react";
import { getClassWithStudents } from "~/utils/classroom.server";
import { getUserId } from "~/utils/auth.server";
import { getLessonsByPeriodAndClass } from "~/utils/lessons.server";
import {
  getDaysInMonth,
  getFullMonthStartEndDays,
} from "~/helpers/timeConvertor";
import DymanicTable from "~/components/DynamicTable";

import type {
  IClassroomWithStudents,
  ILessonWithMarks,
} from "~/types/project.types";
import { tCreateMark } from "~/utils/marks.server";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (!userId) {
    return null;
    // status 401
  }
  const url = new URL(request.url);
  const classroom = url.searchParams.get("class");
  const period = url.searchParams.get("period");

  if (classroom && period) {
    const { firstDay, lastDay } = getFullMonthStartEndDays(period);
    const lessons = await getLessonsByPeriodAndClass(classroom, {
      firstDay,
      lastDay,
    });
    const classWithStudents = await getClassWithStudents("5-B");

    return json({ period, lessons, classWithStudents });
  }

  return null;
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();

  const mark_valueS = form.get("mark_value");
  const mark_value = Number(mark_valueS);
  const mark_teacher_id = form.get("m_teacher_id");
  const mark_student_id = form.get("m_student_id");
  const mark_lesson_id = form.get("m_lesson_id");
  console.log("before", mark_value, typeof mark_teacher_id, typeof mark_student_id,typeof mark_lesson_id  );

  if (
    typeof mark_teacher_id !== "string" ||
    typeof mark_student_id !== "string" ||
    typeof mark_lesson_id !== "string"
  )
    return json({error: 'invalid formData'}, {status: 400});

    console.log(mark_value)

  await tCreateMark(mark_value, mark_teacher_id, mark_student_id, mark_lesson_id);
};

export default function SchoolDiary() {
  const loaderData = useLoaderData();
  // console.log(1111111, loaderData);
  // need refactor

  const period: string = loaderData?.period || null;
  const lessons: ILessonWithMarks[] = loaderData?.lessons || null;
  const classWithStudents: IClassroomWithStudents =
    loaderData?.classWithStudents || null;

  const daysInMonth = getDaysInMonth(period);
  const { allClasses } = useRouteLoaderData("routes/home");

  return (
    <div className="p-4">
      <SchoolDiaryToolbar classes={allClasses} />
      {/* <div className="bg-white p-3">
        <b>Lessons</b>
        {lessons && lessons.length > 0 && (
          <ul>
            {lessons.map((e) => (
              <li key={e.id}>
                {e.name}--{e.startTime}--{e.classroom}
              </li>
            ))}
          </ul>
        )}
        <b>Class with students</b>
        {classWithStudents && <p>{classWithStudents.name}</p>}
        {classWithStudents && classWithStudents?.students?.length > 0 && (
          <ul>
            {classWithStudents.students.map((e) => (
              <li key={e.id}>
                {e.profile.firstName}--{e.profile.lastName}
              </li>
            ))}
          </ul>
        )}
      </div> */}
      {loaderData ? (
        <DymanicTable
          columnCount={daysInMonth || 0}
          classWithStudents={classWithStudents}
          lessons={lessons}
        />
      ) : (
        <div>Table skeleton</div>
      )}
    </div>
  );
}
