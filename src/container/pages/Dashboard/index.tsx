import React, { useState } from 'react';
import { Box, Grid, Grid2 } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

import { useTranslation } from 'react-i18next';

import styles from './Dashboard.module.scss';
import EagleTrazer from '../../../assets/images/eagle-trazer.png';

const Dashboard = () => {
  const { t } = useTranslation();
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleMenu = () => {
    setMenuCollapsed(!menuCollapsed);
  };

  return (
    <Box data-testid='loginpage' className={styles.dashboardContainer}>
      <Grid2 container>
        {/* leftSection */}
        <Grid2
          size={menuCollapsed ? 1 : 2}
          className={styles.leftContainer}
          onMouseEnter={() => {
            if (menuCollapsed) 
              setIsExpanded(true);
          }
          }
        >
          <div className={styles.logoWrapper}>
            <div className={styles.logoImgWrapper}>
              <img src={EagleTrazer} alt='eagle-logo' title='Eagle Trazer' />
            </div>
            {(!menuCollapsed) && (
              <div className={styles.logoTextWrapper}>{t('companyName')}</div>
            )}
           <div className={styles.closeButton}>
              <CloseIcon />
            </div>
          </div>
          <div className={styles.dashboardMenus}>
            <li>
              <HomeOutlinedIcon />
              {(!menuCollapsed) && <span>{t('dashboard')}</span>}
            </li>
          </div>
          <div className={styles.dashboardButtons}>
            <div>
              <DarkModeOutlinedIcon />
            </div>
            {(!menuCollapsed ) && (
              <>
                <div>
                  <LanguageOutlinedIcon />
                </div>
                <div>
                  <InfoOutlinedIcon />
                </div>
              </>
            )}
          </div>
        </Grid2>
        {/* expandSlidebar */}
        {isExpanded && (
          <div className={`${styles.expandedSidebar} ${isExpanded ? styles.showSidebar : ''}`}>
            <div className={styles.logoWrapper}>
              <div className={styles.logoImgWrapper}>
                <img src={EagleTrazer} alt="eagle-logo" title="Eagle Trazer" />
              </div>
              <div className={styles.logoTextWrapper}>{t('companyName')}</div>
              <div className={styles.unhideCloseButton} onClick={() => setIsExpanded(false)}>
                <CloseIcon />
              </div>
            </div>
            <div className={styles.dashboardMenus}>
              <li>
                <HomeOutlinedIcon />
                <span>{t('dashboard')}</span>
              </li>
            </div>
            <div className={styles.dashboardButtons}>
              <div>
                <DarkModeOutlinedIcon />
              </div>
              <div>
                <LanguageOutlinedIcon />
              </div>
              <div>
                <InfoOutlinedIcon />
              </div>
            </div>
          </div>
        )}
        {/* right section*/}
        <Grid2 size={10} className={styles.rightContainer}>
          <div onClick={toggleMenu}>
            <MenuIcon />
          </div>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Dashboard;
