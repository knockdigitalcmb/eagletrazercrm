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
import { useForm } from 'react-hook-form';
import { getInputFieldErrorMessage } from '../../../helper/formValidators';
import {
  userPermissionOptions,
  userRoleOptions,
} from '../../../constant/common.constant';

import styles from './CreateUser.module.scss';
import SlideBar from 'components/SlideBar';

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

  const {
    formState: { errors },
    register,
    getValues,
  } = useForm<CreateUserType>({
    mode: 'onChange',
  });

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
  return (
    <Box data-testid='create-user-page' className={styles.dashboardContainer}>
      <SlideBar />
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
                      required
                      helperText={getInputFieldErrorMessage(errors.employeeID)}
                      className={styles.inputText}
                    />
                  </Grid2>
                  <Grid2 size={6}>
                    <TextField
                      {...register('userName', {
                        required: `${t('required')}`,
                      })}
                      id='user-name'
                      data-testid='user-name'
                      placeholder={t('userNamePlaceholder')}
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
                        required: `${t('required')}`,
                      })}
                      type={isShowPassword ? 'text' : 'password'}
                      id='password'
                      data-testid='password'
                      placeholder={t('passwordPlaceholder')}
                      error={Boolean(errors.password)}
                      helperText={getInputFieldErrorMessage(errors.password)}
                      className={styles.inputText}
                      slotProps={{
                        input: {
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
                        },
                      }}
                    />
                  </Grid2>
                  <Grid2 size={6}>
                    <TextField
                      {...register('email')}
                      id='email'
                      data-testid='email'
                      placeholder={t('emailPlaceholder')}
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
                        required: `${t('required')}`,
                      })}
                      id='phone-number'
                      data-testid='phone-number'
                      placeholder={t('phoneNumberPlaceholder')}
                      error={Boolean(errors.phoneNumber)}
                      helperText={getInputFieldErrorMessage(errors.phoneNumber)}
                      className={styles.inputText}
                    />
                  </Grid2>
                  <Grid2 size={6}>
                    <TextField
                      {...register('location', {
                        required: `${t('required')}`,
                      })}
                      id='location'
                      data-testid='location'
                      placeholder={t('locationPlaceholder')}
                      error={Boolean(errors.location)}
                      helperText={getInputFieldErrorMessage(errors.location)}
                      className={styles.inputText}
                    />
                  </Grid2>
                </Grid2>

                <Grid2 container spacing={2}>
                  <Grid2 size={6}>
                    <TextField
                      {...register('address')}
                      id='address'
                      data-testid='address'
                      placeholder={t('addressPlaceholder')}
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
                      {t('chooseProfilePicture')}
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
                  helperText={getInputFieldErrorMessage(errors.joiningDate)}
                  className={styles.inputText}
                />
                <TextField
                  {...register('joiningDate')}
                  id='previous-company'
                  data-testid='previous-company'
                  placeholder={t('previousCompanyPlaceholder')}
                  error={Boolean(errors.previousCompany)}
                  helperText={getInputFieldErrorMessage(errors.previousCompany)}
                  className={styles.inputText}
                />
                  <Grid2 size={12}>
                    <TextField
                      {...register('experienceInYears')}
                      id='experience-in-years'
                      data-testid='experience-in-years'
                      placeholder={t('experienceYearsPlaceholder')}
                      error={Boolean(errors.experienceInYears)}
                      helperText={getInputFieldErrorMessage(
                        errors.experienceInYears
                      )}
                      className={styles.inputText}
                    />
                  </Grid2>
                  <Grid2 size={12}>
                    <TextField
                      {...register('experienceInMonths')}
                      id='experience-in-months'
                      data-testid='experience-in-months'
                      placeholder={t('experienceMonthsPlaceholder')}
                      error={Boolean(errors.experienceInMonths)}
                      helperText={getInputFieldErrorMessage(
                        errors.experienceInMonths
                      )}
                      className={styles.inputText}
                    />
                  </Grid2>
              </Box>
            </Grid2>
          </Grid2>
          <Grid2  container spacing={2} className={styles.rightSection} direction={'column'}>
            <Grid2 spacing={12}> 
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
                helperText={getInputFieldErrorMessage(errors.role)}
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
            <Grid2 spacing={12}> 
              <Typography variant='h6' className={styles.sectionTitle}>
                {t('usersPermission')}
              </Typography>
              <Box className={styles.permissionGroup} >
                <FormGroup className={styles.permissionFormGroup} >
                  {userPermissionOptions.map((section) => {
                    const actions = section.actions.map((action) => {
                      const permissionKey =
                        `${section.key}${action}` as keyof Permissions;
                      return (
                        <FormControlLabel
                          key={permissionKey}
                          control={<Checkbox checked={false} />}
                          label={action}
                           sx={{ display: 'inline-flex', alignItems: 'center', marginRight: '20px' }} 
                        />
                      );
                    });
                    return (
                      <Box
                        key={section.key}
                        className={styles.permissionSection}
                      >
                        <Typography className={styles.permissionTitle}
                        sx={{ display: 'inline', marginRight: '20px' }}
                        >
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
