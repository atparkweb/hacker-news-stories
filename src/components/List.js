import React from 'react';

const Item = ({ item, onRemoveItem }) => {
  return (
    <div>
      <span>
        <a href={item.url}>{item.title}</a>
      </span>
      <span>{item.author}</span>
      <span>{item.num_comments}</span>
      <span>{item.points}</span>
      <button type="button" onClick={() => onRemoveItem(item)}>
        Dismiss
      </button>
    </div>
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