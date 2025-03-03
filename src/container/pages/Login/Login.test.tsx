import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import Login from './index';
import { CRMServiceAPI } from '../../../services/CRMService';
import { Provider } from 'react-redux';
import { store } from '../../../store/index';
import { BrowserRouter } from 'react-router';
import { enqueueSnackbar } from 'notistack';

jest.mock('../../../services/CRMService', () => {
  CRMServiceAPI: {
    userLogin: jest.fn();
  }
});

jest.mock('notistack', () => ({
  enqueueSnackbar: jest.fn(),
}));
const renderPage = () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  );
};

describe('Login Page', () => {
  afterEach(cleanup);
  it('should login page render', () => {
    renderPage();
    const loginElement = screen.getByTestId('loginPage');
    expect(loginElement).toBeInTheDocument();
  });

  it('should display error message when employee id is empty', async () => {
    renderPage();
    const submitButton = screen.getByTestId('login-submit');
    fireEvent.click(submitButton);
    expect(
      await screen.findByText(/Employee ID is required/i)
    ).toBeInTheDocument();
  });

  it('should display error when password is empty', async () => {
    renderPage();
    const submitButton = screen.getByTestId('login-submit');
    fireEvent.click(submitButton);
    expect(
      await screen.findByText(/Password is required/i)
    ).toBeInTheDocument();
  });

  it('should enable login button when employeeId and password are filled', () => {
    renderPage();
    const employeeIdInput = screen.getByTestId('employee-id');
    const PasswordInput = screen.getByTestId('password');
    const submitButton = screen.getByTestId('login-submit');
    fireEvent.change(employeeIdInput, { target: { value: 'test' } });
    fireEvent.change(PasswordInput, { target: { value: 'test' } });
    expect(submitButton).toBeEnabled();
  });

  it('should toggle password when visibility icon is clicked', () => {
    renderPage();
    const passwordInput = screen.getByTestId('password');
    const togglePasswordIcon = screen.getByLabelText(
      'toggle password visibility'
    );
    expect(passwordInput).toHaveAttribute('type', 'password');
    fireEvent.click(togglePasswordIcon);
    expect(passwordInput).toHaveAttribute('type', 'text');
    fireEvent.click(togglePasswordIcon);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('should handles login success and redirect to otp page', async () => {
    (CRMServiceAPI.userLogin as jest.Mock).mockResolvedValue({
      status: true,
      token: 'mocked_token',
    });
    renderPage();
    const employeeIdInput = screen.getByTestId('employee-id');
    const passwordInput = screen.getByTestId('password');
    const submitButton = screen.getByTestId('login-submit');
    fireEvent.change(employeeIdInput),{target: { value: 'testEmpId' },};
    fireEvent.change(passwordInput),{target: { value: 'testPassword' },};
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(enqueueSnackbar).toHaveBeenCalledWith('Login successful', {
        variant: 'success',
        autoHideDuration: 3000,
      });
    });
    expect(window.location.pathname).toBe('/otp')
  });

  it('should display error when api request failed',async()=>{
   (CRMServiceAPI.userLogin as jest.Mock).mockRejectedValue({
    status:false,
    error:"unauthorized"
   })
   renderPage();
   const employeeIdInput = screen.getByTestId('employee-id');
   const passwordInput = screen.getByTestId('password');
   const submitButton = screen.getByTestId('login-submit');
   fireEvent.change(employeeIdInput),{target: { value: 'testEmpId' },};
   fireEvent.change(passwordInput),{target: { value: 'testPassword' },};
   fireEvent.click(submitButton);
     await waitFor(()=>{
     expect(enqueueSnackbar).toHaveBeenCalledWith('unauthorized', {
       variant: 'error',
       autoHideDuration: 3000,
     });
     })
  })
});
