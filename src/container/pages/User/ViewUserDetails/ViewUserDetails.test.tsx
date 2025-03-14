import { render, screen, fireEvent } from '@testing-library/react';
import ViewUserDetails from './index';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe('ViewUserDetails Component', () => {
  const mockOnClose = jest.fn();
  const mockUser = {
    employeeId: '12345',
    userName: 'John Doe',
    email: 'john@example.com',
    phoneNumber: '1234567890',
    location: 'New York',
    address: '123 Main St',
    dateOfJoining: '2023-01-01',
    role: 'Admin',
    status: 'Active',
  };

  afterEach(() => {
    jest.clearAllMocks(); 
  });

  it('should render without crashing', () => {
    render(
      <ViewUserDetails
        open={true}
        onClose={mockOnClose}
        selectedUser={mockUser}
      />
    );

    expect(screen.getByText('userDetails')).toBeInTheDocument();
  });

  it('should display user details', () => {
    render(
      <ViewUserDetails
        open={true}
        onClose={mockOnClose}
        selectedUser={mockUser}
      />
    );

    expect(screen.getByText(mockUser.userName)).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
    expect(screen.getByText(mockUser.phoneNumber)).toBeInTheDocument();
    expect(screen.getByText(mockUser.role)).toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', () => {
    render(<ViewUserDetails open={true} onClose={mockOnClose} selectedUser={mockUser} />);

    const closeButton = screen.getByTestId('close-button'); 

    expect(mockOnClose).toHaveBeenCalledTimes(1); 
  });

  it('should show no user message when no user is selected', () => {
    render(
      <ViewUserDetails open={true} onClose={mockOnClose} selectedUser={null} />
    );

    expect(screen.getByText('No user selected.')).toBeInTheDocument();
  });
});
