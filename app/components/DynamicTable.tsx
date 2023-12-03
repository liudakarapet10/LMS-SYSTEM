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
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { Role } from "@prisma/client";

interface columnCountProps {
  columnCount: number;
  classWithStudents: IClassroomWithStudents;
  lessons: ILessonWithMarks[];
  userType: Role;
}

// todo - filter by Lesson type
//
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

    if (
      !e?.target ||
      (!(e.target instanceof HTMLParagraphElement) &&
        !(e.target instanceof HTMLSpanElement))
    )
      return;

    if (
      e.target.dataset.lessonId &&
      e.target.dataset.studentId &&
      e.target.dataset.teacherId
    ) {
      console.log("tstst");
      setLessonId(e.target.dataset.lessonId);
      setStudentId(e.target.dataset.studentId);
      setTeacherId(e.target.dataset.teacherId);
    } else if (e.target.dataset.markId) {
      setMarkId(e.target.dataset.markId);
    }
  };

  useEffect(() => {
    // console.log("useeffect", isOpenModal)
  }, [isOpenModal]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          setSelectedCell((prev) => ({
            row: Math.max(0, prev.row - 1),
            column: prev.column,
          }));
          break;
        case "ArrowDown":
          setSelectedCell((prev) => ({
            row: Math.min(
              classWithStudents?.students?.length - 1 || 0,
              prev.row + 1
            ),
            column: prev.column,
          }));
          break;
        case "ArrowLeft":
          setSelectedCell((prev) => ({
            row: prev.row,
            column: Math.max(0, prev.column - 1),
          }));
          break;
        case "ArrowRight":
          setSelectedCell((prev) => ({
            row: prev.row,
            column: Math.min(columnCount - 1, prev.column + 1),
          }));
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [columnCount, classWithStudents?.students?.length]);

  return (
    <Fragment>
      <div className="rounded-b-lg">
        <TransformWrapper
          initialScale={1}
          initialPositionX={0}
          initialPositionY={0}
        >
          {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
            <React.Fragment>
              <div className="tools">
                <button onClick={() => zoomIn()}>+</button>
                <button onClick={() => zoomOut()}>-</button>
                <button onClick={() => resetTransform()}>x</button>
              </div>
              <TransformComponent>
                <table className="w-full border-collapse border bg-white">
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
                      classWithStudents.students.map((e, rowIndex) => (
                        <tr
                          key={e.id}
                          className={`border ${
                            rowIndex === selectedCell.row ? "selected-row" : ""
                          }`}
                        >
                          <th>
                            {e.profile.firstName} {e.profile.lastName}
                          </th>
                          {columns.map((column, columnIndex) => (
                            <td
                              className={`border ${
                                rowIndex === selectedCell.row &&
                                columnIndex === selectedCell.column
                                  ? "selected-cell"
                                  : ""
                              }`}
                              key={columnIndex}
                            >
                              {daysWithLessons &&
                                isLessonInThisDate(column, daysWithLessons) && (
                                  <p
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
                                  >
                                    &nbsp;
                                    <span
                                      className="block w-full h-full"
                                      onClick={(e) => {
                                        handleClick(e);
                                      }}
                                      data-mark-id={
                                        findMarkOfLessonDateAndStudentId(
                                          column,
                                          e.id,
                                          daysWithLessons
                                        )?.id
                                      }
                                    >
                                      {
                                        findMarkOfLessonDateAndStudentId(
                                          column,
                                          e.id,
                                          daysWithLessons
                                        )?.value
                                      }
                                    </span>
                                  </p>
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
                    />
                  </Modal>
                </table>
              </TransformComponent>
            </React.Fragment>
          )}
        </TransformWrapper>
      </div>
    </Fragment>
  );
}
function setSelectedCell(arg0: (prev: any) => { row: number; column: any }) {
  throw new Error("Function not implemented.");
}
