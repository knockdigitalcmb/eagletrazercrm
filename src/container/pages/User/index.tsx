import React from 'react';
import { Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import SidePanel from '../../../components/SidePanel';

import styles from './User.module.scss';

const User = () => {
  const { t } = useTranslation();
  return (
    <Box component='main' sx={{ flexGrow: 1, p: 3, marginTop: '70px' }}>
      <SidePanel menu='User' />
      <Box
        id='create-user'
        data-testid='create-user'
        className={styles.createUserButton}
      >
        <Button onClick={() => window.open('/create-user', '_blank')}>
          {t('Create User')}
        </Button>
      </Box>
    </Box>
  );
};

export default User;
