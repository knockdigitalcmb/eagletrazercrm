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
  useMediaQuery,
  Collapse,
} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import SearchBar from '../SearchBar/index';
import UserNotification from '../UserNotification';
import UserProfile from '../UserProfile';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { sideBarNavMenus } from '../../constant/common.constant';

import styles from './SidePanel.module.scss';
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
  [theme.breakpoints.down('md')]: {
    width: 0,
    display: 'none',
  },
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
  [theme.breakpoints.down('md')]: {
    width: 0,
    display: 'none',
  },
});

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer,
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
        width: `calc(100% - 65px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
  [theme.breakpoints.down('md')]: {
    width: '100%',
    marginLeft: 0,
  },
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
  [theme.breakpoints.down('md')]: {
    display: 'none',
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

interface Props {
  menu: string;
}

const SidePanel = ({ menu }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const [activeItem, setActiveItem] = React.useState<string>(menu);
  const [search, setSearch] = React.useState(false);
  const [openSubMenus, setOpenSubMenus] = React.useState<{
    [key: string]: boolean;
  }>({});

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleItemClick = (item: string) => {
    console.log(item);
    navigate(`/${item.includes('-') ? item : item.toLowerCase()}`);
    setActiveItem(item);
  };

  const toggleSubMenu = (name: string) => {
    setOpenSubMenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const isMediumScreen = useMediaQuery('(max-width:768px)');
  React.useEffect(() => {
    if (isMediumScreen) setOpen(false);
  }, [isMediumScreen]);

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
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Box
            className={styles.headerSearchBar}
            onClick={() => setSearch(true)}
          >
            {isMediumScreen ? (
              <IconButton>
                <SearchIcon />
              </IconButton>
            ) : (
              <SearchBar />
            )}
          </Box>
          {search && (
            <Box className={styles.searchBarPosition}>
              <SearchBar />
              <CloseIcon onClick={() => setSearch(false)} />
            </Box>
          )}
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
            <IconButton className='close-icon' onClick={() => setOpen(true)}>
              <CloseIcon />
            </IconButton>
          )}
        </Box>
        <List>
          {sideBarNavMenus.map((item) => (
            <React.Fragment key={item.name}>
              <ListItem
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
                  onClick={() => {
                    handleItemClick(item.name);
                    if (item.children) toggleSubMenu(item.name);
                  }}
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
                    sx={{
                      display: open ? 'block' : 'none',
                      '.MuiDrawer-root:hover &': { display: 'block' },
                    }}
                  />
                  {item.children &&
                    open &&
                    (openSubMenus[item.name] ? (
                      <ExpandLessIcon />
                    ) : (
                      <ExpandMoreIcon />
                    ))}
                </ListItemButton>
              </ListItem>

              {item.children && (
                <Collapse
                  in={openSubMenus[item.name]}
                  timeout='auto'
                  unmountOnExit
                >
                  <List component='div' disablePadding>
                    {item.children.map((child: any) => (
                      <ListItem
                        key={child.name}
                        disablePadding
                        className={`${styles.listItem} ${activeItem === child.name ? styles.active : ''}`}
                      >
                        <ListItemButton
                          sx={{ pl: 4 }}
                          onClick={() => handleItemClick(child?.url)}
                        >
                          <ListItemIcon>{child.icon}</ListItemIcon>
                          <ListItemText primary={child.name} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default SidePanel;
