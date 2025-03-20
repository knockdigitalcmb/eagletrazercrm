import React, { useState } from 'react';
import { Box, Button, Checkbox, Drawer, FormControlLabel, FormGroup, Typography } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';


const LeadsFilter = () => {
  const { t } = useTranslation();
  const {register,handleSubmit}=useForm()
    const [open, setOpen] = useState(false);
    const toggleDrawer = (isOpen: boolean) => () => {
      setOpen(isOpen);
    };
    
    const onHandleFilterSubmit=(data:any)=>{
     console.log(data)
    }

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
            <FormGroup sx={{ paddingLeft: '25px' }}>
              <FormControlLabel
                control={<Checkbox />}
                label={t('fromDate')}
                {...register('fromDate')}
              />
              <FormControlLabel
                control={<Checkbox />}
                label={t('toDate')}
                {...register('toDate')}
              />
              <FormControlLabel
                control={<Checkbox />}
                label={t('leadSource')}
                {...register('leadSource')}
              />
              <FormControlLabel
                control={<Checkbox />}
                label={t('leadStatus')}
                {...register('leadStatus')}
              />
              <FormControlLabel
                control={<Checkbox />}
                label={t('leadFollower')}
                {...register('leadFollower')}
              />
            </FormGroup>
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
            <Button> {t('reset')}</Button>
            <Button variant='contained' color='primary' onClick={handleSubmit(onHandleFilterSubmit)}>
              {t('submit')}
            </Button>
          </Box>
        </Drawer>
      </Box>
    </>
  );
};

export default LeadsFilter;
