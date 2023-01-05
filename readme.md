# Assignment 2 - Web API.

Name: Ilija Gacov

## Features.

 + An authenticated user can view their own favourites, if a user isnt logged in, you are propted to log in

 + Login page, that also has a sign up page added

 + Movies and genres are now queried through the API

## Installation Requirements

Describe what needs to be on the machine to run the API (Node v?, NPM, MongoDB instance, any other 3rd party software not in the package.json). 

+ Node.js V16.17.0

+ MongoDB Version 4.4.18

Describe getting/installing the software, perhaps:

```bat
git clone https://github.com/IlijaGacov/WADASSIGN2
```

followed by installation

```bat
npm init
npm install --save-dev babel-cli babel-preset-env nodemon eslint babel-eslint
npm install --save dotenv express
npm install --save uniqid
npm install -save mongoose
npm install express-async-handler --save
npm install --save express-session
npm install --save passport passport-jwt jsonwebtoken bcrypt-nodejs
```
Then do

```bat
npm start
```

within both \movies-api and \moviesApp

## API Configuration

+ Within moviesApp\.env

```bat
REACT_APP_TMDB_KEY=(Your TMDB API key)
FAST_REFRESH=false
```

+Within movies-api\.env

```bat
NODE_ENV=development
PORT=8080
HOST=localhost
MONGO_DB=mongodb://localhost:27017/movies_db
SEED_DB=true
SECRET=ilikecake
TMDB_KEY=(Your TMDB API key)
```

## API Design
Give an overview of your web API design, perhaps similar to the following: 

|  |  GET | POST | PUT | DELETE
| -- | -- | -- | -- | -- 
| /api/movies |Gets a list of movies | N/A | N/A | N/A
| /api/movies/{movieid} | Get a Movie | N/A | N/A | N/A
| /api/movies/{movieid}/reviews | Get all reviews for movie | Create a new review for Movie | N/A | N/A  
| /api/movies/tmdb/upcoming | Get a list of upcoming movies | N/A | N/A | N/A
| /api/genres | Get a list of genres | N/A | N/A | N/A
| /api/users | Get a list of users | Get a user bearer token | N/A
| /api/users?action=register | N/A | Creates a new user | N/A | N/A
| /api/users/:id | N/A | N/A | Updates a users details | N/A
| /api/users/:userName/favourites | Gets a user's favourite movies | Adds a favourite movie | N/A | Deletes a favourite

## Security and Authentication

Json Web Tokens are used to authenticate users

/movies/favourites is private and requires authentication to access

## Integrating with React App

To access a users favourites, a user musted be logged in and authenticated.
Some API calls like movies or movie genres are called through the node API.
Other calls like login, signup and Getting/Adding/Removing favourites were all integrated from the labs


~~~Javascript
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
~~~