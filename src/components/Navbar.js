import React ,{ useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";


function Navbar({onSearch}){
    const [genres, setGenres] = useState([]);
    const [selectedType, setSelectedType] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("");
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
      setSearchTerm(e.target.value);
      onSearch(e.target.value);
    };
    const router = useRouter();
    useEffect(() => {
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYWNjNWNiN2YzN2EzNjZkNWNkNTVjYmE3NGI0M2ZlMiIsInN1YiI6IjY1Njc3NjZjMDIxY2VlMDEzYTg0MzMxYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AzZZFUx9YA3TyFD4o86SQE1mY1CwZkk5Kx09BfWQZPY',
          },
        };
    
        fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
          .then(response => response.json())
          .then(data => setGenres(data.genres))
          .catch(error => console.error(error));
      }, []);
     
      const handleTypeChange = (e) => {
        const type = e.target.value;
        setSelectedType(type);
        router.push(`/movies/${type}`);
      };
      const handleGenreChange = (e) => {
        const genre = e.target.value;
        setSelectedGenre(genre);
        router.push(`/movies/${selectedType}`);
      };
   return (<nav className={bg-teal-500} style={{display:"flex", width:"100vw" ,justifyContent:"center", backgroundColor:"whitesmoke" }}>
   <Link href="/" className="logo" style={{padding: "5px"}}>

<img src="https://png.pngtree.com/png-clipart/20200225/ourlarge/pngtree-movie-icon-design-png-image_2153114.jpg" style={{width:"50px"}} />
      </Link>

      <div className="genres-dropdown" style={{ padding: "10px" }}>
        <select value={selectedGenre} onChange={handleGenreChange}>
          <option value="">Select Genre</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      <div className="movie-links" style={{ padding: "10px" }}>
        <select value={selectedType} onChange={handleTypeChange}>
          <option value="">Select Type</option>
          <option value="top_rated">Top Rated</option>
          <option value="popular">Popular</option>
          <option value="upcoming">Up Coming</option>
          <option value="now_playing">Now Playing</option>
         
        </select>

      </div>
      <Link href="/Movies" style={{padding: "10px"}}>
        Movies
      </Link>
      <Link href="/Actors" style={{padding: "10px"}}>
        Actors
      </Link>
    
      <input style={{height:"25px"}}
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={handleSearch}
      />
      
    </nav>)
}
export default Navbar