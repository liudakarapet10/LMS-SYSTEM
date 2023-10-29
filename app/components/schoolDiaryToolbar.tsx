import React, { useEffect, useState } from 'react';
import {DropdownMenu, Option}from "./dropDowmMenu"; // Import your reusable DropdownMenu component

const classesOptions: Option[] = [
  { value: 'class1', label: 'Class 1' },
  { value: 'class2', label: 'Class 2' },
  { value: 'class3', label: 'Class 3' },
];

const monthsOptions: Option[] = [
  { value: 'cічень', label: 'Січень' },
  { value: 'лютий', label: 'Лютий' },
  { value: 'березень', label: 'Березень' },
  { value: 'квітень', label: 'Квітень' },
  { value: 'травень', label: 'Травень' },
  { value: 'черавень', label: 'Черавень' },
  { value: 'липень', label: 'Липень' },
  { value: 'серпень', label: 'Серпень' },
  { value: 'вересень', label: 'Вересень' },
  { value: 'жовтень', label: 'Жовтень' },
  { value: 'листопад', label: 'Листопад' },
  { value: 'грудень', label: 'Грудень' },
];

const lessonsOptions: Option[] = [
  { value: 'математика', label: 'Математика' },
  { value: 'фізика', label: 'Фізика' },
  { value: 'історія', label: 'Історія' },
  { value: 'українська_мова', label: 'Українська мова' },
  { value: 'фізкультура', label: 'Фізкультура' },
  { value: 'зарубіжна_література', label: 'Зарубіжна література' },
];

interface OpenMenusState {
  class: boolean;
  month: boolean;
  lesson: boolean;
}



export function SchoolDiaryToolbar() {
  const [openMenus, setOpenMenus] = useState({
    class: false,
    month: false,
    lesson: false,
  });

  const handleMenuToggle = (menuName: keyof OpenMenusState) => {
    const updatedOpenMenus: OpenMenusState = { class: false, month: false, lesson: false };
    updatedOpenMenus[menuName] = true;
    setOpenMenus(updatedOpenMenus);
  };

  const handleClassSelect = (selectedOption: Option) => {
    console.log('Selected class:', selectedOption);
    handleMenuToggle('class');
  };

  const handleMonthSelect = (selectedOption: Option) => {
    console.log('Selected month', selectedOption);
    handleMenuToggle('month');
  };

  const handleLessonSelect = (selectedOption: Option) => {
    console.log('Selected lesson:', selectedOption);
    handleMenuToggle('lesson');
  };

  return (
    <div className="flex flex-row gap-3">
      <DropdownMenu
        options={classesOptions}
        title="Оберіть класс"
        onSelect={handleClassSelect}
        isOpen={openMenus.class}
        onToggle={() => handleMenuToggle('class')}
      />
      <DropdownMenu
        options={monthsOptions}
        title="Оберіть місяць"
        onSelect={handleMonthSelect}
        isOpen={openMenus.month}
        onToggle={() => handleMenuToggle('month')}
      />
      <DropdownMenu
        options={lessonsOptions}
        title="Оберіть предмет"
        onSelect={handleLessonSelect}
        isOpen={openMenus.lesson}
        onToggle={() => handleMenuToggle('lesson')}
      />
    </div>
  );


}

