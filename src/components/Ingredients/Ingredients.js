import React, { useState, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';

const Ingredients = () => {

  const [userIngredients, setUserIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

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
    }).catch(error => {
        setError(error.message);
    });
  }

  const clearError = () => {
    setError(null);
    setIsLoading(false);
  }

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal> }
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
