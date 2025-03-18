import { render, screen, fireEvent } from '@testing-library/react';
import CRMTableActions from './index';

const mockHandleClick = jest.fn();
const mockHandleClose = jest.fn();
const mockOnHandleViewModalOpen = jest.fn();
const mockOnHandleEditModal = jest.fn();
const mockOnHandleDeleteModal = jest.fn();

const row = { id: 1, name: 'test' };
let menuState: { anchorEl: HTMLElement | null; rowId: number | null } = {
  anchorEl: null,
  rowId: null,
};

const actionsProps = {
  view: false,
  edit: true,
  delete: true,
};

const renderCRMActionComponent = () => {
  render(
    <CRMTableActions
      row={row}
      menuState={menuState}
      handleClick={mockHandleClick}
      handleClose={mockHandleClose}
      onHandleViewModalOpen={mockOnHandleViewModalOpen}
      onHandleEditModal={mockOnHandleEditModal}
      onHandleDeleteModal={mockOnHandleDeleteModal}
      actions={actionsProps}
    />
  );
};

describe('CRMTableActions Component', () => {
  it('crm table actions element', () => {
    renderCRMActionComponent();
    const crmElement = screen.getByTestId('crm-table-action');
    expect(crmElement).toBeInTheDocument();
  });
  it('to open action menu on click', () => {
    renderCRMActionComponent();
    const actionMenus = screen.getByTestId('action-icon');
    fireEvent.click(actionMenus);
    expect(mockHandleClick).toHaveBeenCalled();
  });

  it('should trigger view modal on clicking view menu', () => {
    renderCRMActionComponent();
    menuState = { anchorEl: document.createElement('div'), rowId: row.id };
    renderCRMActionComponent();
    const viewModal = screen.getByTestId('view-modal');
    fireEvent.click(viewModal);
    expect(mockOnHandleViewModalOpen).toHaveBeenCalled();
  });
  it('should trigger edit modal on clicking edit menu', () => {
    renderCRMActionComponent();
    menuState = { anchorEl: document.createElement('div'), rowId: row.id };
    const editModal = screen.getByTestId('edit-modal');
    fireEvent.click(editModal);
    expect(mockOnHandleEditModal).toHaveBeenCalled();
  });
  it('should trigger delete modal on clicking delete menu', () => {
    renderCRMActionComponent();
    menuState = { anchorEl: document.createElement('div'), rowId: row.id };
    const deleteModal = screen.getByTestId('delete-modal');
    fireEvent.click(deleteModal);
    expect(mockOnHandleDeleteModal).toHaveBeenCalled();
  });
});
