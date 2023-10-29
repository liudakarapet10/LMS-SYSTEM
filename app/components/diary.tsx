import React from 'react';
import {SchoolDiaryToolbar} from './schoolDiaryToolbar';

interface LessonData {
  lesson: string;
  students: string[];
  dates: string[];
  evaluations: string[];
}

 export default function SchoolDiary() {
  return (
    <div>
     <SchoolDiaryToolbar />
    </div>
  );
}