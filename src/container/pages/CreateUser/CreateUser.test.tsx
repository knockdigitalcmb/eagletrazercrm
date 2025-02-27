import {
  fireEvent,
  render,
  screen,
  waitFor,
  act,
  cleanup,
} from '@testing-library/react';
import CreateUser from './index';

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  useForm: jest.fn(() => ({
    register: jest.fn(),
    handleSubmit: jest.fn(),
    setValue: jest.fn(),
    watch: jest.fn(),
    formState: { errors: {} },
  })),
}));

describe('Create User Page', () => {
  afterEach(cleanup);
  it('should render create user component', () => {
    render(<CreateUser />);
    const createUserElement = screen.getByTestId('create-user-page');
    expect(createUserElement).toBeInTheDocument();
  });

  it('should trigger the employee id input on change', () => {
    render(<CreateUser />);
    const employeeIdInput = screen.getByTestId('employee-id');
    fireEvent.change(screen.getByTestId('employee-id'), {
      target: { value: 'test' },
    });
    expect(employeeIdInput).toHaveValue('test');
  });
  it('should trigger the username input on change', () => {
    render(<CreateUser />);
    const userNameInput = screen.getByTestId('user-name');
    fireEvent.change(userNameInput, { target: { value: 'test' } });
    expect(userNameInput).toHaveValue('test');
  });

  it('should trigger the password input on change', () => {
    render(<CreateUser />);
    const passwordInput = screen.getByTestId('password');
    fireEvent.change(passwordInput, { target: { value: 'test123' } });
    expect(passwordInput).toHaveValue('test123');
  });

  it('should trigger the phone number input on change', () => {
    render(<CreateUser />);
    const phoneNumberInput = screen.getByTestId('phone-number');
    fireEvent.change(phoneNumberInput, { target: { value: '1234567890' } });
    expect(phoneNumberInput).toHaveValue('1234567890');
  });

  it('should trigger the email input on change', () => {
    render(<CreateUser />);
    const emailInput = screen.getByTestId('email');
    fireEvent.change(emailInput, { target: { value: 'test@gmail.com' } });
    expect(emailInput).toHaveValue('test@gmail.com');
  });
  it('should trigger the location input on change', () => {
    render(<CreateUser />);
    const locationInput = screen.getByTestId('location');
    fireEvent.change(locationInput, { target: { value: 'test' } });
    expect(locationInput).toHaveValue('test');
  });

  it('should trigger the joining date input on change', () => {
    render(<CreateUser />);
    const joiningDateInput = screen.getByTestId('joining-date');
    fireEvent.change(joiningDateInput, { target: { value: '20-02-2025' } });
    expect(joiningDateInput).toHaveValue('20-02-2025');
  });

  it('should render the submit button', () => {
    render(<CreateUser />);
    const submitButton = screen.getByTestId('submit-button');
    expect(submitButton).toBeInTheDocument;
  });

  it('should validate employee id field', async () => {
    render(<CreateUser />);
    const submitButton = screen.getByTestId('submit-button');
    await act(async () => {
      fireEvent.click(submitButton);
    });
    await waitFor(() => {
      expect(screen.getByTestId('employee-id')).toBeInTheDocument();
    });
  });

  it('should validate username field', async () => {
    render(<CreateUser />);
    const submitButton = screen.getByTestId('submit-button');
    await act(async () => {
      fireEvent.click(submitButton);
    });
    await waitFor(() => {
      expect(screen.getByTestId('user-name')).toBeInTheDocument();
    });
  });
  it('should validate password field', async () => {
    render(<CreateUser />);
    const submitButton = screen.getByTestId('submit-button');
    await act(async () => {
      fireEvent.click(submitButton);
    });
    await waitFor(() => {
      expect(screen.getByTestId('password')).toBeInTheDocument();
    });
  });
  it('should validate phone number field', async () => {
    render(<CreateUser />);
    const submitButton = screen.getByTestId('submit-button');
    await act(async () => {
      fireEvent.click(submitButton);
    });
    await waitFor(() => {
      expect(screen.getByTestId('phone-number')).toBeInTheDocument();
    });
  });
  it('should validate email field', async () => {
    render(<CreateUser />);
    const submitButton = screen.getByTestId('submit-button');
    await act(async () => {
      fireEvent.click(submitButton);
    });
    await waitFor(() => {
      expect(screen.getByTestId('email')).toBeInTheDocument();
    });
  });
  it('should validate location field', async () => {
    render(<CreateUser />);
    const submitButton = screen.getByTestId('submit-button');
    await act(async () => {
      fireEvent.click(submitButton);
    });
    await waitFor(() => {
      expect(screen.getByTestId('location')).toBeInTheDocument();
    });
  });
  it('should validate joining date field', async () => {
    render(<CreateUser />);
    const submitButton = screen.getByTestId('submit-button');
    await act(async () => {
      fireEvent.click(submitButton);
    });
    await waitFor(() => {
      expect(screen.getByTestId('joining-date')).toBeInTheDocument();
    });
  });

  it('should valid password format', async () => {
    render(<CreateUser />);
    const passwordInput = screen.getByTestId('password');
    await act(async () => {
      fireEvent.change(passwordInput, { target: { value: 'invalidTest' } });
    });
    expect(screen.getByText(/Password is Invalid/i)).toBeInTheDocument();
  });

  it('should valid phone number format', async () => {
    render(<CreateUser />);
    const phoneNumberInput = screen.getByTestId('phone-number');
    await act(async () => {
      fireEvent.change(phoneNumberInput, { target: { value: 'invalidTest' } });
    });
    expect(
      screen.getByText(/Please enter a valid 10-digit phone number/i)
    ).toBeInTheDocument();
  });

  it('should valid email format', async () => {
    render(<CreateUser />);
    const emailInput = screen.getByTestId('email');
    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'invalidTest' } });
    });
    expect(screen.getByText(/Invalid email/i)).toBeInTheDocument();
  });
});
