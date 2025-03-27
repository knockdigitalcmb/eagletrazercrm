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
import commentIcon from '../../../../assets/images/chat-message.png';

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
        <Grid2 container spacing={4}>
          <Grid2 size={7}>
            <Typography sx={{ mt: '10px' }}>{t('leadInformation')}</Typography>
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
          </Grid2>
          <Grid2 size={5} sx={{pl: 4, borderLeft: '1px solid #ccc'}}>
            <Box sx={{ mt: '10px' }}>
              <Typography sx={{ mb: '20px' }}>{t('leadsComments')}</Typography>
              {row?.comments?.length > 0 ? (
                row.comments.map(
                  (comment: { text: string; date: string }, index: number) => (
                    <Box key={index} sx={{ mb: 1 }}>
                      <Typography sx={{ mb: '10px' }}>
                        {comment.date}
                      </Typography>
                      <Typography sx={{ mb: '10px' }}>
                        {comment.text}
                      </Typography>
                      <div className={styles.divider} />
                    </Box>
                  )
                )
              ) : (
                 <Box
                                    sx={{
                                      display: 'flex',
                                      flexDirection: 'column',
                                      alignItems: 'center',
                                      mt: 4,
                                    }}
                                  >
                                    <img
                                      src={commentIcon}
                                      alt='No Comments'
                                      style={{ width: 80, height: 80, opacity: 0.5 }}
                                    />
                                    <Typography sx={{ color: '#888', mt: 2 }}>
                                      {t('noComments')}
                                    </Typography>
                                  </Box>
              )}
            </Box>
          </Grid2>
        </Grid2>
      </Box>
    </Modal>
  );
};

export default ViewLeads;
