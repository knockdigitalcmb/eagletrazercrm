import { render, screen, cleanup } from '@testing-library/react';
import UserProfile from './index';

describe('UserProfile Page', () => {
  afterEach(cleanup);
  it('should render the user profile ', () => {
    render(<UserProfile />);
    expect(screen.getByTestId('user-profile')).toBeInTheDocument();
  });
 it('should display menu items when menu is open', () => {
    render(<UserProfile />);
     expect(screen.getByText('profile')).toBeInTheDocument();
    expect(screen.getByText('settings')).toBeInTheDocument();
    expect(screen.getByText('logout')).toBeInTheDocument();
  });
});
