export function formOptionsFromArray(arr: any, value: string, label: string) {
  const optionArray =
    arr.map((el) => ({ value: el[value], label: el[label] })) ?? [];
  return optionArray;
}