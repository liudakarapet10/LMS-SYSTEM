
import React, { useEffect, useState } from "react";
import { Modal } from "./modal";
import { MarkForm } from "./MarkForm";
import { formColumnsByLessons, getAttributtes, isLessonInThisDate } from "~/helpers/school-dairy-helpers";
import type { DaysWithLessons, IClassroomWithStudents, ILessonWithMarks } from "~/types/project.types";

interface columnCountProps {
  columnCount: number;
  classWithStudents: IClassroomWithStudents;
  lessons: ILessonWithMarks[];
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

  // todo - only for 1 Lesson type !!!!!!!!! (+ connected to teacher)
  const [daysWithLessons, setDaysWithLessons] = useState<DaysWithLessons | []>([]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [lessonId, setLessonId] = useState<string>('');
  const [studentId, setStudentId] = useState<string>(''); 
 
  useEffect(() => {
    setDaysWithLessons(() => formColumnsByLessons(lessons));
  }, [lessons]);




  




  const handleClick = (e: React.SyntheticEvent<EventTarget>) => {
    setIsOpenModal(!isOpenModal);
    
    if(!e?.target || !(e.target instanceof HTMLParagraphElement)) return
  
    if(e.target.dataset.lessonId && e.target.dataset.studentId) {
      setLessonId(e.target.dataset.lessonId)
      setStudentId(e.target.dataset.studentId)
    }

   
  };

  
  useEffect(()=>{
    console.log("useeffect", isOpenModal)
  },[isOpenModal])

  return (
    <div className="rounded-b-lg">
      <table
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
                    {daysWithLessons && isLessonInThisDate(column, daysWithLessons) && (
                      <p
                      onClick={(e) => {handleClick(e)}}
                        className="block w-full h-full"
                        data-teacher-id={getAttributtes(column, daysWithLessons)?.lessonId}
                        data-student-id={e.id}
                        data-lesson-id={getAttributtes(column, daysWithLessons)?.teacherId}
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
          <Modal isOpenModal={isOpenModal}  handleClick={handleClick} className="w-2/3 p-10">
            <MarkForm lessonId={lessonId} studentId={studentId}  />
          </Modal>
      </table>
    </div>
  );
}
