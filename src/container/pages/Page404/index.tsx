import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import styles from './Page404.module.scss';
import { ReactComponent as Page404Image } from '../../../assets/images/404-bg.svg';
import EagleTrazer from '../../../assets/images/eagle-trazer.png';

const Page404 = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  //on Handle page 404
  const onHandlePage404 = () => {
    navigate('/');
  };
  return (
    <Box data-testid='loginpage' className={styles.page404Container}>
      <Grid container spacing={2}>
        <Grid size={7} className={styles.alignCenter}>
          <div className={styles.page404ImageWrapper}>
            <Page404Image />
          </div>
        </Grid>
        <Grid size={5} className={styles.alignCenter}>
          <div className={styles.page404Wrapper}>
            <div className={styles.eagleTrazer}>
              <img src={EagleTrazer} alt='eagle-logo' title='Eagle Trazer' />
            </div>
            <Typography className={styles.page404Description}>
              {t('page404Description')}
            </Typography>
            <Button
              variant='contained'
              type='submit'
              id='page404-submit'
              data-testid='page404-submit'
              className={styles.submitButton}
              onClick={onHandlePage404}
            >
              {t('returnToHome')}
            </Button>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Page404;
