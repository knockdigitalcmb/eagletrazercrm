import { render, screen } from '@testing-library/react';
import UserNotification from './index';

describe('User Notification Component', () => {
  it('should user notification Component render without error', () => {
    render(<UserNotification />);
    const UserNotificationElement = screen.getByTestId(
      'user-notification-component'
    );
    expect(UserNotificationElement).toBeInTheDocument();
  });
});
