import {
  json,
  type LoaderFunction,
} from "@remix-run/node";
import { useLoaderData, useRouteLoaderData } from "@remix-run/react";
import { Fragment } from "react";
import ClassroomSession from "~/components/ClassroomSession";
import { SchoolLessonsToolbar } from "~/components/schoolLessonsToolBar";
import { getFullMonthStartEndDays } from "~/helpers/timeConvertor";
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
  const loaderData = useLoaderData();
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
