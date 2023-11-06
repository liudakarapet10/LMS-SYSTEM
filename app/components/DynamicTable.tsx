import { redirect } from "@remix-run/node";
import type { MouseEvent} from "react";
import React, { useEffect, useRef, useState } from "react";
import { Portal } from "~/components/portal";
import { Modal } from "./modal";
import { MarkForm } from "./MarkForm";

interface columnCountProps {
  columnCount: number;
  classWithStudents: any;
  lessons: any;
}

// todo - filter by Lesson type
//
export default function DymanicTable({
  columnCount,
  classWithStudents,
  lessons
}: columnCountProps) {
  let columns = Array.from(
    { length: columnCount },
    (_, index: number) => index + 1
  );

  const cellAttributes  = useRef<HTMLParagraphElement | null>(null);

  const handleCellClick = (event: MouseEvent<HTMLTableElement>) => {
    // setIsOpenModal(true);
  };

  const getCellAtributes = () => {
    if (cellAttributes.current){
      const teacherId = cellAttributes.current.getAttribute('data-teacher-id');
      const studentId = cellAttributes.current.getAttribute('data-student-id');
      const lessonId = cellAttributes.current.getAttribute('data-lesson-id');

      return {teacherId, studentId, lessonId };
    }

  }


  // todo - only for 1 Lesson type !!!!!!!!! (+ connected to teacher)
  const [daysWithLessons, setDaysWithLessons] = useState([]);
  const convertTimeToDate = (date) => {
    return new Date(date).getDate();
  };

  const formColumnsByLessons = (lessons1) => {
    let columnsWithLessonId = [];
    lessons1.forEach((e) => {
      const column = {
        date: convertTimeToDate(e.startTime),
        lessonId: e.id,
        marks: e.marks,
        teacherId: e.teacherId,
      };
      columnsWithLessonId.push(column);
    });
    return columnsWithLessonId;
  };
  // form dates by lessons
  // "2023-11-04T15:24:12.277Z"

  useEffect(() => {
    const arr = formColumnsByLessons(lessons);
    setDaysWithLessons(arr);
  }, []);

  const isLessonInThisDate = (date) => {
    return daysWithLessons.find((e) => e.date === date) ? true : false;
  };
  const findMarkOfLessonDateAndStudentId = (lessonDate, studentID) => {
    const lesson = daysWithLessons.find((e) => e.date === lessonDate);
    if (!lesson) return;
    if (lesson?.marks.length < 0) return;
    const mark = lesson?.marks.find((e) => e.studentId === studentID);
    if (!mark) return;

    return mark.value;
  };

  const getLessonId = (lessonDate) => {
    const lesson = daysWithLessons.find((e) => e.date === lessonDate);
    if (!lesson) return;
    return lesson.lessonId;
  };

  const getTeacherId = (lessonDate) => {
    const lesson = daysWithLessons.find((e) => e.date === lessonDate);
    if (!lesson) return;
    return lesson.teacherId;
  };

  const [isOpenModal, setIsOpenModal] = useState(false);





  const handleClick = () => {
    console.log('s')
    setIsOpenModal(!isOpenModal);
  };
  useEffect(()=>{
    console.log("useeffect", isOpenModal)
  },[isOpenModal])

  return (
    <div className="rounded-b-lg">
      <table
        onClick={handleClick}
        className="w-full border-collapse border bg-white"
      >
        <thead>
          <tr className="border">
            <th className="border">Учні</th>
            {columns.map((column) => (
              <th className="border min-w-[25px]" key={column}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {classWithStudents &&
            classWithStudents?.students?.length > 0 &&
            classWithStudents.students.map((e) => (
              <tr key={e.id} className="border">
                <th>
                  {e.profile.firstName} {e.profile.lastName}
                </th>
                {columns.map((column, index) => (
                  <td className="border" key={index}>
                    {daysWithLessons && isLessonInThisDate(column) && (
                      <p
                        className="block w-full h-full"
                        ref={cellAttributes}
                        data-teacher-id={getTeacherId(column)}
                        data-student-id={e.id}
                        data-lesson-id={getLessonId(column)}
                      >
                        {" "}
                        q{findMarkOfLessonDateAndStudentId(column, e.id)}
                      </p>
                    )}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
        <Portal wrapperId="marks-modal">
          <Modal isOpenModal={isOpenModal} handleClick={handleClick} className="w-2/3 p-10">
            <MarkForm dataId={getCellAtributes} />
          </Modal>
        </Portal>
      </table>
    </div>
  );
}
