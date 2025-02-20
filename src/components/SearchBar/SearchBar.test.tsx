import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import SearchBar from './index';

describe('Search Bar Component', () => {
  afterEach(cleanup);
  it('should search bar component render without error', () => {
    render(<SearchBar />);
    const searchBarElement = screen.getByTestId('search-bar');
    expect(searchBarElement).toBeInTheDocument();
  });
  it('should trigger the input event', () => {
    render(<SearchBar />);
    const searchInput = screen.getByPlaceholderText('search');
    expect(searchInput).toBeInTheDocument();

    fireEvent.change(searchInput, {
      target: { value: 'test' },
    });
    expect(searchInput).toBeInTheDocument();
  });
});
