import React from "react";
import { Container, Box, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useTranslation } from "react-i18next";
import CRMTextField from "../../../components/common/CRMTextField";
import CRMButton from '../../../components/OtpField/Button'; // Adjust the path as necessary

import styles from "./Otp.module.scss";
import OTPField from "../../../components/OtpField/index";
import Image from "../../../assets/images/otpimage.png";

const Otp = () => {
    const { t } = useTranslation();


    return (
        <>
            <Container maxWidth={false} test-id="Otp" className={styles.pageContainer}>
                <Grid container className="centerGridContainer" >

                    <Grid size={6} className={styles.imageContainer}>
                        {/* {t('OTP')} */}
                        <Box
                            component="img"
                            src={Image}
                            alt="OTP Illustration"
                            className={styles.image}
                        />

                    </Grid>
                    <Grid size={6} className={styles.otpContainer}>

                        <Box className={styles.otpFieldWrapper}>
                            <Typography variant="h4" component="h2">
                                {t("Authentication code")}
                            </Typography>

                            <OTPField />
                        </Box>
                        <CRMButton

                            label={"verify"}
                            variant="contained"
                            className={styles.VerifyButton}
                        />
                    </Grid>
                </Grid>
            </Container >
        </>
    )
}
export default Otp