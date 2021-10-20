import React, { useState, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

const Ingredients = () => {

  const [userIngredients, setUserIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  // [] -> means componentDidMount

  const addHandler = (ingredient) => {
    setIsLoading(true);
    fetch('https://react-todolist-84877-default-rtdb.firebaseio.com/lists.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
        setIsLoading(false);
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
    setIsLoading(true);
    fetch(`https://react-todolist-84877-default-rtdb.firebaseio.com/lists/${ingredientId}.json`, {
      method: 'DELETE'
    })
    .then(response => {
      setIsLoading(false);
      setUserIngredients(prevIngredients =>
        prevIngredients.filter(ingredient => ingredient.id !== ingredientId)
      );
    });
  }

  return (
    <div className="App">
      <IngredientForm 
          addIngredient={addHandler} 
          loading={isLoading}/>

      <section>
        <Search onFilter={onFilter}/>
        <IngredientList ingredients={userIngredients} 
             onRemoveItem={removeIngredientHandler} />
      </section>
    </div>
  );
}

export default Ingredients;
