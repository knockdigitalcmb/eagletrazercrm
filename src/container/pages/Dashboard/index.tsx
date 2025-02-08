import React from 'react';
import {
  Box,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import styles from './Dashboard.module.scss';
import SlideBar from 'components/SlideBar';

const Dashboard = () => {
  const { t } = useTranslation();
  return (
    <Box data-testid='dashboard-page' className={styles.dashboardContainer}> 
    <SlideBar/>
      <Box component='main' sx={{ flexGrow: 1, p: 3, marginTop: '70px' }}>
        <Typography sx={{ marginBottom: 2 }}>
          welcome to the eagle trazer dashboard.
        </Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;
