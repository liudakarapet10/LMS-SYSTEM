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
    <div className="flex py-1 border border-black border-collapse">
      <label className="h-full flex flex-col justify-center pr-2" htmlFor={id}>
        {required && "*"}
        {label}
      </label>
      {/* todo - need refactor */}
      {controlled ? (
        <input
          type="text"
          name={name}
          id={id}
          required={required}
          value={inputValue}
          onChange={onInputChange}
        />
      ) : (
        <input type="text" name={name} id={id} required={required} />
      )}
    </div>
  );
};
