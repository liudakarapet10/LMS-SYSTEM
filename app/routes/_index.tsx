import { LoaderFunction, redirect } from "@remix-run/node";
import { requireUserIdAndRole } from "~/utils/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  await requireUserIdAndRole(request);
  return redirect("/home/school-diary");
};
