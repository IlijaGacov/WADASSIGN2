import React from "react";
import { getPopularActors } from "../api/tmdb-api";
import PageTemplate from '../components/templateActorListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
//import AddToMustWatchIcon from '../components/cardIcons/addToMustWatch'   //unused for now, probably will change to "addtofavouriteActors"

const PopularActorsPage = (props) => {

  const {  data, error, isLoading, isError }  = useQuery('popularActors', getPopularActors)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const actors = data.results;

  // Redundant, but necessary to avoid app crashing.
  const favourites = actors.filter((m) => m.favourites);
  localStorage.setItem("favourites", JSON.stringify(favourites));
  const addtofavouriteActors = (actorId) => true 

  return (
    <PageTemplate
      title="Popular Actors"
      actor={actors}
      action={(actor) => {
        return <addToFavouriteActorsIcon actor={actor} />
      }}
    />
  );
};
export default PopularActorsPage;