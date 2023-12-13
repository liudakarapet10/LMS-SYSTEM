import React, { FC } from 'react';

interface ClassroomSessionProps {
  index: number;
  type: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  location: string | null;
  topic: string;
  description: string | null;
}

const formatDateString = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString(); // You can customize the formatting as needed
};

const ClassroomSession: FC<ClassroomSessionProps> = ({
  index,
  type,
  startDate,
  endDate,
  startTime,
  endTime,
  location,
  topic,
  description,
}) => {
  return (
    <div className="bg-gray-100 rounded p-4 mb-4">
      <h2 className="text-xl font-bold mb-2">Урок {index}</h2>
      <p>Тема: {topic}</p>
      {description !== null && <p>Опис: {description}</p>}
      <p>Початок уроку: {formatDateString(startDate)} {startTime}</p>
      <p>Кінець уроку {formatDateString(endDate)} {endTime}</p>
      <p>Кабінет: {location}</p>
    </div>
  );
};

export default ClassroomSession;