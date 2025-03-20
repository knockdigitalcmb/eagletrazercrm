import React, { useState } from 'react';
import { Box, Button, Drawer, Typography } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useTranslation } from 'react-i18next';
import { Controller } from 'react-hook-form';
import DatePicker from '../../../../components/DatePicker/index';
import CustomSelect from '../../../../components/CustomSelect/index';
import { SelectChangeEvent } from '@mui/material/Select';
import {
  leadSource,
  leadFollower,
  leadStatus,
} from '../../../../constant/common.constant';
import dayjs, { Dayjs } from 'dayjs';
import { FilterProps } from '../../../../models/type';

const LeadsFilter = ({
  control,
  setValue,
  reset,
  handleSubmit,
  onHandleFilterSubmit,
  onHandleFilterClose,
}: FilterProps) => {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  const toggleDrawer = (isOpen: boolean) => () => {
    setOpen(isOpen);
  };

  return (
    <>
      <Box>
        <Button variant='contained' onClick={toggleDrawer(true)}>
          {t('filter')}
          <FilterAltIcon />
        </Button>
        <Drawer anchor={'right'} open={open} onClose={toggleDrawer(false)}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: 300,
              height: '100vh',
              p: 2,
            }}
          >
            {' '}
            <Typography
              variant='h6'
              sx={{ borderBottom: '2px solid #fec601', marginBottom: '20px' }}
            >
              {t('filter')}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <Box>
                {t('fromDate')}

                <Controller
                  name='fromDate'
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      selectedDate={field.value ? dayjs(field.value) : null}
                      setSelectedDate={(date: Dayjs | null) =>
                        setValue('fromDate', date ? date.toDate() : null)
                      }
                    />
                  )}
                />
              </Box>
              <Box>
                {t('endDate')}

                <Controller
                  name='endDate'
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      selectedDate={field.value ? dayjs(field.value) : null}
                      setSelectedDate={(date: Dayjs | null) =>
                        setValue('endDate', date ? date.toDate() : null)
                      }
                    />
                  )}
                />
              </Box>
              <Box>
                {t('leadSource')}
                <Controller
                  name='leadSource'
                  control={control}
                  render={({ field }) => (
                    <CustomSelect
                      options={leadSource}
                      value={field.value}
                      onChange={(e: SelectChangeEvent) =>
                        setValue('leadSource', e.target.value)
                      }
                    />
                  )}
                />
              </Box>
              <Box>
                {t('leadStatus')}
                <Controller
                  name='leadStatus'
                  control={control}
                  render={({ field }) => (
                    <CustomSelect
                      options={leadStatus}
                      value={field.value}
                      onChange={(e: SelectChangeEvent) =>
                        setValue('leadStatus', e.target.value)
                      }
                    />
                  )}
                />
              </Box>
              <Box>
                {t('leadFollower')}
                <Controller
                  name='leadFollower'
                  control={control}
                  render={({ field }) => (
                    <CustomSelect
                      options={leadFollower}
                      value={field.value}
                      onChange={(e: SelectChangeEvent) =>
                        setValue('leadFollower', e.target.value)
                      }
                    />
                  )}
                />
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '15px',
              alignItems: 'center',
              padding: '10px',
            }}
          >
            <Button onClick={onHandleFilterClose}> {t('reset')}</Button>
            <Button
              variant='contained'
              color='primary'
              onClick={handleSubmit(onHandleFilterSubmit)}
            >
              {t('submit')}
            </Button>
          </Box>
        </Drawer>
      </Box>
    </>
  );
};

export default LeadsFilter;
