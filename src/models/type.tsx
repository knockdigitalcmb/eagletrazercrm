export interface LoginForm {
  employeeID: string;
  password: string;
}

export interface CreateUserType {
  employeeID: string;
  userID: string;
  userName: string;
  phoneNumber: string;
  email: string;
  location: string;
  address: string;
  password: string;
  profileImage: string;
  joiningDate: string;
  previousCompany: string;
  experienceInYears: number | null;
  experienceInMonths: number | null;
  role: string;
}

export interface IUserPermissionIndex {
  [key: string]: any;
}

export interface UserProps {
  id: number;
  employeeId: string;
  userName: string;
  role: string;
  phoneNumber: string;
  email: string;
  location: string;
  address: string;
  status: string;
  dateOfJoining: string;
};
