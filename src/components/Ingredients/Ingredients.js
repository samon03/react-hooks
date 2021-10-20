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

  const removeIngredientHandler = ingredientId => {
    fetch(`https://react-todolist-84877-default-rtdb.firebaseio.com/lists/${ingredientId}.json`, {
      method: 'DELETE'
    })
    .then(response => {
      setUserIngredients(prevIngredients =>
        prevIngredients.filter(ingredient => ingredient.id !== ingredientId)
      );
    });
  }

  return (
    <div className="App">
      <IngredientForm addIngredient={addHandler} />

      <section>
        <Search onFilter={onFilter}/>
        <IngredientList ingredients={userIngredients} 
             onRemoveItem={removeIngredientHandler} />
      </section>
    </div>
  );
}

export default Ingredients;
