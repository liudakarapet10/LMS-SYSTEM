import { SchoolDiaryToolbar } from "~/components/schoolDiaryToolbar";
import { json, type ActionFunction, type LoaderFunction } from "@remix-run/node";
import { useLoaderData, useMatch, useMatches, useRouteLoaderData } from "@remix-run/react";
import { getClassWithStudents } from "~/utils/classroom.server";
import { getUserId } from "~/utils/auth.server";
import { getLessonsByPeriodAndClass } from "~/utils/lessons.server";
import { getDaysInMonth, getFullMonthStartEndDays } from "~/helpers/timeConvertor";
import DymanicTable from "~/components/DynamicTable";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (!userId) {
    return null;
    // status 401
  }
  const url = new URL(request.url);
  const classroom = url.searchParams.get("class");
  const period = url.searchParams.get("period");

  if(classroom && period) {
    const {firstDay, lastDay } = getFullMonthStartEndDays(period)
    const lessons = await getLessonsByPeriodAndClass(classroom, {firstDay, lastDay})
    const classWithStudents = await getClassWithStudents('8-Б');

    return json({period, lessons, classWithStudents})
  }

  return json({period: '', lessons: [], classWithStudents: {}})
};

export const action: ActionFunction = async ({ request }) => {
  // const teacherId = await getUserId(request);
  // if (!teacherId) return null;

  // const form = await request.formData();

  // const name = form.get("name");
  // const time = form.get("time");
  // const location = form.get("location");
  // if (
  //   typeof name !== "string" ||
  //   typeof time !== "string" ||
  //   typeof location !== "string" ||
  //   typeof teacherId !== "string"
  // ) {
  //   return null;
  // }

};


export default function SchoolDiary() {

const {period, lessons, classWithStudents} = useLoaderData();
console.log(classWithStudents);

// console.log(getDaysInMonth(period));


const daysInJanuary = getDaysInMonth(period);
// console.log(daysInJanuary);
  // const matches = useMatches();
  // console.log(11, matches)
  const {allClasses} = useRouteLoaderData("routes/home");
  
  return (
    <div>
      <SchoolDiaryToolbar classes={allClasses}/>
      <div className="bg-white p-3">
       <b>Lessons</b>
       {lessons && lessons.length > 0 && <ul>
        {lessons.map((e) => (<li key={e.id}>{e.name}--{e.startTime}--{e.classroom}</li>))}
        </ul>} 
       <b>Class with students</b> 
         {classWithStudents && <p>{classWithStudents.name}</p>} 
         {classWithStudents && classWithStudents?.students?.length > 0 &&  <ul>
        {classWithStudents.students.map(e => (<li key={e.id}>{e.profile.firstName}--{e.profile.lastName}</li>))}
        </ul>} 
      </div>
      <DymanicTable columnCount={daysInJanuary} classWithStudents={classWithStudents}/>
    </div>
  );
}
