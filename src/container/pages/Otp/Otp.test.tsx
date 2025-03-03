import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import OTPPage from './index';
import { CRMServiceAPI } from '../../../services/CRMService';
import { enqueueSnackbar } from 'notistack';
import { Provider } from 'react-redux';
import {store} from '../../../store/index'
import { BrowserRouter } from 'react-router';

jest.mock('../../../services/CRMService',()=>{
  CRMServiceAPI:{
    OTPVerification:jest.fn();
  }
})

jest.mock('notistack',()=>{
   enqueueSnackbar:jest.fn();
})

const renderPage=()=>{
  render(
    <Provider store={store}>
     <BrowserRouter>
     <OTPPage/>
     </BrowserRouter>
    </Provider>
  );
}

describe('OTP Page ', () => {
  afterEach(cleanup);
  it('should render the otp page', () => {
    renderPage();
    const otpPageElement = screen.getByTestId('otp-page');
    expect(otpPageElement).toBeInTheDocument();
  });

  it('should render otp input fields', () => {
    renderPage();
    const otpInputs = screen.getByRole('textBox');
    expect(otpInputs).toHaveLength(6);
  });

  it('should disable button when otp field is empty', () => {
     renderPage();
    const otpButton = screen.getByTestId('otp-submit');
    expect(otpButton).toBeDisabled;
  });

  it('should enable button when otp field is filled', async () => {
     renderPage();
    const otpButton = screen.getByTestId('otp-submit');

    fireEvent.change(screen.getByTestId('otp-input-0'), {
      target: { value: '1' },
    });
    fireEvent.change(screen.getByTestId('otp-input-1'), {
      target: { value: '2' },
    });
    fireEvent.change(screen.getByTestId('otp-input-2'), {
      target: { value: '3' },
    });
    fireEvent.change(screen.getByTestId('otp-input-3'), {
      target: { value: '4' },
    });
    fireEvent.change(screen.getByTestId('otp-input-4'), {
      target: { value: '5' },
    });
    fireEvent.change(screen.getByTestId('otp-input-5'), {
      target: { value: '6' },
    });
    await waitFor(() => {
      expect(otpButton).toBeEnabled();
    });
  });

  it('should handles success and redirect to dashboard page',async()=>{
    (CRMServiceAPI.OTPVerification as jest.Mock).mockReturnValue({
      status:true,
      token:'mockToken'
    })
    renderPage();
     const otpInputs = screen.getAllByRole('textBox');
     const otpButton = screen.getByTestId('otp-submit');

     fireEvent.change(otpInputs[0],{target:{value:'1'}});
     fireEvent.change(otpInputs[1],{target:{value:'2'}})
      fireEvent.change(otpInputs[2], { target: { value:'3' } });
      fireEvent.change(otpInputs[3], { target: { value:'4' } });
      fireEvent.change(otpInputs[4], { target: { value:'5' } });
      fireEvent.change(otpInputs[5], { target: { value:'6' } });
      fireEvent.click(otpButton)
      await waitFor(()=>{
        expect(enqueueSnackbar).toHaveBeenCalledWith('User Successfully Log In',{
          variant:'success',
          autoHideDuration:3000
        })
      })
      expect(window.location.pathname).toBe('/dashboard')
  })

  it('should handles error when otp fails', async () => {
    (CRMServiceAPI.OTPVerification as jest.Mock).mockReturnValue({
      status: false,
      error: 'Please check OTP enter.',
    });
    renderPage();
    const otpInputs = screen.getAllByRole('textBox');
    const otpButton = screen.getByTestId('otp-submit');

    fireEvent.change(otpInputs[0], { target: { value: '1' } });
    fireEvent.change(otpInputs[1], { target: { value: '2' } });
    fireEvent.change(otpInputs[2], { target: { value: '3' } });
    fireEvent.change(otpInputs[3], { target: { value: '4' } });
    fireEvent.change(otpInputs[4], { target: { value: '5' } });
    fireEvent.change(otpInputs[5], { target: { value: '6' } });
    fireEvent.click(otpButton);
    await waitFor(() => {
      expect(enqueueSnackbar).toHaveBeenCalledWith('Please check OTP enter.', {
        variant: 'error',
        autoHideDuration: 3000,
      });
    });
  });
});
