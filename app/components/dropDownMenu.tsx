import { useId } from "react";

export interface Option {
  value: string;
  label: string;
}

 interface DropdownMenuProps {
   options: Option[];
   label?: string;
   name: string;
   hasEmptyOption?: boolean
   emptyOptionTitle?: string
   defaultValue?: string
 }

export const DropdownMenu = ({ options = [], label, name , hasEmptyOption = false, emptyOptionTitle = 'Please select', defaultValue }: DropdownMenuProps) => {
  const id = useId();
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <select name={name} id={id} >
        {hasEmptyOption && <option value="">{emptyOptionTitle}</option>}
        {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
        ))
        }
      </select>
    </div>
  );
};
