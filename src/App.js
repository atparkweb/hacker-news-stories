import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

import List from './components/List';
import SearchForm from './components/SearchForm';

import useSemiPersistentState from './hooks/semiPersistentState';
import storiesReducer from './reducers/storiesReducer';

const StyledContainer = styled.div`
  height: 100vw;
  padding: 20px;
  
  background: #84a4d4; /* fallback for old browsers */
  background: linear-gradient(to left, #b6fbff, #83a4d4);
  
  color: #171212;
`;

const StyledHeadlinePrimary = styled.h1`
  font-size: 48px;
  font-weight: 300;
  letter-spacing: 2px;
`
const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query='

const getSumComments = stories => {
  return stories.data.reduce(
    (result, value) => result + value.num_comments,
    0
  );
};

const App = () => {
  /* State */
  const [searchTerm, setSearchTerm] = useSemiPersistentState('search', 'React');
  
  const [url, setUrl] = React.useState(
    `${API_ENDPOINT}${searchTerm}`
  );
  
  /* Event handlers */
  const handleSearchInput = event => {
    setSearchTerm(event.target.value);
  };
  
  const handleSearchSubmit = event => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);
    
    event.preventDefault();
  };

  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
    { data: [], isLoading: false, isError: false }
  );
  
  const handleFetchStories = React.useCallback(async () => {
    dispatchStories({ type: 'STORIES_FETCH_INIT' });

    /* without async/await:
    axios
      .get(url)
      .then(result => {
        dispatchStories({
          type: 'STORIES_FETCH_SUCCESS',
          payload: result.data.hits,
        })
      })
      .catch(() =>
        dispatchStories({ type: 'STORIES_FETCH_FAILURE'})
      );
    */
      
    // using async/await
    const result = await axios.get(url);
    
    try {
      dispatchStories({
        type: 'STORIES_FETCH_SUCCESS',
        payload: result.data.hits
      });
    } catch {
      dispatchStories({ type: 'STORIES_FETCH_FAILURE' })
    }
  }, [url]);

  React.useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);
  
  const handleRemoveStory = React.useCallback(item => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item
    });
  }, []);
  
  const sumComments = React.useMemo(()=> getSumComments(stories), [stories]);

  return (
    <StyledContainer>
      <StyledHeadlinePrimary>My Hacker Stories with {sumComments} comments.</StyledHeadlinePrimary>

      <SearchForm searchTerm={searchTerm} onSearchInput={handleSearchInput} onSearchSubmit={handleSearchSubmit} />

      { stories.isError && <p>Something is wrong...</p>}

      { stories.isLoading ? (
        <p>Loading...</p>
      ) : (
        <List list={stories.data} onRemoveItem={handleRemoveStory}/>
      )}

      <small>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></small>
    </StyledContainer>
  );
}

export default App;
