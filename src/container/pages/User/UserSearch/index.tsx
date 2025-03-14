import React from 'react';
import { Box, Button, TextField } from '@mui/material';

import { useTranslation } from 'react-i18next';

interface UserSearchProps {
  searchTerm: string;
  onHandleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
 
}

const UserSearch: React.FC<UserSearchProps> = ({
  searchTerm,
  onHandleSearchChange,
 
}) => {
  const { t } = useTranslation();

  return (
    <TextField
      placeholder={t('searchPlaceholder')}
      value={searchTerm}
      onChange={onHandleSearchChange}
      sx={{ width: '30%' }}
    />
  );
};

export default UserSearch;
