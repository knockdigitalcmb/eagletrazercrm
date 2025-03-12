import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useTranslation } from 'react-i18next';

interface UserSearchProps {
  searchTerm: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFilterOpen: () => void;
}

const UserSearch: React.FC<UserSearchProps> = ({
  searchTerm,
  handleSearchChange,
  handleFilterOpen,
}) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 2,
      }}
    >
      <TextField
        placeholder={t('searchPlaceholder')}
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ width: '30%' }}
      />
      <Button
        variant='contained'
        color='primary'
        onClick={handleFilterOpen}
        endIcon={<FilterAltIcon />}
        sx={{ whiteSpace: 'nowrap', borderRadius: 2, marginLeft: 2 }}
      >
        {t('filter')}
      </Button>
    </Box>
  );
};

export default UserSearch;
