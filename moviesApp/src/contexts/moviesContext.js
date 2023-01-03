import React, { useState, useContext, useEffect } from "react";
import { getFavourites, addFavourites, removeFavourite } from "../api/movie-api";
import { AuthContext } from "./authContext";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favourites, setFavourites] = useState( [] )
  const [myReviews, setMyReviews] = useState( {} ) 
  const [mustWatch, setMustWatch] = useState( [] )

  const context = useContext(AuthContext)

  function loadFavourites(){
    getFavourites(context.userName).then(result =>{
      setFavourites(result)
    })
  }

  const addToFavourites = (movidID) => {
    addFavourites(context.userName, movidID)
    loadFavourites()
  };
  
  // We will use this function in a later section
  const removeFromFavourites = (movieID) => {
    removeFavourite(context.userName, movieID)
    loadFavourites()
  };

  const addReview = (movie, review) => {
    setMyReviews( {...myReviews, [movie.id]: review } )
  };

  const addToMustWatch = (movie) => {
    let newMustWatch = [...mustWatch];
    if (!mustWatch.includes(movie.id)) {
      newMustWatch.push(movie.id);
    }
    setMustWatch(newMustWatch);
    console.log(newMustWatch)
  };

  const removeFromMustWatch = (movie) => {
    setMustWatch( mustWatch.filter(
      (mId) => mId !== movie.id
    ) )
  };

  return (
    <MoviesContext.Provider
      value={{
        favourites,
        setFavourites,
        addToFavourites,
        removeFromFavourites,
        addReview,
        addToMustWatch,
        mustWatch,
        removeFromMustWatch,
        loadFavourites
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;