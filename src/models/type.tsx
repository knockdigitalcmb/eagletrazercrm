export interface LoginForm {
  employeeID: string;
  password: string;
}

export interface CreateUserType{
  employeeId:string
  userId: string;
  userName: string;
  phoneNumber: string;
  email: string;
  location: string;
  address: string;
  password: string;
  profileImage: string;
  joiningDate: string;
  previousCompany: string;
  experienceYears: number | null; 
  experienceMonths: number | null;
  role:string;
  otpPageView: boolean;
  employeeView: boolean;
  employeeAdd: boolean;
  employeeEdit: boolean;
  employeeDelete: boolean;
  leadsView: boolean;
  leadsAdd: boolean;
  leadsEdit: boolean;
  leadsDelete: boolean;
  developerView: boolean;
  developerAdd: boolean;
  developerEdit: boolean;
  developerDelete: boolean;
  
}