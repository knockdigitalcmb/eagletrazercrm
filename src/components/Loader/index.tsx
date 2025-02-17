import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import styles from './Loader.module.scss';

const Loader = () => {
  return (
    <Box className={styles.loderWrapper} data-testid='loader-component'>
      <CircularProgress />
    </Box>
  );
};

export default Loader;
