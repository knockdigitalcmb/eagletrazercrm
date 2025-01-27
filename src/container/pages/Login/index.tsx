import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { CRMServiceAPI } from "../../../services/CRMService";
import { LoginForm } from "../../../models/type"
import { defaultLoginProps } from "../../../constant/payload.const"
import Loader from "../../../components/Loader"

import styles from "./Login.module.scss";
import { ReactComponent as LogInImage } from '../../../assets/images/login-bg.svg';
import EagleTrazer from '../../../assets/images/eagle-trazer.png';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [login, setLogin] = useState<LoginForm>(defaultLoginProps);
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  //Login form validation
  useEffect(() => {
    if (login && login?.employeeID?.length > 0 && login?.password?.length > 0) {
      setIsButtonDisabled(false)
    }
    else setIsButtonDisabled(true)
  }, [login])

  //onHandle text filed change
  const onHandleChange = (e: any, name: string) => {
    const clonedState: any = { ...login };
    clonedState[name] = e.target.value;
    setLogin(clonedState)
  }

  //onHandle submit button
  const onHandleSubmit = async () => {
    try {
      setIsLoading(true)
      let response = await CRMServiceAPI.userLogin(login);
      enqueueSnackbar('success message', {
        variant: 'success',
        autoHideDuration: 3000
      })
      setIsLoading(false)
      navigate("/otp");
    } catch (error) {
      console.log('error while sending login details', error)
    }
  }
  return (
    <Box data-testid="loginpage" className={styles.loginpageContainer}>
      <Grid container spacing={2}>
        <Grid size={7} className={styles.alignCenter}>
          <div className={styles.loginImageWrapper}>
            <LogInImage />
          </div>
        </Grid>
        <Grid size={5} className={styles.alignCenter}>
          <div className={styles.loginFormWrapper}>
            <div className={styles.eagleTrazer}>
              <img src={EagleTrazer} alt="eagle-logo" title="Eagle Trazer" />
            </div>
            <Typography className={styles.loginAccount}>{t('loginAccount')}</Typography>
            {
              isLoading ? <Loader /> :

                <div className={styles.formWrapper}>
                  <TextField
                    placeholder={t('employeeID')}
                    id="employee-ID"
                    name="employee-ID"
                    data-testid="employee-id"
                    onChange={(e: any) => onHandleChange(e, 'employeeID')}
                  />
                  <TextField
                    placeholder={t('password')}
                    id="password"
                    name="password"
                    data-testid="password"
                    type="password"
                    onChange={(e: any) => onHandleChange(e, 'password')}
                  />
                  <Button
                    variant="contained"
                    type="submit"
                    id="login-submit"
                    data-testid="login-submit"
                    fullWidth
                    className={styles.submitButton}
                    disabled={isButtonDisabled}
                    onClick={onHandleSubmit}>{t('login')}</Button>
                </div>
            }
          </div>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Login 