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
    <div>
        <label htmlFor={id}>{label}</label>
        <input type="month" name={name} id={id}/>
    </div>
  );
};
