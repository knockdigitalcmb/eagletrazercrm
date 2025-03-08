import { fireEvent, render, screen } from '@testing-library/react';
import LogoutModal from './index';

const mockOnClose = jest.fn();
const mockOnHandleContinue = jest.fn();

const props = {
  open: true,
  onClose: mockOnClose,
  onHandleContinue: mockOnHandleContinue,
  title: 'Logout Confirmation',
  titleDescription: 'Are you sure you want to log out?',
};

describe('Logout Modal Component',()=>{
  it('should render logout modal component',()=>{
    render(<LogoutModal {...props}/>)
    const logoutModalElement = screen.getByTestId('logout-modal');
    expect(logoutModalElement).toBeInTheDocument();
  })

  it('should render logout title',()=>{
     render(<LogoutModal {...props} />);
     const logoutTitle = screen.getByTestId('logout-dialog-title');
     expect(logoutTitle).toBeInTheDocument;
  })

   it('should render logout description', () => {
     render(<LogoutModal {...props} />);
     const logoutDescription = screen.getByTestId('logout-dialog-description');
     expect(logoutDescription).toBeInTheDocument;
   });


  it('should call onHandleContinue when "Yes, Continue" button is clicked', () => {
    render(<LogoutModal {...props} />);
    const continueButton = screen.getByTestId('logout-continue-btn');
    fireEvent.click(continueButton);
    expect(mockOnHandleContinue).toHaveBeenCalled();
  });

   it('should call onClose when "No, Cancel" button is clicked', () => {
     render(<LogoutModal {...props} />);
     const cancelButton = screen.getByTestId('logout-cancel-btn');
     fireEvent.click(cancelButton);
     expect(mockOnClose).toHaveBeenCalled();
   });

})