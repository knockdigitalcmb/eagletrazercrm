//get users initials
export const getUsersInitials = (input: string) => {
  return input
    .split(' ')
    .map((n) => n[0])
    .join('');
};
