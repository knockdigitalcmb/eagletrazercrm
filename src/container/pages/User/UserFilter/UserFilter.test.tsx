import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserFilter from '../UserFilter';
import { filterStatus } from '../../../../constant/common.constant';

describe('UserFilter Component', () => {
  const mockHandleFilterClose = jest.fn();
  const mockHandleStatusChange = jest.fn();
  const mockHandleReset = jest.fn();

  const setup = (drawerOpen: boolean, selectedStatuses: string[] = []) => {
    return render(
      <UserFilter
        drawerOpen={drawerOpen}
        selectedStatuses={selectedStatuses}
       onHandleFilterClose={mockHandleFilterClose}
        onHandleStatusChange={mockHandleStatusChange}
        onHandleReset={mockHandleReset}
      />
    );
  };

  test('should render filter drawer when drawerOpen is true', () => {
    setup(true);
    expect(screen.getByText('Filter')).toBeInTheDocument();
  });

  test('should not render the drawer when drawerOpen is false', () => {
    setup(false);
    expect(screen.queryByText('Filter')).not.toBeInTheDocument();
  });

  test('should call handleFilterClose when the drawer is closed', () => {
    setup(true);
    fireEvent.keyDown(screen.getByRole('presentation'), { key: 'Escape' });
    expect(mockHandleFilterClose).toHaveBeenCalled();
  });

  test('should call handleStatusChange when a status is clicked', () => {
    setup(true);
    const statusItem = screen.getByText(filterStatus[0]); 
    fireEvent.click(statusItem);
    expect(mockHandleStatusChange).toHaveBeenCalledWith(filterStatus[0].toLowerCase());
  });

  test('should show checkboxes for each status option', () => {
    setup(true);
    filterStatus.forEach((status) => {
      expect(screen.getByText(status)).toBeInTheDocument();
    });
  });

  test('should call handleReset when the reset button is clicked', () => {
    setup(true);
    fireEvent.click(screen.getByText('Reset'));
    expect(mockHandleReset).toHaveBeenCalled();
  });

  test('should call handleFilterClose when the submit button is clicked', () => {
    setup(true);
    fireEvent.click(screen.getByText('Submit'));
    expect(mockHandleFilterClose).toHaveBeenCalled();
  });
});
