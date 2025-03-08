import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Modal,
  TextField,
  FormControlLabel,
  FormGroup,
  Checkbox,
  Grid2,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SidePanel from '../../../components/SidePanel/index';
import { useTranslation } from 'react-i18next';
import { pageSizeOptions } from '../../../constant/common.constant';
import { RoleProps } from '../../../models/type';
import CRMTable from '../../../components/CRMTable/index';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LogoutModal from '../../../components/LogoutModal/index';
import { CRMServiceAPI } from '../../../services/CRMService';

import styles from './Role.module.scss';
import { useForm } from 'react-hook-form';

const rows = [
  {
    id: 1,
    role: 'Admin',
    permission: { create: true, edit: true, view: true, delete: true },
  },
  {
    id: 2,
    role: 'User',
    permission: { create: false, edit: true, view: true, delete: false },
  },
];
const ITEM_HEIGHT = 48;
const Role = () => {
  const { t } = useTranslation();
  const [roles, setRoles] = useState<RoleProps[]>([]);
  const [selectedRole, setSelectedRole] = useState<RoleProps | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RoleProps>({
    mode: 'onChange',
  });

  const [userLoader, setUserLoader] = useState(false);
  const [menuState, setMenuState] = useState<{
    anchorEl: null | HTMLElement;
    rowId: number | null;
  }>({
    anchorEl: null,
    rowId: null,
  });

  const open = Boolean(menuState);
  const [isCreateRoleModalOpen, setIsCreateRoleModalOpen] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    getRoleList();
  }, []);

  const getRoleList = async () => {
    try {
      const response = await CRMServiceAPI.RoleData();
      if (response) {
        setRoles(rows);
      }
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
  const onHandleCreateRoleModalOpen = () => setIsCreateRoleModalOpen(true);

  const onHandleCreateRoleModalClose = () => {
    setIsCreateRoleModalOpen(false);
    setSelectedRole(null);
  };

  const onHandleViewModalOpen = (role: RoleProps) => {
    setSelectedRole(role);
    setViewModal(true);
  };
  const onHandleViewModalClose = () => {
    setViewModal(false);
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

  const onDeleteModalContinue = () => {
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
  const onHandleRole = (updatedRole: RoleProps) => {
    if (selectedRole) {
      setRoles((prev) =>
        prev.map((role) =>
          role.id === selectedRole.id
            ? {
                ...role,
                role: updatedRole.role,
                permission: { ...updatedRole.permission },
              }
            : role
        )
      );
    }
    setIsCreateRoleModalOpen(false);
    setSelectedRole(null);
    reset();
  };

  return (
    <Box data-testid='dashboard-page' className={styles.dashboardContainer}>
      <SidePanel menu={t('role')} />
      <Box component='main' sx={{ flexGrow: 1, p: 3, marginTop: '70px' }}>
        <Box className={styles.createRoleButton}>
          <Button
            variant='contained'
            sx={{ marginBottom: '20px' }}
            onClick={onHandleCreateRoleModalOpen}
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
              loading={userLoader}
              checkboxSelection={false}
            />
          )}
        </Box>
        {/* Create role modal */}
        <Modal
          open={isCreateRoleModalOpen}
          onClose={() => {
            onHandleCreateRoleModalClose();
            setSelectedRole(null);
            reset();
          }}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box className={`${styles.modalStyle} createRoleModal`}>
            {' '}
            <Grid2
              container
              display='flex'
              justifyContent='space-between'
              alignItems='center'
            >
              <Grid2>
                <Typography id='modal-modal-title' variant='h6' component='h2'>
                  {selectedRole ? 'Edit Role' : t('createRole')}
                </Typography>
              </Grid2>
              <Grid2>
                <IconButton>
                  <CloseIcon onClick={onHandleCreateRoleModalClose} />
                </IconButton>
              </Grid2>
            </Grid2>
            <Box id='modal-modal-description' sx={{ mt: 2 }}>
              <TextField
                placeholder={t('rolePlaceholder')}
                defaultValue={selectedRole?.role || ''}
                {...register('role', { required: `${t('roleRequired')}` })}
                error={!!errors.role}
                helperText={errors.role?.message}
              ></TextField>
              <FormGroup sx={{ mt: 2 }}>
                <Typography sx={{ mr: 2 }}>Permission:</Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked={
                          selectedRole?.permission.create || false
                        }
                        {...register('permission.create')}
                      />
                    }
                    label='Create'
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked={selectedRole?.permission.edit || false}
                        {...register('permission.edit')}
                      />
                    }
                    label='Edit'
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked={selectedRole?.permission.view || false}
                        {...register('permission.view')}
                      />
                    }
                    label='View'
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked={
                          selectedRole?.permission.delete || false
                        }
                        {...register('permission.delete')}
                      />
                    }
                    label='Delete'
                  />
                </Box>
              </FormGroup>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 5 }}>
                <Button
                  variant='contained'
                  onClick={handleSubmit(onHandleRole)}
                >
                  {selectedRole ? 'Save Change' : t('submit')}
                </Button>
              </Box>
            </Box>
          </Box>
        </Modal>
        {/* View role model */}
        <Modal
          open={viewModal}
          onClose={onHandleViewModalClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box
            className={styles.modalStyle}
            sx={{ width: '400px', height: '250px' }}
          >
            {' '}
            <Grid2
              container
              display='flex'
              justifyContent='space-between'
              alignItems='center'
              marginBottom='20px'
            >
              <Grid2>
                <Typography id='modal-modal-title' variant='h6' component='h2'>
                  {t('viewRole')}
                </Typography>
              </Grid2>
              <Grid2>
                <IconButton>
                  <CloseIcon onClick={onHandleViewModalClose} />
                </IconButton>
              </Grid2>
            </Grid2>
            {selectedRole && (
              <>
                <Typography sx={{ marginBottom: '20px' }}>
                  {t('roleHeading')}
                  {selectedRole.role}
                </Typography>
                <Typography sx={{ marginBottom: '15px' }}>
                  {t('permissionHeading')}
                </Typography>

                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                  {Object.keys(selectedRole.permission)
                    .map((key) =>
                      selectedRole.permission[
                        key as keyof typeof selectedRole.permission
                      ] ? (
                        <Chip key={key} label={key} color='primary' />
                      ) : null
                    )
                    .filter(Boolean).length > 0 ? (
                    Object.keys(selectedRole.permission).map((key) =>
                      selectedRole.permission[
                        key as keyof typeof selectedRole.permission
                      ] ? (
                        <Chip key={key} label={key} color='primary' />
                      ) : null
                    )
                  ) : (
                    <Typography>{t('noPermissionSelected')}</Typography>
                  )}
                </Box>
              </>
            )}
          </Box>
        </Modal>
        {/* delete modal */}
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

export default Role;
