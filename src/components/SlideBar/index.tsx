import React from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import {
  Box,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

import {menuItems} from '../../constant/common.constant';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SearchBar from '../SearchBar/index';
import UserNotification from '../UserNotification';
import UserProfile from '../UserProfile';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';


import styles from './SlideBar.module.scss';
import EagleTrazer from '../../assets/images/eagle-trazer.png';

const drawerWidth = 260;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  background: '#fff',
  borderRight: '1px solid #dee2e6',
  boxShadow:
    '0 2px 6px 0 rgba(0, 0, 0, 0.044), 0 2px 6px 0 rgba(0, 0, 0, 0.049)',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  background: '#fff',
  borderRight: '1px solid #dee2e6',
  boxShadow:
    '0 2px 6px 0 rgba(0, 0, 0, 0.044), 0 2px 6px 0 rgba(0, 0, 0, 0.049)',
  width: `calc(${theme.spacing(7)} + 1px)`,
  cursor: 'pointer',
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  height: '70px',
  background: '#fff',
  boxShadow:
    '0 2px 6px 0 rgba(0, 0, 0, 0.044), 0 2px 6px 0 rgba(0, 0, 0, 0.049)',
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        width: `calc(100% - 65px)`, //65px total width for side menu
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  '&:hover': {
    '& .close-icon': {
      cursor: 'pointer',
    },
  },

  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': {
          ...closedMixin(theme),
          '&:hover': {
            width: drawerWidth,
            zIndex: '1202',
          },
        },
      },
    },
  ],
}));

const SlideBar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const [activeItem, setActiveItem] = React.useState<string>('Dashboard');

  const handleDrawerOpen = () => {
    setOpen(!open);
  };
  //handleItemClick
  const handleItemClick = (item: string) => {
    navigate(`/${item.toLowerCase()}`);
    setActiveItem(item);
  };
  //handleDrawerClose
  const handleDrawerClose = () => {
    setOpen(true);
  };

  return (
    <Box data-testid='dashboard-page' className={styles.dashboardContainer}>
      <CssBaseline />
      <AppBar position='fixed' open={open} className={styles.appHeader}>
        <Toolbar className={styles.toolbar}>
          <Box className={styles.headerIcon}>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              onClick={handleDrawerOpen}
              edge='start'
              sx={{ fontSize: '60px' }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Box className={styles.headerSearchBar}>
            <SearchBar />
          </Box>
          <Box className={styles.headerRightSection}>
            <UserNotification />
            <UserProfile />
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant='permanent' open={open} anchor='left'>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            marginTop: '10px',
          }}
        >
          <img
            src={EagleTrazer}
            alt='eagle-logo'
            title='Eagle Trazer'
            className={styles.dashboardCompanyLogo}
          />
          <Typography
            variant='h6'
            component='div'
            sx={{ fontWeight: 500, color: 'rgb(71, 71, 71)' }}
          >
            {t('companyName')}
          </Typography>
          {!open && (
            <IconButton className='close-icon' onClick={handleDrawerClose}>
              <CloseIcon />
            </IconButton>
          )}
        </Box>
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.name}
              disablePadding
              className={`${styles.listItem} ${activeItem === item.name ? styles.active : ''}`}
            >
              <ListItemButton
                sx={[
                  { minHeight: 48, px: 2.5 },
                  open
                    ? { justifyContent: 'initial' }
                    : { justifyContent: 'center' },
                ]}
                onClick={() => handleItemClick(item.name)}
              >
                <ListItemIcon
                  sx={[
                    { minWidth: 0, justifyContent: 'center' },
                    open ? { mr: 3 } : { mr: 'auto' },
                  ]}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  className='listItemText'
                  sx={{
                    display: open ? 'block' : 'none',
                    '.MuiDrawer-root:hover &': { display: 'block' },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default SlideBar;
