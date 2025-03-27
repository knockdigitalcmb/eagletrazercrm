import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, TextField } from '@mui/material';
import SidePanel from '../../../components/SidePanel';
import CRMTable from '../../../components/CRMTable';
import { MenuProps, LeadStatusType } from '../../../models/type';
import AddLeadStatusModal from '../LeadStatus/AddLeadStatus';
import EditLeadStatusModal from '../LeadStatus/EditLeadStatus';
import styles from './LeadStatus.module.scss';
import CRMTableActions from '../../../components/CRMTableAction';
import ConfirmationModal from 'components/ConfirmationModal';

const actionsProps = {
  view: false,
  edit: true,
  delete: true,
};

const LeadStatus = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [menuState, setMenuState] = useState<MenuProps>({
    anchorEl: null,
    rowId: null,
  });
  const [editingData, setEditingData] = useState<LeadStatusType | null>(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedLeadStatus, setSelectedLeadStatus] =
    useState<LeadStatusType | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const [leadStatuses, setLeadStatuses] = useState<LeadStatusType[]>([]);

  useEffect(() => {
    getLeadStatusList(); // Dummy data for now
  }, []);

  const getLeadStatusList = async () => {
    const dummyData = [
      {
        id: 1,
        name: 'Lead Status 1',
        color: '#FF5733',
        date_visibility: true,
        status: 'Active',
      },
      {
        id: 2,
        name: 'Lead Status 2',
        color: '#33FF57',
        date_visibility: false,
        status: 'Inactive',
      },
      {
        id: 3,
        name: 'Lead Status 3',
        color: '#3357FF',
        date_visibility: true,
        status: 'Active',
      },
      {
        id: 4,
        name: 'Lead Status 4',
        color: '#FF33A1',
        date_visibility: true,
        status: 'Pending',
      },
      {
        id: 5,
        name: 'Lead Status 5',
        color: '#A133FF',
        date_visibility: false,
        status: 'Inactive',
      },
    ];

    setLeadStatuses(dummyData);
  };

  const onHandleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>, rowId: number) => {
    setMenuState({ anchorEl: event.currentTarget, rowId });
  };

  const handleClose = () => {
    setMenuState({ anchorEl: null, rowId: null });
  };

  const onHandleEditModal = () => {
    const selectedLeadStatus = leadStatuses.find(
      (item) => item.id === menuState.rowId
    );
    if (selectedLeadStatus) {
      setEditingData(selectedLeadStatus);
      setOpenEditModal(true);
    }
    handleClose();
  };

  const onHandleDeleteModal = () => {
    const selected = leadStatuses.find((item) => item.id === menuState.rowId);
    if (selected) {
      setSelectedLeadStatus(selected);
      setDeleteModal(true);
    }
    handleClose();
  };

  const onDeleteModalContinue = async (leadStatusId: number) => {
    try {
      setDeleteLoading(true);

      const result = true;
      if (result) {
        getLeadStatusList();
        onDeleteModalClose();
      }
    } catch (error) {
      console.error('Delete failed:', error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const onDeleteModalClose = () => {
    setDeleteModal(false);
    setSelectedLeadStatus(null);
  };

  const handleEditSave = () => {
    setOpenEditModal(false);
    getLeadStatusList();
  };

  const columns = [
    { field: 'id', headerName: 'S.No', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
    {
      field: 'color',
      headerName: 'Color',
      flex: 1,
      renderCell: (params: any) => (
        <Box
          sx={{
            width: 20,
            height: 20,
            backgroundColor: params.value, // Use the color directly
            borderRadius: '50%', // Optional, if you want to make it a circle
          }}
        />
      ),
    },
    {
      field: 'date_visibility',
      headerName: 'Date Visibility',
      flex: 1,
      renderCell: (params: any) => (params.value ? 'Visible' : 'Hidden'),
    },
    { field: 'status', headerName: 'Status', flex: 1 },
    {
      field: 'actions',
      headerName: 'Action',
      width: 150,
      renderCell: (rows: any) => (
        <CRMTableActions
          row={rows}
          menuState={menuState}
          handleClick={handleClick}
          handleClose={handleClose}
          onHandleEditModal={onHandleEditModal}
          onHandleDeleteModal={onHandleDeleteModal}
          actions={actionsProps}
        />
      ),
    },
  ];

  return (
    <Box data-testid='lead-status-page' className={styles.dashboardContainer}>
      <SidePanel menu={t('leadStatus')} />
      <Box component='main' sx={{ flexGrow: 1, p: 3, marginTop: '70px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <TextField
            placeholder={t('leadSearchPlaceholder')}
            value={searchTerm}
            onChange={onHandleSearchChange}
            size='small'
            sx={{ width: '30%' }}
          />
          <Button
            variant='contained'
            color='primary'
            onClick={() => setOpenModal(true)}
          >
            {t('addLeadStatus')}
          </Button>
        </Box>

        <CRMTable
          rows={leadStatuses}
          columns={columns}
          pageSizeOptions={[5, 10, 20]}
          loading={loading}
          checkboxSelection={false}
        />

        <ConfirmationModal
          open={deleteModal}
          onClose={onDeleteModalClose}
          onHandleContinue={() =>
            selectedLeadStatus && onDeleteModalContinue(selectedLeadStatus.id)
          }
          title={t('deleteLeadStatus')}
          titleDescription={t('deleteLeadStatusConfirmation', {
            source: selectedLeadStatus?.name || '',
          })}
        />

        <AddLeadStatusModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onSave={getLeadStatusList}
        />

        {editingData && (
          <EditLeadStatusModal
            open={openEditModal}
            onClose={() => setOpenEditModal(false)}
            data={editingData}
            onSave={handleEditSave}
          />
        )}
      </Box>
    </Box>
  );
};

export default LeadStatus;
