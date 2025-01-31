import React, { useState } from 'react';
import { Box, Menu, MenuItem, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getUsersInitials } from '../../helper';
import styles from './UserProfile.module.scss';
import userProfilePic from '../../../src/assets/images/userprofileimage.png';

const UserProfile = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const userName = 'Knock digital'; //username
  const userInitials = userName.split(' ').map(word => word[0]).join('').toUpperCase(); // Get initials

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onHandleUserMenu = () => setAnchorEl(null);
  const onHandleLogOut = () => navigate('/login');
  const navigateTo = (path: string) => {
    navigate(path);
    onHandleUserMenu();
  };

  return (
    <Box data-testid="user-profile-component">
      <div className={styles.profileMenu} onClick={handleProfileMenuOpen}>
        <img 
          src={userProfilePic} 
          alt="User Profile" 
          className={styles.profileImage} 
        />
      </div>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onHandleUserMenu}
        className={styles.menu}
      >
        <div className={styles.userprofileSection}>

          <div className={styles.initialsContainer}>
            <div className={styles.initialsCircle}>
              <Typography variant="body1" className={styles.initialsText}>
                {userInitials}
              </Typography>
            </div>
          </div>
          <Typography variant="body1" className={styles.userprofileName}>
            {userName}
          </Typography>
        </div>
        <MenuItem className={styles.menuItem} onClick={() => navigateTo('/profile')}>
          Profile
        </MenuItem>
        <MenuItem className={styles.menuItem} onClick={() => navigateTo('/settings')}>
          Settings
        </MenuItem>
        <MenuItem className={styles.menuItem} onClick={onHandleLogOut}>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserProfile;
