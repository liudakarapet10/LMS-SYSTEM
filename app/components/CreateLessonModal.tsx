import { LESSON_TYPES } from "~/constants/lessonTypes";
import { DropdownMenu } from "./dropDownMenu";
import { TextInput } from "./TextInput";
import { Form } from "@remix-run/react";
import { Button } from "./Button";


interface ICreateLessonModal {
  teacherId: string;
  classId: string;
  startTime: string;
  endTime: string;
  onCloseModal: () => void;
}
export default function CreateLessonModal({
  teacherId,
  classId,
  startTime,
  endTime,
  onCloseModal
}: ICreateLessonModal) {

  const handleFormSubmit = async () => {
    onCloseModal();
  };

  return (
    <Form method="post" onSubmit={handleFormSubmit}>
      <DropdownMenu
        hasEmptyOption={true}
        emptyOptionTitle="---"
        options={LESSON_TYPES}
        label="Оберіть предмет"
        ariaLabel="Оберіть предмет"
        ariaRequired={true}
        name="lesson_type"
        controlled={false}
        required={true}
      />
      <TextInput
        label="Введіть тему уроку"
        name="lesson_topic"
        required={true}
        controlled={false}
      />
      <TextInput label="Напишіть короткий опис уроку" name="lesson_description" />
      <TextInput label="Місце проведення" name="lesson_location" />
        <input type="hidden" name="start_time" defaultValue={startTime} />
        <input type="hidden" name="end_time" defaultValue={endTime} />
        <input type="hidden" name="teacher_id" defaultValue={teacherId} />
        <input type="hidden" name="class_id" defaultValue={classId} />
      <Button type="submit" label="Додати урок" ariaLabel="Додати урок" ariaRequired={true} />
      <p>* - обов’язкові поля</p>
    </Form>
  );
}
