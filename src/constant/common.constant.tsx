import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';

export const sideBarNavMenus = [
  { name: 'Dashboard', icon: <HomeOutlinedIcon /> },
  { name: 'User', icon: <GroupOutlinedIcon /> },
];

export const userPermissionOptions = {
  otpPage: {
    label: 'OTP Page',
    actions: {
      view: false,
    },
  },
  leads: {
    label: 'Leads',
    actions: {
      view: false,
      add: false,
      edit: false,
      delete: false,
    },
  },
  user: {
    label: 'User',
    actions: {
      view: false,
      add: false,
      edit: false,
      delete: false,
    },
  },
  developer: {
    label: 'Developer',
    actions: {
      view: false,
      add: false,
      edit: false,
      delete: false,
    },
  },
};

export const userRoleOptions = ['Admin', 'Lead', 'User', 'Developer'];
export const pageSizeOptions = [10, 25, 50, 100];
