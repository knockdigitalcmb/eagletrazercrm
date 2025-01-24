import React from "react";
import { Container, Box, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useTranslation } from "react-i18next";

import CRMTextField from "../../../components/common/CRMTextField";
import CRMButton from "../../../components/common/Button/index";

import LoginPage from "../../../assets/images/crm-loginpage.jpg";
import logo from "../../../assets/images/logo.png";

import styles from "./Login.module.scss";


const Login = () => {
  const { t } = useTranslation();
  return (
    <Container
      maxWidth={false}
      test-id="loginpage"
      className={styles.pageContainer}
    >
      {/* <Grid container 
      className={styles.gridContainer}> */}
        <Grid size={6} 
         className={styles.leftSection}>
          <img src={LoginPage} alt="Login Page" />
        </Grid>

        <Grid size={6}
        className={styles.rightSection}>
          
          <Box className={styles.logoSection}>
            <img src={logo} alt="Logo" />
          </Box>

          <Box className={styles.loginHeading}>Login Account</Box>

          <CRMTextField
            label={""}
            placeholder="Employee ID"
            required={true}
            variant="filled"
            className={styles.employeeIdInput}
          />
          <CRMTextField
            label={""}
            placeholder="Password"
            required={true}
            variant="filled"
            type="password"
            className={styles.passwordInput}
          />
           <CRMButton
           label={"Login"}
           variant="contained"
           className={styles.LoginButton}
            />
        </Grid>
      {/* </Grid> */}
    </Container>
  );
};

export default Login;
