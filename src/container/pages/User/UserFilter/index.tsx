import React from 'react';
import {
  Box,
  Button,
  Checkbox,
  Drawer,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Typography,
} from '@mui/material';
import { filterStatus } from '../../../../constant/common.constant';

interface UserFilterProps {
  drawerOpen: boolean;
  selectedStatuses: string[];
  onHandleFilterClose: () => void;
  onHandleStatusChange: (status: string) => void;
  onHandleReset: () => void;
   
}

const UserFilter: React.FC<UserFilterProps> = ({
  drawerOpen,
  selectedStatuses,
  onHandleFilterClose,
  onHandleStatusChange,
  onHandleReset,
}) => {
  return (
    <Drawer anchor='right' open={drawerOpen} onClose={onHandleFilterClose}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: 300,
          height: '100vh',
          p: 2,
        }}
      >
        <Typography variant='h6' sx={{ borderBottom: '2px solid #fec601' }}>
          Filter
        </Typography>

        <Typography variant='subtitle1' sx={{ mt: 2, mb: 1 }}>
          Status
        </Typography>
        <Box
          sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 0 }}
        >
          {filterStatus.map((item) => {
            return (
              <MenuItem
                onClick={() => onHandleStatusChange(`${item.toLowerCase()}`)}
                sx={{ paddingY: 0.5 }}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={selectedStatuses.includes(`${item.toLowerCase()}`)}
                  />
                </ListItemIcon>
                <ListItemText primary={item} />
              </MenuItem>
            );
          })}
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'end',
            mt: 'auto',
            pb: 2,
          }}
        >
          <Button
            variant='outlined'
            onClick={onHandleReset}
            sx={{
              marginRight: '15px',
            }}
          >
            Reset
          </Button>
          <Button
            variant='contained'
            color='primary'
            onClick={onHandleFilterClose}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default UserFilter;
