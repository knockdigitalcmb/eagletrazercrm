import React, { useState } from "react";
import { Box, Grid2, Typography, IconButton, TextField, InputAdornment } from "@mui/material";
import { Menu as MenuIcon, Search as SearchIcon } from "@mui/icons-material";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CloseIcon from "@mui/icons-material/Close";

import { useTranslation } from "react-i18next";

import NotificationIcon from "../../../components/NotificationIcon";
import ProfileMenu from "../../../components/ProfileMenu";
import styles from "./Dashboard.module.scss";
import EagleTrazer from "../../../assets/images/eagle-trazer.png";

const Dashboard = () => {
  const { t } = useTranslation();
  const [menuCollapsed, setMenuCollapsed] = useState(false);

  const toggleMenu = () => {
    setMenuCollapsed(!menuCollapsed);
  };

  const closeMenu = () => {
    setMenuCollapsed(false);
  };

  return (
    <Box data-testid="loginpage" className={styles.dashboardContainer}>
      <Grid2 container>
        {/* Left Sidebar */}
        <Grid2 size={menuCollapsed ? 1 : 2}
          className={`${styles.leftContainer} ${menuCollapsed ? styles.collapsed : ""}`}
          onMouseEnter={() => menuCollapsed && setMenuCollapsed(false)}
          onMouseLeave={() => menuCollapsed && setMenuCollapsed(true)}
        >
          <div className={styles.logoWrapper}>
            <div className={styles.logoImgWrapper}>
              <img src={EagleTrazer} alt="eagle-logo" title="Eagle Trazer" />
            </div>
            {!menuCollapsed && (
              <div className={styles.logoTextWrapper}>
                {t('companyName')}
              </div>
            )}
            {!menuCollapsed && (
              <div className={styles.closeButton} onClick={closeMenu}>
                <CloseIcon />
              </div>
            )}
          </div>

          <div className={styles.dashboardMenus}>
            <li>
              <HomeOutlinedIcon style={{ marginRight: "8px", verticalAlign: "middle" }} />
              {!menuCollapsed && (<span>{t('dashboard')}</span>)}
            </li>
          </div>

          <div className={styles.dashboardButtons}>
            <div><DarkModeOutlinedIcon /></div>
            {!menuCollapsed && (
              <>
                <div><LanguageOutlinedIcon /></div>
                <div><InfoOutlinedIcon /></div>
              </>
            )}
          </div>
        </Grid2>

        {/* Right Side */}
        <Grid2 size={10} className={styles.rightContainer}>
          <div onClick={toggleMenu}><MenuIcon /></div>

          <div className={styles.searchWrapper}>
            <TextField
              variant="outlined"
              className={styles.searchBar}
              placeholder="Search..."
              size="small"
              fullWidth
              sx={{
                borderRadius: '30px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '30px',
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>

          {/* Right-Aligned Icons */}
          <div className={styles.navRight}>
            <NotificationIcon />
            <ProfileMenu />
          </div>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Dashboard;
