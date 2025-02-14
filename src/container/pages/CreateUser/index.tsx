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
import { CreateUserType, IUserPermissionIndex } from '../../../models/type';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { useForm } from 'react-hook-form';
import SidePanel from 'components/SidePanel';
import {
  userPermissionOptions,
  userRoleOptions,
} from '../../../constant/common.constant';
import {
  getInputFieldErrorMessage,
  onHandleImageValidation,
} from '../../../helper/formValidators';
import { capitalizeFirstLetter, getStringEclipse } from '../../../helper';

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
  const [userPermissions, setUserPermissions] = useState<IUserPermissionIndex>(
    userPermissionOptions
  );
  const {
    formState: { errors },
    register,
    getValues,
    handleSubmit,
    setValue,
    clearErrors,
  } = useForm<CreateUserType>({
    mode: 'onChange',
  });
  const [userRole, setUserRole] = useState<string>('');
  const handleClickShowPassword = () => {
    setIsShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) setSelectedPicture(file.name);
  };

  //Handle checkbox change
  const onHandlePermissionChange = (
    key: any,
    action: any,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let clonedPermissionProps = { ...userPermissions };
    clonedPermissionProps[key].actions[action] = e.target.checked;
    setUserPermissions(clonedPermissionProps);
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
            spacing={{ md: 3, sm: 0 }}
            className={styles.leftSection}
            direction={{ md: 'row', sm: 'column' }}
            height={{ md: '380px' }}
          >
            <Grid2 size={{ md: 7, sm: 12 }} className={styles.sectionBg}>
              <Typography variant='h6' className={styles.sectionTitle}>
                {t('basicInformation')}
              </Typography>
              <Box className={styles.basicInformationSection}>
                <Grid2 container spacing={{ md: 2, sm: 0, xs: 0 }}>
                  <Grid2
                    size={{ md: 6, sm: 12, xs: 12 }}
                    className={styles.spaceBetweenDivs}
                  >
                    <FormControl
                      fullWidth
                      error={Boolean(errors.employeeID)}
                      sx={{ position: 'relative' }}
                    >
                      <TextField
                        {...register('employeeID', {
                          required: `${t('employeeIDRequired')}`,
                        })}
                        placeholder={t('employeeIDPlaceholder')}
                        id='employee-id'
                        data-testid='employee-id'
                        error={Boolean(errors.employeeID)}
                        sx={{
                          '& .MuiInputBase-root': {
                            paddingRight: errors.employeeID ? '48px' : '24px',
                          },
                        }}
                      />
                      {errors.employeeID && (
                        <FormHelperText
                          sx={{
                            marginTop: 1,
                            color: 'error.main',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <ErrorOutlineIcon
                            color='error'
                            sx={{ marginRight: '8px', width: '16px' }}
                          />
                          {getInputFieldErrorMessage(errors.employeeID)}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid2>
                  <Grid2
                    size={{ md: 6, sm: 12, xs: 12 }}
                    className={styles.spaceBetweenDivs}
                  >
                    <FormControl
                      fullWidth
                      error={Boolean(errors.userName)}
                      sx={{ position: 'relative' }}
                    >
                      <TextField
                        {...register('userName', {
                          required: `${t('userNameRequired')}`,
                        })}
                        placeholder={t('userNamePlaceholder')}
                        id='user-name'
                        data-testid='user-name'
                        error={Boolean(errors.userName)}
                        sx={{
                          '& .MuiInputBase-root': {
                            paddingRight: errors.userName ? '48px' : '24px',
                          },
                        }}
                      />
                      {errors.userName && (
                        <FormHelperText
                          sx={{
                            marginTop: 1,
                            color: 'error.main',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <ErrorOutlineIcon
                            color='error'
                            sx={{ marginRight: '8px', width: '16px' }}
                          />
                          {getInputFieldErrorMessage(errors.userName)}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid2>
                </Grid2>
                <Grid2
                  container
                  spacing={{ md: 2, sm: 2 }}
                  className={styles.spaceBetweenDivs}
                >
                  <Grid2 size={{ md: 6, sm: 12, xs: 12 }}>
                    <FormControl
                      fullWidth
                      error={Boolean(errors.password)}
                      sx={{ position: 'relative' }}
                    >
                      <TextField
                        {...register('password', {
                          required: `${t('passwordRequired')}`,
                          pattern: {
                            value: /^[A-Za-z0-9]+$/,
                            message: `${t('passwordIsInvalid')}`,
                          },
                        })}
                        placeholder={t('passwordPlaceholder')}
                        id='password'
                        data-testid='password'
                        type={isShowPassword ? 'text' : 'password'}
                        error={Boolean(errors.password)}
                        fullWidth
                        slotProps={{
                          input: {
                            endAdornment: (
                              <InputAdornment position='end'>
                                <IconButton
                                  aria-label='toggle password visibility'
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  size='small'
                                >
                                  {isShowPassword ? (
                                    <VisibilityOff fontSize='small' />
                                  ) : (
                                    <Visibility fontSize='small' />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          },
                        }}
                      />

                      {errors.password && (
                        <FormHelperText
                          sx={{
                            marginTop: 1,
                            color: 'error.main',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <ErrorOutlineIcon
                            color='error'
                            sx={{ marginRight: '8px', width: '16px' }}
                          />
                          {getInputFieldErrorMessage(errors.password)}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid2>
                  <Grid2 size={{ md: 6, sm: 12, xs: 12 }}>
                    <FormControl
                      fullWidth
                      error={Boolean(errors.email)}
                      sx={{ position: 'relative' }}
                    >
                      <TextField
                        {...register('email', {
                          required: `${t('emailRequired')}`,
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: `${t('invalidEmail')}`,
                          },
                        })}
                        placeholder={t('emailPlaceholder')}
                        id='email'
                        data-testid='email'
                        error={Boolean(errors.email)}
                        sx={{
                          '& .MuiInputBase-root': {
                            paddingRight: '24px',
                          },
                        }}
                      />
                      {errors.email && (
                        <FormHelperText
                          sx={{
                            marginTop: 1,
                            color: 'error.main',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <ErrorOutlineIcon
                            color='error'
                            sx={{ marginRight: '8px', width: '16px' }}
                          />
                          {getInputFieldErrorMessage(errors.email)}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid2>
                </Grid2>
                <Grid2
                  container
                  spacing={{ md: 2, sm: 2 }}
                  className={styles.spaceBetweenDivs}
                >
                  <Grid2 size={{ md: 6, sm: 12, xs: 12 }}>
                    <FormControl
                      fullWidth
                      error={Boolean(errors.phoneNumber)}
                      sx={{ position: 'relative' }}
                    >
                      <TextField
                        {...register('phoneNumber', {
                          required: t('phoneNumberRequired'),
                          pattern: {
                            value: /^[0-9]{10}$/,
                            message: t('invalidPhoneNumber'),
                          },
                        })}
                        placeholder={t('phoneNumberPlaceholder')}
                        id='phone-number'
                        data-testid='phone-number'
                        error={Boolean(errors.phoneNumber)}
                        sx={{
                          '& .MuiInputBase-root': {
                            paddingRight: '24px',
                          },
                        }}
                      />
                      {errors.phoneNumber && (
                        <FormHelperText
                          sx={{
                            marginTop: 1,
                            color: 'error.main',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <ErrorOutlineIcon
                            color='error'
                            sx={{ marginRight: '8px', width: '16px' }}
                          />
                          {getInputFieldErrorMessage(errors.phoneNumber)}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid2>

                  <Grid2 size={{ md: 6, sm: 12, xs: 12 }}>
                    <FormControl
                      fullWidth
                      error={Boolean(errors.location)}
                      sx={{ position: 'relative' }}
                    >
                      <TextField
                        {...register('location', {
                          required: t('locationRequired'),
                        })}
                        placeholder={t('locationPlaceholder')}
                        id='location'
                        data-testid='location'
                        error={Boolean(errors.location)}
                        sx={{
                          '& .MuiInputBase-root': {
                            paddingRight: '24px',
                          },
                        }}
                      />
                      {errors.location && (
                        <FormHelperText
                          sx={{
                            marginTop: 1,
                            color: 'error.main',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <ErrorOutlineIcon
                            color='error'
                            sx={{ marginRight: '8px', width: '16px' }}
                          />
                          {errors.location.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid2>
                </Grid2>
                <Grid2 container spacing={{ md: 2, sm: 0, xs: 0 }}>
                  <Grid2
                    size={{ md: 6, sm: 12, xs: 12 }}
                    className={styles.spaceBetweenDivs}
                  >
                    <FormControl
                      fullWidth
                      error={Boolean(errors.address)}
                      sx={{ position: 'relative' }}
                    >
                      <TextField
                        {...register('address', {
                          required: t('addressRequired'),
                        })}
                        placeholder={t('addressPlaceholder')}
                        id='address'
                        data-testid='address'
                        error={Boolean(errors.address)}
                        sx={{
                          '& .MuiInputBase-root': {
                            paddingRight: '24px',
                          },
                        }}
                      />
                      {errors.address && (
                        <FormHelperText
                          sx={{
                            marginTop: 1,
                            color: 'error.main',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <ErrorOutlineIcon
                            color='error'
                            sx={{ marginRight: '8px', width: '16px' }}
                          />
                          {errors.address.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid2>
                  <Grid2
                    size={{ md: 6, sm: 12, xs: 12 }}
                    className={styles.spaceBetweenDivs}
                  >
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
                        {...register('profileImage')}
                        onChange={(e) => handleFileChange(e)}
                      />
                    </Button>
                    <Typography variant='body2' className={styles.fileSize}>
                      {t('fileSize')}
                    </Typography>
                    {errors.profileImage && (
                      <Typography variant='body2' color='error'>
                        {errors.profileImage.message}
                      </Typography>
                    )}
                    {selectedPicture && (
                      <Typography
                        variant='body2'
                        className={styles.filename}
                        title={selectedPicture}
                      >
                        {getStringEclipse(selectedPicture, 25)}
                      </Typography>
                    )}
                  </Grid2>
                </Grid2>
              </Box>
            </Grid2>
            <Grid2
              size={{ md: 5, sm: 12, xs: 12 }}
              className={styles.sectionBg}
            >
              <Typography variant='h6' className={styles.sectionTitle}>
                {t('experience')}
              </Typography>
              <Box className={styles.spaceBetweenDivs}>
                <FormControl
                  fullWidth
                  error={Boolean(errors.joiningDate)}
                  sx={{ position: 'relative' }}
                >
                  <TextField
                    {...register('joiningDate', {
                      required: t('joiningDateRequired'),
                    })}
                    id='joining-date'
                    data-testid='joining-date'
                    type='date'
                    error={Boolean(errors.joiningDate)}
                    sx={{
                      '& .MuiInputBase-root': {
                        paddingRight: '24px',
                      },
                    }}
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                    fullWidth
                  />
                  {errors.joiningDate && (
                    <FormHelperText
                      sx={{
                        marginTop: 1,
                        color: 'error.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        marginLeft: '-2px',
                      }}
                    >
                      <ErrorOutlineIcon
                        color='error'
                        sx={{ marginRight: '8px', width: '16px' }}
                      />
                      {errors.joiningDate.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Box>
              <Box className={styles.spaceBetweenDivs}>
                <FormControl
                  fullWidth
                  error={Boolean(errors.previousCompany)}
                  sx={{ position: 'relative' }}
                >
                  <TextField
                    {...register('previousCompany', {
                      required: t('previousCompanyNameRequired'),
                    })}
                    id='previous-company'
                    data-testid='previous-company'
                    placeholder={t('previousCompanyPlaceholder')}
                    error={Boolean(errors.previousCompany)}
                    sx={{
                      '& .MuiInputBase-root': {
                        paddingRight: '24px',
                      },
                    }}
                    fullWidth
                  />
                  {errors.previousCompany && (
                    <FormHelperText
                      sx={{
                        marginTop: 1,
                        color: 'error.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        marginLeft: '-2px',
                      }}
                    >
                      <ErrorOutlineIcon
                        color='error'
                        sx={{ marginRight: '8px', width: '16px' }}
                      />
                      {errors.previousCompany.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Box>
              <Box>
                <Grid2 size={12} className={styles.spaceBetweenDivs}>
                  <FormControl
                    fullWidth
                    error={Boolean(errors.experienceInYears)}
                    sx={{ position: 'relative' }}
                  >
                    <TextField
                      {...register('experienceInYears', {
                        required: t('experienceYearsRequired'),
                        pattern: {
                          value: /^[0-9]+$/,
                          message: t('invalidExperienceYears'),
                        },
                      })}
                      id='experience-in-years'
                      data-testid='experience-in-years'
                      placeholder={t('experienceYearsPlaceholder')}
                      error={Boolean(errors.experienceInYears)}
                      sx={{
                        '& .MuiInputBase-root': {
                          paddingRight: '24px',
                        },
                      }}
                      fullWidth
                    />
                    {errors.experienceInYears && (
                      <FormHelperText
                        sx={{
                          marginTop: 1,
                          color: 'error.main',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          marginLeft: '-2px',
                        }}
                      >
                        <ErrorOutlineIcon
                          color='error'
                          sx={{ marginRight: '8px', width: '16px' }}
                        />
                        {errors.experienceInYears.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid2>
                <Grid2 size={12} className={styles.spaceBetweenDivs}>
                  <FormControl
                    fullWidth
                    error={Boolean(errors.experienceInMonths)}
                    sx={{ position: 'relative' }}
                  >
                    <TextField
                      {...register('experienceInMonths', {
                        required: t('monthsExperienceRequired'),
                        pattern: {
                          value: /^[0-9]+$/,
                          message: t('invalidExperienceMonths'),
                        },
                      })}
                      id='experience-in-months'
                      data-testid='experience-in-months'
                      placeholder={t('experienceMonthsPlaceholder')}
                      error={Boolean(errors.experienceInMonths)}
                      sx={{
                        '& .MuiInputBase-root': {
                          paddingRight: '24px',
                        },
                      }}
                      fullWidth
                    />
                    {errors.experienceInMonths && (
                      <FormHelperText
                        sx={{
                          marginTop: 1,
                          color: 'error.main',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          marginLeft: '-2px',
                        }}
                      >
                        <ErrorOutlineIcon
                          color='error'
                          sx={{ marginRight: '8px', width: '16px' }}
                        />
                        {errors.experienceInMonths.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid2>
              </Box>
            </Grid2>
          </Grid2>

          <Grid2 container spacing={2} className={styles.rightSection}>
            <Grid2 size={12}>
              <Typography variant='h6' className={styles.sectionTitle}>
                {t('userRole')}
              </Typography>
              <FormControl
                fullWidth
                error={Boolean(errors.role)}
                sx={{ position: 'relative' }}
              >
                <TextField
                  {...register('role', {
                    required: t('userRoleRequired'),
                  })}
                  id='user-role'
                  data-testid='user-role'
                  select
                  fullWidth
                  error={Boolean(errors.role)}
                  value={userRole || ''}
                  onChange={(e) => {
                    clearErrors('role');
                    setUserRole(e.target.value);
                    setValue('role', e.target.value);
                  }}
                  slotProps={{
                    select: {
                      displayEmpty: true,
                      renderValue: (selected) =>
                        typeof selected === 'string' && selected.trim() !== ''
                          ? selected
                          : t('chooseAnOption'),
                    },
                  }}
                >
                  {userRoleOptions.map((option, index) => (
                    <MenuItem key={`${option}-${index}`} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
                {errors.role && (
                  <FormHelperText
                    sx={{
                      marginTop: 1,
                      color: 'error.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      marginLeft: '-2px',
                    }}
                  >
                    <ErrorOutlineIcon
                      color='error'
                      sx={{ marginRight: '8px', width: '16px' }}
                    />
                    {getInputFieldErrorMessage(errors.role)}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid2>

            <Grid2 size={12}>
              <Typography variant='h6' className={styles.sectionTitle}>
                {t('usersPermission')}
              </Typography>
              <Box className={styles.permissionGroup}>
                <FormGroup className={styles.permissionFormGroup}>
                  {Object.keys(userPermissions).map((keys, i) => {
                    const permissionActions = Object.keys(
                      userPermissions[keys]?.actions
                    ).map((action, i) => {
                      return (
                        <FormControlLabel
                          key={`${action}-${i}`}
                          onChange={(e: any) =>
                            onHandlePermissionChange(keys, action, e)
                          }
                          control={
                            <Checkbox
                              checked={userPermissions[keys]?.actions[action]}
                            />
                          }
                          label={capitalizeFirstLetter(action)}
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
                        key={`${keys}-${i}`}
                        className={styles.permissionSection}
                      >
                        <Typography
                          className={styles.permissionTitle}
                          sx={{ display: 'inline', marginRight: '20px' }}
                        >
                          {userPermissions[keys].label}
                        </Typography>
                        {permissionActions}
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
              onClick={handleSubmit(onHandleUserSubmit)}
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
