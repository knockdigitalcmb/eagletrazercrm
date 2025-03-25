import React from 'react';
import {
  Box,
  Grid2,
  IconButton,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import { GridCloseIcon } from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';

import styles from './ViewLeads.module.scss';

interface ViewLeads {
  open: boolean;
  onHandleViewLeadsClose: () => void;
  row: any;
}

const ViewLeads = ({ open, onHandleViewLeadsClose, row }: ViewLeads) => {
  const { t } = useTranslation();
  return (
    <Modal
      open={open}
      onClose={() => onHandleViewLeadsClose()}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box className={styles.modalWrapper}>
        <Grid2
          container
          display='flex'
          justifyContent='space-between'
          alignItems='center'
        >
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            {t('viewLeads')}
          </Typography>
          <IconButton>
            <GridCloseIcon
              onClick={onHandleViewLeadsClose}
              data-testid='close-button '
            />
          </IconButton>
        </Grid2>
        <div className={styles.borderLine} />
        <Grid2 container spacing={3} direction={'row'}>
          <Grid2 size={6}>
            <TextField value={row?.date} sx={{ mt: '20px' }} />
            <TextField value={row?.customerName} sx={{ mt: '20px' }} />
            <TextField value={row?.phoneNumber} sx={{ mt: '20px' }} />
            <TextField value={row?.email} sx={{ mt: '20px' }} />
            <TextField value={row?.location} sx={{ mt: '20px' }} />
          </Grid2>
          <Grid2 size={6}>
            <TextField value={row?.follower} sx={{ mt: '20px' }} />
            <TextField value={row?.nextDate} sx={{ mt: '20px' }} />
            <TextField value={row?.leadSource} sx={{ mt: '20px' }} />
            <TextField value={row?.leadStatus} sx={{ mt: '20px' }} />
          </Grid2>
        </Grid2>
      </Box>
    </Modal>
  );
};

export default ViewLeads;
