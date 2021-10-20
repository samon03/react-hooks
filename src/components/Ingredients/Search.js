import React, { useState, useEffect } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {

  const { onFilter } = props;

  const [entredValue, setentredValue] = useState('');

  useEffect(() => {
    const query = entredValue.length === 0 ? '' : `?orderBy="title"&equalTo="${entredValue}"`; 

    fetch('https://react-todolist-84877-default-rtdb.firebaseio.com/lists.json' + query)
    .then(response => response.json())
    .then(responseData => {
        const loadData = [];
        for (const key in responseData) {
            loadData.push({
              id: key,
              title: responseData[key].title,
              amount: responseData[key].amount
        });
      }

      onFilter(loadData);

    });
  }, [entredValue, onFilter]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" 
              value={entredValue}  
              onChange={event => {
                setentredValue(event.target.value);
              }} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
