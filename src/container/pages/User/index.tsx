import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import CRMTable from '../../../components/CRMTable';
import SidePanel from '../../../components/SidePanel';
import UserFilter from './UserFilter';
import ViewUserDetails from '../../pages/User/ViewUserDetails.tsx';
import LogoutModal from '../../../components/LogoutModal';
import { UserProps } from '../../../models/type';
import { CRMServiceAPI } from 'services/CRMService';
import styles from './User.module.scss';
import { pageSizeOptions } from 'constant/common.constant';
import UserSearch from '../User/UserSearch/index';

const User = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [userLoader, setUserLoader] = useState(false);
  const [users, setUsers] = useState<UserProps[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([
    'active',
  ]);
  const [selectedUser, setSelectedUser] = useState<UserProps | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [menuState, setMenuState] = useState<{
    anchorEl: null | HTMLElement;
    rowId: number | null;
  }>({
    anchorEl: null,
    rowId: null,
  });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    getUserList();
  }, [searchTerm, selectedStatuses]);

  const getUserList = async () => {
    try {
      setUserLoader(true);
      let response = await CRMServiceAPI.getUserList();
      if (response) {
        setUsers(response);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setUserLoader(false);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>, rowId: number) => {
    setMenuState({ anchorEl: event.currentTarget, rowId });
  };

  const handleClose = () => {
    setMenuState({ anchorEl: null, rowId: null });
  };

  const handleFilterOpen = () => {
    setDrawerOpen(true);
  };

  const handleFilterClose = () => {
    setDrawerOpen(false);
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
    handleClose();
  };

  const handleEdit = async (user: any) => {
    if (!user) {
      console.warn('No user selected for editing.');
      return;
    }

    try {
      console.log('Editing user:', user);
      setUserLoader(true);
      setSelectedUser(user);

      let response = await CRMServiceAPI.editUser(user);

      if (response) {
        console.log('User updated successfully:', response);
        // setSelectedUser(response);
        navigate('/create-user', { state: { user: response } });
      } else {
        console.warn('Edit API did not return a valid response.');
        navigate('/create-user', { state: { user } });
      }
    } catch (error) {
      console.error('Error editing user:', error);
      navigate('/create-user', { state: { user } });
    } finally {
      setUserLoader(false);
    }
  };

  const handleDelete = (user: UserProps) => {
    setSelectedUser(user);
    setDeleteModal(true);
  };

  const onDeleteModalClose = () => {
    setDeleteModal(false);
  };

  const onDeleteModalContinue = async () => {
    try {
      setUserLoader(true);
      if (selectedUser) {
        await CRMServiceAPI.deleteUser(selectedUser.id);
        getUserList();
        setDeleteModal(false);
        setSelectedUser(null);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    } finally {
      setUserLoader(false);
    }
  };

  const columns = [
    { field: 'id', headerName: 'S.No', width: 90 },
    { field: 'employeeId', headerName: 'Employee ID', width: 150 },
    { field: 'userName', headerName: 'User Name', width: 200 },
    { field: 'role', headerName: 'Role', width: 150 },
    { field: 'phoneNumber', headerName: 'Phone Number', width: 180 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'location', headerName: 'Location', width: 150 },
    { field: 'address', headerName: 'Address', width: 200 },
    { field: 'status', headerName: 'Status', width: 120 },
    { field: 'dateOfJoining', headerName: 'Date of Joining', width: 160 },
    {
      field: 'actions',
      headerName: 'Action',
      width: 130,
      renderCell: (params: any) => (
        <>
          <IconButton
            aria-label='more'
            id='action-button'
            aria-controls={menuState.anchorEl ? 'action-menu' : undefined}
            aria-expanded={menuState.anchorEl ? 'true' : undefined}
            aria-haspopup='true'
            onClick={(event) => handleClick(event, params.row.id)}
          >
            <MoreVertIcon />
          </IconButton>

          <Menu
            anchorEl={menuState.anchorEl}
            open={
              Boolean(menuState.anchorEl) && menuState.rowId === params.row.id
            }
            onClose={handleClose}
          >
            <MenuItem
              sx={{ minWidth: 180 }}
              onClick={() => handleView(params.row)}
            >
              {t('view')}
            </MenuItem>
            <MenuItem
              sx={{ minWidth: 180 }}
              onClick={() => handleEdit(params.row)}
            >
              {t('edit')}
            </MenuItem>
            <MenuItem
              sx={{ minWidth: 180 }}
              onClick={() => handleDelete(params.row)}
            >
              {t('delete')}
            </MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  return (
    <Box className={styles.dashboardContainer}>
      <SidePanel menu={t('user')} />
      <Box component='main' sx={{ flexGrow: 1, p: 3, marginTop: '70px' }}>
        {/* Create User Button */}
        <Box className={styles.createUserButton}>
          <Button
            variant='contained'
            color='primary'
            onClick={() => navigate('/create-user')}
          >
            {t('createUser')}
          </Button>
        </Box>
        <UserSearch
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
          handleFilterOpen={handleFilterOpen}
        />
        <CRMTable
          rows={users}
          columns={columns}
          pageSizeOptions={pageSizeOptions}
          loading={userLoader}
          checkboxSelection={false}
        />
        <UserFilter
          drawerOpen={drawerOpen}
          selectedStatuses={selectedStatuses}
          handleFilterClose={handleFilterClose}
          handleStatusChange={handleStatusChange}
          handleReset={handleReset}
        />
        <LogoutModal
          open={deleteModal}
          onClose={onDeleteModalClose}
          onHandleContinue={onDeleteModalContinue}
          title={t('userDelete')}
          titleDescription={t('deleteConfirmation', {
            user: selectedUser?.userName || '',
            email: selectedUser?.email || '',
          })}
        />
        <ViewUserDetails
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          selectedUser={selectedUser}
        />
      </Box>
    </Box>
  );
};

export default User;
