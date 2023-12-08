
import { useRouter } from "next/router";
import { MoviesByType } from "../../api/movies";
import Navbar from "../../Navbar";
//import Footer from "../../Footer";
import { useState } from "react";
import Cards from "../../../components/Cards";

const Movies = ({ movies }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  return (
  
    <div >
          <Navbar onSearch={handleSearch} />
   
   
      <ul style={{display:"flex", flexWrap:"wrap", padding:"16px"}}>
      <Cards items = {filteredMovies} folderName="movies"/>
      {/*
        {filteredMovies.map((movie) => ( 
          <li  style={{width:"25%"}} key={movie.id}>
            <a href = {`/movies/${encodeURIComponent(movie.id)}`}>
              <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title} width={"100px"}
              />
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
            </a>
          </li>

        
        ))}
        */}
      </ul>
    </div>
  );
};

export async function getServerSideProps({ params }) {
    try {
      const { type } = params;
      const movies = await MoviesByType(type);
 
      if (!movies) {
        throw new Error("Failed to fetch movies");
      }
  
      return {
        props: { movies },
      };
    } catch (error) {
      console.error("Error fetching movies:", error.message);
  
   
      return {
        props: { movies: [] },
      };
    }
  }
  
  


export default Movies;
