// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useState } from "react";
import type { Option } from "./dropDownMenu";
import { DropdownMenu } from "./dropDownMenu";

import type { Classroom as IClassroom } from "@prisma/client";
import { formOptionsFromArray } from "~/helpers/formHelpers";
import { CustomDateInput } from "./customDateInput";
import { Form, useNavigate, useSearchParams, useSubmit } from "@remix-run/react";

interface ISchoolToolbar {
  classes: Pick<IClassroom, "id" | "name">[];
}

export function SchoolDiaryToolbar({ classes }: ISchoolToolbar) {
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  
  const clearFilters = () => {
    searchParams.delete("class");
    searchParams.delete("period");

    setTimeout(() => {
      navigate(`/home/school-diary`);
    }, 4);
    // navigate("../", { replace: true });
  };

  return (
    <div className="flex flex-row gap-3 outline bg-slate-100">
      <Form>
        <DropdownMenu
          hasEmptyOption={true}
          emptyOptionTitle="---"
          options={formOptionsFromArray(classes)}
          label="Оберіть класс"
          name="class"
        />
        <CustomDateInput name="period" label="Choose month" />
        <button>Submit</button>
        <button type='button' onClick={clearFilters}>Reset</button>
      </Form>
    </div>
  );
}
