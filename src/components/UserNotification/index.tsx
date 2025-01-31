import React from 'react';
import { Badge } from '@mui/material';
import { Notifications } from '@mui/icons-material'; 
import styles from './UserNotification.module.scss';

const UserNotification = () => {
  const notificationCount = 0; 

  return (
    <div className={styles.notificationIcon}>
      <Badge
        badgeContent={notificationCount}
        color='error'
        overlap='circular' 
      >
        <Notifications />
      </Badge>
    </div>
  );
};

export default UserNotification;
