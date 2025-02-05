export const defaultLoginProps = {
  employeeID: '',
  password: '',
};

export const defaultCreateUserProps = {
  employeeID: '',
  userID: '',
  userName: '',
  phoneNumber: '',
  email: '',
  location: '',
  address: '',
  password: '',
  profileImage: '',
  joiningDate: '',
  previousCompany: '',
  experienceInYears: null,
  experienceInMonths: null,
  role: '',
  userPermissions: {
    otpPage: false,
    leads: {
      view: false,
      add: false,
      edit: false,
      delete: false,
    },
    employee: {
      view: false,
      add: false,
      edit: false,
      delete: false,
    },
    developer: {
      view: false,
      add: false,
      edit: false,
      delete: false,
    },
  },
};
