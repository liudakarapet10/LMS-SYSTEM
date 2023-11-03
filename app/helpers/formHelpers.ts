export function formOptionsFromArray(arr: any) {
  const optionArray =
    arr.map((el) => ({ value: el.name, label: el.name })) ?? [];
  return optionArray;
}
