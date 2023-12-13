import React from "react";
import { useId } from "react";

interface Option {
  value: string;
  label: string;
}

interface DropdownMenuProps {
  options: Option[];
  label?: string;
  name: string;
  hasEmptyOption?: boolean;
  emptyOptionTitle?: string;
  required?: boolean;
  controlled?: boolean;
  defaultValue?: string;
  inputValue?: string | number;
  ariaLabel: string;
  ariaRequired: boolean
  onInputChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  options = [],
  label,
  name,
  hasEmptyOption = false,
  emptyOptionTitle = "Будь ласка оберіть",
  required = false,
  controlled = false,
  defaultValue,
  inputValue,
  onInputChange,
  ariaLabel,
  ariaRequired
}: DropdownMenuProps) => {
  const id = useId();

  return (
    <div className="flex flex-col">
      <label className="text-black font-extrabold" htmlFor={id}>
        {required && <span className="text-black-500 mr-1">*</span>}
        {label}
      </label>

      <select
        name={name}
        id={id}
        value={inputValue}
        onChange={onInputChange}
        required={required}
        className="w-full p-2 rounded-xl my-2"
        aria-label={ariaLabel}
        aria-required={ariaRequired}
      >
        {hasEmptyOption && <option value="">{emptyOptionTitle}</option>}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
};
