import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { TVContext } from "../contexts/tvContext";
import { useQueries } from "react-query";
import { getTVs } from "../api/tmdb-api";
import Spinner from '../components/spinner'
import RemoveFromFavourites from "../components/cardIcons/removeFromFavourites";
import WriteReview from "../components/cardIcons/writeReview";

const FavouriteTVPage = () => {
  const {favourites: TVIds } = useContext(TVContext);

  // Create an array of queries and run in parallel.
  const favouriteTVQueries = useQueries(
    TVIds.map((tvId) => {
      return {
        queryKey: ["tv", { id: tvId }],
        queryFn: getTV,
      };
    })
  );
  // Check if any of the parallel queries is still loading.
  const isLoading = favouriteTVQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const tv = favouriteTVQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map(g => g.id)
    return q.data
  });

  const toDo = () => true;

  return (
    <PageTemplate
      title="Favourite TV Shows"
      TVs={tv}
      action={(tv) => {
        return (
          <>
            <RemoveFromFavourites tv={tv} />
            <WriteReview tv={tv} />
          </>
        );
      }}
    />
  );
};

export default FavouriteTVpage;