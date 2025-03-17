import React from 'react';
import { TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { LeadsSearchProps } from '../../../../models/type';

const LeadsSearch: React.FC<LeadsSearchProps> = ({
  searchLeads,
  onHandleLeadsSearch,
}) => {
  const { t } = useTranslation();

  return (
    <TextField
      placeholder={t('leadsSearchPlaceholder')}
      sx={{ width: '30%' }}
      value={searchLeads}
      onChange={onHandleLeadsSearch}
    />
  );
};

export default LeadsSearch;
