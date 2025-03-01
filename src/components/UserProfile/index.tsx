import React, { useState } from 'react';
import { Box, Button, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './UserProfile.module.scss';
import userProfilePic from '../../../src/assets/images/userprofileimage.png';
import LoginConfirmation from '../LogoutConfirmation/';
import { useCRMAppDispatch } from '../../store/config';
import { setClearAuthToken } from 'features/common/commonSlice';

const UserProfile = () => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
   const dispatch = useCRMAppDispatch();
   const [open, setOpen] = React.useState(false);

   const handleOpen = () => {
     setOpen(true);
   };

   const handleClose = () => {
     setOpen(false);
   };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onHandleUserMenu = () => setAnchorEl(null);
  const onHandleLogOut = () =>{
   dispatch(setClearAuthToken())
   navigate('/');
  }
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
        <MenuItem className={styles.menuItem} onClick={handleOpen}>
          {t('logout')}
        </MenuItem>
      </Menu>
      <LoginConfirmation
        open={open}
        onClose={handleClose}
        title={t('logout')}
        content={t('confirmationLogout')}
        actions={
          <>
            <Button onClick={onHandleLogOut} className={styles.logout}>
              {t('logout')}
            </Button>
            <Button
              onClick={handleClose}
              color='secondary'
              className={styles.cancel}
            >
              {t('cancel')}
            </Button>
          </>
        }
      />
    </Box>
  );
};
export default UserProfile;
