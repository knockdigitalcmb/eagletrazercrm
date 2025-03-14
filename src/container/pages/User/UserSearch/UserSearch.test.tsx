import { render, screen, fireEvent } from '@testing-library/react';
import React, { useState } from 'react';
import UserSearch from '../UserSearch';

// Mock useTranslation hook
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('UserSearch Component', () => {
  const mockHandleSearchChange = jest.fn();

  const Wrapper = ({ initialSearchTerm = '' }) => {
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

    return (
      <UserSearch
        searchTerm={searchTerm}
        onHandleSearchChange={(event) => {
          setSearchTerm(event.target.value);
          mockHandleSearchChange(event);
        }}
      />
    );
  };

  test('should render the search input field', () => {
    render(<Wrapper />);
    expect(screen.getByPlaceholderText('searchPlaceholder')).toBeInTheDocument();
  });

  test('should display the correct placeholder text', () => {
    render(<Wrapper />);
    const inputElement = screen.getByPlaceholderText('searchPlaceholder');
    expect(inputElement).toHaveAttribute('placeholder', 'searchPlaceholder');
  });

  test('should update input value when user types', () => {
    render(<Wrapper />);
    const inputElement = screen.getByPlaceholderText('searchPlaceholder') as HTMLInputElement;

    fireEvent.change(inputElement, { target: { value: 'John' } });

  
    expect(inputElement.value).toBe('John');
  });

  test('should call handleSearchChange when user types', () => {
    render(<Wrapper />);
    const inputElement = screen.getByPlaceholderText('searchPlaceholder');

    fireEvent.change(inputElement, { target: { value: 'Doe' } });

    expect(mockHandleSearchChange).toHaveBeenCalledTimes(1);
    expect(mockHandleSearchChange).toHaveBeenCalledWith(expect.any(Object)); 
  });
});
