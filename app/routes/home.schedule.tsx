import { LoaderFunction, json } from "@remix-run/node";
import { useRouteLoaderData } from "@remix-run/react";
import { useState } from "react";
import { Calendar } from "~/components/Calendar";
import { DropdownMenu } from "~/components/dropDownMenu";
import { SchoolDiaryToolbar } from "~/components/schoolDiaryToolbar";
import { formOptionsFromArray } from "~/helpers/formHelpers";
import { getFullMonthStartEndDays } from "~/helpers/timeConvertor";
import { getClassWithStudents } from "~/utils/classroom.server";
import {
  getAllLessonsByPeriodAndClass,
  getLessonsByPeriodAndClass,
} from "~/utils/lessons.server";

export const loader: LoaderFunction = async ({ request }) => {
  // const userId = await getUserId(request);
  // if (!userId) {
  //   return null;
  //   // status 401
  // }
  const url = new URL(request.url);
  const classroom = url.searchParams.get("class");
  const period = url.searchParams.get("period");

  if (classroom && period) {
    const { firstDay, lastDay } = getFullMonthStartEndDays(period);
    // todo - only lessons of teacherID
    const lessons = await getAllLessonsByPeriodAndClass(
      classroom,
      firstDay,
      lastDay
    );
    const classWithStudents = await getClassWithStudents("8-Б");

    console.log(111, lessons);

    return json({ period, lessons, classWithStudents });
  }

  return json({ period: "", lessons: [], classWithStudents: {} });
};
export default function Schedule() {
  const { allClasses } = useRouteLoaderData("routes/home");
  const [selectedClass, setSelectedClass] = useState();

  return (
    <div>
      <h1>Schedule</h1>
      <DropdownMenu
        hasEmptyOption={true}
        emptyOptionTitle="---"
        options={formOptionsFromArray(allClasses)}
        label="Оберіть класс"
        name="class"
        inputValue={selectedClass}
        onInputChange={(e) => {
          setSelectedClass(e.target.value);
        }}
        controlled={true}
      />
      <div className="bg-white">
        <Calendar selectedClass={selectedClass} />
      </div>
    </div>
  );
}
