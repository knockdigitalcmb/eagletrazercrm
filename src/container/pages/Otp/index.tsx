import React, { useState, useEffect, useRef } from 'react';
import { Box, styled, Typography, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { CRMServiceAPI } from "../../../services/CRMService";

import styles from './Otp.module.scss';
import { ReactComponent as OtpImage } from '../../../assets/images/otp-bg.svg';
import EagleTrazer from '../../../assets/images/eagle-trazer.png';

interface OTPProps {
    separator: React.ReactNode;
    length: number;
    value: string;
    onChange: React.Dispatch<React.SetStateAction<string>>;
}

const InputElement = styled('input')(
    () => `
  width: 40px;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 0;
  border-radius: 8px;
  text-align: center;
  color: #1a1a1a;
  background: #fff;
  border: 1px solid #fec601;
  &:hover {
    border-color: #1a1a1a;
  }
  &:focus {
    border-color: #1a1a1a;
  }
  /* firefox */
  &:focus-visible {
    outline: 0;
  }
`,
);

const OTP = ({
    separator,
    length,
    value,
    onChange,
}: OTPProps) => {
    const inputRefs = useRef<HTMLInputElement[]>(new Array(length).fill(null));

    const focusInput = (targetIndex: number) => {
        const targetInput = inputRefs.current[targetIndex];
        targetInput.focus();
    };

    const selectInput = (targetIndex: number) => {
        const targetInput = inputRefs.current[targetIndex];
        targetInput.select();
    };

    const handleKeyDown = (
        event: React.KeyboardEvent<HTMLInputElement>,
        currentIndex: number,
    ) => {
        switch (event.key) {
            case 'ArrowUp':
            case 'ArrowDown':
            case ' ':
                event.preventDefault();
                break;
            case 'ArrowLeft':
                event.preventDefault();
                if (currentIndex > 0) {
                    focusInput(currentIndex - 1);
                    selectInput(currentIndex - 1);
                }
                break;
            case 'ArrowRight':
                event.preventDefault();
                if (currentIndex < length - 1) {
                    focusInput(currentIndex + 1);
                    selectInput(currentIndex + 1);
                }
                break;
            case 'Delete':
                event.preventDefault();
                onChange((prevOtp) => {
                    const otp =
                        prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1);
                    return otp;
                });

                break;
            case 'Backspace':
                event.preventDefault();
                if (currentIndex > 0) {
                    focusInput(currentIndex - 1);
                    selectInput(currentIndex - 1);
                }

                onChange((prevOtp) => {
                    const otp =
                        prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1);
                    return otp;
                });
                break;

            default:
                break;
        }
    };

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        currentIndex: number,
    ) => {
        const currentValue = event.target.value;
        let indexToEnter = 0;

        while (indexToEnter <= currentIndex) {
            if (inputRefs.current[indexToEnter].value && indexToEnter < currentIndex) {
                indexToEnter += 1;
            } else {
                break;
            }
        }
        onChange((prev) => {
            const otpArray = prev.split('');
            const lastValue = currentValue[currentValue.length - 1];
            otpArray[indexToEnter] = lastValue;
            return otpArray.join('');
        });
        if (currentValue !== '') {
            if (currentIndex < length - 1) {
                focusInput(currentIndex + 1);
            }
        }
    };

    const handleClick = (
        event: React.MouseEvent<HTMLInputElement, MouseEvent>,
        currentIndex: number,
    ) => {
        selectInput(currentIndex);
    };
    return (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            {new Array(length).fill(null).map((_, index) => (
                <React.Fragment key={index}>
                    <InputElement
                        aria-label={`Digit ${index + 1} of OTP`}
                        ref={(ele) => {
                            if (ele) inputRefs.current[index] = ele;
                        }}
                        onKeyDown={(event) => handleKeyDown(event, index)}
                        onChange={(event) => handleChange(event, index)}
                        onClick={(event) => handleClick(event, index)}
                        value={value[index] ?? ''}
                    />
                    {index !== length - 1 && separator}
                </React.Fragment>
            ))}
        </Box>
    );
}

const OTPPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    //otp form validatiom
    useEffect(() => {
        if (otp && otp?.length === 6) {
            setIsButtonDisabled(false)
        }
        else setIsButtonDisabled(true)
    }, [otp])

    //on Handle Submit
    const onHandleSubmit = async () => {
        try {
            let response = await CRMServiceAPI.OTPVerification(otp);
            navigate('/dashboard');
        } catch (error) {
            console.log('error while submitting otp verification', error)
        }
    }
    return (
        <Box data-testid="otppage" className={styles.otppageContainer}>
            <Grid container spacing={2}>
                <Grid size={7} className={styles.alignCenter}>
                    <div className={styles.OtpImageWrapper}>
                        <OtpImage />
                    </div>
                </Grid>
                <Grid size={5} className={styles.alignCenter}>
                    <div className={styles.otpFormWrapper}>
                        <div className={styles.eagleTrazer}>
                            <img src={EagleTrazer} alt="eagle-logo" title="Eagle Trazer" />
                        </div>
                        <Typography className={styles.otpHeading}>{t('authenticationCode')}</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: '25px', alignItems: 'center' }}>
                            <OTP separator={<span>-</span>} value={otp} onChange={setOtp} length={6} />
                            <Button
                                variant="contained"
                                type="submit"
                                id="otp-submit"
                                data-testid="otp-submit"
                                fullWidth
                                className={styles.submitButton}
                                disabled={isButtonDisabled}
                                onClick={onHandleSubmit}>{t('verify')}</Button>
                        </Box>
                    </div>
                </Grid>
            </Grid>
        </Box>
    );
}

export default OTPPage;