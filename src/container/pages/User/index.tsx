import React from 'react';
import { Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import SidePanel from '../../../components/SidePanel';

import styles from './User.module.scss';

const User = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Box component='main' sx={{ flexGrow: 1, p: 3, marginTop: '70px' }}>
      <SidePanel menu={t('user')} />
      <Box
        id='create-user'
        data-testid='create-user'
        className={styles.createUserButton}
      >
        <Button
          data-testid='create-user-button'
          onClick={() => navigate('/create-user')}
        >
          {t('createUser')}
        </Button>
      </Box>
    </Box>
  );
};

export default User;
