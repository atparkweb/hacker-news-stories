import React from 'react';
import {
  render,
  screen,
  fireEvent
} from '@testing-library/react';
import { Item, List } from './List';

const storyOne = {
  title: 'React',
  url: 'https://reactjs.org/',
  author: 'Jordan Walke',
  num_comments: 3,
  points: 4,
  objectID: 0
};

const handleRemoveItem = jest.fn();

describe('Item component', ()=> {
  beforeEach(() => {
    render(<Item item={storyOne} onRemoveItem={handleRemoveItem} />);
  });

  test('renders all properties', () => {
    expect(screen.getByText('Jordan Walke')).toBeInTheDocument();
    expect(screen.getByText('React')).toHaveAttribute(
      'href',
      'https://reactjs.org/'
    );
  });
  
  test('renders a clickable dismiss button', () => {
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
  
  test('clicking the dismiss button calls the callback handler', ()=> {
    fireEvent.click(screen.getByRole('button'));
    expect(handleRemoveItem).toHaveBeenCalledTimes(1);
  });
});

describe('List component', () => {
  beforeEach(() => {
    render(<List list={[storyOne]} onRemoveItem={handleRemoveItem} />);
  });
  
  test('renders all items', () => {
    expect(screen.getByText('Jordan Walke')).toBeInTheDocument();
  });
});
