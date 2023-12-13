import type { LoaderFunction } from "@remix-run/node";
import { NavLink, Outlet, useLoaderData, useNavigate } from "@remix-run/react";
import { requireUserIdAndRole } from "~/utils/auth.server";
import { Layout } from "~/components/layout";
import { getUserByIdAndRole } from "~/utils/user.server";
import { LogoutComponent } from "~/components/logoutComponent";
import { UserWelcome } from "~/components/user-welcome";
import { getAllClassrooms } from "~/utils/classroom.server";
import { useEffect } from "react";

export const loader: LoaderFunction = async ({ request, params }) => {
  const { userId, userRole } = await requireUserIdAndRole(request);
  const user = await getUserByIdAndRole(userId, userRole);
  const allClasses = await getAllClassrooms();
  return { user, allClasses};
};

export default function Home() {
  useEffect(() => {
    document.title = 'Домашня сторінка';
  });

  const { user, allClasses } = useLoaderData();
  const navigate = useNavigate();

  // KEYBOARD CONTROLS

  const links = [
    { label: "Щоденник", ariaLabel: "Перейти до щоденника", to: "school-diary"  },
    { label: "Розклад", ariaLabel: "Перейти до розкладу", to: "schedule" },
    { label: "Уроки", ariaLabel: "Перейти до уроків", to: "lessons" },
    { label: "Тестінг", ariaLabel: "Перейти до тестової сторінки", to: "testing" }
  ];

  const generateLinkClassName = (isActive: boolean, isPending: boolean): string => {
    let className = "nav-link p-3.5 m-[1px] ";

    if (isPending) {
      className += "pending ";
    }

    if (isActive) {
      className += "active ";
    }

    return className;
  };

  return (
    <Layout>
      <div className="h-full flex">
        <aside className="w-1/6 bg-gray-200 flex flex-col">
          <section className="flex items-center justify-center p-2 pb-0 text-center bg-gray-300">
            {user && <UserWelcome key={user.id} profile={user.profile} />}
          </section>

          <section className="flex items-center justify-center p-2 text-center bg-gray-300">
            Ви увійшли як {user?.type === 'teacher' ? 'вчитель' : 'учень'}
          </section>

          <nav className="w-auto flex-1 overflow-y-scroll flex flex-col" aria-label="EduForAll">
            <ul role="menubar" aria-label="EduForAll" aria-orientation="vertical" className="flex flex-col">
              {links.map(link => (
                <NavLink
                  key={link.to}
                  className={({ isActive, isPending }) => generateLinkClassName(isActive, isPending)}
                  to={link.to}
                  role="menuitem"
                >
                  {link.label}
                </NavLink>
              ))}
            </ul>
          </nav>

          <section>
            <LogoutComponent />
          </section>
        </aside>

        <main className="w-5/6 p-4">
          <Outlet />
        </main>
      </div>
    </Layout>
  );
}
