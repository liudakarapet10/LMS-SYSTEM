import { useId } from "react";
interface ITextInput {
  label?: string;
  name: string;
  required?: boolean;
  controlled?: boolean;
  // for uncontrolled input
  defaultValue?: string;
  // for controlled Input
  inputValue?: string | number;
  onInputChange?: (e: any) => void;
}
export const TextInput = ({
  label,
  name,
  required = false,
  controlled = false,
  defaultValue,
  inputValue,
  onInputChange,
}: ITextInput) => {
  const id = useId();

  return (
    <div className="flex flex-col py-2">
    <label className="text-black mb-1" htmlFor={id}>
      {required && <span className="text-red-500">*</span>}
      {label}
    </label>
    {controlled ? (
      <input
        type="text"
        name={name}
        autoComplete={name}
        id={id}
        required={required}
        aria-required={required}
        value={inputValue}
        onChange={onInputChange}
        className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 text-black"
      />
    ) : (
      <input
        type="text"
        name={name}
        id={id}
        required={required}
        className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 text-black"
      />
    )}
  </div>
  );
};
