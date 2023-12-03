import { DropdownMenu } from "./dropDownMenu";

import type { Classroom as IClassroom } from "@prisma/client";
import { formOptionsFromArray } from "~/helpers/formHelpers";
import { CustomDateInput } from "./customDateInput";
import {
  Form,
  useNavigate,
  useSearchParams
} from "@remix-run/react";
import { Button } from "./Button";
import { LESSON_TYPES } from "~/constants/lessonTypes";

interface ISchoolToolbar {
  classes: Pick<IClassroom, "id" | "name">[];
}

export function SchoolLessonsToolbar({ classes}: ISchoolToolbar) {
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();

  const clearFilters = () => {
    searchParams.delete("class");
    searchParams.delete("period");
    searchParams.delete("lesson_type");

    setTimeout(() => {
      navigate(`/home/lessons`);
    }, 4);
  };


  return (
    <div
      className="flex flex-row gap-3 outline bg-slate-100 p-4 rounded-t-lg"
      tabIndex={0}
    >
      <Form className="flex space-x-4">
        <DropdownMenu
          hasEmptyOption={true}
          emptyOptionTitle="---"
          options={formOptionsFromArray(classes, "id", "name")}
          controlled
          label="Оберіть класс"
          name="class"
        />
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
          label="Отримати уроки"
          type="submit"
          style="primary"
          ariaLabel="Нажати кнопку для отримання уроків"
        />
      </Form>
    </div>
  );
}
