import { fireEvent, render, screen } from '@testing-library/react';
import CreateAndEditRoles from './index';

const mockOnHandleCloseCreateRoleModal = jest.fn();
const mockOnHandleRoleSubmit = jest.fn();
const mockRegister = jest.fn();

const menuProps = {
  open: true,
  row: { role: 'test', permission: { test1: true, test2: false } },
  onHandleCloseCreateRoleModal: mockOnHandleCloseCreateRoleModal,
  register: mockRegister,
  errors: {},
  onHandleRoleSubmit: mockOnHandleRoleSubmit,
};

describe('Create and Edit Modal Component', () => {
  it('should render create and edit modal page', () => {
    render(<CreateAndEditRoles {...menuProps} />);
    const createEditModal = screen.getByTestId('create-edit-modal');
    expect(createEditModal).toBeInTheDocument();
  });
  it('should render create modal heading', () => {
    render(<CreateAndEditRoles {...menuProps} row={null} />);
    expect(screen.getByText('createRole')).toBeInTheDocument();
  });
  it('should close the modal when close button is clicked', () => {
    render(<CreateAndEditRoles {...menuProps} />);
    const closeButton = screen.getByTestId('close-button');
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);
    expect(mockOnHandleCloseCreateRoleModal).toHaveBeenCalledTimes(1);
  });

  it('should render edit modal heading', () => {
    render(<CreateAndEditRoles {...menuProps} />);
    expect(screen.getByText('editRole')).toBeInTheDocument();
  });

  it('should render input field', () => {
    render(<CreateAndEditRoles {...menuProps} />);
    const inputField = screen.getByPlaceholderText('rolePlaceholder');
    expect(inputField).toBeInTheDocument();
    expect(inputField).toHaveValue('test');
  });

  it('should render all permission checkboxes', () => {
    render(<CreateAndEditRoles {...menuProps} />);
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBeGreaterThan(0);
  });

  it('should render submit button and handle click event', () => {
    render(<CreateAndEditRoles {...menuProps} />);
    const submitButton = screen.getByTestId('submit-button');
    expect(submitButton).toBeInTheDocument();
    fireEvent.click(submitButton);
    expect(mockOnHandleRoleSubmit).toHaveBeenCalledTimes(1);
  });
});
