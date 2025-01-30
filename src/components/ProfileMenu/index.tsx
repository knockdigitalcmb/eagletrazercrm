import React, { useState } from "react"; // Import useState here

import { IconButton, Menu, MenuItem, Avatar, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import styles from "./ProfileMenu.module.scss";

const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {/* Profile Button */}
      <div className={styles.profileMenu} onClick={handleProfileMenuOpen}>
        <AccountCircle />
      </div>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        className={styles.menu}
      >
        {/* Profile Section */}
        <div className={styles.profileSection}>
          <Avatar className={styles.avatar}>BM</Avatar>

          <div className={styles.profileDetails}>
            <Typography variant="body1" className={styles.profileName}>
              Balaji Madhiyan
            </Typography>
            <Typography variant="body2" className={styles.profileEmail}>
              balaji.madhiyan@email.com
            </Typography>
          </div>
        </div>

        {/* Menu Items */}
        <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleProfileMenuClose}>Settings</MenuItem>
        <MenuItem onClick={handleProfileMenuClose}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default ProfileMenu;