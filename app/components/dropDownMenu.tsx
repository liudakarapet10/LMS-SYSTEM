import { useId } from "react";

export interface Option {
  value: string;
  label: string;
}

interface DropdownMenuProps {
  options: Option[];
  label?: string;
  name: string;
  hasEmptyOption?: boolean;
  emptyOptionTitle?: string;
  controlled: boolean;
  // for uncontrolled input
  defaultValue?: string;
  // for controlled Input
  inputValue?: string | number;
  onInputChange?: (e: any) => void;
}

export const DropdownMenu = ({
  options = [],
  label,
  name,
  hasEmptyOption = false,
  emptyOptionTitle = "Please select",
  controlled = false,
  defaultValue,
  inputValue,
  onInputChange,
}: DropdownMenuProps) => {
  const id = useId();
  return (
    <div className="flex">
      <label className="h-full flex flex-col justify-center pr-2" htmlFor={id}>
        {label}
      </label>
      {/* todo - need refactor */}
      {controlled ? (
        <select name={name} id={id} value={inputValue} onChange={onInputChange}>
          {hasEmptyOption && <option value="">{emptyOptionTitle}</option>}
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      ) : (
        <select name={name} id={id}>
          {hasEmptyOption && <option value="">{emptyOptionTitle}</option>}
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};
