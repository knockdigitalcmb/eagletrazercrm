import React from 'react';
import { Box, Button } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useTranslation } from 'react-i18next';

const LeadsFilter = () => {
  const { t } = useTranslation();
  return (
    <>
      <Box>
        <Button variant='contained'>
          {t('filter')}
          <FilterAltIcon />
        </Button>
      </Box>
    </>
  );
};

export default LeadsFilter;
