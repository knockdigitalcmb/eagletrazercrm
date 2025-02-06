import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';

export const userPermissionOptions = [
  { key: 'otpPage', label: 'OTP Page', actions: ['View'] },
  {
    key: 'leads',
    label: 'Leads',
    actions: ['View', 'Add', 'Edit', 'Delete'],
  },
  {
    key: 'employee',
    label: 'Employee',
    actions: ['View', 'Add', 'Edit', 'Delete'],
  },
  {
    key: 'developer',
    label: 'Developer',
    actions: ['View', 'Add', 'Edit', 'Delete'],
  },
];

export const menuItems = [
  { name: 'Dashboard', icon: <HomeOutlinedIcon/> },
  { name: 'User', icon: <PersonAddAltOutlinedIcon /> },
];

export const userRoleOptions = ['Admin', 'Lead', 'Employee', 'Developer'];
