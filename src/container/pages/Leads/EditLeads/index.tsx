import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Grid2,
  IconButton,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import { GridCloseIcon } from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';
import DatePicker from 'components/DatePicker';
import {
  leadSource,
  leadFollower,
  leadStatus,
} from '../../../../constant/common.constant';
import CRMSelect from 'components/CRMSelect';
import { Controller } from 'react-hook-form';
import dayjs from 'dayjs';

import styles from './EditLeads.module.scss'

interface LeadCreateProps {
  open: boolean;
  onHandleEditClose: () => void;
  control: any;
  onHandleEditLeadsSubmit: (data: any) => void;
  handleSubmit: any;
  row: any;
  setValue: any;
  reset: any;
}

const EditLeads = ({
  open,
  onHandleEditClose,
  control,
  onHandleEditLeadsSubmit,
  handleSubmit,
  row,
  setValue,
  reset,
}: LeadCreateProps) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (row) {
      setValue('date', row.date ? dayjs(row.date) : null);
      setValue('customerName', row.customerName || '');
      setValue('customerNumber', row.phoneNumber || '');
      setValue('customerAlternateNumber', row.customerAlternateNumber || '');
      setValue('customerEmail', row.email || '');
      setValue('customerLocation', row.location || '');
      setValue('leadFollower', row.follower || '');
      setValue('nextDate', row.nextDate ? dayjs(row.nextDate) : null);
      setValue('leadSource', row.leadSource || '');
      setValue('leadStatus', row.leadStatus || '');
    } else {
      reset();
    }
  }, [row, setValue]);

  return (
    <Modal
      open={open}
      onClose={() => {
        onHandleEditClose();
      }}
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
            {t('editLeads')}
          </Typography>

          <IconButton>
            <GridCloseIcon
              onClick={onHandleEditClose}
              data-testid='close-button '
            />
          </IconButton>
        </Grid2>
        <div className={styles.borderLine} />
        <Grid2 container spacing={2}>
          <Grid2 size={8} sx={{ mt: '20px' }}>
            <Grid2 container spacing={3} direction={'row'}>
              <Grid2 size={6}>
                <Controller
                  name='date'
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      selectedDate={field.value ? dayjs(field.value) : null}
                      setSelectedDate={field.onChange}
                      placeholder={t('date')}
                      sx={{ mb: '20px' }}
                    />
                  )}
                />
                <Controller
                  name='customerName'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      placeholder={t('customerName')}
                      sx={{ mb: '20px' }}
                    />
                  )}
                />
                <Controller
                  name='customerNumber'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      placeholder={t('customerNumber')}
                      sx={{ mb: '20px' }}
                    />
                  )}
                />
                <Controller
                  name='customerAlternateNumber'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      placeholder={t('customerAlternateNumber')}
                      sx={{ mb: '20px' }}
                    />
                  )}
                />

                <Controller
                  name='customerEmail'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      placeholder={t('customerEmail')}
                      sx={{ mb: '20px' }}
                    />
                  )}
                />
              </Grid2>
              <Grid2 size={6}>
                <Controller
                  name='customerLocation'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      placeholder={t('customerLocation')}
                      sx={{ mb: '20px' }}
                    />
                  )}
                />
                <Controller
                  name='leadFollower'
                  control={control}
                  render={({ field }) => (
                    <CRMSelect
                      options={leadFollower}
                      value={field.value}
                      onChange={field.onChange}
                      sx={{ mb: '20px' }}
                      placeholder={t('leadFollower')}
                    />
                  )}
                />

                <Controller
                  name='nextDate'
                  control={control}
                  defaultValue={null}
                  render={({ field }) => (
                    <DatePicker
                      selectedDate={field.value ? dayjs(field.value) : null}
                      setSelectedDate={field.onChange}
                      placeholder={t('nextDate')}
                      sx={{ mb: '20px' }}
                    />
                  )}
                />

                <Controller
                  name='leadSource'
                  control={control}
                  render={({ field }) => (
                    <CRMSelect
                      options={leadSource}
                      value={field.value || ''}
                      onChange={field.onChange}
                      sx={{ mb: '20px' }}
                      placeholder={t('leadSource')}
                    />
                  )}
                />

                <Controller
                  name='leadStatus'
                  control={control}
                  render={({ field }) => (
                    <CRMSelect
                      options={leadStatus}
                      value={field.value || ''}
                      onChange={field.onChange}
                      sx={{ mb: '20px' }}
                      placeholder={t('leadStatus')}
                    />
                  )}
                />
              </Grid2>
            </Grid2>
            <Box sx={{ display: 'flex', justifyContent: 'end' }}>
              <Button
                variant='contained'
                sx={{ mb: '20px' }}
                onClick={handleSubmit(onHandleEditLeadsSubmit)}
              >
                {t('submit')}
              </Button>
            </Box>
          </Grid2>
          <Grid2
            size={4}
            sx={{
              mt: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
            }}
          >
            <Box>
              <Typography>{t('leadsComments')}</Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box>
              <TextField placeholder={t('comments')}></TextField>
            </Box>
          </Grid2>
        </Grid2>
      </Box>
    </Modal>
  );
};

export default EditLeads;
