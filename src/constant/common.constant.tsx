import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import SourceIcon from '@mui/icons-material/Source';

export const sideBarNavMenus = [
  { name: 'Dashboard', icon: <HomeOutlinedIcon /> },
  { name: 'User', icon: <GroupOutlinedIcon /> },
  { name: 'Roles', icon: <ManageAccountsOutlinedIcon /> },
  {
    name: 'Leads',
    icon: <Diversity3Icon />,
    children: [
      { name: 'Lead Source', icon: <SourceIcon />, url: 'lead-source' },
    ],
  },
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
export const kebabMenuOptions = ['View', 'Edit', 'Delete'];
export const filterStatus = ['Active', 'InActive'];
