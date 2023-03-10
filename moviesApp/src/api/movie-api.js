export const login = (username, password) => {
    return fetch('/api/users', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    }).then(res => res.json())
};

export const signup = (username, password) => {
    return fetch('/api/users?action=register', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    }).then(res => res.json())
};

export const getFavourites = (username) => {
    return fetch('/api/users/'+username+'/favourites').then(res => res.json())
}

export const addFavourites = (username, movieId) => {
    return fetch('/api/users/'+username+'/favourites',{
        headers: {
        'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({id: movieId})
    }).then(res => res.json())
}

export const removeFavourite = (username, movieId) =>  {
    return fetch('/api/users/'+username+'/favourites',{
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'delete',
      body: JSON.stringify({id: movieId})
    }).then(res => res.json())
  }

  export const getMovies = () => {
    return fetch(
       '/api/movies',{headers: {
         'Authorization': window.localStorage.getItem('token')
      }
    }
    ).then(res => res.json());
  };
  
  export const getGenres = () => {
    return fetch(
       '/api/genres'
    ).then(res => res.json());
  };