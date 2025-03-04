import { fireEvent, render, screen } from '@testing-library/react';
import SidePanel from './index';

const Props = {
  menu: 'Dashboard',
};

describe('Side Panel Component', () => {
  it('should render sidePanel component', () => {
    render(<SidePanel {...Props} />);
    const sidePanelElement = screen.getByTestId('dashboard-page');
    expect(sidePanelElement).toBeInTheDocument;
  });

  it('should toggle the drawer when menu icon is clicked', () => {
    render(<SidePanel {...Props} />);
    const menuIcon = screen.getByTestId('menu-icon');
    fireEvent.click(menuIcon);
    expect(screen.getByTestId('dashboard-page')).toBeInTheDocument();
  });

  it('should render the slide bar list items', () => {
    render(<SidePanel {...Props} />);
    const menuItems = screen.getAllByTestId('list-item');
    expect(menuItems.length).toBeGreaterThan(0);
  });

  it('should navigate when clicking on list item', () => {
    render(<SidePanel {...Props} />);
    const listItem = screen.getByTestId('list-item');
    fireEvent.click(listItem);
    expect(listItem).toHaveClass('active');
  });
});
