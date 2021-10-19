import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

const Ingredients = () => {

  const [userIngredients, setUserIngredients] = useState([]);

  const addHandler = (ingredient) => {
     setUserIngredients(prevIngredients => [
       ...prevIngredients, 
       {id: Math.random().toString(), ...ingredient}
      ]);
  }

  return (
    <div className="App">
      <IngredientForm addIngredient={addHandler} />

      <section>
        <Search />
        <IngredientList ingredients={userIngredients} 
             onRemoveItem={() => {}} />
      </section>
    </div>
  );
}

export default Ingredients;
