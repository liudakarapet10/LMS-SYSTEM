interface IButton {
  label: string;
  ariaLabel?: string;
  ariaRequired?: boolean;
  style?: 'primary' | 'secondary';
  type?: "button" | "submit";
  onPress?: () => void;
  onClick?: () => void;
}

const primaryStyles = 'button'
const secondaryStyles = 'bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400'

export const Button = ({ label, type = "submit", onPress , style = 'primary', ariaLabel, ariaRequired=true }: IButton) => {

  return (
    <button
      type={type}
      onClick={onPress}
      aria-label={ariaLabel}
      aria-required={ariaRequired}
      className={style === 'primary' ? primaryStyles : secondaryStyles}>
      {label}
    </button>
  );
};
