import React, {useEffect, useState} from 'react';
import './App.css';
import Recipe from './Recipe';

function App() {

  const APP_ID = 'c8728e98';
  const APP_KEY = '5c86e9ec900ac93823bc0a8c336fe773';

  const [recipes, setRecipes] = useState([]);
  //because the hits come back as an array of objects
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');

  useEffect (() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free`);
    const data = await response.json();
    setRecipes(data.hits); 
    console.log(data.hits);
  };
  //simpler way to write fetching the data
  //async - await is used for any data that doesn't come back instaly (a promise)

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault(); //prevents page refresh
    setQuery(search);
    setSearch(''); //set search back to an empty string
  };

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit">
          Search 
        </button>
      </form>
      <div className="recipes">
      {recipes.map(recipe => (
        <Recipe 
        key={recipe.recipe.label}
        title={recipe.recipe.label} 
        calories={Math.round(recipe.recipe.calories)} 
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
      ))}
      </div>
    </div>
  );
};

export default App;
