import { ActionFunction, LoaderFunction, json } from "@remix-run/node";
import {
  useActionData,
  useLoaderData,
  useRouteLoaderData,
} from "@remix-run/react";
import { useEffect, useState } from "react";
import { Calendar } from "~/components/Calendar";
import { DropdownMenu } from "~/components/dropDownMenu";
import { formOptionsFromArray } from "~/helpers/formHelpers";
import { getUserIdAndRole } from "~/utils/auth.server";
import { createLesson } from "~/utils/lessons.server";

export const loader: LoaderFunction = async ({ request }) => {
  const { userId, userRole } = await getUserIdAndRole(request);
  if (!userId)
    throw new Response("Unathorized", {
      status: 401,
    });
  return { userId, userRole };
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const obj = Object.fromEntries(form.entries());

  if (!obj) return;
  const {
    lesson_type,
    lesson_topic,
    lesson_description,
    lesson_location,
    start_time,
    end_time,
    teacher_id,
    class_id,
  } = obj;
  if (
    !lesson_type ||
    !lesson_topic ||
    !start_time ||
    !end_time ||
    !teacher_id ||
    !class_id
  )
    return json({ error: "Required fields are missing" }, { status: 400 });

  // todo error handling

  if (
    typeof lesson_type !== "string" ||
    typeof lesson_topic !== "string" ||
    typeof lesson_description !== "string" ||
    typeof lesson_location !== "string" ||
    typeof start_time !== "string" ||
    typeof end_time !== "string" ||
    typeof teacher_id !== "string" ||
    typeof class_id !== "string"
  )
    return json({ error: "Invalid Form Data" }, { status: 400 });
  // todo - ts error

  // lesson_type as $Enums.LessonType

  return await createLesson({
    type: lesson_type,
    topic: lesson_topic,
    description: lesson_description,
    startTime: start_time,
    endTime: end_time,
    teacherId: teacher_id,
    classroomId: class_id,
  });
};

export default function Schedule() {
  useEffect(() => {
    document.title = 'Розклад';
  });

  const { userId, userRole } = useLoaderData();
  const { allClasses, user } = useRouteLoaderData("routes/home");
  const [selectedClass, setSelectedClass] = useState();
  const actionData = useActionData();

  useEffect(() => {
    if (userRole === "teacher") return;
    setSelectedClass(user?.classroomId);
  }, []);

  return (
    <div>
      <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
        Розклад
      </h1>

      {userRole === "teacher" && (
        <DropdownMenu
          hasEmptyOption={true}
          emptyOptionTitle="---"
          options={formOptionsFromArray(allClasses, "id", "name")}
          label="Оберіть клас"
          ariaLabel="Оберіть клас"
          ariaRequired={true}
          name="class"
          inputValue={selectedClass}
          onInputChange={(e) => {
            setSelectedClass(e.target.value);
          }}
          controlled={true}
        />
      )}
      <div className="bg-white">
        <Calendar
          userRole={userRole}
          selectedClass={selectedClass}
          teacherId={userId}
          actionData={actionData}
          profile={user?.profile}
        />
      </div>
    </div>
  );
}
