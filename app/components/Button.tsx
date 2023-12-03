interface IButton {
  label: string;
  ariaLabel?: string;
  ariaRequired?: boolean;
  style?: 'primary' | 'secondary';
  type?: "button" | "submit";
  onPress?: () => void;
  onClick?: () => void;
}

const primaryStyles = 'bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
const secondaryStyles = 'bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400'



export const Button = ({ label, type = "submit", onPress , style = 'primary', ariaLabel, ariaRequired=true }: IButton) => {
  let btnStyles = ''
  switch (style) {
    case 'primary':
      btnStyles = primaryStyles
      break;
      case 'secondary':
        btnStyles = secondaryStyles
        break;
    default:
      break;
  }
  return (
    <button
      type={type}
      onClick={onPress}
      aria-label={ariaLabel}
      aria-required={ariaRequired}
      className={btnStyles}>
      {label}
    </button>
  );
};
