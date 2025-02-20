import React from 'react';
import { Badge } from '@mui/material';
import { Notifications } from '@mui/icons-material';

import styles from './UserNotification.module.scss';

const UserNotification = () => {
  const notificationCount = 1;

  return (
    <div className={styles.notificationIcon} data-testid="userNotification-component">
      <Badge badgeContent={notificationCount} color='error' overlap='circular'>
        <Notifications />
      </Badge>
    </div>
  );
};

export default UserNotification;
