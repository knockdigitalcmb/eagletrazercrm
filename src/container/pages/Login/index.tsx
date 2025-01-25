import React, { useState } from "react";
import { Container, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useTranslation } from "react-i18next";

import CRMTextField from "../../../components/common/CRMTextField";
import CRMButton from "../../../components/common/CRMButton/index";

import LoginPage from "../../../assets/images/crm-loginPage.png";
import logo from "../../../assets/images/logo.png";

import styles from "./Login.module.scss";


const Login = () => {
  const { t } = useTranslation();

   const [input,setInput]=useState({})

  const onHandleChange=(values:any)=>{
   console.log("values:",values)
  } 

  return (
    <Container
      maxWidth={false}
      test-id="loginpage"
      className={styles.pageContainer}
    >
      <Grid container 
      className={styles.gridContainer}>
        <Grid 
        size={6} 
         className={styles.leftSection}>
          <img src={LoginPage} alt="Login Page" />
        </Grid>
        <Grid  size={6} 
        className={styles.rightSection}>
          
          <Box className={styles.logoSection}>
            <img src={logo} alt="Logo" />
          </Box>
          <Box className={styles.loginHeading}>{t('Login Account')}</Box>
          <CRMTextField
            label={""}
            placeholder={t('Employee ID')}
            required={true}
            variant="filled"
            className={styles.employeeIdInput}
            onTextChange={onHandleChange}
          
          />
          <CRMTextField
            label={""}
            placeholder={t('Password')}
            required={true}
            variant="filled"
            type="password"
            className={styles.passwordInput}
            onTextChange={onHandleChange}
            
          />
           <CRMButton
           label={t('Login')}
           variant="contained"
           className={styles.LoginButton}
            />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
