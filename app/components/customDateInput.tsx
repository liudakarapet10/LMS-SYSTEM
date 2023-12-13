import { useId } from "react";

// export interface Option {
//   value: string;
//   label: string;
// }

 interface ICustomDateInput {
//    options: Option[];
   label?: string;
   name: string;
   ref?:  React.RefObject<HTMLInputElement>;
//    hasEmptyOption?: boolean
//    emptyOptionTitle?: string
 }

export const CustomDateInput = ({ label, name }: ICustomDateInput) => {
  const id = useId();
  return (
    <div className="flex flex-col justify-center">
        <label className="text-black font-extrabold" htmlFor={id}>{label}</label>
        <input type="month" name={name} id={id} className="w-full p-2 rounded-xl my-2"/>
    </div>
  );
};
