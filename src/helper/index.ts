//get users initials
export const getUsersInitials = (input: string) => {
  return input
    .split(' ')
    .map((n) => n[0])
    .join('');
};

//capitalize first letter
export const capitalizeFirstLetter = (val: string) => {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
};

//sting eclipse
export const getStringEclipse = (input: string, char: number) => {
  return input && input.length > char
    ? `${input.substring(0, char)}...`
    : input;
};
