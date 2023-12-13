import { SchoolDiaryToolbar } from "~/components/schoolDiaryToolbar";
import { json, type ActionFunction, type LoaderFunction } from "@remix-run/node";
import { useLoaderData, useRouteLoaderData } from "@remix-run/react";
import { getClassWithStudents } from "~/utils/classroom.server";
import { getUserIdAndRole } from "~/utils/auth.server";
import { getLessonsByPeriodAndClass } from "~/utils/lessons.server";
import { getDaysInMonth, getFullMonthStartEndDays } from "~/helpers/timeConvertor";
import DymanicTable from "~/components/DynamicTable";
import type { IClassroomWithStudents, ILessonWithMarks } from "~/types/project.types";
import { deleteMarkById, tCreateMark1, tUpdateMark } from "~/utils/marks.server";
import { useEffect, Fragment } from "react";
import { getUserByIdAndRole } from "~/utils/user.server";
import { Student } from "@prisma/client";

export const loader: LoaderFunction = async ({ request }) => {
  const { userId, userRole } = await getUserIdAndRole(request);
  if (!userId)
    throw new Response("Unathorized", {
      status: 401,
    });

  let classroom;

  const url = new URL(request.url);

  if (userRole === "student") {
    const user = await getUserByIdAndRole(userId, userRole);
    const { classroomId } = user as Student;
    classroom = classroomId;
  } else {
    classroom = url.searchParams.get("class");
  }

  const period = url.searchParams.get("period");
  const lessonType = url.searchParams.get("lesson_type");


  if (classroom && period && lessonType) {
    const { firstDay, lastDay } = getFullMonthStartEndDays(period);
    const lessons = await getLessonsByPeriodAndClass(classroom, {
      firstDay,
      lastDay,
    }, lessonType);

    const classWithStudents = await getClassWithStudents(classroom); 
    return json({ period, lessons, classWithStudents });
  }

  return null;
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const intent = form.get("intent");

  if (intent === "createMark") {
    const mark_valueS = form.get("mark_value");
    const mark_value = Number(mark_valueS);
    const mark_teacher_id = form.get("m_teacher_id");
    const mark_student_id = form.get("m_student_id");
    const mark_lesson_id = form.get("m_lesson_id");

    if (
      !mark_teacher_id ||
      typeof mark_teacher_id !== "string" ||
      !mark_student_id ||
      typeof mark_student_id !== "string" ||
      !mark_lesson_id ||
      typeof mark_lesson_id !== "string"
    ) {
      return json({ error: "Invalid formData" }, { status: 400 });
    }

    return await tCreateMark1(
      mark_value,
      mark_teacher_id,
      mark_student_id,
      mark_lesson_id
    );
  } else if (intent === "updateMark") {
    const mark_valueS = form.get("mark_value");
    const mark_value = Number(mark_valueS);
    const mark_id = form.get("m_mark_id");

    if (!mark_id || typeof mark_id !== "string") {
      return json({ error: "Invalid formData" }, { status: 400 });
    }

    return await tUpdateMark(mark_id, mark_value);
  } else if (intent === "deleteMark") {
    const mark_id = form.get("m_mark_id");

    if (!mark_id || typeof mark_id !== "string") {
      return json({ error: "Invalid formData" }, { status: 400 });
    }
    return await deleteMarkById(mark_id);
  }
};

export default function SchoolDiary() {
  useEffect(() => {
    document.title = 'Щоденник';
  });

  const loaderData = useLoaderData();
  const { user, allClasses } = useRouteLoaderData("routes/home");
  const period: string = loaderData?.period || null;
  const lessons: ILessonWithMarks[] = loaderData?.lessons || null;
  const classWithStudents: IClassroomWithStudents =
    loaderData?.classWithStudents || null;

  const daysInMonth = getDaysInMonth(period);

  const columnsDefault = Array.from({ length: 30 }, (_, index) => index + 1);



  return (
    <Fragment>
      <div>
        <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
          Щоденник
        </h1>

        <SchoolDiaryToolbar classes={allClasses} userType={user.type} />

        {loaderData ? (
          <DymanicTable
            columnCount={daysInMonth || 0}
            classWithStudents={classWithStudents}
            lessons={lessons}
            userType={user.type}
          />
        ) : (
          <div className="w-full overflow-x-scroll" id="pseudo_table">
            <div className="rounded-b-lg">
              <table className="w-full border-collapse border bg-white">
                <thead>
                  <tr className="border">
                    <th className="border">Учні</th>
                    {columnsDefault.map((header, index) => (
                      <th key={index} className="border min-w-[25px]">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border">
                    <th> Оксана Коваленко</th>
                  </tr>
                  <tr className="border">
                    <th>Віталій Шевченко</th>
                  </tr>
                  <tr className="border">
                    <th>Надія Коваленко</th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
}
