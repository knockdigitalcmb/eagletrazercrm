import { fireEvent, render, screen } from '@testing-library/react';
import ViewRoles from '.';

const mockOnHandleCloseViewModal = jest.fn();
const viewProps = {
  open: true,
  onHandleCloseViewModal: mockOnHandleCloseViewModal,
  row: { role: 'test', permission: { test1: true, test2: false } },
};
describe('View Roles Component', () => {
  it('should render view roles component', () => {
    render(<ViewRoles {...viewProps} />);
    const viewRoles = screen.getByTestId('view-role');
    expect(viewRoles).toBeInTheDocument();
  });
  it('should close when close icon is clicked',()=>{
     render(<ViewRoles {...viewProps} />);
     const closeButton = screen.getByTestId('view-close-button');
     fireEvent.click(closeButton)
     expect(mockOnHandleCloseViewModal).toHaveBeenCalled()
  })
  it('should display role name and role permission properly', () => {
    render(<ViewRoles {...viewProps} />);
    const roleName = screen.getByTestId('role-name');
    const rolePermission = screen.getByTestId('role-permissions');
    expect(roleName).toBeInTheDocument()
    expect(rolePermission).toBeInTheDocument();
  });

});
