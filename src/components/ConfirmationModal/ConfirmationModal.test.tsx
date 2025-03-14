import { fireEvent, render, screen } from '@testing-library/react';
import ConfirmationModal from './index';

const mockOnClose = jest.fn();
const mockOnHandleContinue = jest.fn();

const props = {
  open: true,
  onClose: mockOnClose,
  onHandleContinue: mockOnHandleContinue,
  title: 'test title',
  titleDescription: 'test description',
};

describe('Confirmation Modal Component',()=>{
  it('should render logout modal component',()=>{
    render(<ConfirmationModal {...props}/>)
    const logoutModalElement = screen.getByTestId('logout-modal');
    expect(logoutModalElement).toBeInTheDocument();
  })

  it('should render confirmation title',()=>{
     render(<ConfirmationModal {...props} />);
     const logoutTitle = screen.getByTestId('logout-dialog-title');
     expect(logoutTitle).toBeInTheDocument;
  })

   it('should render confirmation description', () => {
     render(<ConfirmationModal {...props} />);
     const logoutDescription = screen.getByTestId('logout-dialog-description');
     expect(logoutDescription).toBeInTheDocument;
   });


  it('should call onHandleContinue when "Yes, Continue" button is clicked', () => {
    render(<ConfirmationModal {...props} />);
    const continueButton = screen.getByTestId('logout-continue-btn');
    fireEvent.click(continueButton);
    expect(mockOnHandleContinue).toHaveBeenCalled();
  });

   it('should call onClose when "No, Cancel" button is clicked', () => {
     render(<ConfirmationModal {...props} />);
     const cancelButton = screen.getByTestId('logout-cancel-btn');
     fireEvent.click(cancelButton);
     expect(mockOnClose).toHaveBeenCalled();
   });

})