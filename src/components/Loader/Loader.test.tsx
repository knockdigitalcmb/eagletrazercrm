import { render, screen } from '@testing-library/react';
import Loader from './index';

describe('Loader Component', () => {
  it('should loader component render without error', () => {
    render(<Loader />);
    const loaderElement = screen.getByTestId('loader-component');
    expect(loaderElement).toBeInTheDocument();
  });
});
