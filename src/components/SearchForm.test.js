import React from 'react';
import {
  render,
  screen,
  fireEvent
} from '@testing-library/react';
import SearchForm from './SearchForm';

describe('SearchForm', () => {
  const searchFormProps = {
    searchTerm: 'React',
    onSearchInput: jest.fn(),
    onSearchSubmit: jest.fn(),
  };
  
  beforeEach(() => {
    render(<SearchForm {...searchFormProps} />);
  });
  
  test('renders the input field with its value', () => {
    expect(screen.getByDisplayValue('React')).toBeInTheDocument();
  });
  
  test('renders the correct label', () => {
    expect(screen.getByLabelText(/Search/)).toBeInTheDocument();
  });
  
  test('calls onSearchInput on input field change', () => {
    fireEvent.change(screen.getByDisplayValue('React'), {
      target: { value: 'React' }
    });
  });
  
  test('calls onSearchSubmit on button submit click', () => {
    fireEvent.submit(screen.getByRole('button'));
    expect(searchFormProps.onSearchSubmit).toHaveBeenCalledTimes(1);
  });
});
