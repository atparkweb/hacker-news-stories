import React from 'react';

// Custom hook
const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );
  
  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key])
  
  return [value, setValue];
}

export default useSemiPersistentState;