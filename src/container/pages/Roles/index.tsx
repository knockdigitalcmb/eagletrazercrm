import React, { useEffect, useState } from 'react';
import { Box, Button, Chip, IconButton, Menu, MenuItem } from '@mui/material';
import SidePanel from '../../../components/SidePanel/index';
import { useTranslation } from 'react-i18next';
import { pageSizeOptions } from '../../../constant/common.constant';
import { RoleProps } from '../../../models/type';
import CRMTable from '../../../components/CRMTable/index';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LogoutModal from '../../../components/LogoutModal/index';
import { CRMServiceAPI } from '../../../services/CRMService';
import ViewRoles from './ViewRoles';
import CreateAndEditRoles from './CreateAndEditRoles';
import { useForm } from 'react-hook-form';

import styles from './Roles.module.scss';
const ITEM_HEIGHT = 48;
const Roles = () => {
  const { t } = useTranslation();
  const [roles, setRoles] = useState<RoleProps[]>([]);
  const [selectedRole, setSelectedRole] = useState<RoleProps | null>(null);
  const [roleLoader, setRoleLoader] = useState(false);
  const [menuState, setMenuState] = useState<{
    anchorEl: null | HTMLElement;
    rowId: number | null;
  }>({
    anchorEl: null,
    rowId: null,
  });
  const open = Boolean(menuState);
  const [isCreateRoleModalOpen, setIsCreateRoleModalOpen] = useState(false);
  const [viewRoleModal, setViewRoleModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RoleProps>({
    mode: 'onChange',
  });

  useEffect(() => {
    getUserRoleList();
  }, []);

  const getUserRoleList = async () => {
    try {
      setRoleLoader(true);
      const response = await CRMServiceAPI.getUserRoleList();
      if (response) {
        setRoles(response);
      }
      setRoleLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>, rowId: number) => {
    setMenuState({ anchorEl: event.currentTarget, rowId });
  };

  const handleClose = () => {
    setMenuState({ anchorEl: null, rowId: null });
  };
  const onHandleCreateRoleModal = () => setIsCreateRoleModalOpen(true);

  const onHandleCloseCreateRoleModal = () => {
    setIsCreateRoleModalOpen(false);
    setSelectedRole(null);
  };

  const onHandleViewModalOpen = (role: RoleProps) => {
    setSelectedRole(role);
    setViewRoleModal(true);
  };
  const onHandleCloseViewModal = () => {
    setViewRoleModal(false);
    setSelectedRole(null);
  };

  const onHandleEditModal = (role: RoleProps) => {
    setSelectedRole(role);
    setIsCreateRoleModalOpen(true);
    handleClose();
  };

  const onHandleDeleteModal = (role: RoleProps) => {
    setSelectedRole(role);
    setDeleteModal(true);
  };

  const OnDeleteModalClose = () => {
    setDeleteModal(false);
  };

  const onDeleteModalContinue = async () => {
    if (selectedRole) {
      setRoles((prev) => prev.filter((role) => role.id !== selectedRole.id));
      setDeleteModal(false);
      setSelectedRole(null);
    }
  };

  const renderPermissions = (params: any) => {
    const { edit, delete: del, view, create } = params.value;
    return (
      <>
        {create && (
          <Chip
            label={t(`create`)}
            color='primary'
            size='small'
            className={styles.chipButton}
          />
        )}
        {edit && (
          <Chip
            label={t(`edit`)}
            color='primary'
            size='small'
            className={styles.chipButton}
          />
        )}
        {view && (
          <Chip
            label={t(`view`)}
            color='primary'
            size='small'
            className={styles.chipButton}
          />
        )}
        {del && (
          <Chip
            label={t(`delete`)}
            color='primary'
            size='small'
            className={styles.chipButton}
          />
        )}
      </>
    );
  };

  const columns: any = [
    { field: 'id', headerName: 'S.No', width: 100 },
    { field: 'role', headerName: 'Role', width: 150 },
    {
      field: 'permission',
      headerName: 'Permissions',
      width: 350,
      renderCell: renderPermissions,
    },
    {
      field: '',
      headerName: 'Actions',
      width: 130,
      renderCell: (params: any) => {
        return (
          <>
            <IconButton
              aria-label='more'
              id={`action-button-${params.row.id}`}
              aria-controls={menuState.anchorEl ? 'action-menu' : undefined}
              aria-expanded={menuState.anchorEl ? 'true' : undefined}
              aria-haspopup='true'
              onClick={(event) => handleClick(event, params.row.id)}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id='action-menu'
              MenuListProps={{
                'aria-labelledby': `action-button-${params.row.id}`,
              }}
              anchorEl={menuState.anchorEl}
              open={
                menuState.anchorEl !== null && menuState.rowId === params.row.id
              }
              onClose={handleClose}
              slotProps={{
                paper: {
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: '20ch',
                  },
                },
              }}
            >
              <MenuItem onClick={() => onHandleViewModalOpen(params.row)}>
                {t('view')}
              </MenuItem>
              <MenuItem onClick={() => onHandleEditModal(params.row)}>
                {t('edit')}
              </MenuItem>
              <MenuItem onClick={() => onHandleDeleteModal(params.row)}>
                {t('delete')}
              </MenuItem>
            </Menu>
          </>
        );
      },
    },
  ];
  const onHandleRoleSubmit = async () => {
    try {
      //update role
      if (selectedRole) {
        const response = await CRMServiceAPI.updateUserRole(selectedRole);
        if (response) {
          getUserRoleList();
        }
      }
      //create role
      if (!selectedRole) {
        const response = await CRMServiceAPI.createUserRole(selectedRole);
        if (response) {
          getUserRoleList();
        }
      }
    } catch (error) {}
  };

  return (
    <Box data-testid='dashboard-page' className={styles.dashboardContainer}>
      <SidePanel menu={t('role')} />
      <Box component='main' sx={{ flexGrow: 1, p: 3, marginTop: '70px' }}>
        <Box className={styles.createRoleButton}>
          <Button
            variant='contained'
            sx={{ marginBottom: '20px' }}
            onClick={onHandleCreateRoleModal}
          >
            {t('createRole')}
          </Button>
        </Box>
        <Box>
          {roles.length > 0 && (
            <CRMTable
              rows={roles}
              columns={columns}
              pageSizeOptions={pageSizeOptions}
              loading={roleLoader}
              checkboxSelection={false}
            />
          )}
        </Box>
        <ViewRoles
          open={viewRoleModal}
          onHandleCloseViewModal={onHandleCloseViewModal}
          row={selectedRole}
        />
        <CreateAndEditRoles
          open={isCreateRoleModalOpen}
          row={selectedRole}
          onHandleCloseCreateRoleModal={onHandleCloseCreateRoleModal}
          register={register}
          errors={errors}
          onHandleRoleSubmit={onHandleRoleSubmit}
        />
        <LogoutModal
          data-testid='delete-modal'
          open={deleteModal}
          onClose={OnDeleteModalClose}
          onHandleContinue={onDeleteModalContinue}
          title={t('delete')}
          titleDescription={t('deleteConfirmation')}
        />
      </Box>
    </Box>
  );
};

export default Roles;
