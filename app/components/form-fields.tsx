import { useEffect, useState } from "react";

interface FormFieldProps {
  htmlFor: string;
  label: string;
  ariaLabel: string;
  ariaRequired: boolean;
  type?: string;
  value: any;
  onChange?: (...args: any) => any;
  error?: string;
}

export function FormField({
  htmlFor,
  label,
  ariaLabel,
  ariaRequired,
  type = "text",
  value,
  onChange = () => {},
  error = "",
}: FormFieldProps) {
  const [errorText, setErrorText] = useState(error);
  
  useEffect(() => {
    setErrorText(error);
  }, [error]);
  return (
    <>
      <label htmlFor={htmlFor} className="font-semibold">
        {label}
      </label>
      <input
        onChange={e => {
          onChange(e)
          setErrorText('')
        }}
        aria-label={ariaLabel}
        aria-required={ariaRequired}
        type={type}
        id={htmlFor}
        name={htmlFor}
        autoComplete={htmlFor}
        className="w-full p-2 rounded-xl my-2"
        value={value}
      />
        <div role="alert" className="text-xs font-semibold text-center tracking-wide text-red-500 w-full">
            {errorText || ''}
        </div>

    </>
  );
}
