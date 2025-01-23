import React from "react";
import { Container, Box } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useTranslation } from "react-i18next";
import CRMTextField from "../../../components/common/CRMTextField";

import styles from "./Login.module.scss";


const Login = () => {
  const { t } = useTranslation();
  return (
    <Container maxWidth={false} test-id="loginpage" className={styles.pageContainer}>
      <Grid container>
        <Grid size={6}>
          {t('login')}
        </Grid>
        <Grid size={6}>
          <CRMTextField
            label={''}
            placeholder="Employee ID"
            required={true}
            variant='standard'
            className={styles.test}
          />
          <CRMTextField
            label={''}
            placeholder="Password"
            required={true}
            variant='standard'
            type="password"
            className={styles.test1}
          />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Login 