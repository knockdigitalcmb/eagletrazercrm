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
  userPermissions: {
    otpPage: boolean;
    leads: {
      view: boolean;
      add: boolean;
      edit: boolean;
      delete: boolean;
    };
    employee: {
      view: boolean;
      add: boolean;
      edit: boolean;
      delete: boolean;
    };
    developer: {
      view: boolean;
      add: boolean;
      edit: boolean;
      delete: boolean;
    };
  };
}
