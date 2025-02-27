import { render, screen } from '@testing-library/react';
import Dashboard from './index';

describe('Dashboard Page', () => {
  it('should render dashboard page', () => {
    render(<Dashboard />);
    const dashboardElement = screen.getByTestId('dashboard-page');
    expect(dashboardElement).toBeInTheDocument();
  });
});
