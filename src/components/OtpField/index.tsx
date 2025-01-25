import React from "react";
import { Box, styled } from '@mui/system';

const OTPField = () => {
    const [otp, setOtp] = React.useState('');

    function OTP({
        separator,
        length,
        value,
        onChange,
    }: {
        separator: React.ReactNode;
        length: number;
        value: string;
        onChange: React.Dispatch<React.SetStateAction<string>>;
    }) {
        const inputRefs = React.useRef<HTMLInputElement[]>(new Array(length).fill(null));

        const focusInput = (targetIndex: number) => {
            const targetInput = inputRefs.current[targetIndex];
            if (targetInput) targetInput.focus();
        };

        const selectInput = (targetIndex: number) => {
            const targetInput = inputRefs.current[targetIndex];
            if (targetInput) targetInput.select();
        };

        const handleKeyDown = (
            event: React.KeyboardEvent<HTMLInputElement>,
            currentIndex: number,
        ) => {
            switch (event.key) {
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
                case 'Backspace':
                case 'Delete':
                    event.preventDefault();
                    onChange((prevOtp) => {
                        const otp = prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1);
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
            onChange((prev) => {
                const otpArray = prev.split('');
                otpArray[currentIndex] = currentValue;
                return otpArray.join('');
            });
            if (currentValue !== '' && currentIndex < length - 1) {
                focusInput(currentIndex + 1);
            }
        };

        const handleClick = (
            event: React.MouseEvent<HTMLInputElement>,
            currentIndex: number,
        ) => {
            selectInput(currentIndex);
        };

        const handlePaste = (
            event: React.ClipboardEvent<HTMLInputElement>,
            currentIndex: number,
        ) => {
            event.preventDefault();
            const clipboardData = event.clipboardData;
            if (clipboardData.types.includes('text/plain')) {
                let pastedText = clipboardData.getData('text/plain');
                pastedText = pastedText.substring(0, length).trim();
                onChange(pastedText);
            }
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
                            onPaste={(event) => handlePaste(event, index)}
                            value={value[index] ?? ''}
                        />
                        {index !== length - 1 && separator}
                    </React.Fragment>
                ))}
            </Box>
        );
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <OTP separator={<span>-</span>} value={otp} onChange={setOtp} length={5} />

        </Box>
    );
};

const blue = {
    100: '#DAECFF',
    200: '#80BFFF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0059B2',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const InputElement = styled('input')(
    ({ theme }) => `
    width: 40px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 0;
    border-radius: 8px;
    text-align: center;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0 2px 4px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'};

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    }

    &:focus-visible {
      outline: 0;
    }
  `,
);

export default OTPField;
