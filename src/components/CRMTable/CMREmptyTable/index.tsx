import React from 'react';
import { Stack, Typography } from '@mui/material';
import  noDataImg  from '../../../assets/images/no-data.png';

interface CRMNoDataProps {
  message: string;
}

const CMREmptyTable = ({ message }: CRMNoDataProps) => {
  return (
    <Stack
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        minHeight: 700,
      }}
    >
      <img
        src={noDataImg}
        alt='No Data'
        style={{
          maxWidth: '75px',
          maxHeight: '75px',
          marginBottom: '5px',
        }}
      ></img>
      <Typography variant='body2'>{message}</Typography>
    </Stack>
  );
};

export default CMREmptyTable;
