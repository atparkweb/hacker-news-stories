import React from 'react';
import {
  render,
  screen,
  fireEvent,
  act
} from '@testing-library/react';
import { Item } from './List';

const storyOne = {
  title: 'React',
  url: 'https://reactjs.org/',
  author: 'Jordan Walke',
  num_comments: 3,
  points: 4,
  objectID: 0
};

describe('Item', ()=> {
  test('renders all properties', () => {
    render(<Item item={storyOne} />);
    
    expect(screen.getByText('Jordan Walke')).toBeInTheDocument();
    expect(screen.getByText('React')).toHaveAttribute(
      'href',
      'https://reactjs.org/'
    );
  });
  
  test('renders a clickable dismiss button', () => {
    render(<Item item={storyOne} />);
    
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
  
  test('clicking the dismiss button calls the callback handler', ()=> {
    const handleRemoveItem = jest.fn();
    
    render(<Item item={storyOne} onRemoveItem={handleRemoveItem} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleRemoveItem).toHaveBeenCalledTimes(1);
  });
})
