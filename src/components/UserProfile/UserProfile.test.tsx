import { render, screen, fireEvent } from '@testing-library/react';
import UserProfile from './index';

describe('UserProfile Page', () => {
  it('should render the user profile', () => {
    render(<UserProfile />);
    expect(screen.getByTestId('user-profile')).toBeInTheDocument();
  });

  it('should open the menu when clicking the profile image', () => {
    render(<UserProfile />);
    const profileImage = screen.getByAltText('User Profile');
    fireEvent.click(profileImage);
    expect(screen.getByText('profile')).toBeInTheDocument();
    expect(screen.getByText('settings')).toBeInTheDocument();
    expect(screen.getByText('logout')).toBeInTheDocument();
  });

  it('should close the menu when clicking outside', () => {
    render(<UserProfile />);
    fireEvent.click(screen.getByAltText('User Profile'));
    fireEvent.click(document.body);
    expect(screen.queryByText('profile')).not.toBeInTheDocument();
    expect(screen.queryByText('settings')).not.toBeInTheDocument();
    expect(screen.queryByText('logout')).not.toBeInTheDocument();
  });

  it('should call on handle logout when clicking "logout"', () => {
    render(<UserProfile />);
    fireEvent.click(screen.getByAltText('User Profile'));
    fireEvent.click(screen.getByText('logout'));
    expect(screen.queryByText('logout')).not.toBeInTheDocument();
  });
});
