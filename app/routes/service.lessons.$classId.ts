import { LoaderFunction, json } from "@remix-run/node";
import { convertToCalendarFormat } from "~/helpers/calendarHelpers";
import { getUserId } from "~/utils/auth.server";
import { getAllLessonsByPeriodAndClass } from "~/utils/lessons.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  // todo - take userID from context, prevent extra fetch
  const { classId } = params;
  if (classId === "undefined" || typeof classId !== "string") return [];
  const userId = await getUserId(request);
  if (!userId) return;

  const url = new URL(request.url);
  const startTime = url.searchParams.get("start");
  const endTime = url.searchParams.get("end");

  if (!startTime || !endTime) return;

  const filteredLessons = await getAllLessonsByPeriodAndClass(
    classId,
    startTime,
    endTime
  );

  // todo - add filter Lessontype !!!!!!!!!!!!!
  const calendarData = convertToCalendarFormat(filteredLessons, userId);
  return calendarData;
  return [];
};

// todo - store or Redux to save data in Remix, prevent extra fetches etc
// todo - each component group in separate folder !!!
