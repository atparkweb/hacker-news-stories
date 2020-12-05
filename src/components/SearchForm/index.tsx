import React from 'react';
import InputWithLabel from '../InputWithLabel';
import styled from 'styled-components';
import { SearchFormProps } from '../../types';
import { StyledButtonLarge } from '../StyledButton';

const StyledSearchForm = styled.form`
  padding: 10px 0 20px 0;
  display: flex;
  align-items: baseline;
`;

const SearchForm = ({
    searchTerm,
    onSearchInput,
    onSearchSubmit
}: SearchFormProps) => (
  <StyledSearchForm onSubmit={onSearchSubmit}>
    <InputWithLabel id="search"
      type="text"
      value={searchTerm}
      isFocused
      onInputChange={onSearchInput}>
        <strong>Search: </strong>
    </InputWithLabel>
  
    <StyledButtonLarge
      type="submit"
      disabled={!searchTerm}>
        Submit
    </StyledButtonLarge>
  </StyledSearchForm>
);

export default SearchForm;
