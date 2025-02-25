import { render, screen,cleanup } from '@testing-library/react';
import Page404 from './index';

describe('Page404 Page', () => {
  afterEach(cleanup);
it('should  page404  render', () => {
    render(<Page404 />);
    const page404Element = screen.getByTestId('Page404');
    expect(page404Element).toBeInTheDocument();
  });

it('should render the return to home button', () => {
    render(<Page404 />);
    const button = screen.getByTestId('page404-submit');
    expect(button).toBeInTheDocument();
    expect(button.textContent).toMatch(/returnToHome/i);
  });
});
