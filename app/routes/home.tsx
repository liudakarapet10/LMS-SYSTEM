import type { LoaderFunction } from "@remix-run/node";
import { NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { requireUserId } from "~/utils/auth.server";
import { Layout } from "~/components/layout";
import type { User } from "@prisma/client";
import { getUserById } from "~/utils/user.server";
import { LogoutComponent } from "~/components/logoutComponent";
import { UserWelcome } from "~/components/user-welcome";
import { getAllClassrooms } from "~/utils/classroom.server";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const user = await getUserById(userId);
  const allClasses = await getAllClassrooms();
  return { user, allClasses };
};

export default function Home() {
  const { user = [], allClasses } = useLoaderData();
  // console.log(allClasses);

  return (
    <Layout>
      <div className="h-full flex">
        <div className="w-1/6 bg-gray-200 flex flex-col">
          <div className="text-center bg-gray-300 h-20 flex items-center justify-center">
            {user &&
              user.map((user: User) => (
                <UserWelcome key={user.id} profile={user.profile} />
              ))}
          </div>
          <div className="flex-1 overflow-y-scroll py-4 flex flex-col gap-y-10">
            <nav className="w-auto px-3.5" aria-label="Main Navigation">
              <ul className="flex flex-col gap-[10px]">
                <NavLink className="hover:text-blue-600" to="school-diary">Щоденник</NavLink>
                <NavLink className="hover:text-blue-600" to="schedule">Розклад</NavLink>
                <NavLink className="hover:text-blue-600" to="lessons">Уроки</NavLink>
                <NavLink className="hover:text-blue-600" to="testing">Тестінг</NavLink>
              </ul>
            </nav>
          </div>
          <LogoutComponent />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </Layout>
  );
}
