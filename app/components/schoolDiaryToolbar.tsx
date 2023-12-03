import React, { useEffect, useState, useRef } from "react";
import type { Option } from "./dropDownMenu";
import { DropdownMenu } from "./dropDownMenu";

import type { Classroom as IClassroom, Role } from "@prisma/client";
import { formOptionsFromArray } from "~/helpers/formHelpers";
import { CustomDateInput } from "./customDateInput";
import {
  Form,
  useMatches,
  useNavigate,
  useSearchParams,
  useSubmit,
} from "@remix-run/react";
import { Button } from "./Button";
import { LESSON_TYPES } from "~/constants/lessonTypes";

interface ISchoolToolbar {
  classes: Pick<IClassroom, "id" | "name">[];
  userType: Role;
}

export function SchoolDiaryToolbar({ classes, userType }: ISchoolToolbar) {
  const [selectedClass, setSelectedClass] = useState<string | undefined>();
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();


  const clearFilters = () => {
    searchParams.delete("class");
    searchParams.delete("period");
    searchParams.delete("lesson_type");

    setTimeout(() => {
      navigate(`/home/school-diary`);
    }, 4);
  };


  return (
    <div
      className="flex flex-row gap-3 outline bg-slate-100 p-4 rounded-t-lg"
      tabIndex={0}
    >
      <Form className="flex space-x-4">
        {userType === "teacher" && (
          <DropdownMenu
            hasEmptyOption={true}
            emptyOptionTitle="---"
            options={formOptionsFromArray(classes, "id", "name")}
            inputValue={selectedClass}
            onInputChange={(e : React.ChangeEvent<HTMLInputElement>) => {
              setSelectedClass(e.target.value);
            }}
            controlled
            label="Оберіть класс"
            name="class"
          />
        )}
         <DropdownMenu
        hasEmptyOption={true}
        emptyOptionTitle="---"
        options={LESSON_TYPES}
        label="Оберіть предмет"
        name="lesson_type"
        controlled={false}
        required={true}
      />
        <CustomDateInput
          name="period"
          label="Оберіть місяць"
        />
        <Button
          label="Створити щоденник"
          type="submit"
          style="primary"
          ariaLabel="Нажати кнопку для створення щоденника з вибраними параметрами"
        />
        <Button
          label="Очистити щоденник"
          type="button"
          style="secondary"
          ariaLabel="Нажати кнопку для очищення щоденника"
          onPress={clearFilters}
        />
      </Form>
    </div>
  );
}
