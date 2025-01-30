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
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CloseIcon from '@mui/icons-material/Close';
import EagleTrazer from '../../../assets/images/eagle-trazer.png';

import styles from './Dashboard.module.scss';

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
  //hover slideBar
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.standard,
  }),
  position: 'relative',

  '&:hover': {
    ...openedMixin(theme),
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: theme.zIndex.drawer + 1,
    '& .MuiDrawer-paper': {
      ...openedMixin(theme),
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      zIndex: theme.zIndex.drawer + 1,
    },
    '& .MuiListItemText-root': {
      opacity: 1,
      visibility: 'visible !important',
    },
    '& .menu-icon': {
      opacity: 1,
      visibility: 'visible',
      zIndex: theme.zIndex.drawer + 2,
    },
    '& .close-icon': {
      opacity: 1,
      visibility: 'visible',
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
        '& .MuiDrawer-paper': closedMixin(theme),
      },
    },
  ],
}));

const Dashboard = () => {
  const [open, setOpen] = React.useState(true);
  const [activeItem, setActiveItem] = React.useState<string>('');
 

  const handleDrawerOpen = () => {
    setOpen(!open);
  };
  //  handleItemClick
  const handleItemClick = (item: string) => {
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
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{ marginRight: 5 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant='h6' noWrap component='div'>
            Mini variant drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant='permanent' open={open} anchor='left'>
        <Divider />
        {/* company logo */}
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
            Eagle Trazer
          </Typography>
          {!open && (
          <IconButton
            className='close-icon'
            sx={{
              position: 'absolute',
              right: 10,
              opacity: 0,
              visibility: 'hidden',
              transition: (theme) =>
                theme.transitions.create(['opacity', 'visibility'], {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.standard,
                }),
            }}
            onClick={handleDrawerClose}
          >
            <CloseIcon />
          </IconButton>
           )}
        </Box>
        <List>
          {['Dashboard'].map((text, index) => (
            <ListItem
              key={text}
              disablePadding
              sx={{
                display: 'block',
                '&:hover': {
                  color: 'rgb(0, 140, 255)',
                },
                backgroundColor:
                  activeItem === text
                    ? 'rgba(0, 140, 255, 0.1)'
                    : 'transparent',
                color: activeItem === text ? 'rgb(0, 140, 255)' : 'inherit',
              }}
            >
              <ListItemButton
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                  },
                  open
                    ? { justifyContent: 'initial' }
                    : { justifyContent: 'center' },
                ]}
                onClick={() => handleItemClick(text)}
              >
                <ListItemIcon
                  sx={[
                    { minWidth: 0, justifyContent: 'center' },
                    open ? { mr: 3 } : { mr: 'auto' },
                  ]}
                >
                  {index % 2 === 0 ? <HomeOutlinedIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={[open ? { opacity: 1 } : { opacity: 0 }]}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component='main' sx={{ flexGrow: 1, p: 3, marginTop: '70px',  
      }}>
        <Typography sx={{ marginBottom: 2 }}>
          welcome to the dashboard.
        </Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;
