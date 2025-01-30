import React from "react";
import { Badge } from "@mui/material"; // To show a notification badge
import { Notifications } from "@mui/icons-material"; // Notification icon
import styles from "./NotificationIcon.module.scss"; // Correct import

const NotificationIcon = () => {
  const notificationCount = 3; // Example notification count, change dynamically as needed

  return (
    <div className={styles.notificationIcon}>
      <Badge
        badgeContent={notificationCount}
        color="error" // Red color for notification count
        overlap="circular" // Ensures the badge overlaps the icon
      >
        <Notifications />
      </Badge>
    </div>
  );
};

export default NotificationIcon;
