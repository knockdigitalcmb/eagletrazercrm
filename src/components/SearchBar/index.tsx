import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    // Handle search logic, e.g., make an API request with the query
    console.log('Searching for:', searchQuery);
  };

  return (
    <TextField
      value={searchQuery}
      onChange={handleChange}
      placeholder='Search...'
      variant='outlined'
      sx={{
        width: '80%', // Set the width to 60px
        borderRadius: '25px', // Set the desired border radius for rounded corners
        '& .MuiOutlinedInput-root': {
          borderRadius: '20px', // Apply border radius to the input field itself
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <IconButton onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
