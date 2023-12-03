import { LESSON_TYPES } from "~/constants/lessonTypes";
import { DropdownMenu } from "./dropDownMenu";
import { TextInput } from "./TextInput";
import { Form } from "@remix-run/react";
import { Button } from "./Button";
import { useEffect, useRef, useState } from "react";
import { unsubscribe, subscribe } from "~/utils/events";

interface ICreateLessonModal {
  teacherId: string;
  classId: string;
  startTime: string;
  endTime: string;
}
export default function CreateLessonModal({
  teacherId,
  classId,
  startTime,
  endTime,
}: ICreateLessonModal) {
  return (
    <Form method="post">
      <DropdownMenu
        hasEmptyOption={true}
        emptyOptionTitle="---"
        options={LESSON_TYPES}
        label="Оберіть предмет"
        name="lesson_type"
        controlled={false}
        required={true}
      />
      <TextInput
        label="Оберіть тему уроку"
        name="lesson_topic"
        required={true}
        controlled={false}
      />
      <TextInput label="Короткий опис уроку" name="lesson_description" />
      <TextInput label="Місце проведення" name="lesson_location" />
      <div>
        Preselected start time
        <input type="text" name="start_time" defaultValue={startTime} />
      </div>
      <div>
        Preselected end time
        <input type="text" name="end_time" defaultValue={endTime} />
      </div>
      <div>
        Preselected classroomId
        <input type="text" name="teacher_id" defaultValue={teacherId} />
      </div>
      <div>
        Preselected teacher
        <input type="text" name="class_id" defaultValue={classId} />
      </div>
      <Button label="submit" />
      <p>* - обов’язкові поля</p>
    </Form>
  );
}
