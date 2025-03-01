import React, { useState } from 'react';
import { Box, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { setAuthToken } from '../../features/common/commonSlice';
import { useCRMAppDispatch } from '../../store/config';
import LogoutModal from '../LogoutModal';

import userProfilePic from '../../../src/assets/images/userprofileimage.png';
import styles from './UserProfile.module.scss';

const UserProfile = () => {
  const { t } = useTranslation();
  const dispatch = useCRMAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onHandleUserMenu = () => setAnchorEl(null);

  const onHandleLogOut = () => {
    setOpen(true);
  };

  const onHandleLogOutClose = () => {
    setOpen(false);
  };

  const onHandleContinue = () => {
    dispatch(setAuthToken(''));
    navigate('/');
  };

  const navigateTo = (path: string) => {
    navigate(path);
    onHandleUserMenu();
  };

  return (
    <Box data-testid='user-profile'>
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
      <LogoutModal
        open={open}
        onClose={onHandleLogOutClose}
        onHandleContinue={onHandleContinue}
      />
    </Box>
  );
};
export default UserProfile;
