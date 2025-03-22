import React, { useEffect, useState, useTransition } from 'react';
import SlidePanel from '../../../components/SidePanel/index';
import { useTranslation } from 'react-i18next';
import { Box, Button } from '@mui/material';
import LeadsSearch from './LeadsSearch';
import LeadsFilter from './LeadsFilter/index';
import CRMTable from '../../../components/CRMTable/index';
import CRMTableActions from '../../../components/CRMTableAction/index';
import { LeadsProps, MenuProps } from '../../../models/type';
import { CRMServiceAPI } from 'services/CRMService';
import { Dayjs } from 'dayjs';
import { useForm } from 'react-hook-form';

import styles from './Leads.module.scss';
import CreateAndEditLeads from './CreateAndEditLeads';

const actionsProps = {
  view: false,
  edit: true,
  delete: true,
};
const Leads = () => {
  const { t } = useTranslation();
  const [menuState, setMenuState] = useState<MenuProps>({
    anchorEl: null,
    rowId: null,
  });
  const [leads, setLeads] = useState<LeadsProps[]>([]);
  const [selectedLeads, setSelectedLeads] = useState<LeadsProps | null>(null);
  const [searchLeads, setSearchLeads] = useState('');
  const [leadsLoader, setLeadsLoader] = useState(false);
  const [createAndEditModalOpen, setCreateAndEditModalOpen] = useState(false);

  const { control, setValue, reset, handleSubmit, register } = useForm({
    defaultValues: {
      fromDate: null as Dayjs | null,
      endDate: null as Dayjs | null,
      leadSource: '',
      leadStatus: '',
      leadFollower: '',
      date: null as Dayjs | null,
      customerNumber: '',
      customerAlternateNumber: '',
      customerEmail: '',
      customerLocation: '',
      nextDate: null as Dayjs | null,
    },
  });



  useEffect(() => {
    getLeadsList();
  }, []);

  useEffect(() => {
    if (searchLeads && searchLeads.length > 3) {
      let payload = {
        search: searchLeads,
      };
      getSearchLeadsList(payload);
    }
  }, [searchLeads]);

  // On Handle Leads Search
  const onHandleLeadsSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchLeads(e.target.value);
    console.log(searchLeads);
  };

  // On Handle create and edit modal open
  const onHandleCreateAndEditOpen = () => {
    setCreateAndEditModalOpen(true);
  };

  //On Handle create and edit modal close
  const onHandleCreateAndEditClose = () => {
    setCreateAndEditModalOpen(false);
  };

  //on handle filter close
  const onHandleFilterClose = () => {
    reset();
  };

  // on handle click
  const onHandleClick = (
    event: React.MouseEvent<HTMLElement>,
    rowId: number
  ) => {
    setMenuState({ anchorEl: event.currentTarget, rowId });
  };
  // on handle close
  const onHandleClose = () => {
    setMenuState({ anchorEl: null, rowId: null });
  };

  //on handle view modal
  const onHandleViewModal = () => {};

  // on handle edit modal
  const onHandleEditModal = (lead: LeadsProps) => {
    setSelectedLeads(lead);
    console.log(selectedLeads)
  };

  // on handle delete modal
  const onHandleDeleteModal = () => {};

  const getLeadsList = async () => {
    setLeadsLoader(true);
    try {
      const response = await CRMServiceAPI.leadsList();
      if (response) {
        setLeads(response);
      } else {
        setLeads([]);
      }
      setLeadsLoader(false);
    } catch (error) {
      console.log('Lead list error', error);
    }
  };

  const getSearchLeadsList = async (payload: any) => {
    setLeadsLoader(true);
    try {
      let response = await CRMServiceAPI.searchLeads(payload);
      if (response) {
        setLeads([]);
      }
      setLeadsLoader(false);
    } catch (error) {
      console.log('search leads:', error);
    }
  };
  // on handle filter submit
  const onHandleFilterSubmit = async (payload: any) => {
    setLeadsLoader(true);
    try {
      let response = await CRMServiceAPI.leadsFilterList(payload);
      if (response) {
        // setLeads([response])
      }
    } catch (error) {
      console.log('Filter Leads API', error);
    }
    reset();
  };
  // on handle create and edit lead 
   const onHandleCreateLeadsSubmit = (data: any) => {
     console.log(data);
     reset();
   };
  const RenderCRMTableAction = (params: any) => {
    return (
      <CRMTableActions
        row={params}
        menuState={menuState}
        handleClick={onHandleClick}
        handleClose={onHandleClose}
        onHandleViewModalOpen={onHandleViewModal}
        onHandleEditModal={onHandleEditModal}
        onHandleDeleteModal={onHandleDeleteModal}
        actions={actionsProps}
      />
    );
  };

  const columns: any = [
    { field: 'id', headerName: 'S.No', sortable: false, width: 80 },
    { field: 'date', headerName: 'Date', sortable: false, width: 80 },
    {
      field: 'customerName',
      headerName: 'Customer Name',
      sortable: true,
      width: 150,
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      sortable: false,
      width: 150,
    },
    { field: 'email', headerName: 'Email', sortable: false, width: 130 },
    { field: 'location', headerName: 'Location', sortable: false, width: 130 },
    { field: 'follower', headerName: 'Follower', sortable: false, width: 130 },
    {
      field: 'leadSource',
      headerName: 'Lead Source',
      sortable: false,
      width: 130,
    },
    { field: 'nextDate', headerName: 'Next Date', sortable: false, width: 80 },
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      width: 80,
      renderCell: (rows: any) => RenderCRMTableAction(rows),
    },
  ];
  return (
    <Box data-testid='leads-page' className={styles.dashboardContainer}>
      <SlidePanel menu={t('leads')} />
      <Box component='main' sx={{ flexGrow: 1, p: 3, marginTop: '70px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant='contained'
            sx={{ marginBottom: '20px' }}
            onClick={onHandleCreateAndEditOpen}
          >
            {t('createLeads')}
          </Button>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <CreateAndEditLeads
            open={createAndEditModalOpen}
            onHandleCreateAndEditClose={onHandleCreateAndEditClose}
            register={register}
            control={control}
            onHandleCreateLeadsSubmit={onHandleCreateLeadsSubmit}
            handleSubmit={handleSubmit}
          />

          <LeadsSearch
            searchLeads={searchLeads}
            onHandleLeadsSearch={onHandleLeadsSearch}
          />
          <LeadsFilter
            control={control}
            setValue={setValue}
            reset={reset}
            handleSubmit={handleSubmit}
            onHandleFilterSubmit={onHandleFilterSubmit}
            onHandleFilterClose={onHandleFilterClose}
          />
        </Box>
        <CRMTable
          rows={leads}
          columns={columns}
          pageSizeOptions={[5, 10]}
          loading={leadsLoader}
          checkboxSelection={false}
        />
      </Box>
    </Box>
  );
};

export default Leads;
