import { Student as IStudent } from "@prisma/client";

interface columnCountProps {
  columnCount: number;
  classWithStudents: any;
}

export default function DymanicTable({
  columnCount,
  classWithStudents,
}: columnCountProps) {
  let columns = Array.from(
    { length: columnCount },
    (_, index: number) => index + 1
  );

  return (
    <div>
      <table>
        <thead>
          <tr className="border">
            <th className="border">Учні</th>
            {columns.map((column, index) => (
              <th className="border" key={index}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {classWithStudents && classWithStudents?.students?.length > 0 && (
            <tr>
              {classWithStudents.students.map((e) => (
                <th key={e.id}>
                  {e.profile.firstName}--{e.profile.lastName}
                </th>
              ))}
              {columns.map((column, index) => (
                <th className="border" key={index}>
                
                </th>
              ))}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
