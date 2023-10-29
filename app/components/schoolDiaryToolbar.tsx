import React from 'react';
import {DropdownMenu, Option}from "./dropDowmMenu"; // Import your reusable DropdownMenu component

const classesOptions: Option[] = [
  { value: 'class1', label: 'Class 1' },
  { value: 'class2', label: 'Class 2' },
  { value: 'class3', label: 'Class 3' },
];

const monthsOptions: Option[] = [
  { value: 'january', label: 'January' },
  { value: 'february', label: 'February' },
  { value: 'march', label: 'March' },
  // Add more months
];

const lessonsOptions: Option[] = [
  { value: 'math', label: 'Math' },
  { value: 'science', label: 'Science' },
  { value: 'history', label: 'History' },
  // Add more lessons
];

export function SchoolDiaryToolbar() {
  const handleClassSelect = (selectedOption: Option) => {
    // Handle the selected class option
    console.log('Selected class:', selectedOption);
  };

  const handleMonthSelect = (selectedOption: Option) => {
    // Handle the selected month option
    console.log('Selected month:', selectedOption);
  };

  const handleLessonSelect = (selectedOption: Option) => {
    // Handle the selected lesson option
    console.log('Selected lesson:', selectedOption);
  };

  return (
    <div className="toolbar-menu">
      <DropdownMenu options={classesOptions} onSelect={handleClassSelect} />
      <DropdownMenu options={monthsOptions} onSelect={handleMonthSelect} />
      <DropdownMenu options={lessonsOptions} onSelect={handleLessonSelect} />
    </div>
  );
}

