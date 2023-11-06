import { useId } from "react";

// export interface Option {
//   value: string;
//   label: string;
// }

 interface ICustomDateInput {
//    options: Option[];
   label?: string;
   name: string;
//    hasEmptyOption?: boolean
//    emptyOptionTitle?: string
 }

export const CustomDateInput = ({ label, name }: ICustomDateInput) => {
  const id = useId();
  return (
    <div className="flex">
        <label className="h-full flex flex-col justify-center pr-2" htmlFor={id}>{label}</label>
        <input type="month" name={name} id={id}/>
    </div>
  );
};
