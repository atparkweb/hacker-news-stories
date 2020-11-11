import React from 'react';
import styled from 'styled-components';
import { StyledButtonSmall } from './StyledButton';

const StyledItem = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 5px;
`;

const StyledColumn = styled.span`
  padding: 0 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  a {
    color: inherit;
  }
  
  width: ${props => props.width};
`;

const Item = ({ item, onRemoveItem }) => {
  return (
    <StyledItem>
      <StyledColumn width="40%">
        <a href={item.url}>{item.title}</a>
      </StyledColumn>
      <StyledColumn width="30%">{item.author}</StyledColumn>
      <StyledColumn width="10%">{item.num_comments}</StyledColumn>
      <StyledColumn width="10%">{item.points}</StyledColumn>
      <StyledColumn width="10%">
        <StyledButtonSmall
          type="button"
          onClick={() => onRemoveItem(item)}>
          Dismiss
        </StyledButtonSmall>
      </StyledColumn>
    </StyledItem>
  );
}

const List = ({ list, onRemoveItem }) =>
  list.map(item => (
    <Item key={item.objectID}
      item={item}
      onRemoveItem={onRemoveItem}
    />
  ));

export default List;