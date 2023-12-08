import Cards from '../components/Cards';
import React, { useState, useEffect } from 'react';

const MovieByGenre = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Fetch genres when the component mounts
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      // Replace 'YOUR_TMDB_API_KEY' with your actual TMDB API key
      const apiKey = 'YOUR_TMDB_API_KEY';
      const genresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=bacc5cb7f37a366d5cd55cba74b43fe2`;
      const response = await fetch(genresUrl);
      const data = await response.json();
      setGenres(data.genres);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  const fetchMoviesByGenre = async () => {
    try {
      // Replace 'YOUR_TMDB_API_KEY' with your actual TMDB API key
      const apiKey = 'YOUR_TMDB_API_KEY';
      const moviesUrl = `https://api.themoviedb.org/3/discover/movie?api_key=bacc5cb7f37a366d5cd55cba74b43fe2&with_genres=${selectedGenre}`;
      const response = await fetch(moviesUrl);
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error('Error fetching movies by genre:', error);
    }
  };

  useEffect(() => {
    // Fetch movies when the selected genre changes
    if (selectedGenre) {
      fetchMoviesByGenre();
    }
  }, [selectedGenre]);

  return (
    <div>

      <select id="genre" onChange={handleGenreChange}>
        <option value="">Select genre</option>
        {genres.map(genre => (
          
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>

      <div>
        {movies.length === 0 ? (
          <p>No movies found for the selected genre.</p>
        ) : (
          <ul>
            <Cards items = {movies}/>
            {movies.map(movie => (
              <li key={movie.id}>
                <h3>{movie.title}</h3>
                <p>{movie.overview}</p>
                <p>Release Date: {movie.release_date}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MovieByGenre;
