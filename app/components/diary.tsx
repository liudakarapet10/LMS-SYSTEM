import React from 'react';
import {SchoolDiaryToolbar} from './schoolDiaryToolbar';
import ManageToolBar from './manageToolBar';

interface LessonData {
  lesson: string;
  students: string[];
  dates: string[];
  evaluations: string[];
}

 export default function SchoolDiary() {
  return (
    <div>
     <ManageToolBar/>
     <SchoolDiaryToolbar />
    </div>
  );
}