import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import CreateUser from './index';
import { act } from 'react';

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

describe('CreateUser component', () => {
  it('Should render CreateUser component', () => {
    render(<CreateUser />);
    const createUserElement = screen.getByTestId('create-user-page');
    expect(createUserElement).toBeInTheDocument();
  });

  it('Should validate all required fields', async () => {
    render(<CreateUser />);
    const submitButton = screen.getByTestId('submitButton');
    await act(async () => {
      fireEvent.click(submitButton);
    });
    await waitFor(() => {
      expect(screen.getByTestId('employee-id')).toBeInTheDocument();
      expect(screen.getByTestId('user-name')).toBeInTheDocument();
      expect(screen.getByTestId('password')).toBeInTheDocument();
      expect(screen.getByTestId('phone-number')).toBeInTheDocument();
      expect(screen.getByTestId('email')).toBeInTheDocument();
      expect(screen.getByTestId('location')).toBeInTheDocument();
      expect(screen.getByTestId('joining-date')).toBeInTheDocument();
    });
  });

  it('Valid Password Format', async () => {
    render(<CreateUser />);
    const passwordInput = screen.getByTestId('password');
    await act(async () => {
      fireEvent.change(passwordInput, { target: { value: 'invalidTest' } });
    });
    expect(screen.getByText(/Password is Invalid/i)).toBeInTheDocument();
  });

  it('Valid PhoneNumber Format', async () => {
    render(<CreateUser />);
    const phoneNumberInput = screen.getByTestId('phone-number');
    await act(async () => {
      fireEvent.change(phoneNumberInput, { target: { value: 'invalidTest' } });
    });
    expect(
      screen.getByText(/Please enter a valid 10-digit phone number/i)
    ).toBeInTheDocument();
  });

  it('Valid email Format', async () => {
    render(<CreateUser />);
    const emailInput = screen.getByTestId('email');
    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'invalidTest' } });
    });
    expect(screen.getByText(/Invalid email/i)).toBeInTheDocument();
  });

  it('Should allow valid From submission', async () => {
    render(<CreateUser />);
    fireEvent.change(screen.getByTestId('employee-id'), {
      target: { value: '' },
    });
    fireEvent.change(screen.getByTestId('user-name'), {
      target: { value: '' },
    });
    fireEvent.change(screen.getByTestId('password'), { target: { value: 'test123' } });
    fireEvent.change(screen.getByTestId('phone-number'), {target: { value: '1234567890' },});
    fireEvent.change(screen.getByTestId('email'), { target: { value: 'test@gmail.com' } });
    fireEvent.change(screen.getByTestId('location'), { target: { value: 'test' } });
    fireEvent.change(screen.getByTestId('joining-date'), {target: { value: '2025-02-20' },});

    const submitButton = screen.getByTestId('submitButton');

    await act(async () => {
      fireEvent.click(submitButton);
      await waitFor(()=>{
        expect(screen.queryByText(/Password is Invalid/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/Please enter a valid 10-digit phone number/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/Invalid email/i)).not.toBeInTheDocument();
      })
    });
  });
});
