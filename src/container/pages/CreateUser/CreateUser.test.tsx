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
  it('should render CreateUser component', () => {
    render(<CreateUser />);
    const createUserElement = screen.getByTestId('create-user-page');
    expect(createUserElement).toBeInTheDocument();
  });

  it('should trigger Employee ID input change', () => {
    render(<CreateUser />);
    fireEvent.change(screen.getByTestId('employee-id'), {
      target: { value: 'test' },
    });
  });
  it('should trigger Username input change', () => {
    fireEvent.change(screen.getByTestId('user-name'), {
      target: { value: 'test' },
    });
  });
  it('should trigger Password input change', () => {
    fireEvent.change(screen.getByTestId('password'), {
      target: { value: 'test123' },
    });
  });

  it('should trigger Phone Number input change', () => {
    fireEvent.change(screen.getByTestId('phone-number'), {
      target: { value: '1234567890' },
    });
  });
  it('should trigger Email input change', () => {
    fireEvent.change(screen.getByTestId('email'), {
      target: { value: 'test@gmail.com' },
    });
  });
  it('should trigger Location input change', () => {
    fireEvent.change(screen.getByTestId('location'), {
      target: { value: 'test' },
    });
  });
  it('should trigger Joining Date input change', () => {
    fireEvent.change(screen.getByTestId('joining-date'), {
      target: { value: '2025-02-20' },
    });
  });

  it('should trigger form submission', async () => {
    const submitButton = screen.getByTestId('submitButton');

    await act(async () => {
      fireEvent.click(submitButton);
    });
  });

  it('should validate Employee ID field', async () => {
    render(<CreateUser />);
    const submitButton = screen.getByTestId('submitButton');

    await act(async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(screen.getByTestId('employee-id')).toBeInTheDocument();
    });
  });

  it('should validate Username field', async () => {
    render(<CreateUser />);
    const submitButton = screen.getByTestId('submitButton');

    await act(async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(screen.getByTestId('user-name')).toBeInTheDocument();
    });
  });
  it('should validate Password field', async () => {
    render(<CreateUser />);
    const submitButton = screen.getByTestId('submitButton');

    await act(async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(screen.getByTestId('password')).toBeInTheDocument();
    });
  });
  it('should validate Phone Number field', async () => {
    render(<CreateUser />);
    const submitButton = screen.getByTestId('submitButton');

    await act(async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(screen.getByTestId('phone-number')).toBeInTheDocument();
    });
  });
  it('should validate Email field', async () => {
    render(<CreateUser />);
    const submitButton = screen.getByTestId('submitButton');

    await act(async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(screen.getByTestId('email')).toBeInTheDocument();
    });
  });
  it('should validate Location field', async () => {
    render(<CreateUser />);
    const submitButton = screen.getByTestId('submitButton');

    await act(async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(screen.getByTestId('location')).toBeInTheDocument();
    });
  });
  it('should validate Joining Date field', async () => {
    render(<CreateUser />);
    const submitButton = screen.getByTestId('submitButton');

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

  it('should valid PhoneNumber format', async () => {
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