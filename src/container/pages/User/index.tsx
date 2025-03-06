import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  TextField,
  Drawer,
  Divider,
  ListItemIcon,
  ListItemText,
  Checkbox,
  MenuItem as SelectMenuItem,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { pageSizeOptions } from '../../../constant/common.constant';
import SidePanel from '../../../components/SidePanel';
import CRMTable from '../../../components/CRMTable';

import styles from './User.module.scss';

const ITEM_HEIGHT = 48;

const User = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [userLoader, setUserLoader] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('Active');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>('Active');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const open = Boolean(anchorEl);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>, user: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleView = () => {
    setIsModalOpen(true);
    handleClose();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEdit = () => {
    if (selectedUser) {
      navigate('/create-user', { state: { user: { ...selectedUser } } });
    }
    handleClose();
  };

  const handleFilterOpen = () => {
    setIsFilterOpen(true);
  };
  const handleReset = () => {
    setSelectedStatus('Active');
    setStatusFilter('Active');
  };
  // Apply filter
  const handleSubmit = () => {
    setStatusFilter(selectedStatus);
    setIsFilterOpen(false);
  };

  const handleFilterClose = () => {
    setIsFilterOpen(false);
  };

  // Update to use SelectChangeEvent
  const handleStatusChange = (status: string) => {
    setStatusFilter(status);
    setSelectedStatus(status);
  };

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    setUsers(storedUsers);
  }, []);

  useEffect(() => {
    if (users.length) {
      localStorage.setItem('users', JSON.stringify(users));
    }
  }, [users]);

  const filteredUsers = users.filter((user) => {
    const search = searchTerm.trim().toLowerCase();

    if (!user) return false;

    const matchesSearchTerm =
      (user.employeeId?.toLowerCase().includes(search) ?? false) ||
      (user.userName?.toLowerCase().includes(search) ?? false) ||
      (user.phoneNumber?.toLowerCase().includes(search) ?? false);

    const matchesStatusFilter = !statusFilter || user.status === statusFilter;

    return matchesSearchTerm && matchesStatusFilter;
  });

  const rows = filteredUsers.map((user, index) => ({
    id: index + 1,
    employeeId: user.employeeId,
    userName: user.userName,
    role: user.role,
    phoneNumber: user.phoneNumber,
    email: user.email,
    location: user.location,
    address: user.address,
    status: user.status || 'Active',
  }));

  const columns: any = [
    { field: 'id', headerName: 'S.No', width: 80 },
    { field: 'employeeId', headerName: 'Employee ID' },
    { field: 'userName', headerName: 'User Name' },
    { field: 'role', headerName: 'Role' },
    { field: 'phoneNumber', headerName: 'Phone Number', width: 150 },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'location', headerName: 'Location', width: 120 },
    { field: 'address', headerName: 'Address', width: 120 },
    { field: 'status', headerName: 'Status' },
    {
      field: '',
      headerName: 'Action',
      renderCell: (params: any) => (
        <>
          <IconButton
            aria-label='more'
            id='action-button'
            aria-controls={open ? 'action-menu' : undefined}
            aria-haspopup='true'
            onClick={(event) => handleClick(event, params.row)}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id='action-menu'
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            sx={{
              '& .MuiPaper-root': {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: '20ch',
              },
            }}
          >
            <MenuItem onClick={handleView}>View</MenuItem>
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
            <MenuItem onClick={handleClose}>Delete</MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  return (
    <Box data-testid='create-user' className={styles.dashboardContainer}>
      <SidePanel menu={t('user')} />
      <Box component='main' sx={{ flexGrow: 1, p: 3, marginTop: '70px' }}>
        <Box className={styles.createUserButton}>
          <Button
            onClick={() => navigate('/create-user')}
            variant='contained'
            color='primary'
          >
            {t('createUser')}
          </Button>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
          <TextField
            placeholder='Search by Employee ID, Name, or Phone Number'
            value={searchTerm}
            onChange={handleSearchChange}
            fullWidth
          />

          <Button
            variant='contained'
            color='primary'
            onClick={handleFilterOpen}
            startIcon={<FilterAltIcon />}
          >
            Filter
          </Button>

          <Drawer
            anchor='right'
            open={isFilterOpen}
            onClose={handleFilterClose}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: 250,
                height: '100vh',
                p: 2,
              }}
            >
              <Typography variant='h6'>Filter</Typography>
              <Divider />
              <Box sx={{ flexGrow: 1 }}>
                <MenuItem onClick={() => handleStatusChange('Active')}>
                  <ListItemIcon>
                    <Checkbox checked={selectedStatus === 'Active'} />
                  </ListItemIcon>
                  <ListItemText primary='Active' />
                </MenuItem>

                <MenuItem onClick={() => handleStatusChange('Inactive')}>
                  <ListItemIcon>
                    <Checkbox checked={selectedStatus === 'Inactive'} />
                  </ListItemIcon>
                  <ListItemText primary='Inactive' />
                </MenuItem>
              </Box>

              <Divider />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mt: 'auto',
                  pb: 2,
                }}
              >
                <Button variant='outlined' onClick={handleReset}>
                  Reset
                </Button>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </Drawer>
        </Box>

        <Box>
          <CRMTable
            rows={users}
            columns={columns}
            pageSizeOptions={pageSizeOptions}
            loading={userLoader}
            checkboxSelection={false}
          />
        </Box>

        {/* Modal for Basic Information */}
        <Dialog
          open={isModalOpen}
          onClose={handleCloseModal}
          fullWidth
          maxWidth='sm'
        >
          <DialogTitle>
            Basic Information
            <IconButton
              aria-label='close'
              onClick={handleCloseModal}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            {selectedUser ? (
              <Box>
                <Typography>Employee ID:</Typography>
                <Typography>{selectedUser.employeeId}</Typography>

                <Typography sx={{ mt: 2 }}>User Name:</Typography>
                <Typography>{selectedUser.userName}</Typography>

                <Typography sx={{ mt: 2 }}>Role:</Typography>
                <Typography>{selectedUser.role}</Typography>

                <Typography sx={{ mt: 2 }}>Phone Number:</Typography>
                <Typography>{selectedUser.phoneNumber}</Typography>

                <Typography sx={{ mt: 2 }}>Email:</Typography>
                <Typography>{selectedUser.email}</Typography>

                <Typography sx={{ mt: 2 }}>Location:</Typography>
                <Typography>{selectedUser.location}</Typography>

                <Typography sx={{ mt: 2 }}>Address:</Typography>
                <Typography>{selectedUser.address}</Typography>

                <Typography sx={{ mt: 2 }}>Status:</Typography>
                <Typography>{selectedUser.status}</Typography>
              </Box>
            ) : (
              <Typography>No user selected</Typography>
            )}
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  );
};

export default User;
