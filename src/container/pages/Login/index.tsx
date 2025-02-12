import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid2,
  IconButton,
  FormControl,
  InputAdornment,
  FormHelperText,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { enqueueSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../components/Loader';
import { CRMServiceAPI } from '../../../services/CRMService';
import { LoginForm } from '../../../models/type';
import { defaultLoginProps } from '../../../constant/payload.const';
import styles from './Login.module.scss';
import { ReactComponent as LogInImage } from '../../../assets/images/login-bg.svg';
import EagleTrazer from '../../../assets/images/eagle-trazer.png';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { getInputFieldErrorMessage } from 'helper/formValidators';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginForm>({
    defaultValues: defaultLoginProps,
  });

  // Login form validation
  useEffect(() => {
    const employeeID = watch('employeeID');
    const password = watch('password');
    if (employeeID?.length > 0 && password?.length > 0) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [watch('employeeID'), watch('password')]);

  
  const handleClickShowPassword = () => {
    setIsShowPassword((prev) => !prev); 
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault(); 
  };

  const onSubmit = async (data: LoginForm) => {
    try {
      setIsLoading(true);
      // await CRMServiceAPI.userLogin(data);
      enqueueSnackbar('Login successful', {
        variant: 'success',
        autoHideDuration: 3000,
      });
      setIsLoading(false);
      navigate('/otp');
    } catch (error) {
      console.error('Error during login:', error);
      setIsLoading(false);
      enqueueSnackbar('Login failed', {
        variant: 'error',
        autoHideDuration: 3000,
      });
    }
  };
  return (
    <Box data-testid='loginpage' className={styles.loginpageContainer}>
      <Grid2 container spacing={2}>
        <Grid2 size={7} className={styles.alignCenter}>
          <div className={styles.loginImageWrapper}>
            <LogInImage />
          </div>
        </Grid2>
        <Grid2 size={5} className={styles.alignCenter}>
          <div className={styles.loginFormWrapper}>
            <div className={styles.eagleTrazer}>
              <img src={EagleTrazer} alt='eagle-logo' title='Eagle Trazer' />
            </div>
            <Typography className={styles.loginAccount}>
              {t('loginAccount')}
            </Typography>
            {isLoading ? (
              <Loader />
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className={styles.formWrapper}
              >
                <FormControl
                  fullWidth
                  error={Boolean(errors.employeeID)}
                  sx={{ position: 'relative', marginBottom: '20px' }}
                >
                  <TextField
                    {...register('employeeID', {
                      required: `${t('employeeIDRequired')}`,
                      pattern: {
                        value: /^[A-Za-z0-9]+$/,
                        message: t('employeeIDIsInvalid'),
                      },
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
                <FormControl
                  fullWidth
                  error={Boolean(errors.password)}
                  sx={{ position: 'relative', marginBottom: '20px' }}
                >
                  <TextField
                    {...register('password', {
                      required: `${t('passwordRequired')}`,
                      pattern: {
                        value: /^[A-Za-z0-9]+$/,
                        message: t('passwordIsInvalid'),
                      },
                    })}
                    placeholder={t('passwordPlaceholder')}
                    id='password'
                    data-testid='password'
                    type={isShowPassword ? 'text' : 'password'}
                    error={Boolean(errors.password)}
                    fullWidth
                  />
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    sx={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      zIndex: 1,
                    }}
                  >
                    {isShowPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>

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

                <Button
                  variant='contained'
                  type='submit'
                  id='login-submit'
                  data-testid='login-submit'
                  fullWidth
                  className={styles.submitButton}
                  disabled={isButtonDisabled || isLoading}
                >
                  {t('login')}
                </Button>
              </form>
            )}
          </div>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Login;
