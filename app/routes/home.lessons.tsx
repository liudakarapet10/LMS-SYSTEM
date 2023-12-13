import {
  json,
  type LoaderFunction,
} from "@remix-run/node";
import { Form, useLoaderData, useRouteLoaderData } from "@remix-run/react";
import { useEffect, Fragment } from "react";
import ClassroomSession from "~/components/ClassroomSession";
import { SchoolLessonsToolbar } from "~/components/schoolLessonsToolBar";
import { getDaysInMonth, getFullMonthStartEndDays } from "~/helpers/timeConvertor";
import { Lessons } from "~/types/project.types";
import { getUserId} from "~/utils/auth.server";;
import { getLessonsByParameters } from "~/utils/lessons.server";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (!userId) {
    return null;
  }
  const url = new URL(request.url);
  const classroom = url.searchParams.get("class");
  const period = url.searchParams.get("period");
  const lessonType = url.searchParams.get("lesson_type");

  if (classroom && period && lessonType) {
    const { firstDay, lastDay } = getFullMonthStartEndDays(period);
    const lessons = await getLessonsByParameters(
      classroom,
      {
        firstDay,
        lastDay,
      },
      userId,
      lessonType
    );

    return json({ period, lessons});
  }

  return null;

};

export default function Lessons() {
  useEffect(() => {
    document.title = 'Предмети';
  });

  const loaderData = useLoaderData();

  const period: string = loaderData?.period || null;
  const daysInMonth = getDaysInMonth(period);


  const lessons: Lessons[] = loaderData?.lessons || null;
  
  const { allClasses } = useRouteLoaderData("routes/home");

  let sortedLessons;

  if( lessons && lessons.length > 1){
    sortedLessons = lessons.slice().sort((a, b) => {
      const startTimeA = new Date(a.startTime);
      const startTimeB = new Date(b.startTime);

      if (startTimeA < startTimeB) {
        return -1;
      } else if (startTimeA > startTimeB) {
        return 1;
      }

      return 0;
    });
  } else {
    sortedLessons = lessons;
  }


  return (
    <Fragment>
      <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
        Предмети
      </h1>

     <SchoolLessonsToolbar classes={allClasses} />
     {loaderData ? (
        <div>
          {sortedLessons.map((el, index) => (
              <ClassroomSession
              key={el.id}
              index={index + 1}
              type={el.type}
              startDate={el.startTime.substring(0, 10)}
              endDate={el.endTime.substring(0, 10)}
              startTime={el.startTime.substring(11, 16)}
              endTime={el.endTime.substring(11, 16)}
              location={el.location}
              topic={el.topic}
              description={el.description}
            />
          ))}
        </div>  
      ) : (
        <div>
          <h1>Оберіть параметри</h1>
        </div>
      )}
    </Fragment>
  );
}
