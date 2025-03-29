import React, { useEffect, useState } from 'react';
import { Box, Button, Chip } from '@mui/material';
import SidePanel from '../../../components/SidePanel/index';
import { useTranslation } from 'react-i18next';
import { pageSizeOptions } from '../../../constant/common.constant';
import { RoleProps, MenuProps } from '../../../models/type';
import CRMTable from '../../../components/CRMTable/index';
import ConfirmationModal from '../../../components/ConfirmationModal/index';
import { CRMServiceAPI } from '../../../services/CRMService';
import ViewRoles from './ViewRoles';
import CreateAndEditRoles from './CreateAndEditRoles';
import { useForm } from 'react-hook-form';
import CRMTableActions from '../../../components/CRMTableAction/index';

import styles from './Roles.module.scss';

const actionsProps = {
  view: true,
  edit: true,
  delete: true,
};
const Roles = () => {
  const { t } = useTranslation();
  const [roles, setRoles] = useState<RoleProps[]>([]);
  const [selectedRole, setSelectedRole] = useState<RoleProps | null>(null);
  const [roleLoader, setRoleLoader] = useState(false);
  const [menuState, setMenuState] = useState<MenuProps>({
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

  const columns: any = [
    {
      field: 'id',
      headerName: 'S.No',
      flex: 0.5,
      minWidth: 100,
      sortable: false,
    },
    { field: 'role', headerName: 'Role', flex: 1, minWidth: 150 },
    {
      field: 'permission',
      headerName: `${t('permission')}`,
      flex: 2,
      minWidth: 250,
      sortable: false,
      renderCell: (rows: any) => renderPermissions(rows),
    },
    {
      field: 'action',
      headerName: 'Actions',
      flex: 1,
      minWidth: 200,
      sortable: false,
      renderCell: (rows: any) => RenderCRMTableActions(rows),
    },
  ];

  useEffect(() => {
    getUserRoleList();
  }, []);

  const renderPermissions = (params: any) => {
    const permissions = params.value;
    const permissionLabels: { [key: string]: string } = {
      create: t('create'),
      edit: t('edit'),
      view: t('view'),
      delete: t('delete'),
    };
    return (
      <>
        {Object.entries(permissions).map(([key, value]) =>
          value ? (
            <Chip
              key={key}
              label={permissionLabels[key]}
              color='primary'
              size='small'
              className={styles.chipButton}
            />
          ) : null
        )}
      </>
    );
  };

  const RenderCRMTableActions = (params: any) => {
    return (
      <CRMTableActions
        row={params.row}
        menuState={menuState}
        handleClick={handleClick}
        handleClose={handleClose}
        onHandleViewModalOpen={onHandleViewModalOpen}
        onHandleEditModal={onHandleEditModal}
        onHandleDeleteModal={onHandleDeleteModal}
        actions={actionsProps}
      />
    );
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

  const getUserRoleList = async () => {
    try {
      setRoleLoader(true);
      const response = await CRMServiceAPI.getUserRoleList();
      if (response) {
        setRoles(response);
      } else {
        setRoles([]);
      }
      setRoleLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteModalContinue = async () => {
    try {
      if (selectedRole) {
        setRoleLoader(true);
        const response = await CRMServiceAPI.deleteUserRole(selectedRole);
        if (response) {
          getUserRoleList();
          setDeleteModal(false);
          setSelectedRole(null);
        }
        setRoleLoader(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onHandleRoleSubmit = async () => {
    try {
      //update role
      if (selectedRole) {
        const response = await CRMServiceAPI.updateUserRole(selectedRole);
        if (response) {
          getUserRoleList();
        }
        setIsCreateRoleModalOpen(false);
      }
      //create role
      if (!selectedRole) {
        const response = await CRMServiceAPI.createUserRole(selectedRole);
        if (response) {
          getUserRoleList();
        }
      }
      setSelectedRole(null);
    } catch (error) {}
  };
  return (
    <Box data-testid='dashboard-page' className={styles.dashboardContainer}>
      <SidePanel menu={t('roles')} />
      <Box
        component='main'
        sx={{ flexGrow: 1, p: 3, marginTop: '70px' }}
        data-testid='roles-page'
      >
        <Box className={styles.createRoleButton}>
          <Button
            variant='contained'
            sx={{ marginBottom: '20px' }}
            onClick={onHandleCreateRoleModal}
            data-testid='create-role-button'
          >
            {t('createRole')}
          </Button>
        </Box>
        <CRMTable
          rows={roles}
          columns={columns}
          pageSizeOptions={pageSizeOptions}
          loading={roleLoader}
          checkboxSelection={false}
          noDataMessage={t('role')}
        
        />
        <ViewRoles
          data-testid='view-modal'
          open={viewRoleModal}
          onHandleCloseViewModal={onHandleCloseViewModal}
          row={selectedRole}
        />
        <CreateAndEditRoles
          data-testid='create-modal'
          open={isCreateRoleModalOpen}
          row={selectedRole}
          onHandleCloseCreateRoleModal={onHandleCloseCreateRoleModal}
          register={register}
          errors={errors}
          onHandleRoleSubmit={onHandleRoleSubmit}
        />
        <ConfirmationModal
          data-testid='delete-modal'
          open={deleteModal}
          onClose={OnDeleteModalClose}
          onHandleContinue={onDeleteModalContinue}
          title={t('deleteRole')}
          titleDescription={t('deleteConfirmationRole', {
            role: selectedRole?.role || '',
          })}
        />
      </Box>
    </Box>
  );
};

export default Roles;
