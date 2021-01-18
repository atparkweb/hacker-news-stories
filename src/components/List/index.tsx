import React, { useState } from "react";
import styled from "styled-components";
import { Story, Stories } from "../../types";
import { ReactComponent as Check } from "../../check.svg";
import { StyledButtonSmall } from "../StyledButton";

const StyledItem = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 5px;
`;

const StyledColumn = styled.span<{ width: string }>`
  padding: 0 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  a {
    color: inherit;
  }
  
  width: ${props => props.width};
`;

type ItemProps = {
  item: Story;
  onRemoveItem: (item: Story) => void
};

const Item = ({ item, onRemoveItem }: ItemProps) => {
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
          <Check height="18px" width="18px" />
        </StyledButtonSmall>
      </StyledColumn>
    </StyledItem>
  );
}

type SortButtonProps = {
  title: string;
  onClick: (sortKey: string) => void;
};

const SortButton = (props: SortButtonProps) => (
  <span>
    <button type="button" onClick={() => props.onClick(props.title)}>
      {props.title}
    </button>
  </span>
);

type ListProps = {
  list: Stories;
  onRemoveItem: (item: Story) => void;
}

const List = ({ list, onRemoveItem }: ListProps) => {
  const [sort, setSort] = useState("NONE");

  const handleSort = (sortKey:string) => {
    setSort(sortKey);
  };
  
  return (
    <div>
      <div>
        <SortButton title="TITLE" onClick={handleSort} />
        <SortButton title="AUTHOR" onClick={handleSort} />
        <SortButton title="COMMENT" onClick={handleSort} />
        <SortButton title="POINT" onClick={handleSort} />
      </div>

      <div style={{ display: "flex" }}>
        <span style={{ width: "40%" }}>Title</span>
        <span style={{ width: "30%" }}>Author</span>
        <span style={{ width: "10%" }}>Comments</span>
        <span style={{ width: "10%" }}>Points</span>
        <span style={{ width: "10%" }}>Actions</span>
      </div>

      {list.map(item => (
        <Item
          key={item.objectID}
          item={item}
          onRemoveItem={onRemoveItem}
        />
      ))}
    </div>
  );

};

export default List;
export { Item, List };
