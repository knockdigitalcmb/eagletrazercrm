import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Drawer,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  Typography,
  Divider,
  ListItemIcon,
  ListItemText,
  Grid2,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  pageSizeOptions,
  kebabMenuOptions,
} from '../../../constant/common.constant';
import SidePanel from '../../../components/SidePanel';
import CRMTable from '../../../components/CRMTable';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { UserProps } from '../../../models/type';
import LogoutModal from '../../../components/LogoutModal';

import styles from './User.module.scss';
import { CRMServiceAPI } from 'services/CRMService';

const ITEM_HEIGHT = 48;

const User = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [userLoader, setUserLoader] = useState(false);
  const [users, setUsers] = useState<UserProps[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([
    'active',
  ]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [menuState, setMenuState] = useState<{
    anchorEl: null | HTMLElement;
    rowId: number | null;
  }>({
    anchorEl: null,
    rowId: null,
  });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const open = Boolean(anchorEl);
  const [deleteModal, setDeleteModal] = useState(false);

  const columns: any = [
    { field: 'id', headerName: 'S.No' },
    { field: 'employeeId', headerName: 'Employee ID' },
    { field: 'userName', headerName: 'User Name' },
    { field: 'role', headerName: 'Role' },
    { field: 'phoneNumber', headerName: 'Phone Number', width: 150 },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'location', headerName: 'Location', width: 120 },
    { field: 'address', headerName: 'Address', width: 120 },
    { field: 'status', headerName: 'Status' },
    { field: 'dateOfJoining', headerName: 'Date of Joining' },
    {
      field: '',
      headerName: 'Action',
      renderCell: (params: any) => (
        <>
          <IconButton
            aria-label='more'
            id='action-button'
            aria-controls={open ? 'action-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup='true'
            onClick={(event) => handleClick(event, params.row.id)}
          >
            <MoreVertIcon />
          </IconButton>

          <Menu
            anchorEl={menuState.anchorEl}
            open={
              menuState.anchorEl !== null && menuState.rowId === params.row.id
            }
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleView(params.row)}>
              {t('view')}
            </MenuItem>
            <MenuItem onClick={() => handleEdit(params.row)}>
              {t('edit')}
            </MenuItem>
            <MenuItem onClick={() => handleDelete(params.row)}>
              {t('delete')}
            </MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = async () => {
    try {
      setUserLoader(true);
      let response = await CRMServiceAPI.getUserList();
      if (response) {
        setUserLoader(false);
        setUsers(response);
      }
    } catch (error) {}
  };

  //search filter action
  useEffect(() => {
    if (searchTerm && searchTerm.length > 3) {
      getSearchUserList();
    }
  }, [searchTerm]);

  const getSearchUserList = async () => {
    try {
      setUserLoader(true);
      let response = await CRMServiceAPI.searchUserList(searchTerm);
      if (response) {
        setUserLoader(false);
        setUsers([]);
      }
    } catch (error) {}
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>, rowId: number) => {
    setMenuState({ anchorEl: event.currentTarget, rowId });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const handleClose = (id: number) => {
    setAnchorEl(null);
  };

  const handleFilterOpen = () => {
    setDrawerOpen(true);
  };

  const handleFilterClose = () => {
    setDrawerOpen(false);
    getUserFilterList();
  };

  const getUserFilterList = async () => {
    try {
      setUserLoader(true);
      let response = await CRMServiceAPI.searchUserList(selectedStatuses);
      if (response) {
        setUserLoader(false);
        setUsers([]);
      }
    } catch (error) {}
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatuses((prevStatuses) =>
      prevStatuses.includes(status)
        ? prevStatuses.filter((s) => s !== status)
        : [...prevStatuses, status]
    );
  };

  const handleReset = () => {
    setSelectedStatuses(['active']);
    setSearchTerm('');
  };
  const handleView = (user: any) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleEdit = (user: any) => {
    navigate('/create-user', { state: { user } });
  };
  const handleDelete = (user: any) => {
    setSelectedUser(user);
    setDeleteModal(true);
  };

  const onDeleteModalClose = () => {
    setDeleteModal(false);
  };
  const onDeleteModalContinue = () => {
    if (selectedUser) {
      setUsers((prev) => prev.filter((user) => user.id !== selectedUser.id));
      setDeleteModal(false);
      setSelectedUser(null);
    }
  };
  return (
    <Box data-testid='create-user' className={styles.dashboardContainer}>
      <SidePanel menu={t('user')} />
      <Box component='main' sx={{ flexGrow: 1, p: 3, marginTop: '70px' }}>
        <Box className={styles.createUserButton}>
          <Button
            data-testid='create-user-button'
            onClick={() => navigate('/create-user')}
            variant='contained'
            color='primary'
          >
            {t('createUser')}
          </Button>
        </Box>
        {/* Search & Filter Buttons */}
        <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
          <TextField
            placeholder={t('searchPlaceholder')}
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
            {t('filter')}
          </Button>
        </Box>

        {/* Table */}
        <Box>
          <CRMTable
            rows={users}
            columns={columns}
            pageSizeOptions={pageSizeOptions}
            loading={userLoader}
            checkboxSelection={false}
          />
        </Box>
      </Box>
      {/* Filter Drawer */}
      <Drawer anchor='right' open={drawerOpen} onClose={handleFilterClose}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: 350,
            height: '100vh',
            p: 2,
          }}
        >
          <Typography variant='h6'>Filter</Typography>
          <Divider />
          <Box sx={{ flexGrow: 1 }}>
            <MenuItem onClick={() => handleStatusChange('active')}>
              <ListItemIcon>
                <Checkbox checked={selectedStatuses.includes('active')} />
              </ListItemIcon>
              <ListItemText primary='Active' />
            </MenuItem>

            <MenuItem onClick={() => handleStatusChange('inactive')}>
              <ListItemIcon>
                <Checkbox checked={selectedStatuses.includes('inactive')} />
              </ListItemIcon>
              <ListItemText primary='Inactive' />
            </MenuItem>
          </Box>
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
              onClick={handleFilterClose}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Drawer>
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        fullWidth
        maxWidth='sm'
        PaperProps={{
          sx: {
            boxShadow: 5,
            borderRadius: 2,
            fontFamily: 'Lato, sans-serif',
          },
        }}
      >
        {/* Dialog Title with Close (X) Button */}
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span>User Details</span>
          <IconButton
            onClick={() => setModalOpen(false)}
            sx={{ color: 'gray' }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          {!selectedUser ? (
            <Typography variant='body1'>No user selected.</Typography>
          ) : (
            <>
              <Grid2 container spacing={2}>
                {/* Basic Information */}
                <Grid2 size={{ xs: 12, sm: 6, md: 7 }}>
                  <Typography variant='h6' gutterBottom>
                    Basic Information
                  </Typography>
                  <Typography sx={{ mt: 1 }}>
                    <strong>{t('id')}</strong> {selectedUser.employeeId}
                  </Typography>
                  <Typography sx={{ mt: 1 }}>
                    <strong>{t('name')}</strong> {selectedUser.userName}
                  </Typography>
                  <Typography sx={{ mt: 1 }}>
                    <strong>{t('email')}</strong> {selectedUser.email}
                  </Typography>
                  <Typography sx={{ mt: 1 }}>
                    <strong>{t('phone')}</strong> {selectedUser.phoneNumber}
                  </Typography>
                  <Typography sx={{ mt: 1 }}>
                    <strong>{t('location')}</strong> {selectedUser.location}
                  </Typography>
                  <Typography sx={{ mt: 1 }}>
                    <strong>{t('address')}</strong> {selectedUser.address}
                  </Typography>
                </Grid2>

                {/* Experience */}
                <Grid2 size={{ xs: 12, sm: 6, md: 5 }}>
                  <Typography variant='h6' gutterBottom>
                    {t('experience')}
                  </Typography>
                  <Typography sx={{ mt: 1 }}>
                    <Typography sx={{ mt: 1 }}>
                      <strong>{t('joiningDate')}</strong>{' '}
                      {selectedUser.dateOfJoining}
                    </Typography>
                  </Typography>
                </Grid2>
              </Grid2>

              {/* User Role */}
              <Grid2 container spacing={2} sx={{ mt: 2 }}>
                <Grid2 size={{ xs: 12 }}>
                  <Typography variant='h6' gutterBottom>
                    {t('userRole')}
                  </Typography>
                  <Typography>
                    <strong>{t('roleTitle')}</strong> {selectedUser.role}
                  </Typography>
                  <Typography>
                    <strong>{t('status')}</strong> {selectedUser.status}
                  </Typography>
                </Grid2>
              </Grid2>
            </>
          )}
        </DialogContent>
      </Dialog>
      <LogoutModal
        data-testid='delete-modal'
        open={deleteModal}
        onClose={onDeleteModalClose}
        onHandleContinue={onDeleteModalContinue}
        title={t('delete')}
        titleDescription={t('deleteConfirmation')}
      />
    </Box>
  );
};

export default User;
