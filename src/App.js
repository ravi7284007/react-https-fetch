import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movieData, setMovieData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)



  const fetchMovieHandler = useCallback(async () => {
    setIsLoading(true)
    setError(null)


    try {
      const response = await fetch('https://swapi.dev/api/films')

      if (!response.ok) {
        throw new Error('Something went wrong!')
      }

      const data = await response.json()



      setMovieData(data.results)
    } catch (err) {
      setError(err.message)
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    fetchMovieHandler()
  }, [fetchMovieHandler])

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movieData.length > 0 && <MoviesList movies={movieData} />}
        {!isLoading && movieData.length === 0 && !error && <p>Found No Movies</p>}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>Loading....</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
