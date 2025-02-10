import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';

export const sideBarNavMenus = [
  { name: 'Dashboard', icon: <HomeOutlinedIcon /> },
  { name: 'User', icon: <GroupOutlinedIcon /> },
];

export const userPermissionOptions = [
  { key: 'otpPage', label: 'OTP Page', actions: ['View'] },
  {
    key: 'leads',
    label: 'Leads',
    actions: ['View', 'Add', 'Edit', 'Delete'],
  },
  {
    key: 'user',
    label: 'User',
    actions: ['View', 'Add', 'Edit', 'Delete', 'Upload'],
  },
  {
    key: 'developer',
    label: 'Developer',
    actions: ['View', 'Add', 'Edit', 'Delete'],
  },
];

export const userRoleOptions = ['Admin', 'Lead', 'User', 'Developer'];
