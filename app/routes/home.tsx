import type { LoaderFunction } from "@remix-run/node";
import { NavLink, Outlet, useLoaderData, useNavigate } from "@remix-run/react";
import { requireUserIdAndRole } from "~/utils/auth.server";
import { Layout } from "~/components/layout";
import { getUserByIdAndRole } from "~/utils/user.server";
import { LogoutComponent } from "~/components/logoutComponent";
import { UserWelcome } from "~/components/user-welcome";
import { getAllClassrooms } from "~/utils/classroom.server";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { getAllLessonsByTeacherId } from "~/utils/teacher.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  const { userId, userRole } = await requireUserIdAndRole(request);
  const user = await getUserByIdAndRole(userId, userRole);
  const allClasses = await getAllClassrooms();
  return { user, allClasses};
};

export default function Home() {
  const { user, allClasses } = useLoaderData();
  // console.log(user);
  const navigate = useNavigate();

  // KEYBOARD CONTROLS

  const links = [
    {
      label: "Щоденник",
      ariaLabel: "Перейти до щоденника",
      to: "school-diary",
    },
    { label: "Розклад", ariaLabel: "Перейти до розкладу", to: "schedule" },
    { label: "Уроки", ariaLabel: "Перейти до уроків", to: "lessons" },
  ];

  const [menuIsSelected, setMenuIsSelected] = useState(true);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const linkRefs = links.map(() => useRef<HTMLAnchorElement>(null));

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" && selectedIndex < links.length - 1) {
        e.preventDefault();
        setSelectedIndex((prevIndex) => prevIndex + 1);
      } else if (e.key === "ArrowUp" && selectedIndex > 0) {
        e.preventDefault();
        setSelectedIndex((prevIndex) => prevIndex - 1);
      } else if (e.key === "ArrowRight" && selectedIndex === 0) {
        e.preventDefault();
      } else if (e.key === "Enter") {
        e.preventDefault();
        linkRefs[selectedIndex].current?.click();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [selectedIndex, navigate]);

  const handleClick = (index: number) => {
    setSelectedIndex(index);
  };

  // KEYBOARD CONTROLS

  return (
    <Layout>
      <div className="h-full flex">
        <div className="w-1/6 bg-gray-200 flex flex-col">
          <div className="text-center bg-gray-300 h-20 flex items-center justify-center">
            type: {user?.type}
          </div>
          <div className="text-center bg-gray-300 h-20 flex items-center justify-center">
            {user && <UserWelcome key={user.id} profile={user.profile} />}
          </div>
          <div className="flex-1 overflow-y-scroll py-4 flex flex-col gap-y-10">
            <nav className="w-auto px-3.5" aria-label="Main Navigation">
              <ul className="flex flex-col gap-[10px]">
                <NavLink className="hover:text-blue-600" to="school-diary">
                  Щоденник
                </NavLink>
                <NavLink className="hover:text-blue-600" to="schedule">
                  Розклад
                </NavLink>
                <NavLink className="hover:text-blue-600" to="lessons">
                  Уроки
                </NavLink>
                <NavLink className="hover:text-blue-600" to="testing">
                  Тестінг
                </NavLink>
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
