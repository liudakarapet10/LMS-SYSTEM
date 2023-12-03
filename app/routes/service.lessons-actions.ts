import { ActionFunction, json } from "@remix-run/node";
import {
  deleteLessonById,
  simpleUpdateLessonByCP,
} from "~/utils/lessons.server";

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const intent = form.get("intent");
  if (intent === "update") {
    const obj = Object.fromEntries(form.entries());
    if (!obj) return json({ error: "Require form data" }, { status: 400 });
    const { id, start, end } = obj;
    if (
      typeof id !== "string" ||
      typeof start !== "string" ||
      typeof end !== "string"
    )
      return json({ error: "Invalid form data" }, { status: 400 });
    await simpleUpdateLessonByCP(id, start, end);
    // throw new Error("Test Error !");
    // throw new Response("Can't delete what does not exist", {
    //   status: 404,
    // });

    // throw new Response("No random joke found", {
    //   status: 404,
    // });
    return json({ success: true });
  }
  if (intent === "delete") {
    const lessonId = form.get("id");
    if (typeof lessonId !== "string")
      return json({ error: "Invalid form data" }, { status: 400 });
    await deleteLessonById(lessonId);
    return json({ success: true });
  }
};
