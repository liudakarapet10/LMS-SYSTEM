import React, { Fragment, useEffect, useState } from "react";
import { Modal } from "./modal";
import { MarkForm } from "./MarkForm";
import {
  findMarkOfLessonDateAndStudentId,
formColumnsByLessons,
  getAttributtes,
  isLessonInThisDate,
} from "~/helpers/school-dairy-helpers";
import type {
  DaysWithLessons,
  IClassroomWithStudents,
  ILessonWithMarks,
} from "~/types/project.types";
import { Role } from "@prisma/client";

interface columnCountProps {
  columnCount: number;
  classWithStudents: IClassroomWithStudents;
  lessons: ILessonWithMarks[];
  userType: Role;
}

export default function DymanicTable({
  columnCount,
  classWithStudents,
  lessons,
  userType,
}: columnCountProps) {
  let columns = Array.from(
    { length: columnCount },
    (_, index: number) => index + 1
  );

  // todo - only for 1 Lesson type !!!!!!!!! (+ connected to teacher)
  const [daysWithLessons, setDaysWithLessons] = useState<DaysWithLessons | []>(
    []
  );
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [lessonId, setLessonId] = useState<string>("");
  const [studentId, setStudentId] = useState<string>("");
  const [teacherId, setTeacherId] = useState<string>("");
  const [markId, setMarkId] = useState<string>("");

  const [selectedCell, setSelectedCell] = useState<{
    row: number;
    column: number;
  }>({ row: 0, column: 0 });

  useEffect(() => {
    setDaysWithLessons(() => formColumnsByLessons(lessons));
  }, [lessons]);

  const handleClick = (e: React.SyntheticEvent<EventTarget>) => {
    if (userType === "student") return;
    setIsOpenModal(!isOpenModal);

    if (!e?.target || !(e.target instanceof HTMLButtonElement)) return;

    if (
      e.target.dataset.lessonId &&
      e.target.dataset.studentId &&
      e.target.dataset.teacherId
    ) {
      setLessonId(e.target.dataset.lessonId);
      setStudentId(e.target.dataset.studentId);
      setTeacherId(e.target.dataset.teacherId);
    } else {
      setLessonId("");
      setStudentId("");
      setTeacherId("");
    }

    if (e.target.dataset.markId) {
      setMarkId(e.target.dataset.markId);
    } else {
      setMarkId("");
    }
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <Fragment>
      <div className="rounded-b-lg w-full overflow-x-scroll" id="table-wrapper">
        <React.Fragment>
          <table className="w-full border-collapse border-2 border-black bg-white">
            <thead>
              <tr className="border-2 border-black">
                <th className="border-2 border-black">Учні</th>
                {columns.map((column) => (
                  <th
                    className="border-2 border-black min-w-[25px]"
                    key={column}
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {classWithStudents &&
                classWithStudents?.students?.length > 0 &&
                classWithStudents.students.map((e, rowIndex) => (
                  <tr
                    key={e.id}
                    className={`border-2 border-black ${
                      rowIndex === selectedCell.row ? "selected-row" : ""
                    }`}
                  >
                    <th>
                      {e.profile.firstName} {e.profile.lastName}
                    </th>
                    {columns.map((column, columnIndex) => (
                      <td
                        className={`border-2 border-black h-[2rem] hover:outline-2 hover:outline-blue-500 ${
                          rowIndex === selectedCell.row &&
                          columnIndex === selectedCell.column
                            ? "selected-cell"
                            : ""
                        }`}
                        key={columnIndex}
                      >
                        {daysWithLessons &&
                          isLessonInThisDate(column, daysWithLessons) && (
                            <button
                              type="button"
                              onClick={(e) => {
                                handleClick(e);
                              }}
                              className="block w-full h-full bg-yellow-100"
                              data-teacher-id={
                                getAttributtes(column, daysWithLessons)
                                  ?.teacherId
                              }
                              data-student-id={e.id}
                              data-lesson-id={
                                getAttributtes(column, daysWithLessons)
                                  ?.lessonId
                              }
                              data-mark-id={
                                findMarkOfLessonDateAndStudentId(
                                  column,
                                  e.id,
                                  daysWithLessons
                                )?.id
                              }
                            >
                              {findMarkOfLessonDateAndStudentId(
                                column,
                                e.id,
                                daysWithLessons
                              )?.value
                                ? findMarkOfLessonDateAndStudentId(
                                    column,
                                    e.id,
                                    daysWithLessons
                                  )?.value
                                : "+"}
                            </button>
                          )}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
            <Modal
              isOpenModal={isOpenModal}
              handleClick={handleClick}
              className="w-2/3 p-10"
            >
              <MarkForm
                lessonId={lessonId}
                studentId={studentId}
                teacherId={teacherId}
                markId={markId}
                onCloseModal={handleCloseModal} 
              />
            </Modal>
          </table>
        </React.Fragment>
      </div>
    </Fragment>
  );
}
