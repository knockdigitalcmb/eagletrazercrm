import React, { useState } from 'react';
import { Box, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import styles from './UserProfile.module.scss';
import userProfilePic from '../../../src/assets/images/userprofileimage.png';

const UserProfile = () => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

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
    <Box data-testid='user-profile-component'>
      <div className={styles.profileMenu} onClick={handleProfileMenuOpen}>
        <img
          src={userProfilePic}
          alt='User Profile'
          className={styles.profileImage}
        />
      </div>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onHandleUserMenu}
        className={styles.menu}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuItem
          className={styles.menuItem}
          onClick={() => navigateTo('/profile')}
        >
          {t('profile')}
        </MenuItem>
        <MenuItem
          className={styles.menuItem}
          onClick={() => navigateTo('/settings')}
        >
          {t('settings')}
        </MenuItem>
        <MenuItem className={styles.menuItem} onClick={onHandleLogOut}>
          {t('logout')}
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserProfile;
