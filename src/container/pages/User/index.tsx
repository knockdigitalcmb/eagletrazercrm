import React, { useState } from 'react';
import { Box, Button, Popover, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { pageSizeOptions } from '../../../constant/common.constant';
import SidePanel from '../../../components/SidePanel';
import CRMTable from '../../../components/CRMTable';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import styles from './User.module.scss';

const User = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(false);
  const [userLoader, setUserLoader] = useState(false);

  const columns: any = [
    { field: 'id', headerName: 'S.No' },
    { field: 'employeeId', headerName: 'Employee ID' },
    { field: 'userName', headerName: 'User Name' },
    {
      field: 'role',
      headerName: 'Role',
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      width: 150,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 150,
    },
    {
      field: 'location',
      headerName: 'Location',
      width: 120,
    },
    {
      field: 'address',
      headerName: 'Address',
      width: 120,
    },
    {
      field: 'status',
      headerName: 'Status',
    },
    {
      field: '',
      headerName: 'Action',
      renderCell: () => {
        return <MoreVertIcon onClick={() => onHandleKebabMenu()} />;
      },
    },
  ];

  const rows = [
    {
      id: 1,
      employeeId: 1,
      userName: 'Test User',
      role: 'Admin',
      phoneNumber: '123456789',
      email: 'test@gmail.com',
      location: 'Tamil Nadu',
      address: 'test address',
      status: 'Active',
    },
  ];

  const onHandleKebabMenu = () => {
    setAnchorEl(true);
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

        <Box>
          <CRMTable
            rows={rows}
            columns={columns}
            pageSizeOptions={pageSizeOptions}
            loading={userLoader}
            checkboxSelection={false}
          />
          <Popover
            id={'id'}
            open={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <Typography sx={{ p: 2 }}>View</Typography>
            <Typography sx={{ p: 2 }}>Edit</Typography>
            <Typography sx={{ p: 2 }}>Delete</Typography>
          </Popover>
        </Box>
      </Box>
    </Box>
  );
};

export default User;
