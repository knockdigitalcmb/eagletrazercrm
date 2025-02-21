import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import OTPPage from './index';

describe('OTP page ', () => {
  afterEach(cleanup);
  it('should render OTP page', () => {
    render(<OTPPage />);
    const otpPageElement = screen.getByTestId('otpPage');
    expect(otpPageElement).toBeInTheDocument();
  });

  it('should render OTP input fields', () => {
    render(<OTPPage />);
    const otpInputs = screen.getByRole('textBox');
    expect(otpInputs).toHaveLength(6);
  });

  it('should disable button when otp field is empty', () => {
    render(<OTPPage />);
    const otpButton = screen.getByTestId('otp-submit');
    expect(otpButton).toBeDisabled;
  });

  it('should enable button when otp field is filled',async() => {
    render(<OTPPage />);
    const otpButton = screen.getByTestId('otp-submit');

    fireEvent.change(screen.getByTestId('otp-input-0'), {target: { value: '1' },});
    fireEvent.change(screen.getByTestId('otp-input-1'), {target: { value: '2' },});
    fireEvent.change(screen.getByTestId('otp-input-2'), {target: { value: '3' },});
    fireEvent.change(screen.getByTestId('otp-input-3'), {target: { value: '4' },});
    fireEvent.change(screen.getByTestId('otp-input-4'), {target: { value: '5' },});
    fireEvent.change(screen.getByTestId('otp-input-5'), {target: { value: '6' },});
    await waitFor(()=>{
      expect(otpButton).toBeEnabled();
    })
  });
});
