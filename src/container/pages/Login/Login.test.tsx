import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import Login from './index';

describe('Login Page', () => {
  afterEach(cleanup);
  it('Should Login Component Render', () => {
    render(<Login />);
    const loginElement = screen.getByTestId('loginPage');
    expect(loginElement).toBeInTheDocument();
  });

  it('Should display error message when Employee Id is empty', async () => {
    render(<Login />);
    const submitButton = screen.getByTestId('login-submit');
    fireEvent.click(submitButton);
    expect(
      await screen.findByText(/Employee ID is required/i)
    ).toBeInTheDocument();
  });

  it('Should display error when Password is empty', async () => {
    render(<Login />);
    const submitButton = screen.getByTestId('login-submit');
    fireEvent.click(submitButton);
    expect(
      await screen.findByText(/Password is required/i)
    ).toBeInTheDocument();
  });

  it('Should enable when employeeId and password are filled', () => {
    render(<Login />);
    const employeeIdInput = screen.getByTestId('employee-id');
    const PasswordInput = screen.getByTestId('password');
    const submitButton = screen.getByTestId('login-submit');
    fireEvent.change(employeeIdInput, { target: { value: 'test' } });
    fireEvent.change(PasswordInput, { target: { value: 'test' } });
    expect(submitButton).toBeEnabled();
  });

  it('should toggle password when visibility icon is clicked', () => {
    render(<Login />);
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

  it('should show success message when login is successful', async () => {
    render(<Login />);
    fireEvent.click(screen.getByTestId('employee-id')),
      { target: { value: 'validUser' } };
    fireEvent.click(screen.getByTestId('password')),
      { target: { value: 'validPass123' } };
    fireEvent.click(screen.getByTestId('login-submit'));
    expect(await screen.findByText(/Login successful/i));
  });

  it('should show success message when login is successful', async () => {
    render(<Login />);
    fireEvent.click(screen.getByTestId('employee-id')),
      { target: { value: 'invalidUser' } };
    fireEvent.click(screen.getByTestId('password')),
      { target: { value: 'invalidPass' } };
    fireEvent.click(screen.getByTestId('login-submit'));
    expect(await screen.findByText(/Login failed/i));
  });
});
