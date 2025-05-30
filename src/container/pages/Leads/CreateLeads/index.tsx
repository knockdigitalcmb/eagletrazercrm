import React from 'react';
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

import styles from './CreateLeads.module.scss';

interface LeadCreateProps {
  open: boolean;
  onHandleCreateClose: () => void;
  control: any;
  onHandleCreateSubmit: (data: any) => void;
  handleSubmit: any;
  errors?: any;
  getValues: any;
}

const CreateLeads = ({
  open,
  onHandleCreateClose,
  control,
  onHandleCreateSubmit,
  handleSubmit,
  errors,
  getValues,
}: LeadCreateProps) => {
  const { t } = useTranslation();
  return (
    <Modal
      open={open}
      onClose={() => {
        onHandleCreateClose();
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
            {t('createLeads')}
          </Typography>

          <IconButton>
            <GridCloseIcon
              onClick={onHandleCreateClose}
              data-testid='close-button '
            />
          </IconButton>
        </Grid2>
        <div className={styles.borderLine} />
        <Grid2 container spacing={3} direction={'row'}>
          <Grid2 size={6}>
            <Controller
              name='date'
              control={control}
              rules={{ required: `${t('requiredDate')}` }}
              render={({ field }) => (
                <>
                  <DatePicker
                    selectedDate={field.value ? dayjs(field.value) : null}
                    setSelectedDate={field.onChange}
                    placeholder={t('date')}
                    sx={{ marginTop: '20px' }}
                  />
                  {errors?.date && (
                    <Typography color='error' variant='caption'>
                      {errors.date.message}
                    </Typography>
                  )}
                </>
              )}
            />
            <Controller
              name='customerName'
              control={control}
              rules={{ required: `${t('requiredCustomerName')}` }}
              render={({ field }) => (
                <>
                  <TextField
                    {...field}
                    placeholder={t('customerName')}
                    sx={{ mt: '20px' }}
                  />
                  {errors?.customerName && (
                    <Typography color='error' variant='caption'>
                      {errors.customerName.message}
                    </Typography>
                  )}
                </>
              )}
            />
            <Controller
              name='customerNumber'
              control={control}
              rules={{ required: `${t('requiredCustomerNumber')}` }}
              render={({ field }) => (
                <>
                  <TextField
                    {...field}
                    placeholder={t('customerNumber')}
                    sx={{ mt: '20px' }}
                  />
                  {errors?.customerNumber && (
                    <Typography variant='caption' color='error'>
                      {errors.customerNumber.message}
                    </Typography>
                  )}
                </>
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
              rules={{
                validate: (nextDate: any) => {
                  const date = getValues('date');
                  if (
                    !nextDate ||
                    !date ||
                    dayjs(nextDate).isAfter(dayjs(date))
                  ) {
                    return true;
                  } else {
                    return `${t('nextDateValidation')}`;
                  }
                },
              }}
              render={({ field }) => (
                <>
                  <DatePicker
                    selectedDate={field.value ? dayjs(field.value) : null}
                    setSelectedDate={field.onChange}
                    placeholder={t('nextDate')}
                    sx={{ mt: '20px' }}
                  />
                  {errors?.nextDate && (
                    <Typography variant='caption' color='error'>
                      {errors.nextDate.message}
                    </Typography>
                  )}
                </>
              )}
            />

            <Controller
              name='leadSource'
              control={control}
              rules={{ required: `${t('requiredLeadSource')}` }}
              render={({ field }) => (
                <>
                  <CRMSelect
                    options={leadSource}
                    value={field.value || ''}
                    onChange={field.onChange}
                    sx={{ mt: '20px' }}
                    placeholder={t('leadSource')}
                  />
                  {errors?.leadSource && (
                    <Typography color='error' variant='caption'>
                      {errors.leadSource.message}
                    </Typography>
                  )}
                </>
              )}
            />

            <Controller
              name='leadStatus'
              control={control}
              rules={{ required: `${t('requiredLeadStatus')}` }}
              render={({ field }) => (
                <>
                  <CRMSelect
                    options={leadStatus}
                    value={field.value || ''}
                    onChange={field.onChange}
                    sx={{ mt: '20px' }}
                    placeholder={t('leadStatus')}
                  />
                  {errors?.leadStatus && (
                    <Typography color='error' variant='caption'>
                      {errors.leadStatus.message}
                    </Typography>
                  )}
                </>
              )}
            />
          </Grid2>
        </Grid2>
        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
          <Button
            variant='contained'
            sx={{ mt: '20px' }}
            onClick={handleSubmit(onHandleCreateSubmit)}
          >
            {t('submit')}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateLeads;
