import './App.css';
import React from 'react';

const Item = ({ title, type, url }) => (
  <div>
    <span>
      <a href={url}>{title}</a>
    </span>
    <small> ({type})</small>
  </div>
);

const List = ({ list }) =>
  list.map(({objectID, ...item}) => <Item key={objectID} {...item} />);

const Search = ({ search, onSearch, onClear }) =>
  (
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" value={search} onChange={onSearch} />
      <button onClick={onClear} type="button">Clear</button>
    </div>
  );

const App = () => {
  const products = [
    {
      type: 'Junmaidaiginjo',
      title: 'Yamamoto',
      objectID: 0,
      url: ''
    },
    {
      type: 'Junmaidaiginjo',
      title: 'Harugasumi',
      objectID: 1,
      url: ''
    },
    {
      type: 'Daiginjo',
      title: 'Yuki No Bosha',
      objectID: 2,
      url: ''
    }
  ]

  const [searchTerm, setSearchTerm] = React.useState('React');

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };
  const handleClear = () => {
    setSearchTerm('');
  };
  
  const searchedProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div style={{padding: '2rem'}}>
      <h1>Hello Sake!</h1>

      <Search search={searchTerm} onSearch={handleSearch} onClear={handleClear} />

      <hr />

      <List list={searchedProducts} />

    </div>
  );
}

export default App;
