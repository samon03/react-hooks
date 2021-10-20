import React, { useState, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

const Ingredients = () => {

  const [userIngredients, setUserIngredients] = useState([]);

  // [] -> means componentDidMount


  const addHandler = (ingredient) => {
    fetch('https://react-todolist-84877-default-rtdb.firebaseio.com/lists.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
        return response.json();
    }).then(responseData => {
      setUserIngredients(prevIngredients => [
        ...prevIngredients, 
        {id: responseData.name, ...ingredient}
       ]);
    });
  }

  const onFilter = useCallback((filterIngredient) => {
    setUserIngredients(filterIngredient);
  }, []); 

  return (
    <div className="App">
      <IngredientForm addIngredient={addHandler} />

      <section>
        <Search onFilter={onFilter}/>
        <IngredientList ingredients={userIngredients} 
             onRemoveItem={() => {}} />
      </section>
    </div>
  );
}

export default Ingredients;
