import axios from 'axios';
import React from 'react';
import {
  render,
  screen,
  fireEvent,
  act,
} from '@testing-library/react';
import { storiesReducer } from './reducers/storiesReducer';
import App from './App';

const storyOne = {
  title: 'React',
  url: 'https://reactjs.org',
  author: 'Jordan Walke',
  num_comments: 3,
  points: 4,
  objectID: 0
};

const storyTwo = {
  title: 'Redux',
  url: 'https://redux.js.org/',
  author: 'Dan Abramov, Andrew Clark',
  num_comments: 2,
  points: 5,
  objectID: 1
};

const stories = [storyOne, storyTwo];

jest.mock('axios');

describe('storiesReducer', ()=> {
  test('removes story from all stories', ()=> {
    const action = { type: 'REMOVE_STORY', payload: storyOne };
    const state = { data: stories, isLoading: false, isError: false };
    
    const newState = storiesReducer(state, action);
    const expectedState = {
      data: [storyTwo],
      isLoading: false,
      isError: false
    };
    
    expect(newState).toStrictEqual(expectedState);
  });
  
  test('sets fetch init state', ()=> {
    const action = { type: 'STORIES_FETCH_INIT' };
    const state = { data: [], isLoading: false, isError: false };

    const newState = storiesReducer(state, action);
    const expectedState = {
      data: [],
      isLoading: true,
      isError: false
    };
    
    expect(newState).toStrictEqual(expectedState);
  });
  
  test('sets fetch success state', ()=> {
    const action = { type: 'STORIES_FETCH_SUCCESS', payload: stories };
    const state = { data: [], isLoading: true, isError: false };

    const newState = storiesReducer(state, action);
    const expectedState = {
      data: [storyOne, storyTwo],
      isLoading: false,
      isError: false
    };
    
    expect(newState).toStrictEqual(expectedState);
  });

  test('sets fetch failure state', ()=> {
    const action = { type: 'STORIES_FETCH_FAILURE' };
    const state = { data: [], isLoading: true, isError: false };

    const newState = storiesReducer(state, action);
    const expectedState = {
      data: [],
      isLoading: false,
      isError: true
    };
    
    expect(newState).toStrictEqual(expectedState);
  });
});

describe('App', () => {
  test('succeeds fetching data', async () => {
    const promise = Promise.resolve({
      data: {
	hits: stories
      }
    });
  
    axios.get.mockImplementationOnce(() => promise);

    render(<App />);

    expect(screen.queryByText(/Loading/)).toBeInTheDocument();
    
    await act(() => promise);
    
    expect(screen.queryByText(/Loading/)).toBeNull();
  });
});
