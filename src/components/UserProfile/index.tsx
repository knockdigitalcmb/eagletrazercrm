import React, { useState } from 'react'; // Import useState here
import { Box, Menu, MenuItem, Avatar, Typography } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { getUsersInitials } from '../../helper';

import styles from './ProfileMenu.module.scss';

const UserProfile = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onHandleUserMenu = () => {
    setAnchorEl(null);
  };

  //on Handle Logout
  const onHandleLogOut = () => {};
  return (
    <Box data-testid='user-profile-component'>
      <div className={styles.profileMenu} onClick={handleProfileMenuOpen}>
        <AccountCircle />
      </div>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onHandleUserMenu}
        className={styles.menu}
      >
        <div className={styles.profileSection}>
          <Avatar className={styles.avatar}>
            {getUsersInitials('Balaji Madhiyan')}
          </Avatar>
          <div className={styles.profileDetails}>
            <Typography variant='body1' className={styles.profileName}>
              Balaji Madhiyan
            </Typography>
          </div>
        </div>
        <MenuItem onClick={onHandleUserMenu}>Profile</MenuItem>
        <MenuItem onClick={onHandleUserMenu}>Settings</MenuItem>
        <MenuItem onClick={onHandleLogOut}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export default UserProfile;
