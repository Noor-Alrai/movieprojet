import React, { useState, useEffect } from "react";
import Link from "next/link";
import Cards from "../../components/Cards";
import Navbar from "../Navbar";
import FinalFooter from "../../components/FinalFooter";
import {data} from "autoprefixer"


const ActorList = () => {
  const [actors, setActors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("now_playing");
  const [selectedGenre, setSelectedGenre] = useState("");
  const filteredActors = actors.filter((actor) =>
  actor.original_name.toLowerCase().includes(searchTerm.toLowerCase())
);
  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  const handleGenreChange = (selectedGenre) => {

    setSelectedGenre(selectedGenre);
    setSelectedType("")
  };
 const handleTypeChange =(selectedType) =>{
    setSelectedType(selectedType);
    setSelectedGenre("")

  }
  useEffect(() => {
    const fetchData = async () => {
      const url = 'https://api.themoviedb.org/3/person/popular?language=en-US&page=1';
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YmY4NThjNjhmZDM2MzkyYzc4YzhhOWNmNTMxMTI3MSIsInN1YiI6IjY1NjRjMTRjZWRlYjQzMDExZDVhMzcxNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Cc9AYZcT1aXwsWDYpfqJGJXStJfPgHHiMiv5icr7lck'
        }
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setActors(data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 

return (
  <div className="inline-block text-center">
    <Navbar onSearch={handleSearch}  onSelectGenre={handleGenreChange} onSelectType={handleTypeChange}  />
    <h1 className="text-3xl font-bold mb-4">Actor List</h1>

    <ul className="list-none p-0">
    {/* <Cards items = {actors} folderName="Actors"/> */}
      {filteredActors.map((actor) => (
        <li key={actor.id} className="mb-4 inline-block mr-4">
          <Link href={`/Actors/${actor.id}`} className="no-underline">
            {actor.profile_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
                alt={actor.name}
                className="rounded-lg"
              />
            )}
            <strong className="block mt-2">{actor.name}</strong>
          </Link>
        </li>
      ))}
    </ul>
    <FinalFooter />
  </div>
);
};

export default ActorList;

