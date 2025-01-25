import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useTranslation } from "react-i18next";
import { CRMServiceAPI } from "../../../services/CRMService";
import { LoginForm } from "../../../models/type"
import { defaultLoginProps } from "../../../constant/payload.const"

import styles from "./Login.module.scss";
import { ReactComponent as LogInImage } from '../../../assets/images/login-bg.svg';
import EagleTrazer from '../../../assets/images/eagle-trazer.png';

const Login = () => {
  const { t } = useTranslation();
  const [login, setLogin] = useState<LoginForm>(defaultLoginProps)

  //onHandle text filed change
  const onHandleChange = (e: any, name: string) => {
    const clonedState: any = { ...login };
    clonedState[name] = e.target.value;
    setLogin(clonedState)
  }
  //onHandle submit button
  const onHandleSubmit = async () => {
    try {
      let response = await CRMServiceAPI.getUserList(login);
      if (response?.statusCode === 200) {

      }
      else {

      }
    } catch (error) {

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
                onChange={(e: any) => onHandleChange(e, 'password')}
              />
              <Button
                variant="contained"
                type="submit"
                id="login-submit"
                data-testid="login-submit"
                onClick={onHandleSubmit}>{t('login')}</Button>
            </div>
          </div>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Login 