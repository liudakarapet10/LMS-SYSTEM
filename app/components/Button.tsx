interface IButton {
  label: string;
  type?: "button" | "submit";
  onPress?: () => void;
}
export const Button = ({ label, type = "submit", onPress }: IButton) => {
  return (
    <button
      type={type}
      onClick={onPress}
      className="border p-1 mx-1 bg-green-100"
    >
      {label}
    </button>
  );
};
