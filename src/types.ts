import { ChangeEvent } from 'react';

type Story = {
  objectID: string;
  url: string;
  title: string;
  author: string;
  num_comments: number;
  points: number;
}

type Stories = Array<Story>

type StoriesState = {
  data: Stories;
  isLoading: boolean;
  isError: boolean;
}

interface StoriesFetchInitAction {
  type: 'STORIES_FETCH_INIT';
}

interface StoriesFetchSuccessAction {
  type: 'STORIES_FETCH_SUCCESS';
  payload: Stories;
}

interface StoriesFetchFailureAction {
  type: 'STORIES_FETCH_FAILURE';
}

interface StoriesRemoveAction {
  type: 'REMOVE_STORY';
  payload: Story;
}

type StoriesAction =
  | StoriesFetchInitAction
  | StoriesFetchSuccessAction
  | StoriesFetchFailureAction
  | StoriesRemoveAction
  
  
type InputWithLabelProps = {
  id: string;
  value: string;
  type?: string;
  isFocused?: boolean;
  children:  React.ReactNode;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

type SearchFormProps = {
  searchTerm: string;
  onSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}
  
export type {
    InputWithLabelProps,
    SearchFormProps,
    Story,
    Stories,
    StoriesState,
    StoriesAction
};
