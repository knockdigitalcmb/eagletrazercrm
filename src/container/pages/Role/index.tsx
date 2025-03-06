import React, { useState } from 'react';
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

import styles from './Role.module.scss';
import { useForm } from 'react-hook-form';

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [isCreateRoleModalOpen, setIsCreateRoleModalOpen] =
    React.useState(false);
  const [viewModal, setViewModal] = React.useState(false);

  const handleCreateRoleModalOpen = () => setIsCreateRoleModalOpen(true);
  const handleCreateRoleModalClose = () => setIsCreateRoleModalOpen(false);

  const onHandleViewModalOpen = (role: RoleProps) => {
    setViewModal(true);
    setSelectedRole(role);
  };
  const onHandleViewModalClose = () => setViewModal(false);

  const renderPermissions = (params: any) => {
    const { edit, delete: del, view, create } = params.value;
    return (
      <>
        {create && (
          <Chip label='Create' color='primary' className={styles.chipBtn} />
        )}
        {edit && (
          <Chip label='Edit' color='primary' className={styles.chipBtn} />
        )}
        {view && (
          <Chip label='View' color='primary' className={styles.chipBtn} />
        )}
        {del && (
          <Chip label='Delete' color='primary' className={styles.chipBtn} />
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
      renderCell: (params:any) => {
        return (
          <>
            <IconButton
              aria-label='more'
              id='action-button'
              aria-controls={open ? 'action-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup='true'
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id='action-menu'
              MenuListProps={{
                'aria-labelledby': 'action-button',
              }}
              anchorEl={anchorEl}
              open={open}
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
              <MenuItem>{t('edit')}</MenuItem>
              <MenuItem>{t('delete')}</MenuItem>
            </Menu>
          </>
        );
      },
    },
  ];

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onHandleRole = (data: RoleProps) => {
    console.log(data);
    const newRole = {
      id: roles.length + 1,
      role: data.role,
      permission: { ...data.permission },
    };
    setRoles([...roles, newRole]);
    setIsCreateRoleModalOpen(false);
    reset();
  };
  return (
    <Box data-testid='dashboard-page' className={styles.dashboardContainer}>
      <SidePanel menu={t('role')} />
      <Box component='main' sx={{ flexGrow: 1, p: 3, marginTop: '70px' }}>
        <Box className={styles.createRoleBtn}>
          <Button
            variant='contained'
            sx={{ marginBottom: '20px' }}
            onClick={handleCreateRoleModalOpen}
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
          onClose={handleCreateRoleModalClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box className={styles.createRoleModal}>
            <Grid2
              container
              display='flex'
              justifyContent='space-between'
              alignItems='center'
            >
              <Grid2>
                <Typography id='modal-modal-title' variant='h6' component='h2'>
                  {t('createRole')}
                </Typography>
              </Grid2>
              <Grid2>
                <IconButton>
                  <CloseIcon onClick={handleCreateRoleModalClose} />
                </IconButton>
              </Grid2>
            </Grid2>

            <Box id='modal-modal-description' sx={{ mt: 2 }}>
              <TextField
                placeholder={t('rolePlaceholder')}
                {...register('role', { required: `${t('roleRequired')}` })}
                error={!!errors.role}
                helperText={errors.role?.message}
              ></TextField>
              <FormGroup sx={{ mt: 2 }}>
                <FormControlLabel
                  control={<Checkbox {...register('permission.create')} />}
                  label='Create'
                />
                <FormControlLabel
                  control={<Checkbox {...register('permission.edit')} />}
                  label='Edit'
                />
                <FormControlLabel
                  control={<Checkbox {...register('permission.view')} />}
                  label='View'
                />
                <FormControlLabel
                  control={<Checkbox {...register('permission.delete')} />}
                  label='Delete'
                />
              </FormGroup>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 5 }}>
                <Button
                  variant='contained'
                  onClick={handleSubmit(onHandleRole)}
                >
                  {t('submit')}
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
          <Box className={styles.viewModal}>
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
      </Box>
    </Box>
  );
};

export default Role;
