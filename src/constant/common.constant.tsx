import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import SourceIcon from '@mui/icons-material/Source';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';

export const sideBarNavMenus = [
  { name: 'Dashboard', icon: <HomeOutlinedIcon /> },
  { name: 'User', icon: <GroupOutlinedIcon /> },
  { name: 'Roles', icon: <ManageAccountsOutlinedIcon /> },
  {
    name: 'Leads',
    icon: <Diversity3Icon />,
    children: [
      { name: 'Leads', icon: <WysiwygIcon />, url: 'leads' },
      { name: 'Lead Source', icon: <SourceIcon />, url: 'lead-source' },

      {
        name: 'Lead Status',
        icon: <AssignmentTurnedInIcon />,
        url: 'lead-status',
      },
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

export const leadSource = [
  { label: 'call next week', value: 'call next week' },
  { label: 'call tomorrow', value: 'call tomorrow' },
  { label: 'call next week', value: 'call next week' },
];

export const leadStatus = [
  { label: 'FaceBook ad', value: 'FaceBook ad' },
  { label: 'Direct call', value: 'Direct call' },
  { label: 'Reference', value: 'Reference' },
];

export const leadStatuses = [
  { label: 'New', value: 'new' },
  { label: 'Contacted', value: 'contacted' },
  { label: 'Qualified', value: 'qualified' },
  { label: 'Proposal Sent', value: 'proposal_sent' },
  { label: 'Negotiation', value: 'negotiation' },
  { label: 'Won', value: 'won' },
  { label: 'Lost', value: 'lost' },
];
export const leadFollower = [
  { label: 'Vaishnavi', value: 'Vaishnavi' },
  { label: 'Jhanani', value: 'Jhanani' },
  { label: 'Muthu', value: 'Muthu' },
];
