import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Grid2,
  TextField,
  Button,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  styled,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CreateUserType } from '../../../models/type';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useForm } from 'react-hook-form';
import SidePanel from 'components/SidePanel';
import {
  userPermissionOptions,
  userRoleOptions,
} from '../../../constant/common.constant';
import { getInputFieldErrorMessage } from '../../../helper/formValidators';

import styles from './CreateUser.module.scss';

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
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [selectedPicture, setSelectedPicture] = useState('');

  const {
    formState: { errors },
    register,
    getValues,
  } = useForm<CreateUserType>({
    mode: 'onChange',
  });

  //on Handle Show Password
  const handleClickShowPassword = () => {
    setIsShowPassword((prev) => !prev);
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedPicture(file.name);
    }
  };

  //on Handle User Submit
  const onHandleUserSubmit = () => {
    console.log(getValues());
  };

  return (
    <Box data-testid='create-user-page' className={styles.dashboardContainer}>
      <SidePanel menu='User' />
      <Box component='main' sx={{ flexGrow: 1, p: 3, marginTop: '70px' }}>
        <Grid2
          container
          spacing={3}
          className={styles.createUserContainer}
          direction={'column'}
        >
          <Grid2
            container
            spacing={3}
            className={styles.leftSection}
            direction='row'
          >
            <Grid2 size={7} className={styles.sectionBg}>
              <Typography variant='h6' className={styles.sectionTitle}>
                {t('basicInformation')}
              </Typography>
              <Box>
                <Grid2 container spacing={2}>
                  <Grid2 size={6}>
                    <TextField
                      {...register('employeeID', {
                        required: `${t('required')}`,
                      })}
                      placeholder={t('employeeIDPlaceholder')}
                      id='employee-id'
                      data-testid='employee-id'
                      error={Boolean(errors.employeeID)}
                      helperText={
                        errors.employeeID
                          ? getInputFieldErrorMessage(errors.employeeID)
                          : ''
                      }
                      slotProps={{
                        input: {
                          endAdornment: errors.employeeID && (
                            <InputAdornment position='end'>
                              <ErrorOutlineIcon color='error' />
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  </Grid2>
                  <Grid2 size={6}>
                    <TextField
                      {...register('userName', {
                        required: `${t('required')}`,
                      })}
                      placeholder={t('userNamePlaceholder')}
                      id='user-name'
                      data-testid='user-name'
                      error={Boolean(errors.userName)}
                      helperText={
                        errors.userName
                          ? getInputFieldErrorMessage(errors.userName)
                          : ''
                      }
                      slotProps={{
                        input: {
                          endAdornment: errors.userName && (
                            <InputAdornment position='end'>
                              <ErrorOutlineIcon color='error' />
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  </Grid2>
                </Grid2>
                <Grid2 container spacing={2}>
                  <Grid2 size={6}>
                    <TextField
                      {...register('password', {
                        required: `${t('required')}`,
                        minLength: {
                          value: 8,
                          message: `${t('required')}`,
                        },
                        pattern: {
                          value: /^[A-Za-z0-9]+$/,
                          message: `${t('passwordAlphanumeric')}`,
                        },
                      })}
                      placeholder={t('passwordPlaceholder')}
                      id='password'
                      data-testid='password'
                      type={isShowPassword ? 'text' : 'password'}
                      error={Boolean(errors.password)}
                      helperText={
                        errors.password
                          ? getInputFieldErrorMessage(errors.password)
                          : ''
                      }
                      fullWidth
                      slotProps={{
                        input: {
                          endAdornment: (
                            <>
                              {errors.password && (
                                <InputAdornment position='end'>
                                  <ErrorOutlineIcon color='error' />
                                </InputAdornment>
                              )}
                              <InputAdornment position='end'>
                                <IconButton
                                  onClick={handleClickShowPassword}
                                  edge='end'
                                  aria-label='toggle password visibility'
                                >
                                  {isShowPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            </>
                          ),
                        },
                      }}
                      sx={{
                        '& .MuiInputAdornment-root': {
                          display: 'flex',
                          alignItems: 'center',
                        },
                      }}
                    />
                  </Grid2>
                  <Grid2 size={6}>
                    <TextField
                      {...register('email', {
                        required: 'This input is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: 'Invalid email',
                        },
                      })}
                      placeholder='Email'
                      id='email'
                      data-testid='email'
                      error={Boolean(errors.email)}
                      helperText={errors.email ? errors.email.message : ''}
                      slotProps={{
                        input: {
                          endAdornment: errors.email && (
                            <InputAdornment position='end'>
                              <ErrorOutlineIcon color='error' />
                            </InputAdornment>
                          ),
                        },
                      }}
                      fullWidth
                    />
                  </Grid2>
                </Grid2>
                <Grid2 container spacing={2}>
                  <Grid2 size={6}>
                    <TextField
                      {...register('phoneNumber', {
                        required: 'This input is required',
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: 'Phone number must be exactly 10 digits',
                        },
                      })}
                      placeholder='Phone Number'
                      id='phone-number'
                      data-testid='phone-number'
                      error={Boolean(errors.phoneNumber)}
                      helperText={
                        errors.phoneNumber ? errors.phoneNumber.message : ''
                      }
                      slotProps={{
                        input: {
                          endAdornment: errors.phoneNumber && (
                            <InputAdornment position='end'>
                              <ErrorOutlineIcon color='error' />
                            </InputAdornment>
                          ),
                        },
                      }}
                      fullWidth
                    />
                  </Grid2>
                  <Grid2 size={6}>
                    <TextField
                      {...register('location', {
                        required: 'This input is required',
                      })}
                      placeholder='Location'
                      id='location'
                      data-testid='location'
                      error={Boolean(errors.location)}
                      helperText={
                        errors.location ? errors.location.message : ''
                      }
                      slotProps={{
                        input: {
                          endAdornment: errors.location && (
                            <InputAdornment position='end'>
                              <ErrorOutlineIcon color='error' />
                            </InputAdornment>
                          ),
                        },
                      }}
                      fullWidth
                    />
                  </Grid2>
                </Grid2>

                <Grid2 container spacing={2}>
                  <Grid2 size={6}>
                    <TextField
                      {...register('address', {
                        required: 'This input is required',
                      })}
                      placeholder='Address'
                      id='address'
                      data-testid='address'
                      error={Boolean(errors.address)}
                      helperText={errors.address ? errors.address.message : ''}
                      slotProps={{
                        input: {
                          endAdornment: errors.address && (
                            <InputAdornment position='end'>
                              <ErrorOutlineIcon color='error' />
                            </InputAdornment>
                          ),
                        },
                      }}
                      fullWidth
                    />
                  </Grid2>
                  <Grid2 size={6}>
                    <Button
                      component='label'
                      variant='contained'
                      startIcon={<CloudUploadIcon />}
                      className={styles.profileImageButton}
                    >
                      {t('chooseProfilePicture')}
                      <VisuallyHiddenInput
                        type='file'
                        accept='image/jpeg, image/png'
                        {...register('profileImage', {
                          required: 'Profile image is required',
                          validate: (value) => {
                            const fileList = value as unknown as FileList; 
                            if (!fileList || fileList.length === 0) {
                              return 'Profile image is required';
                            }
                            const file = fileList[0];

                            // Validate file type
                            if (
                              !['image/jpeg', 'image/png'].includes(file.type)
                            ) {
                              return 'Only JPG and PNG images are allowed';
                            }

                            // Validate file size (max 2MB)
                            if (file.size > 2 * 1024 * 1024) {
                              return 'File size must be less than 2MB';
                            }
                            return true;
                          },
                        })}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleFileChange(e);
                          }
                        }}
                      />
                    </Button>
{errors.profileImage && (
                      <Typography variant='body2' color='error'>
                        {errors.profileImage.message}
                      </Typography>
                    )}
                    {selectedPicture && (
                      <Typography variant='body2' className={styles.filename}>
                        {selectedPicture}
                      </Typography>
                    )}
                  </Grid2>
                </Grid2>
              </Box>
            </Grid2>
            <Grid2 size={5} className={styles.sectionBg}>
              <Typography variant='h6' className={styles.sectionTitle}>
                {t('Experience')}
              </Typography>
              <Box>
                <TextField
                  {...register('joiningDate', {
                    required: `${t('required')}`,
                  })}
                  id='joining-date'
                  data-testid='joining-date'
                  type='date'
                  placeholder={t('joiningDate')}
                  error={Boolean(errors.joiningDate)}
                  helperText={
                    errors.joiningDate ? errors.joiningDate.message : ''
                  }
                  slotProps={{
                    input: {
                      endAdornment: errors.joiningDate && (
                        <InputAdornment position='end'>
                          <ErrorOutlineIcon color='error' />
                        </InputAdornment>
                      ),
                    },
                  }}
                  fullWidth
                />
                <TextField
                  {...register('previousCompany', {
                    required: `${t('required')}`,
                  })}
                  id='previous-company'
                  data-testid='previous-company'
                  placeholder={t('previousCompanyPlaceholder')}
                  error={Boolean(errors.previousCompany)}
                  helperText={
                    errors.previousCompany ? errors.previousCompany.message : ''
                  }
                  slotProps={{
                    input: {
                      endAdornment: errors.previousCompany && (
                        <InputAdornment position='end'>
                          <ErrorOutlineIcon color='error' />
                        </InputAdornment>
                      ),
                    },
                  }}
                  fullWidth
                />
                <Grid2 size={12}>
                  <TextField
                    {...register('experienceInYears', {
                      required: `${t('required')}`,
                      min: {
                        value: 0,
                        message: `${t('experienceMinMessage')}`,
                      },
                    })}
                    id='experience-in-years'
                    data-testid='experience-in-years'
                    placeholder={t('experienceYearsPlaceholder')}
                    error={Boolean(errors.experienceInYears)}
                    helperText={
                      errors.experienceInYears
                        ? errors.experienceInYears.message
                        : ''
                    }
                    slotProps={{
                      input: {
                        endAdornment: errors.experienceInYears && (
                          <InputAdornment position='end'>
                            <ErrorOutlineIcon color='error' />
                          </InputAdornment>
                        ),
                      },
                    }}
                    fullWidth
                  />
                </Grid2>
                <Grid2 size={12}>
                  <TextField
                    {...register('experienceInMonths', {
                      required: `${t('required')}`,
                      min: {
                        value: 0,
                        message: `${t('experienceMinMessage')}`,
                      },
                    })}
                    id='experience-in-months'
                    data-testid='experience-in-months'
                    placeholder={t('experienceMonthsPlaceholder')}
                    error={Boolean(errors.experienceInMonths)}
                    helperText={
                      errors.experienceInMonths
                        ? errors.experienceInMonths.message
                        : ''
                    }
                    slotProps={{
                      input: {
                        endAdornment: errors.experienceInMonths && (
                          <InputAdornment position='end'>
                            <ErrorOutlineIcon color='error' />
                          </InputAdornment>
                        ),
                      },
                    }}
                    fullWidth
                  />
                </Grid2>
              </Box>
            </Grid2>
          </Grid2>
          <Grid2 container spacing={2} className={styles.rightSection}>
            <Grid2 size={12}>
              <Typography variant='h6' className={styles.sectionTitle}>
                {t('userRole')}
              </Typography>
              <TextField
                {...register('role', {
                  required: `${t('requiredRole')}`,
                })}
                id='user-role'
                data-testid='user-role'
                select
                fullWidth
                error={Boolean(errors.role)}
                helperText={errors.role ? errors.role.message : ''}
                slotProps={{
                  input: {
                    endAdornment: (
                      <>
                        {errors.role && (
                          <InputAdornment position='end'>
                            <ErrorOutlineIcon color='error' />
                          </InputAdornment>
                        )}
                      </>
                    ),
                  },
                  select: {
                    // Hide dropdown arrow when error is present
                    sx: {
                      '&.MuiSelect-root': {
                        'pointer-events': errors.role ? 'none' : 'auto',
                      },
                    },
                  },
                }}
                sx={{
                  '& .MuiSelect-select span::before': {
                    content: `${t('selectOption')}`,
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
            <Grid2 size={12}>
              <Typography variant='h6' className={styles.sectionTitle}>
                {t('usersPermission')}
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
                          sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            marginRight: '20px',
                          }}
                        />
                      );
                    });
                    return (
                      <Box
                        key={section.key}
                        className={styles.permissionSection}
                      >
                        <Typography
                          className={styles.permissionTitle}
                          sx={{ display: 'inline', marginRight: '20px' }}
                        >
                          {' '}
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
              {t('submit')}
            </Button>
          </Box>
        </Grid2>
      </Box>
    </Box>
  );
};

export default CreateUser;
