import React from 'react';
import InputWithLabel from './InputWithLabel';

const SearchForm = ({
    searchTerm,
    onSearchInput,
    onSearchSubmit
}) => (
  <form onSubmit={handleSearchSubmit}>
    <InputWithLabel id="search"
      type="text"
      value={searchTerm}
      isFocused
      onInputChange={handleSearchInput}>
        <strong>Search: </strong>
    </InputWithLabel>
  
    <button type="submit" disabled={!searchTerm}>Submit</button>
  </form>
)