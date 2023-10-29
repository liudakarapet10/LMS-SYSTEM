import React, { useState, useEffect, useRef } from 'react';

export interface Option {
  value: string;
  label: string;
}

interface DropdownMenuProps {
  options: Option[];
  title: string;
  onSelect: (option: Option) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  options,
  title,
  onSelect,
  isOpen,
  onToggle,
}) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleOptionSelect = (option: Option) => {
    setSelectedOption(option);
    onSelect(option);
    onToggle();
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      onToggle(); 
    }
  };

  useEffect(() => {
    if (isOpen) {
      // Add the event listener to close the menu when it's open
      window.addEventListener('click', handleClickOutside);
    }

    return () => {
      // Remove the event listener when the component unmounts
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef as React.RefObject<HTMLDivElement>}>
      <button
        onClick={onToggle}
        className="flex items-center text-sm font-medium text-gray-700 bg-gray-200 px-4 py-2 rounded-md focus:outline-none focus-visible:ring focus-visible:ring-blue-300 focus-visible:ring-opacity-75"
      >
        {selectedOption ? selectedOption.label : title}
        <span className={`ml-2 transform ${isOpen ? 'rotate-180' : 'rotate-0'} transition-transform duration-300 ease-in-out`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      {isOpen && (
        <ul className="origin-top-right absolute right-0 mt-2 w-48 py-2 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionSelect(option)}
              className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};