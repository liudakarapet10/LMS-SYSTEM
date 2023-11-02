import { PrismaClient } from '@prisma/client';
import { ActionFunction, LoaderFunction, redirect, ActionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import React from 'react';
import { requireUserId } from '~/utils/auth.server';

// import { getAllClassroomId } from '~/utils/classroom.server';
import { createStudent } from '~/utils/student.server';



export const loader: LoaderFunction = async ({ request }) => {
  const prisma = new PrismaClient();

    const userId = await requireUserId(request);

    if (!userId) {
        return null;
    }

    const classRooms = await prisma.classroom.findMany();
    console.log(classRooms);


  return classRooms;

  };


//   export const action: ActionFunction = async ({ request }: ActionArgs) => {
//     const classroom = await getAllClassroomId(request);
//     const form = await request.formData();
//     const firstName = form.get("firstName");
//     const lastName = form.get("lastName");
//     const email = form.get("email");
//     const password = form.get("password");
   
  
//     // if (
//     //   typeof firstName !== "string" ||
//     //   typeof lastName !== "string" ||
//     //   typeof email !== "string" ||
//     //   typeof password !== "string" ||
//     // ) {
//     //   return json({ error: `Invalid Form Data` }, { status: 400 });
//     // }
  
//     await createStudent({
//       classroomId,
//       firstName,
//       lastName,
//       email,
//       password
//     });
    
//   };
  

 export default function manageToolBar() {
  const classRooms  = useLoaderData();
  console.log(classRooms);
  return (
    <div>
        <button>ДОДАТИ УЧНЯ</button>
     
    </div>
  );
}
