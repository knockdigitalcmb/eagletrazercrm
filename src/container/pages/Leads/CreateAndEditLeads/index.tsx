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
import styles from './CreateAndEditLeads.module.scss';
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
interface LeadCreateProps {
  open: boolean;
  onHandleCreateAndEditClose: () => void;
  control: any;
  onHandleCreateLeadsSubmit: (data: any) => void;
  handleSubmit: any;
  row: any;
  setValue: any;
  reset: any;
}

const CreateAndEditLeads = ({
  open,
  onHandleCreateAndEditClose,
  control,
  onHandleCreateLeadsSubmit,
  handleSubmit,
  row,
  setValue,
  reset,
}: LeadCreateProps) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (row) {
      setValue('date', row.date ? dayjs(row.date) : null);
      setValue('customerName',row.customerName||'')
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
        onHandleCreateAndEditClose();
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
            {row ? t('editLeads') : t('createLeads')}
          </Typography>

          <IconButton>
            <GridCloseIcon
              onClick={onHandleCreateAndEditClose}
              data-testid='close-button '
            />
          </IconButton>
        </Grid2>
        <div className={styles.borderLine} />
        <Box>
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
                    sx={{ marginTop: '20px' }}
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
                    sx={{ mt: '20px' }}
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
                    sx={{ mt: '20px' }}
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
                    sx={{ mt: '20px' }}
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
                    sx={{ mt: '20px' }}
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
                    sx={{ mt: '20px' }}
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
                    sx={{ mt: '20px' }}
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
                    sx={{ mt: '20px' }}
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
                    sx={{ mt: '20px' }}
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
                    sx={{ mt: '20px' }}
                    placeholder={t('leadStatus')}
                  />
                )}
              />
            </Grid2>
          </Grid2>
          <Box sx={{display:'flex',justifyContent:"end"}}>
            <Button
              variant='contained'
              sx={{ mt: '20px' }}
              onClick={handleSubmit(onHandleCreateLeadsSubmit)}
            >
              {t('submit')}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateAndEditLeads;
