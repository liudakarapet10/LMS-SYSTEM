import { json, LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { requireUserId } from "~/utils/auth.server";
import { Layout } from "~/components/layout";
import { User } from "@prisma/client";
import { getUserById } from "~/utils/user.server";
import React, { useState, useEffect, KeyboardEvent } from "react";
import { UserInfo } from "~/components/userInfo";
import DiaryComponent from "../components/diary";
import { ScheduleComponent } from "~/components/schedule";
import { SomethingElseComponent } from "~/components/somethingElse";
import { NavItem } from "~/components/navItem";
import { LogoutComponent } from "~/components/logoutComponent";
import { UserWelcome } from "~/components/user-welcome";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const user = await getUserById(userId);
  return { user };
};

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);

  const menuItems = ['Головна сторінка', 'Щоденник', 'Розклад', 'Ще щось)'];

  useEffect(() => {
    const activeTabElement = document.getElementById(`nav-item-${activeTab}`);
    if (activeTabElement) {
      activeTabElement.focus();
    }
  }, [activeTab]);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown" && activeTab < 3) {
      setActiveTab(activeTab + 1);
      console.log(activeTab)
    } else if (e.key === "ArrowUp" && activeTab > 0) {
      setActiveTab(activeTab - 1);
    }
  };

  const { user = [] } = useLoaderData();

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
                {menuItems.map((text, index) => (
                  <NavItem
                    key={index}
                    text={text}
                    id={`nav-item-${index}`}
                    isActive={activeTab === index}
                    onClick={() => handleTabClick(index)}
                    onKeyDown={handleKeyPress}
                    tabIndex={0}
                  />
                ))}
              </ul>
            </nav>
          </div>
          <LogoutComponent />
        </div>
        <div>
          {activeTab === 0 && (
            <UserInfo
              profile={{
                firstName: "",
                lastName: "",
              }}
            />
          )}
          {activeTab === 1 && <DiaryComponent />}
          {activeTab === 2 && <ScheduleComponent />}
          {activeTab === 3 && <SomethingElseComponent />}
        </div>
      </div>
    </Layout>
  );
}
