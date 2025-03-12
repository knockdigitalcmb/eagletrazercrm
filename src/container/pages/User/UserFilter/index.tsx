import React from 'react';
import { Box, Button, Checkbox, Drawer, ListItemIcon, ListItemText, MenuItem, Typography } from '@mui/material';

interface UserFilterProps {
  drawerOpen: boolean;
  selectedStatuses: string[];
  handleFilterClose: () => void;
  handleStatusChange: (status: string) => void;
  handleReset: () => void;
}

const UserFilter: React.FC<UserFilterProps> = ({
  drawerOpen,
  selectedStatuses,
  handleFilterClose,
  handleStatusChange,
  handleReset,
}) => {
  return (
    <Drawer anchor='right' open={drawerOpen} onClose={handleFilterClose}>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: 350, height: '100vh', p: 2 }}>
        <Typography variant='h6' sx={{ borderBottom: '2px solid #fec601' }}>Filter</Typography>

        <Typography variant='subtitle1' sx={{ mt: 2, mb: 1 }}>Status</Typography>
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 0 }}>
          <MenuItem onClick={() => handleStatusChange('active')} sx={{ paddingY: 0.5 }}>
            <ListItemIcon><Checkbox checked={selectedStatuses.includes('active')} /></ListItemIcon>
            <ListItemText primary='Active' />
          </MenuItem>

          <MenuItem onClick={() => handleStatusChange('inactive')} sx={{ paddingY: 0.5 }}>
            <ListItemIcon><Checkbox checked={selectedStatuses.includes('inactive')} /></ListItemIcon>
            <ListItemText primary='Inactive' />
          </MenuItem>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 'auto', pb: 2 }}>
          <Button variant='outlined' onClick={handleReset}>Reset</Button>
          <Button variant='contained' color='primary' onClick={handleFilterClose}>Submit</Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default UserFilter;
