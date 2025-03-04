import React, { useState } from 'react';
import { Box, Button, IconButton, Menu, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  pageSizeOptions,
  kebabMenuOptions,
} from '../../../constant/common.constant';
import SidePanel from '../../../components/SidePanel';
import CRMTable from '../../../components/CRMTable';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import styles from './User.module.scss';

const ITEM_HEIGHT = 48;
const User = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [userLoader, setUserLoader] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

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
              {kebabMenuOptions.map((option) => (
                <MenuItem key={option} onClick={handleClose}>
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </>
        );
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

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
        </Box>
      </Box>
    </Box>
  );
};

export default User;
