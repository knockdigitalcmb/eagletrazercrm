import React, { useState } from 'react';
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
  Grid2,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CloseIcon from '@mui/icons-material/Close';
import SearchBar from '../../../components/SearchBar/index';
import UserNotification from '../../../components/UserNotification';
import UserProfile from '../../../components/UserProfile';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { CreateUserType } from '../../../models/type';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useForm } from 'react-hook-form';
import { getInputFieldErrorMessage } from '../../../helper/formValidators';
import {
  userPermissionOptions,
  userRoleOptions,
} from '../../../constant/common.constant';

import styles from './CreateUser.module.scss';
import EagleTrazer from '../../../assets/images/eagle-trazer.png';

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

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const CreateUser = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const [activeItem, setActiveItem] = React.useState<string>('User');
  const [isShowPassword, setIsShowPassword] = useState(false);

  const {
    formState: { errors },
    register,
    getValues,
  } = useForm<CreateUserType>({
    mode: 'onChange',
  });

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

  //on Handle Show Password
  const OnHandleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const handleFileChange = () => {
    console.log('dsds');
  };

  //on Handle User Submit
  const onHandleUserSubmit = () => {
    console.log(getValues());
  };
  const getInputFieldErrorMessage = (error: any) => {
    return error ? error.message : '';
  };

  return (
    <Box data-testid='create-user-page' className={styles.dashboardContainer}>
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
          {['Dashboard', 'User'].map((text, index) => (
            <ListItem
              key={text}
              disablePadding
              className={`${styles.listItem} ${activeItem === text ? styles.active : ''}`}
            >
              <ListItemButton
                sx={[
                  { minHeight: 48, px: 2.5 },
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
      <Box component='main' sx={{ flexGrow: 1, p: 3, marginTop: '70px' }}>
        <Grid2 container spacing={3} className={styles.createUserContainer}>
          <Grid2 size={7} className={styles.leftSection}>
            <Grid2 className={styles.sectionBg}>
              <Typography variant='h6' className={styles.sectionTitle}>
                {t('basicInformation')}
              </Typography>
              <Box>
                <Grid2 container spacing={2}>
                  <Grid2 size={6}>
                    <TextField
                      {...register('employeeID', {
                        required: 'This input is required.',
                      })}
                      placeholder={t('employeeIDPlaceholder')}
                      id='employee-id'
                      data-testid='employee-id'
                      error={Boolean(errors.employeeID)}
                      required
                      helperText={getInputFieldErrorMessage(errors.employeeID)}
                      className={styles.inputText}
                    />
                  </Grid2>
                  <Grid2 size={6}>
                    <TextField
                      {...register('userName', {
                        required: 'This input is required.',
                      })}
                      id='user-name'
                      data-testid='user-name'
                      placeholder={t('userName')}
                      error={Boolean(errors.userName)}
                      helperText={getInputFieldErrorMessage(errors.userName)}
                      className={styles.inputText}
                    />
                  </Grid2>
                </Grid2>
                <Grid2 container spacing={2}>
                  <Grid2 size={6}>
                    <TextField
                      {...register('password', {
                        required: 'Password is required.',
                        minLength: {
                          value: 8,
                          message:
                            'Password must be at least 8 characters long.',
                        },
                        pattern: {
                          value: /(?=.*[0-9])(?=.*[!@#$%^&*])/,
                          message:
                            'Password must contain at least one number and one special character.',
                        },
                      })}
                      type={isShowPassword ? 'text' : 'password'}
                      id='password'
                      data-testid='password'
                      placeholder='Password'
                      error={Boolean(errors.password)}
                      helperText={getInputFieldErrorMessage(errors.password)}
                      className={styles.inputText}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              onClick={OnHandleShowPassword}
                              edge='end'
                            >
                              {isShowPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid2>
                  <Grid2 size={6}>
                    <TextField
                      {...register('email', {
                        required: 'Email is required.',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: 'Please enter a valid email address.',
                        },
                      })}
                      id='email'
                      data-testid='email'
                      placeholder={t('email')}
                      error={Boolean(errors.email)}
                      helperText={getInputFieldErrorMessage(errors.email)}
                      className={styles.inputText}
                    />
                  </Grid2>
                </Grid2>
                <Grid2 container spacing={2}>
                  <Grid2 size={6}>
                    <TextField
                      {...register('phoneNumber', {
                        required: 'Phone number is required.',
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: 'Phone number must be 10 digits.',
                        },
                      })}
                      id='phone-number'
                      data-testid='phone-number'
                      placeholder={t('phoneNumber')}
                      error={Boolean(errors.phoneNumber)}
                      helperText={getInputFieldErrorMessage(errors.phoneNumber)}
                      className={styles.inputText}
                    />
                  </Grid2>
                  <Grid2 size={6}>
                    <TextField
                      {...register('location', {
                        required: 'This input is required.',
                      })}
                      id='location'
                      data-testid='location'
                      placeholder={t('location')}
                      error={Boolean(errors.location)}
                      helperText={getInputFieldErrorMessage(errors.location)}
                      className={styles.inputText}
                    />
                  </Grid2>
                </Grid2>

                <Grid2 container spacing={2}>
                  <Grid2 size={6}>
                    <TextField
                      {...register('address', {
                        required: 'Address is required.',
                        minLength: {
                          value: 5,
                          message:
                            'Address must be at least 5 characters long.',
                        },
                      })}
                      id='address'
                      data-testid='address'
                      placeholder={t('address')}
                      error={Boolean(errors.address)}
                      helperText={getInputFieldErrorMessage(errors.address)}
                      className={styles.inputText}
                    />
                  </Grid2>
                  <Grid2 size={6}>
                    <Button
                      component='label'
                      variant='contained'
                      startIcon={<CloudUploadIcon />}
                      className={styles.profileImageButton}
                    >
                      Choose Profile Image
                      <VisuallyHiddenInput
                        {...register('profileImage')}
                        type='file'
                        onChange={handleFileChange}
                      />
                    </Button>
                  </Grid2>
                </Grid2>
              </Box>
            </Grid2>
            <Grid2 className={styles.sectionBg}>
              <Typography variant='h6' className={styles.sectionTitle}>
                {t('Experience')}
              </Typography>
              <Box>
                <TextField
                  {...register('joiningDate', {
                    required: 'This input is required.',
                  })}
                  id='joining-date'
                  data-testid='joining-date'
                  type='date'
                  placeholder={t('joiningDate')}
                  error={Boolean(errors.joiningDate)}
                  helperText={getInputFieldErrorMessage(errors.joiningDate)}
                  className={styles.inputText}
                />
                <TextField
                  {...register('joiningDate')}
                  id='previous-company'
                  data-testid='previous-company'
                  placeholder={t('previousCompany')}
                  error={Boolean(errors.previousCompany)}
                  helperText={getInputFieldErrorMessage(errors.previousCompany)}
                  className={styles.inputText}
                />
                <Grid2 container spacing={2}>
                  <Grid2 size={6}>
                    <TextField
                      {...register('experienceInYears')}
                      id='experience-in-years'
                      data-testid='experience-in-years'
                      placeholder={t('experienceYears')}
                      error={Boolean(errors.experienceInYears)}
                      helperText={getInputFieldErrorMessage(
                        errors.experienceInYears
                      )}
                      className={styles.inputText}
                    />
                  </Grid2>
                  <Grid2 size={6}>
                    <TextField
                      {...register('experienceInMonths')}
                      id='experience-in-months'
                      data-testid='experience-in-months'
                      placeholder={t('experienceMonths')}
                      error={Boolean(errors.experienceInMonths)}
                      helperText={getInputFieldErrorMessage(
                        errors.experienceInMonths
                      )}
                      className={styles.inputText}
                    />
                  </Grid2>
                </Grid2>
              </Box>
            </Grid2>
          </Grid2>
          <Grid2 size={5} className={styles.rightSection}>
            <Grid2 className={styles.sectionBg}>
              <Typography variant='h6' className={styles.sectionTitle}>
                User Role
              </Typography>
              <TextField
                {...register('role', {
                  required: 'Please enter role',
                })}
                id='user-role'
                data-testid='user-role'
                select
                fullWidth
                error={Boolean(errors.role)}
                helperText={getInputFieldErrorMessage(errors.role)}
                sx={{
                  '& .MuiSelect-select span::before': {
                    content: "'Choose on option'",
                  },
                }}
              >
                {userRoleOptions.map((option, index) => (
                  <MenuItem key={`${option}-${index}`} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid2>
            <Grid2 className={styles.sectionBg}>
              <Typography variant='h6' className={styles.sectionTitle}>
                Users Permission
              </Typography>
              <Box className={styles.permissionGroup}>
                <FormGroup className={styles.permissionFormGroup}>
                  {userPermissionOptions.map((section) => {
                    const actions = section.actions.map((action) => {
                      const permissionKey =
                        `${section.key}${action}` as keyof Permissions;
                      return (
                        <FormControlLabel
                          key={permissionKey}
                          control={<Checkbox checked={false} />}
                          label={action}
                        />
                      );
                    });
                    return (
                      <Box
                        key={section.key}
                        className={styles.permissionSection}
                      >
                        <Typography className={styles.permissionTitle}>
                          {section.label}
                        </Typography>
                        {actions}
                      </Box>
                    );
                  })}
                </FormGroup>
              </Box>
            </Grid2>
          </Grid2>
        </Grid2>
        <Grid2>
          <Box className={styles.submitButton}>
            <Button
              variant='contained'
              color='primary'
              onClick={onHandleUserSubmit}
            >
              submit
            </Button>
          </Box>
        </Grid2>
      </Box>
    </Box>
  );
};

export default CreateUser;
