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

export interface RoleProps {
  id: number;
  role: string;
  permission: {
    create: boolean;
    edit: boolean;
    view: boolean;
    delete: boolean;
  };
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

export interface DraggableDialogProps {
  open: boolean;
  onClose: () => void;
  onHandleContinue: () => void;
  title: string;
  titleDescription: string;
}
export interface PermissionProps {
  create: boolean;
  edit: boolean;
  delete: boolean;
  view: boolean;
}

export interface MenuProps{
    anchorEl: null | HTMLElement;
    rowId: number | null;
}
export interface ActionMenuProps {
  row: any;
  menuState: MenuProps;
  handleClick: (event: React.MouseEvent<HTMLElement>, rowId: number) => void;
  handleClose: () => void;
  onHandleViewModalOpen: (role: any) => void;
  onHandleEditModal: (role: any) => void;
  onHandleDeleteModal: (role: any) => void;
}