import { LoaderFunction, json } from "@remix-run/node";
import { convertToCalendarFormat } from "~/helpers/calendarHelpers";
import { getUserId } from "~/utils/auth.server";
import { getAllLessonsByPeriodAndClass } from "~/utils/lessons.server";
// import { getRecordsByCP } from "~/utils/records.server";
// import { getUserId } from "~/utils/session.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  // todo - take userID from context, prevent extra fetch

  const { className } = params;
  if (className === "undefined" || typeof className !== "string") return [];
  const userId = await getUserId(request);
  if (!userId) return;

  const url = new URL(request.url);
  const startTime = url.searchParams.get("start");
  const endTime = url.searchParams.get("end");

  if (!startTime || !endTime) return;

  const filteredLessons = await getAllLessonsByPeriodAndClass(
    className,
    startTime,
    endTime
  );

  // todo - add filter Lessontype !!!!!!!!!!!!!
  console.log(filteredLessons);
  const calendarData = convertToCalendarFormat(filteredLessons, userId);
  // // todo - error handling !!!!!!
  return calendarData;
  return [];
};

// todo - store or Redux to save data in Remix, prevent extra fetches etc

// todo - each component group in separate folder !!!
