import React, { KeyboardEvent } from 'react';

interface NavItemProps {
  text: string;
  id?: string;
  isActive: boolean;
  onClick?: () => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLAnchorElement>; // Correct type
  className?: string;
  tabIndex?: number;
}

export function NavItem({
  text,
  isActive = false,
  id,
  onClick,
  onKeyDown,
  tabIndex,
}: NavItemProps) {
  return (
    <li className={`w-full ${isActive ? 'text-[#2464EB] focus-visible:outline-none' : 'cursor-pointer hover:text-[#2464EB]'}`}>
      <a
        className={`block w-full ${isActive ? 'focus:outline-none' : ''}`}
        aria-current={isActive ? 'page' : undefined}
        id={id}
        onClick={onClick}
        onKeyDown={onKeyDown} // Use the correct type here
        tabIndex={tabIndex}
      >
        {text}
      </a>
    </li>
  );
}