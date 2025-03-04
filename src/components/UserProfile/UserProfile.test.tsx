import { render, screen, fireEvent, getByTestId } from '@testing-library/react';
import UserProfile from './index';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../store/index';
import { setAuthToken } from '../../features/common/commonSlice';

jest.mock('../../features/common/commonSlice', () => ({
  setAuthToken: jest.fn(),
}));

const RenderUserProfile = () => {
  <Provider store={store}>
    <BrowserRouter>
      <UserProfile />
    </BrowserRouter>
  </Provider>;
};

describe('User Profile Page', () => {
  it('should render the user profile', () => {
    render(<UserProfile />);
    expect(screen.getByTestId('user-profile')).toBeInTheDocument();
  });

  it('should open the menu when clicking the profile image', () => {
    RenderUserProfile();
    const profileImage = screen.getByAltText('User Profile');
    fireEvent.click(profileImage);
    expect(screen.getByText('profile')).toBeInTheDocument();
    expect(screen.getByText('settings')).toBeInTheDocument();
    expect(screen.getByText('logout')).toBeInTheDocument();
  });

  it('should close the menu when clicking outside', () => {
    RenderUserProfile();
    fireEvent.click(screen.getByAltText('User Profile'));
    fireEvent.click(document.body);
    expect(screen.queryByText('profile')).not.toBeInTheDocument();
    expect(screen.queryByText('settings')).not.toBeInTheDocument();
    expect(screen.queryByText('logout')).not.toBeInTheDocument();
  });

  it('should open logout modal when logout menu is clicked', () => {
    RenderUserProfile();
    const profileImage = screen.getByTestId('user-profile');
    fireEvent.click(profileImage);
    const logoutButton = screen.getByTestId('logout-btn');
    fireEvent.click(logoutButton);
    const logoutModal = screen.getByTestId('logout-modal');
    expect(logoutModal).toBeInTheDocument();
  });

  it('should clear token and navigate to login page on clicking yes,continue', () => {
    RenderUserProfile();
    const logoutButton = screen.getByTestId('logout-btn');
    fireEvent.click(logoutButton);
    const confirmButton = screen.getByText(/Yes, Continue/i);
    fireEvent.click(confirmButton);
    expect(setAuthToken).toHaveBeenCalledWith('');
    expect(window.location.pathname).toBe('/');
  });

  it('should close logout modal on clicking no,cancel', () => {
    RenderUserProfile();
    const logoutButton = screen.getByTestId('logout-btn');
    fireEvent.click(logoutButton);
    const cancelButton = screen.getByText(/No,Cancel/i);
    fireEvent.click(cancelButton);
    const logoutModal = screen.getByTestId('logout-modal');
    expect(logoutModal).not.toBeInTheDocument();
  });
});
