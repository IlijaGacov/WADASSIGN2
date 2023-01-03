import React from "react";
import { getPopularTVShows } from "../api/tmdb-api";
import PageTemplate from '../components/templateTVListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavouritesIconTV from '../components/cardIcons/addToFavouritesIconTV'

const PopularTVShowsPage = (props) => {

  const {  data, error, isLoading, isError }  = useQuery('popular', getPopularTVShows)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const tv = data.results;

  const favourites = tv.filter(m => m.favourite)
  localStorage.setItem('favourites', JSON.stringify(favourites))

  return (
    <PageTemplate
      title="Popular TV Shows"
      TVs={tv}
      action={(tvshows) => {
        return <AddToFavouritesIconTV tv={tvshows} />
      }}
    />
  );
};
export default PopularTVShowsPage;