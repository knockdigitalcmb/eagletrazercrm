import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, TextField, Typography } from '@mui/material';
import SidePanel from '../../../components/SidePanel';
import CRMTable from '../../../components/CRMTable';
import { MenuProps, LeadSourceType } from '../../../models/type';
import AddLeadSourceModal from '../LeadSource/AddLeadSource';
import styles from './LeadSource.module.scss';
import CRMTableActions from '../../../components/CRMTableAction';
import { CRMServiceAPI } from 'services/CRMService';
import ConfirmationModal from 'components/ConfirmationModal';

const actionsProps = {
  view: false,
  edit: true,
  delete: true,
};

const LeadSource = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [leadSources, setLeadSources] = useState<LeadSourceType[]>([]);
  const [menuState, setMenuState] = useState<MenuProps>({
    anchorEl: null,
    rowId: null,
  });
  const [editingData, setEditingData] = useState<LeadSourceType | null>(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedLeadSource, setSelectedLeadSource] =
    useState<LeadSourceType | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    getLeadSourceList();
  }, []);
  useEffect(() => {
    if (searchTerm) {
      let payload = {
        search: searchTerm,
      };
      loadLeadSources(payload);
    }
  }, [searchTerm]);

  const loadLeadSources = async (payload: any) => {
    try {
      setLoading(true);
      const response = await CRMServiceAPI.searchLeadSourceList(payload);
      if (response) {
        setLeadSources([]);
      }
    } catch (error) {
      console.error('Failed to load lead sources:', error);
      setLeadSources([]);
    } finally {
      setLoading(false);
    }
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

  const onHandleViewModalOpen = () => console.log('View Modal Open');
  const onHandleEditModal = () => {
    const selectedLeadSource = leadSources.find(
      (item) => item.id === menuState.rowId
    );
    if (selectedLeadSource) {
      setEditingData(selectedLeadSource);
      setOpenModal(true);
    }
    handleClose();
  };

  const onHandleDeleteModal = () => {
    const selected = leadSources.find((item) => item.id === menuState.rowId);
    if (selected) {
      setSelectedLeadSource(selected);
      setDeleteModal(true);
    }
    handleClose();
  };
  const onDeleteModalContinue = async (leadSourceId: number) => {
    try {
      setDeleteLoading(true);
      const result = await CRMServiceAPI.deleteLeadSource(leadSourceId);
      if (result) {
        console.log('Lead source deleted successfully');
        getLeadSourceList();
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
    setSelectedLeadSource(null);
  };

  const getLeadSourceList = async () => {
    try {
      let response = await CRMServiceAPI.leadSourceList();
      if (response) {
        setLeadSources(response);
      } else {
        setLeadSources([]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const RenderCRMTableActions = (params: any) => {
    return (
      <CRMTableActions
        row={params}
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

  const renderCRMStatus = (params: any) => {
    const status = params.value;
    const statusLabels: { [key: string]: string } = {
      active: t('Active'),
      inactive: t('Inactive'),
    };

    return (
      <>
        {Object.entries(status).map(([key, value]) =>
          value ? <Typography key={key}>{statusLabels[key]}</Typography> : null
        )}
      </>
    );
  };

  const columns = [
    { field: 'id', headerName: 'S.No', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (rows: any) => renderCRMStatus(rows),
    },
    {
      field: 'actions',
      headerName: 'Action',
      width: 150,
      renderCell: (rows: any) => RenderCRMTableActions(rows),
    },
  ];

  const [openModal, setOpenModal] = useState(false);

  const handleSave = (data: { sourceName: string; status: string }) => {
    console.log('Saved Lead Source:', data);
    getLeadSourceList();
    setOpenModal(false);
    setEditingData(null);
  };

  return (
    <Box data-testid='lead-source-page' className={styles.dashboardContainer}>
      <SidePanel menu={t('leadSource')} />
      <Box component='main' sx={{ flexGrow: 1, p: 3, marginTop: '70px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button
            variant='contained'
            color='primary'
            onClick={() => setOpenModal(true)}
          >
            {t('addLeadSource')}
          </Button>
          <AddLeadSourceModal
            open={openModal}
            handleClose={() => {
              setOpenModal(false);
              setEditingData(null);
            }}
            handleSave={handleSave}
            initialData={
              editingData
                ? {
                    sourceName: editingData.name,
                    status: editingData.status.active ? 'Active' : 'Inactive',
                  }
                : null
            }
          />
        </Box>

        <TextField
          placeholder={t('leadSearchPlaceholder')}
          value={searchTerm}
          onChange={onHandleSearchChange}
          size='small'
          sx={{ width: '30%', mb: 2 }}
        />

        <CRMTable
          rows={leadSources}
          columns={columns}
          pageSizeOptions={[5, 10, 20]}
          loading={loading}
          checkboxSelection={false}
        />

        <ConfirmationModal
          open={deleteModal}
          onClose={onDeleteModalClose}
          onHandleContinue={() => {
            if (selectedLeadSource) {
              onDeleteModalContinue(selectedLeadSource.id);
            }
          }}
          title={t('deleteLeadSource')}
          titleDescription={t('deleteLeadSourceConfirmation', {
            source: selectedLeadSource?.name || '',
            status: selectedLeadSource?.status.active ? 'Active' : 'Inactive',
          })}
        />
      </Box>
    </Box>
  );
};

export default LeadSource;
