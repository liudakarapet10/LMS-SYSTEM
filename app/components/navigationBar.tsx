import React, { useState, useEffect, KeyboardEvent } from "react";
import { NavItem } from "./navItem";

export function NavigationBar() {
  const [activeTab, setActiveTab] = useState(0);

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
    } else if (e.key === "ArrowUp" && activeTab > 0) {
      setActiveTab(activeTab - 1);
    }
  };

  return (
    <nav
      className="w-full px-3.5"
      aria-label="Main Navigation"
      onKeyDown={handleKeyPress}
    >
      <ul className="flex flex-col gap-[10px]">
        <NavItem
          text="Головні сторінка"
          url="/home"
          id="nav-item-0"
          isActive={activeTab === 0}
          onClick={() => handleTabClick(0)}
        />
        <NavItem
          text="Щоденник"
          url="/successLog"
          id="nav-item-1"
          isActive={activeTab === 1}
          onClick={() => handleTabClick(1)}
        />
        <NavItem
          text="Розклад"
          url="/schelude"
          id="nav-item-2"
          isActive={activeTab === 2}
          onClick={() => handleTabClick(2)}
        />
        <NavItem
          text="Ще щось)"
          url="/test"
          id="nav-item-3"
          isActive={activeTab === 3}
          onClick={() => handleTabClick(3)}
        />
      </ul>
    </nav>
  );
}
