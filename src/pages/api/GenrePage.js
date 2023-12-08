import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const GenrePage = () => {
  const router = useRouter();
  const { genre } = router.query; 

  const [movies, setMovies] = useState([]);


 
  const fetchMoviesByGenre = async () => {
    try {
   
  
      const moviesUrl = `https://api.themoviedb.org/3/discover/movie?api_key=bacc5cb7f37a366d5cd55cba74b43fe2&with_genres=${selectedGenre}`;
      const response = await fetch(moviesUrl);
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error('Error fetching movies by genre:', error);
    }
  };

  useEffect(() => {
    if (genre) {
      fetchMoviesByGenre();
    }
  }, [genre]);

  return (
    <div>
      {movies.length === 0 ? (
        <p>No movies found for the selected genre.</p>
      ) : (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <h3>{movie.title}</h3>
              <p>{movie.overview}</p>
              <p>Release Date: {movie.release_date}</p>
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} width={"100px"} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GenrePage;
